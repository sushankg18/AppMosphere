import nodemailer from 'nodemailer'


export const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });