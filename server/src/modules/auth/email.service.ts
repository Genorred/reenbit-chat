import nodemailer from 'nodemailer';
import config from '../../config/config';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    async sendVerificationEmail(email: string, token: string): Promise<void> {
        const verificationUrl = `${config.clientUrl}/verify-email?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Подтверждение email',
            html: `
                <h1>Подтверждение email</h1>
                <p>Пожалуйста, подтвердите ваш email, перейдя по ссылке:</p>
                <a href="${verificationUrl}">${verificationUrl}</a>
                <p>Ссылка действительна в течение 24 часов.</p>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService(); 