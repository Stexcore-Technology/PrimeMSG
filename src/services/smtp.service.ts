import { readFileSync } from "fs";
import nodemailer from "nodemailer";
import path from "path";

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string; // Plain text body
  html?: string; // HTML body
}

interface ILoadTemplateTcpSignin {
    template: "tcp-signin",
    username: string,
    link_verification: string,
}

type ILoadTemplate =
    | ILoadTemplateTcpSignin;

export default new class SMTPService {
  private transporter: nodemailer.Transporter;

  constructor() {

    // Settings Client SMTP
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE == "true",
      auth: {
        user: process.env.SMTP_ADDRESS,
        pass: process.env.SMTP_PASSWORD
      },
    });
  }

  // Send Mail
  private async sendMailLogic(options: EmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        ...options,
        from: process.env.SMTP_ADDRESS
      });
      console.log("Email sent: ", info.messageId);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  }

  public sendMail(to: string, settings: ILoadTemplate) {
    const { html, subject } = this.loadTemplate(settings);

    return this.sendMailLogic({ to, subject, html });
  }

  public loadTemplate(settings: ILoadTemplate) {
    let subject: string;

    switch(settings.template) {
        case "tcp-signin":
            subject = "Verify Your Account on PrimeMSG";
            break;

        default:
            throw new Error("Unknow template '" + settings.template + "'");
    }
    
    return {
        ...this.loadTemplateLogic(settings.template, settings as unknown as Record<string, string>),
        subject
    };
  }

  private loadTemplateLogic(filename: string, replacements: Record<string, string>) {
    let templateText = readFileSync(path.join(process.cwd(), "templates", filename + ".html")).toString();
    const data: Record<string, string> = {
        ...replacements,
        current_year: new Date().getFullYear().toString()
    };

    const matched = templateText.match(/\{\{.+\}\}/g);

    if(matched) {
        matched.forEach((value) => {
            const keyname = value.slice(2, -2);
            templateText = templateText.replace(value, data[keyname] ?? null);
        });
    }

    return {
        html: templateText
    }
  }
}
