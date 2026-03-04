'use server';

import { z } from 'zod';
import { projectCatalyst, type ProjectCatalystOutput } from '@/ai/flows/project-catalyst';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// AI Project Catalyst Action
const CatalystStateSchema = z.object({
  data: z.any().nullable(),
  message: z.string().nullable(),
  success: z.boolean(),
});

type CatalystState = z.infer<typeof CatalystStateSchema>;

const CatalystFormSchema = z.object({
  projectIdea: z.string().min(20, {
    message: 'Please provide a more detailed idea (min 20 characters).',
  }),
});

export async function getProjectArchitecture(
  prevState: CatalystState,
  formData: FormData
): Promise<CatalystState> {
  const validatedFields = CatalystFormSchema.safeParse({
    projectIdea: formData.get('projectIdea'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      message: validatedFields.error.flatten().fieldErrors.projectIdea?.[0] || "Validation failed.",
      success: false,
    };
  }

  try {
    const result = await projectCatalyst({
      projectIdea: validatedFields.data.projectIdea,
    });
    
    return {
      data: result,
      message: null,
      success: true,
    };
  } catch (error: any) {
    console.error('AI Architect Action Error:', error);
    let userMessage = 'The Architect is busy. Please ensure your GOOGLE_GENAI_API_KEY is set and try again.';
    return {
      data: null,
      message: userMessage,
      success: false,
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
            return {
                message: 'Configuration Error: RESEND_API_KEY is missing.',
                success: false,
            };
        }

        await resend.emails.send({
            from: 'Aura Folio <onboarding@resend.dev>',
            to: 'coffie09emmanuel@gmail.com',
            subject: `New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        return {
            message: 'Message sent successfully!',
            success: true,
        };
    } catch (error: any) {
        return {
            message: `Error: ${error.message || 'Failed to send message.'}`,
            success: false,
        };
    }
}
