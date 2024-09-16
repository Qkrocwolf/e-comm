import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(mail: string, link: string) {
    this.mailService.sendMail({
      from: 'somefullstacktestacc@zohomail.com',
      to: `${mail}`,
      html: `
      <h1><a href="${'http://localhost:3000/api/user/activate/' + link}">Ссылка для активации аккаунта</a></h1>`,
    });
  }
}
