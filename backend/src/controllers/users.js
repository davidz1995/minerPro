const { User } = require('../db')

class UserModel{
   constructor(model){
      this.model = model
    }

    add = async (req, res, next) => {
        const { name, lastName, email, password } = req.body;
        let verifyExist = await this.model.findOne({ where:{email:email} })
        if(!verifyExist){
            await this.model.create({
                    name,
                    lastName,
                    email,
                    password
                })
                .then((createdElement) => res.send(createdElement))
                .catch(error => next(error)); 
        } else {
            res.status(404).send({message: 'Usuario con ese email ya existe.'})
        }};

    getAll = async (req, res, next) => {
        try{
            let tenCountries = await this.model.findAll()
            res.send(tenCountries)
        }
        catch (error) {
            res.status(500).send(error)
        }
    };

    getById = async (req, res, next) => {
        const id = req.params.id;
            return await this.model.findOne({
                where: {
                    id,
                }
            })
            .then((response) => {
                res.status(200).send(response);
            })
            .catch(error => next(error))
        };

    updateById = async (req, res, next) => {
        const id = req.params.id;
        const { name, lastName, email, password } = req.body;
        let error
        let searchedElement = await this.model.findOne({
                where: {
                    id,
                }
            })
            .catch(()=>{
                error = {message:'Usuario no encontrado con el ID indicado.'}
            })
        if(searchedElement){
            await this.model.update({
                name,
                lastName,
                email,
                password
            }, {where: {id}})
            res.status(200).send({message:'Usuario actualizado.'})
        }else{
            res.status(404).send(error)
        }
        };

    deleteById = (req, res, next) => {
        const id = req.params.id;
            return this.model.destroy({
                where: {
                    id,
                },
            })
            .then((response) => {
                response === 1? res.status(200).send({message: 'Eliminado correctamente.'}) : res.status(404).send({message: 'Usuario no encontrado con el ID indicado.'})
            })
            .catch((error) => next(error))
    }
}

const userController = new UserModel(User)

module.exports = {
    userController,
}