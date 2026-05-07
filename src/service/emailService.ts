import nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Configuramos para Gmail usando variables de entorno (.env)
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000
        });
    }

    async sendPasswordResetEmail(to: string, token: string): Promise<void> {
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

        const mailOptions = {
            from: `"Nomad" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Recuperación de contraseña',
            html: `
                <h1>Recuperación de contraseña</h1>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>Este enlace expirará en 15 minutos.</p>
                <p>Si no has solicitado este cambio, puedes ignorar este correo.</p>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error enviando email:', error);
            throw new Error('No se pudo enviar el email de recuperación');
        }
    }

    async sendVerificationEmail(to: string, token: string): Promise<void> {
        const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

        const mailOptions = {
            from: `"Nomad" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Verifica tu cuenta',
            html: `
                <h1>Bienvenido a Nomad.</h1>
                <p>Para completar tu registro, por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
                <a href="${verifyUrl}">${verifyUrl}</a>
                <p>Este enlace expirará en 24 horas.</p>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email de verificación enviado a: ${to}`);
        } catch (error) {
            console.error('Error enviando email de verificación:', error);
            throw new Error('No se pudo enviar el email de verificación');
        }
    }

    async sendPasswordResetConfirmationEmail(to: string): Promise<void> {
        const mailOptions = {
            from: `"Nomad" <${process.env.EMAIL_USER}>`,
            to,
            subject: 'Tu contraseña ha sido cambiada',
            html: `
                <h1>Hola,</h1>
                <p>Te confirmamos que la contraseña de tu cuenta en <strong>Nomad</strong> ha sido cambiada correctamente.</p>
                <p>Si no has sido tú, por favor ponte en contacto con nosotros inmediatamente.</p>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email de confirmación de cambio de contraseña enviado a: ${to}`);
        } catch (error) {
            console.error('Error enviando email de confirmación de cambio de contraseña:', error);
        }
    }
}
