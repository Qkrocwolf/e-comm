import { MailerOptions } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

export const getMailerConfig = async (
  config: ConfigService,
): Promise<MailerOptions> => {
  return {
    transport: {
      host: config.get('MAIL_HOST'),
      port: config.get('MAIL_PORT'),
      secure: true,
      auth: {
        user: config.get('MAIL_USER'),
        pass: config.get('MAIL_PASS'),
      },
    },
  };
};
