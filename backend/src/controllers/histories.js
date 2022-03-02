const { History, User } = require("../db");

class HistoryModel {
  constructor(model) {
    this.model = model;
  }

  add = async (req, res, next) => {
    const { userId, date, usd, eth } = req.body;
    const createHistory = await this.model
      .create({
        date,
        usd,
        eth,
        userId
      })
    const modelUser = await User.findOne({
      where: {
        id: userId
      },
    });
    let arrayHistories = await History.findAll({
      where: {
        userId
      }
    })
    await modelUser.setHistories([...arrayHistories, createHistory]);
    res.send(createHistory)
  };

  getAll = async (req, res) => {
    try {
      let allHistories = await this.model.findAll();
      res.send(allHistories);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getById = async (req, res, next) => {
    const id = req.params.id;
    return await this.model
      .findOne({
        where: {
          id,
        },
      })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => next(error));
  };

  updateById = async (req, res) => {
    const id = req.params.id;
    const { usd, eth } = req.body;
    let error;
    let searchedHistory = await this.model
      .findOne({
        where: {
          id,
        },
      })
      .catch(() => {
        error = { message: "Pago no encontrado con el ID indicado." };
      });
    if (searchedHistory) {
      await this.model.update(
        {
          usd,
          eth,
        },
        { where: { id } }
      );
      res.status(200).send({ message: "Pago actualizado." });
    } else {
      res.status(404).send(error);
    }
  };

  deleteById = (req, res, next) => {
    const id = req.params.id;
    return this.model
      .destroy({
        where: {
          id,
        },
      })
      .then((response) => {
        response === 1
          ? res.status(200).send({ message: "Eliminado correctamente." })
          : res
              .status(404)
              .send({ message: "Pago no encontrado con el ID indicado." });
      })
      .catch((error) => next(error));
  };
}

const historyController = new HistoryModel(History);

module.exports = {
  historyController,
};
