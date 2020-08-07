const models = require("../models")

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
  };

class Controller {
    static async create(req, res) {
        try {
            const data = await models.Comment.create(req.body)
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
            const data = await models.Comment.findAll({
                include: [
                    { model: models.Author },
                    { model: models.Post }
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
            const data =  await models.Comment.findByPk(req.params.id, {
                include: [
                    { model: models.Author },
                    { model: models.Post }
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
            await models.Comment.update(req.body, {
                where: {
                    id: req.params.id,
                },
            })
            response.data = { Comment_Id : req.params.id }
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
            await models.Comment.destroy({
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