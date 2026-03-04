'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Contact Form Action
const ContactStateSchema = z.object({
    message: z.string().nullable(),
    success: z.boolean(),
});

type ContactState = z.infer<typeof ContactStateSchema>;

const ContactFormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export async function submitContactForm(
    prevState: ContactState,
    formData: FormData
): Promise<ContactState> {
    const validatedFields = ContactFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
        return {
            message: errorMessages || "Validation failed.",
            success: false,
        };
    }

    try {
        const { name, email, message } = validatedFields.data;

        if (!resend) {
            return {
                message: 'Configuration Error: RESEND_API_KEY is missing.',
                success: false,
            };
        }

        // 1. Send notification to YOU
        await resend.emails.send({
            from: 'Aura Folio <onboarding@resend.dev>',
            to: 'coffie09emmanuel@gmail.com',
            subject: `New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        // 2. Send automated response to THEM
        await resend.emails.send({
            from: 'Emmanuel Coffie <onboarding@resend.dev>',
            to: email,
            subject: 'Thank you for reaching out!',
            text: `Hi ${name},\n\nThank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.\n\nBest regards,\nEmmanuel Mawutor Coffie`,
        });

        return {
            message: 'Message sent successfully! Check your inbox for confirmation.',
            success: true,
        };
    } catch (error: any) {
        return {
            message: `Error: ${error.message || 'Failed to send message.'}`,
            success: false,
        };
    }
}
