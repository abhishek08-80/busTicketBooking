import * as nodemailer from 'nodemailer'
export const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abhishekawins@gmail.com',
    pass: 'fwrz wkpu oori wpny',
  },
})
