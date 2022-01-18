const { User } = require('../db')
//const axios = require('axios')
const Sequelize = require ('sequelize')

class UserModel{
   constructor(model){
      this.model = model
    }

   getAll = async (req, res, next) => { 
      try{
        let tenCountries = await this.model.findAll()
        res.send(tenCountries)
      }
      catch (error) {
          res.status(500).send(error)
      }
   };

   showAll = async (req, res, next) => {
    return await this.model.findAll({
        include: [{ 
          model: Turistic_activity,
       }],
       limit: 250
    })
        .then(results => results.length? res.send(results): res.status(404).send('Error'))
        .catch(error => next(error))
    };

   getById = async (req, res, next) => {
   const id = req.params.id;
   return await this.model.findAll({
       include: [{ 
         model: Turistic_activity,
      }],
      where: {alpha3Code:{ [Sequelize.Op.iLike]: `${id}` }}
   })
       .then(results => results.length? res.send(results): res.status(404).send('No matching ID'))
       .catch(error => next(error))
   };

   add = async (req, res, next) => {
   const { name, lastName, email, password } = req.body;
   await this.model.create({
           name,
           lastName,
           email,
           password
       })
       .then((createdElement) => res.send(createdElement))
       .catch(error => next(error)); 
   };
}

const userController = new UserModel(User)

module.exports = {
    userController,
}