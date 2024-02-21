import { createTransport } from 'nodemailer'
import envs from '../../..'
import { firstAccessMailHtml, forgotPasswordMailHtml } from './mail_html'

const transporter = createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false,
  auth: {
    user: envs.MAIL_USER,
    pass: envs.MAIL_PASSWORD
  }
})

export async function sendFirstAccessMail(ra: string, newPassword: string) {
  try {
    const htmlFirstAccessMail = firstAccessMailHtml(newPassword)
    const email = `${ra}@maua.br`
    const mailOptions = {
      from: `"Contato Notemaua" <${envs.MAIL_USER}>`,
      to: email,
      subject: 'Primeiro acesso ao Notemaua!',
      html: htmlFirstAccessMail
    }
  
    console.log('send_mail - [SEND_FIRST_ACCESS_MAIL] - CHEGOU AQUI!')
    console.log('mailOptions - [SEND_FIRST_ACCESS_MAIL] - ', mailOptions)
  
    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent: ' + info.response)

  } catch(error) {
    console.log('send_mail - [SEND_FIRST_ACCESS_MAIL] - ERROR - ', error)
  }
}

export async function sendForgotPasswordMail(email: string, code: string) {
  try {
    const htmlForgotPasswordMail = forgotPasswordMailHtml(code)
    const mailOptions = {
      from: `"Contato Notemaua" <${envs.MAIL_USER}>`,
      to: email,
      subject: 'Recuperação de senha!',
      html: htmlForgotPasswordMail
    }
  
    console.log('send_mail - [SEND_FORGOT_PASSWORD_MAIL] - CHEGOU AQUI!')
    console.log('mailOptions - [SEND_FORGOT_PASSWORD_MAIL] - ', mailOptions)
  
    const info = await transporter.sendMail(mailOptions)

    console.log('Email sent: ' + info.response)

  } catch(error) {
    console.log('send_mail - [SEND_FORGOT_PASSWORD_MAIL] - ERROR - ', error)
  }
}