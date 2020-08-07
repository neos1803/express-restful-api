const models = require("../models");

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
    user: ""
  };
  

class Controller {
    static async create(req, res) {
        try {
            const data = await models.Author.create(req.body)
            response.data = data;
            response.message = "Data is successfully created";
            
            res.status(201).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
    
    static async read(req, res) {
        try {
            const data = await models.Author.findAll({
                include: [
                    { model: models.Post },
                    { model: models.Comment}
                ]
            });
            response.data = data;
            response.message = "Data is successfully retrieved";
            response.user = req.user;
            res.status(200).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message;
            res.status(400).json(response)
        }
    }

    static async find(req, res) {
        try {
            const data =  await models.Author.findByPk(req.params.id, {
                include: [
                    { model: models.Post },
                    { model: models.Comment}
                ]
            })
            response.data = data;
            response.message = "Data successfully retrieved";
    
            res.json(response)
        } catch (error) {
            response.status = "Fail",
            response.message = error.message;
            res.status(400).json(response)
        }
    }

    static async update(req, res) {
        try {
            await models.Author.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })
            response.data = { id : req.params.id }
            response.message = "Data is successfully updated";
        
            res.status(201).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async delete(req, res) {
        try {
            await models.Author.destroy({
                where: {
                    id: req.params.id,
                }   
            })
            response.data = { id : req.params.id }
            response.message = "Data is successfully deleted";
        
            res.status(201).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
}

module.exports = Controller;