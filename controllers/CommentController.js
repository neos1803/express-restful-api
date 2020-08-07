const models = require("../models");
const e = require("express");

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
  };

class Controller {
    static async create(req, res) {
        try {
            let obj = req.body;
            obj.author_id = req.user.id;
            const data = await models.Comment.create(obj)
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
            const data = await models.Comment.findOne({
                where: { id: req.params.id, author_id: req.user.id }
            });
            if (data == null) {
                response.status = "Fail"
                response.message = "Data doesn't exist";
                response.data = data;

                return res.json(response)
            }
            response.status = "Success"
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
            const data = await models.Comment.findOne({
                where: { id: req.params.id, author_id: req.user.id }
            });
            if (data == null) {
                response.status = "Fail"
                response.message = "Data doesn't exist";
                response.data = data;

                return res.status(401).json(response)
            } else {
                let obj = req.body;
                obj.author_id = req.user.id
                await models.Comment.update(obj, {
                    where: {
                        id: req.params.id,
                    },
                })
                response.status = "Success"
                response.message = "Data is successfully updated";
                res.status(201).json(response);
            }
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }

    static async delete(req, res) {
        try {
            const data = await models.Comment.findOne({
                where: { id: req.params.id, author_id: req.user.id }
            });
            if (data == null) {
                response.status = "Fail"
                response.message = "Data doesn't exist";
                response.data = data;

                return res.status(401).json(response)
            } else {
                await models.Comment.destroy({
                    where: {
                        id: req.params.id,
                    }   
                })
                response.data = { id : req.params.id }
                response.message = "Data is successfully deleted";
            
                res.status(201).json(response);
            }
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
}

module.exports = Controller;