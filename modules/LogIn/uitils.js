const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
console.log(process.env.AUTH_PASS);
let html = `<html lang="en">
<head>
  <style>
    body {
      background: rgb(236, 236, 236);
      background-attachment: fixed;
      background-size: cover;
    }

    .brand-name {
      display: block;
      text-align: center;
      font-weight: 800;
      font-size: 28px;
      color: #2d3346;
      margin: 1em auto;
      width: 600px;
    }
    #container {
      background: rgba(255, 255, 255, 0.9);
      text-align: center;
      border-radius: 5px;
      border: 1px solid #2d3346;
      overflow: hidden;
      margin: 2em auto;
      height: 330px;
      width: 600px;
    }
    .product-details {
      position: relative;
      text-align: justify;
      overflow: hidden;
      padding: 30px;
      height: 100%;
      float: left;
      width: 90%;
    }

    #container .product-details h1 {
      display: inline-block;
      position: relative;
      font-size: 30px;
      color: #344055;
      margin: 0;
    }
    #container .product-details > p {
      font-size: 18px;
      line-height: 30px;
      color: #545c69;
      font-weight: 500;
    }
    .btn {
      background: #2d3346;
      border-radius: 5px;
      cursor: pointer;
      outline: none;
      border: none;
      color: #eee;
      font-weight: 800;
      font-size: 20px;
      padding: 1rem;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="brand-name">Venue Pod</div>
  <div id="container">
    <div class="product-details">
      <h1>Hey there!</h1>
      <p class="information">
        It looks like someone submitted a request to reset your password. If
        it was't you there's nothing to worry about. You can ignore this mail.
      </p>
      <p>
        If this was you, follow the link below to reset your password and get
        back into your account.
      </p>`;

const setMail = (email, subject, link) => {
  html += `<div class="control">
          <a href="${link}"><button class="btn">Reset Password</button></a>
        </div>
      </div>
    </div>
  </body>
</html>`;

  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject,
    html,
  };

  return mailOptions;
};

module.exports = { setMail, transporter };
