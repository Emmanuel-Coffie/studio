'use server';

import { z } from 'zod';
import { portfolioReview } from '@/ai/flows/portfolio-review';
import { Resend } from 'resend';

// Safely initialize Resend to avoid crashing if the API key is missing
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
    
    if (!result || !result.feedback) {
        throw new Error('The AI service returned an empty response.');
    }

    return {
      feedback: result.feedback,
      suggestions: result.suggestions,
      message: null,
    };
  } catch (error: any) {
    console.error('AI Review Action Error:', error);
    
    let userMessage = 'The AI is taking a moment to think. Please try again in a few seconds.';
    
    // Extract a more useful error string
    const errorString = error.message || String(error);
    
    if (errorString.includes('API_KEY_INVALID') || errorString.includes('401') || errorString.includes('API key')) {
      userMessage = 'AI service is currently unavailable. Please ensure your GOOGLE_GENAI_API_KEY is correctly set in your environment variables.';
    } else if (errorString.includes('404') || errorString.toLowerCase().includes('not found')) {
      userMessage = `The AI model could not be found. This might be due to regional restrictions or a temporary service issue. Details: ${errorString.substring(0, 100)}`;
    } else if (errorString.includes('SAFETY')) {
      userMessage = 'The AI could not process this description due to safety filters. Please try rephrasing your description.';
    } else {
      userMessage = `AI Error: ${errorString.substring(0, 200)}`;
    }

    return {
      feedback: null,
      suggestions: null,
      message: userMessage,
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

        if (!resend) {
            console.error('RESEND_API_KEY is missing.');
            return {
                message: 'Configuration Error: RESEND_API_KEY is missing. Emails cannot be sent until an API key is provided.',
                success: false,
            };
        }

        // Send notification to you (the portfolio owner)
        const ownerEmailResult = await resend.emails.send({
            from: 'Aura Folio <onboarding@resend.dev>',
            to: 'coffie09emmanuel@gmail.com',
            subject: `New Portfolio Message from ${name}`,
            text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        if (ownerEmailResult.error) {
            throw new Error(`Failed to send notification email: ${ownerEmailResult.error.message}`);
        }

        // Send confirmation back to the visitor
        const visitorEmailResult = await resend.emails.send({
            from: 'Emmanuel Mawutor Coffie <onboarding@resend.dev>',
            to: email,
            subject: 'Thank you for reaching out!',
            text: `Hi ${name},\n\nThank you for contacting me through my portfolio! I've received your message and will get back to you shortly.\n\nBest regards,\nEmmanuel Mawutor Coffie`,
        });

        if (visitorEmailResult.error) {
            console.warn(`Visitor confirmation email could not be sent: ${visitorEmailResult.error.message}`);
        }

        return {
            message: 'Message sent successfully! I will get back to you soon.',
            success: true,
        };
    } catch (error: any) {
        console.error('Contact Form Submission Error:', error);
        return {
            message: `Error: ${error.message || 'An unexpected error occurred while sending your message.'}`,
            success: false,
        };
    }
}
