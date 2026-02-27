
'use server';

import { z } from 'zod';
import { portfolioReview } from '@/ai/flows/portfolio-review';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// AI Portfolio Review Action
const ReviewStateSchema = z.object({
  feedback: z.string().nullable(),
  suggestions: z.string().nullable(),
  message: z.string().nullable(),
});

type ReviewState = z.infer<typeof ReviewStateSchema>;

const ReviewFormSchema = z.object({
  portfolioDescription: z.string().min(50, {
    message: 'Please provide a description of at least 50 characters.',
  }),
});

export async function getPortfolioReview(
  prevState: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const validatedFields = ReviewFormSchema.safeParse({
    portfolioDescription: formData.get('portfolioDescription'),
  });

  if (!validatedFields.success) {
    return {
      feedback: null,
      suggestions: null,
      message: validatedFields.error.flatten().fieldErrors.portfolioDescription?.[0] || "Validation failed.",
    };
  }

  try {
    const result = await portfolioReview({
      portfolioDescription: validatedFields.data.portfolioDescription,
    });
    return {
      feedback: result.feedback,
      suggestions: result.suggestions,
      message: null,
    };
  } catch (error) {
    console.error('AI Review Error:', error);
    return {
      feedback: null,
      suggestions: null,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}


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

        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing. Emails will not be sent.');
            return {
                message: 'Form submitted successfully, but email sending is currently disabled (missing API key).',
                success: true,
            };
        }

        // 1. Send notification email to the owner
        await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'coffie09emmanuel@gmail.com',
            subject: `Aura Folio: New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        // 2. Send confirmation email to the sender
        await resend.emails.send({
            from: 'Emmanuel Mawutor Coffie <onboarding@resend.dev>',
            to: email,
            subject: 'Thank you for your message!',
            text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nEmmanuel Mawutor Coffie`,
        });

        return {
            message: 'Thank you for your message! I have received it and sent you a confirmation email.',
            success: true,
        };
    } catch (error) {
        console.error('Contact Form Error:', error);
        return {
            message: 'An unexpected error occurred while sending your message. Please try again later.',
            success: false,
        };
    }
}
