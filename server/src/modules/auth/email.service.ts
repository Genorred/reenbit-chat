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
            subject: '    \n' +
                'Email address confirmation',
            html: `
                <h1>Email confirmation</h1>
                <p>Please confirm your email by clicking on the link:</p>
                <a href="${verificationUrl}">${verificationUrl}</a>
                <p>The link is valid for 24 hours.</p>
            `
        };

        await this.transporter.sendMail(mailOptions);
    }
}

export const emailService = new EmailService(); 