const { Miner, User } = require("../db");

class MinerModel {
  constructor(model) {
    this.model = model;
  }

  add = async (req, res, next) => {
    const {
      userId,
      name,
      placas,
      id_simplemining,
      user_simplemining,
      pass_simplemining,
    } = req.body;
    const createMiner = await this.model.create({
      name,
      placas,
      id_simplemining,
      user_simplemining,
      pass_simplemining,
    });
    const modelUser = await User.findOne({
      where: {
        id: userId,
      },
    });
    let arrayMiners = await Miner.findAll({
      where: {
        userId,
      },
    });
    await modelUser.setMiners([...arrayMiners, createMiner]);
    res.send(createMiner);
  };

  getAll = async (req, res) => {
    try {
      let allMiners = await this.model.findAll();
      res.send(allMiners);
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
    const { name, placas, id_simplemining, user_simplemining, pass_simplemining } = req.body;
    let error;
    let searchedMiner = await this.model
      .findOne({
        where: {
          id,
        },
      })
      .catch(() => {
        error = { message: "Minero no encontrada con el ID indicado." };
      });
    if (searchedMiner) {
      await this.model.update(
        {
            name,
            placas,
            id_simplemining,
            user_simplemining,
            pass_simplemining
        },
        { where: { id } }
      );
      res.status(200).send({ message: "Minero actualizado." });
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
              .send({ message: "Mina no encontrada con el ID indicado." });
      })
      .catch((error) => next(error));
  }; 
}

const minerController = new MinerModel(Miner);

module.exports = {
  minerController,
};
