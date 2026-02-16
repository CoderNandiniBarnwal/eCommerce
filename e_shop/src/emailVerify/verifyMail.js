// import nodemailer from "nodemailer";
// import dotenv from "dotenv/config";

// export const verifyMail = async (token, email) => {
//   const transport = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.mailUser,
//       pass: process.env.mailPass,
//     },
//   });

//   const configuration = {
//     from: process.env.mailUser,
//     to: email,
//     title: "Token verification",
//     text: `Token verification ${token}`,
//   };

//   transport.sendMail(configuration, function (err, info) {
//     if (err) {
//       console.log("Can't verify mail");
//       throw new Error(err);
//     }
//     console.log("Mail verified successfully");
//     console.log(info);
//   });
// };
import nodemailer from "nodemailer";
import dotenv from "dotenv/config";

export const verifyMail = async (token, email) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
  });
  const configuration = {
    from: process.env.mailUser,
    to: email,
    subject: "Verification",
    // text: `Token verification ${token}`,
    text: `Verify your account: http://localhost:5173/verify?token=${token}`

  };
  transport.sendMail(configuration, function (err, info) {
    if (err) {
      console.log("Can't verify mail");
      throw new Error(err);
    }
    console.log("Mail verified successfully");
    console.log(info);
  });
};
