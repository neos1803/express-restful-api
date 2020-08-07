const models = require("../models")

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
  };

class Controller {
    static async create(req, res) {
        try {
            const data = await models.Post.create(req.body)
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
            const data = await models.Post.findAll({
                include: [
                    { model: models.Author },
                    { model: models.Comment }
                ]
            });
            response.data = data;
            response.message = "Data is successfully retrieved";
        
            res.status(200).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message;
            res.status(400).json(response)
        }
    }

    static async find(req, res) {
        try {
            const data = await models.Post.findByPk(req.params.id, {
                include: [
                    { model: models.Author },
                    { model: models.Comment }
                ]
            });
            response.data = data;
            response.message = "Data is successfully retrieved";
        
            res.status(200).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message;
            res.status(400).json(response)
        }
    }

    static async update(req, res) {
        try {
            await models.Post.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })
            response.data = { Post_Id : req.params.id }
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
            await models.Post.destroy({
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