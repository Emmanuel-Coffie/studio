'use server';

import { z } from 'zod';
import { portfolioReview } from '@/ai/flows/portfolio-review';

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
        console.log('Form data submitted:');
        console.log('Name:', validatedFields.data.name);
        console.log('Email:', validatedFields.data.email);
        console.log('Message:', validatedFields.data.message);
        
        // Here you would typically integrate with an email service (e.g., SendGrid, Resend)
        // For this example, we'll just simulate a successful submission.
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            message: 'Thank you for your message! I will get back to you soon.',
            success: true,
        };
    } catch (error) {
        console.error('Contact Form Error:', error);
        return {
            message: 'An unexpected error occurred. Please try again later.',
            success: false,
        };
    }
}
