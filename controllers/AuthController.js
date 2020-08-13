const models = require("../models");
const nodemailer = require("nodemailer");
const path = require("path")
const transporter = require("../config/mailConfig")
const cron = require("node-cron")
const mustache = require("mustache")
const fs = require("fs")
const template = require("../helper/template")
const pdfkit = require("pdfkit")

const response = {
    message: "Your Message",
    status: "Success",
    data: [],
  };
  

class Controller {
    static async create(req, res) {
        // const imagePath = path.join(__dirname, "./asset/image/image.jpg")

        try {
            const data = await models.Author.create(req.body);
            const pdf = new pdfkit({
                size: "LEGAl",
                info: {
                    title: "This is Title",
                    Author: "This is Author"
                }
            });
            pdf.text(`
                Hello ${data.dataValues.username}!
                Here is your full credential:
                Username: ${data.dataValues.username}
                Profile: ${data.dataValues.profile}
                Email: ${data.dataValues.email}
            `)
            pdf.pipe(
                fs.createWriteStream(`././asset/pdf/welcome_${data.dataValues.username}.pdf`)
            )
                .on("finish", function () {
                    console.log("PDF finished")
                });
            pdf.end();
            const pdfPath = `././asset/pdf/welcome_${data.dataValues.username}.pdf`
            await Controller.sendEmail(data, pdfPath);
            response.data = data;
            response.message = "Data is successfully created";
            res.status(201).json(response);
        } catch (error) {
            response.status = "Fail",
            response.message = error.message,
            res.status(400).json(response)
        }
    }
    static async sendEmail(data, attach) {
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
                path: attach,
                contentType: "application/pdf"
            }]
        }
        transporter.sendMail(mailOptions)
    }
}

module.exports = Controller;