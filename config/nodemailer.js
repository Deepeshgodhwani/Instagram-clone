const ejs = require("ejs");
const path = require("path");
const env = require("./environment");

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport(env.smtp);

let renderTemplate = (data, relativePath) => {
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template");
        return;
      }

      mailHtml = template;
    }
  );
  return mailHtml;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
