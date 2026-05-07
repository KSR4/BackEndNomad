import { Resend } from 'resend';

export class EmailService {
    private resend: Resend;

    constructor() {
        this.resend = new Resend(process.env.RESEND_API_KEY);
    }

    async sendPasswordResetEmail(to: string, token: string): Promise<void> {
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

        try {
            await this.resend.emails.send({
                from: process.env.EMAIL_FROM || 'Nomad <onboarding@resend.dev>',
                to,
                subject: 'Recuperación de contraseña',
                html: `
                    <h1>Recuperación de contraseña</h1>
                    <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                    <a href="${resetUrl}">${resetUrl}</a>
                    <p>Este enlace expirará en 15 minutos.</p>
                    <p>Si no has solicitado este cambio, puedes ignorar este correo.</p>
                `
            });
        } catch (error) {
            throw new Error('No se pudo enviar el email de recuperación');
        }
    }

    async sendVerificationEmail(to: string, token: string): Promise<void> {
        const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;

        try {
            await this.resend.emails.send({
                from: process.env.EMAIL_FROM || 'Nomad <onboarding@resend.dev>',
                to,
                subject: 'Verifica tu cuenta',
                html: `
                    <h1>Bienvenido a Nomad.</h1>
                    <p>Para completar tu registro, por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
                    <a href="${verifyUrl}">${verifyUrl}</a>
                    <p>Este enlace expirará en 24 horas.</p>
                `
            });
        } catch (error) {
            throw new Error('No se pudo enviar el email de verificación');
        }
    }

    async sendPasswordResetConfirmationEmail(to: string): Promise<void> {
        try {
            await this.resend.emails.send({
                from: process.env.EMAIL_FROM || 'Nomad <onboarding@resend.dev>',
                to,
                subject: 'Tu contraseña ha sido cambiada',
                html: `
                    <h1>Hola,</h1>
                    <p>Te confirmamos que la contraseña de tu cuenta en <strong>Nomad</strong> ha sido cambiada correctamente.</p>
                    <p>Si no has sido tú, por favor ponte en contacto con nosotros inmediatamente.</p>
                `
            });
        } catch (error) {
        }
    }
}

