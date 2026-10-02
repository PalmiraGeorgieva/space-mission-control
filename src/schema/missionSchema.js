import { z } from 'zod';

export const missionSchema = z.object({
    name: z.string().trim().min(3, 'Mission name is required.'),
    type: z.string().trim().min(5, 'Mission type is required.'),

    destination: z.enum(
        ['Moon', 'Mars', 'Earth Orbit', 'Jupiter', 'Deep Space'],
        {
            error: 'Please select a valid destination.',
        }
    ),

    imageUrl: z
        .string()
        .trim()
        .url('Please enter a valid image URL.')
        .refine(
            value =>
                value.startsWith('http://') ||
                value.startsWith('https://'),
            'Image URL must start with http:// or https://.'
        ),

    crew: z.coerce
        .number()
        .min(0, 'Crew cannot be negative.'),

    launchDate: z.string().trim().min(1, 'Launch date is required.'),
    duration: z.string().trim().min(2, 'Duration is required.'),

    description: z
        .string()
        .trim()
        .min(10, 'Description is required.'),
});