const { User, History, Miner } = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class UserModel {
  constructor(model) {
    this.model = model;
  }

  add = async (req, res, next) => {
    const { name, lastName, email, password, isAdmin, wallet, housing_fee } =
      req.body;
    let verifyExist = await this.model.findOne({ where: { email: email } });
    if (!verifyExist) {
      await this.model
        .create({
          name,
          lastName,
          email,
          password: bcrypt.hashSync(password, 10),
          isAdmin,
          wallet,
          housing_fee,
        })
        .then((createdElement) => res.send(createdElement))
        .catch((error) => next(error));
    } else {
      res.status(404).send({ message: "Usuario con ese email ya existe." });
    }
  };

  login = async (req, res, next) => {
    const user = await this.model.findOne({ where: { email: req.body.email } });
    const secret = process.env.SECRET;
    if (!user) {
      res.status(400).send("User not found");
    } else {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            userId: user.id,
            isAdmin: user.isAdmin,
          },
          secret
        );
        res.status(200).send({
          userData: {
            id: user.id,
            user: user.email,
            name: user.name,
            wallet: user.wallet,
            housing_fee: user.housing_fee,
            status: user.status,
          },
          isAdmin: user.isAdmin,
          token: token,
        });
      } else {
        res.status(400).send("Incorrect password");
      }
    }
  };

  getAll = async (req, res) => {
    try {
      let allUsers = await this.model.findAll({
        include: [
          {
            model: History,
          },
          {
            model: Miner,
          },
        ],
      });
      res.send(allUsers);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getById = async (req, res, next) => {
    const id = req.params.id;
    return await this.model
      .findAll({
        include: [
          {
            model: History,
          },
          {
            model: Miner,
          },
        ],
        where: {
          id,
        },
      })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => next(error));
  };

  getByName = async (req, res, next) => {
    const name = req.params.name;
    return await this.model
      .findAll({
        include: [
          {
            model: History,
          },
          {
            model: Miner,
          },
        ],
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
      })
      .then((response) => {
        if (response.length) {
          res.status(200).send(response);
        } else {
          res.status(404).send(response);
        }
      })
      .catch((error) => next(error));
  };

  updateById = async (req, res) => {
    const id = req.params.id;
    const { name, lastName, email, isAdmin, wallet, housing_fee, status } =
      req.body;
    let error;
    let searchedElement = await this.model
      .findOne({
        where: {
          id,
        },
      })
      .catch(() => {
        error = { message: "Usuario no encontrado con el ID indicado." };
      });
    if (searchedElement) {
      await this.model.update(
        {
          name,
          lastName,
          email,
          isAdmin,
          wallet,
          housing_fee,
          status,
        },
        { where: { id } }
      );
      res.status(200).send({ message: "Usuario actualizado." });
    } else {
      res.status(404).send(error);
    }
  };

  updatePassword = async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;
    let error;
    let searchedUser = await this.model
      .findOne({
        where: {
          id,
        },
      })
      .catch(() => {
        error = { message: "Usuario no encontrado." };
      });
    if (searchedUser) {
      await this.model.update(
        {
          password: bcrypt.hashSync(password, 10),
          status: "Active",
        },
        { where: { id } }
      );
      res.status(200).send({ message: "Contraseña actualizada." });
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
              .send({ message: "Usuario no encontrado con el ID indicado." });
      })
      .catch((error) => next(error));
  };
}

const userController = new UserModel(User);

module.exports = {
  userController,
};
