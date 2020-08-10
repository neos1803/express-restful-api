const models = require("../models")
const cloudinary = require("cloudinary")
const config = require("../config/cloudinaryConfig")
const fs = require("fs")
const path = require("path")

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
};

cloudinary.config(config)

class Controller {
    static async create(req, res) {
        const imageData = {
            imageName: req.file.filename,
            imageUrl: req.file.path,
            imageId: ""
        }
        let imagePath = path.join(__dirname, "./../public/images/") + imageData.imageName
        try {
            console.log(imagePath)
            await cloudinary.uploader.upload(imageData.imageUrl)
                .then((result) => {
                    fs.unlinkSync(imagePath)
                    imageData.imageUrl = result.secure_url;
                    imageData.imageId = result.public_id;
                })
                .catch((err) => {
                    return err
                })
            const data = await models.Post.create({
                title: req.body.title,
                content: req.body.content,
                image: imageData.imageName,
                imageUrl: imageData.imageUrl,
                imagePublicId: imageData.imageId,
                tags: req.body.tags,
                status: req.body.status,
                author_id : req.user.id
            })
            response.data = {
                title: data.title,
                content: data.content
            };
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
            const data = await models.Post.findOne({
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
            const data = await models.Post.findOne({
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
                await models.Post.update(obj, {
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
            const data = await models.Post.findOne({
                where: { id: req.params.id, author_id: req.user.id }
            });
            if (data == null) {
                response.status = "Fail"
                response.message = "Data doesn't exist";
                response.data = data;

                return res.status(401).json(response)
            } else {
                await cloudinary.uploader.destroy(data.dataValues.imagePublicId)
                await models.Post.destroy({
                    where: {
                        id: req.params.id,
                    }   
                })
                response.status = "Success"
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