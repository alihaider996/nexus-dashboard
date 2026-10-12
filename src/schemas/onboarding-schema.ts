
import { z } from "zod"

export const onboardingSchema = z.object({
  // Step 1 - Company
  companyType: z
    .string()
    .trim()
    .min(1, "Please select your company type."),

  companySize: z
    .number()
    .int("Company size must be a whole number.")
    .min(1, "Company size must be at least 1.")
    .max(10, "Company size cannot exceed 10."),

  // Step 2 - Services
  services: z
    .array(z.string())
    .min(1, "Please select at least one service."),

  // Step 3 - Contact
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(50, "First name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(50, "Last name cannot exceed 50 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long."),

  phone: z
    .string()
    .regex(
      /^\+92 3\d{2} \d{7}$/,
      "Enter a valid Pakistani mobile number, e.g. +92 300 1234567.",
    ),

  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(500, "Message cannot exceed 500 characters."),
})

export type OnboardingData = z.infer<typeof onboardingSchema>

export const onboardingStepSchemas = {
  company: onboardingSchema.pick({
    companyType: true,
    companySize: true,
  }),

  services: onboardingSchema.pick({
    services: true,
  }),

  contact: onboardingSchema.pick({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    message: true,
  }),
}
