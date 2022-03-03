import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { service } from '@loopback/core';

import {EmpleadoRepository} from '../repositories';


@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(
  ) {}

  /*
   * Add service methods here
   */
  EnviarNotificacionPorSms(celular: string, nombre: string, correo: string, contraseña: string, msg: string): void {

    const accountSid = 'AC163a902b75294457c71e48c2c04712e1'; // Your Account SID from www.twilio.com/console
    const authToken = 'ab2f2123919dd008cccf1c483b041a5b'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
      .create({
        body: `Hola ${nombre} bienvenido a TeamNetwork su correo es: ${correo} y su contraseña es: ${contraseña} \n ${msg}`,
        to: `+57${celular}`, // Text this number
        from: '+12517147462', // From a valid Twilio number
      })
      .then((message:any) => console.log(message.sid));
  }

  EnviarNotificacionPorCorreo(nombre: string, correo: string, contraseña: string, msg: string): void {
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'thexone1526@gmail.com',
        pass: 'wbnapqfxqnlqmdqv'
      },
      tls: {
        rejectUnauthorized: false
    }
    })

    let mailOptions = {
      from: 'Remitente', // sender address
      to: "" + correo, // list of receivers
      subject: "Correo enviado por TeamNetwork", // Subject line
      text: `Hola ${nombre} bienvenido a TeamNetwork su correo es: ${correo} y su contraseña es: ${contraseña} \n ${msg}`, // plain text body
    };

    transporter.sendMail(mailOptions, (err: string):void => {
      if(err) {
        console.log(err)
      }
      else{
        console.log('Email enviado')
      }
    });
  }
}
