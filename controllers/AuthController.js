const models = require("../models");
const nodemailer = require("nodemailer");
const path = require("path")
const transporter = require("../config/mailConfig")
const cron = require("node-cron")
const mustache = require("mustache")
const fs = require("fs")
const template = require("../helper/template")

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
  };
  

class Controller {
    static async create(req, res) {
        const imagePath = path.join(__dirname, "./asset/image/image.jpg")

        try {
            const data = await models.Author.create(req.body);
            await Controller.sendEmail(data);
            response.data = data;
            response.message = "Data is successfully created";
            res.status(201).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
    static async sendEmail(data) {
        const task = cron.schedule("01 * * * *", function() {
            sendEmail().then(console.log("email has been sent"))
        })
        task.start();
        const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: data.dataValues.email,
            subject: `Test Email to ${data.dataValues.username}`,
            html: template({
                username: data.dataValues.username
            }),
            attachments: [{
                filename: "Attachment",
                path: "././asset/image/image.jpg",
                contentType: "image/jpg"
            }]
        }
        transporter.sendMail(mailOptions)
    }
}

module.exports = Controller;