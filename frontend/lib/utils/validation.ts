import { z } from 'zod'

/**
 * URL Shortener form validation schema
 */
export const urlShortenerSchema = z.object({
  longUrl: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL including http:// or https://'),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, 'Custom alias can only contain letters, numbers, underscores and hyphens')
    .optional(),
  isPasswordProtected: z.boolean().default(false),
  password: z.string().optional(),
  expirationEnabled: z.boolean().default(false),
  expirationDate: z.string().optional(),
})

/**
 * Create Link form validation schema
 */
export const createLinkSchema = z.object({
  longUrl: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL including http:// or https://'),
  customAlias: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/, 'Custom alias can only contain letters, numbers, underscores and hyphens')
    .optional(),
  isPasswordProtected: z.boolean().default(false),
  password: z.string().optional(),
  expirationEnabled: z.boolean().default(false),
  expirationDate: z.date().optional(),
  tags: z.array(z.string()).max(5, 'Maximum 5 tags allowed').default([]),
})

/**
 * Edit Link form validation schema
 */
export const editLinkSchema = z.object({
  longUrl: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL including http:// or https://'),
  customAlias: z
    .string()
    .min(1, 'Custom alias is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Custom alias can only contain letters, numbers, underscores and hyphens'),
  isPasswordProtected: z.boolean().default(false),
  password: z.string().optional(),
  expirationEnabled: z.boolean().default(false),
  expirationDate: z.date().optional(),
  alias: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  enableTracking: z.boolean().default(true),
})

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(true),
})

/**
 * Signup form validation schema
 */
export const signupSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Email is invalid'),
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores and hyphens'
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
})

// Export types for each schema
export type URLShortenerFormValues = z.infer<typeof urlShortenerSchema>
export type CreateLinkFormValues = z.infer<typeof createLinkSchema>
export type EditLinkFormValues = z.infer<typeof editLinkSchema>
export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema> 