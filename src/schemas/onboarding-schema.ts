import { z } from "zod"

export const onboardingSchema = z.object({

  // Step 1 - Company
  companyType: z
    .string()
    .min(1, "Please select your company type."),

  companySize: z
    .number()
    .min(1, "Company size must be at least 1.")
    .max(1000, "Company size cannot exceed 1000."),

  // Step 2 - Services / 
  services: z
    .array(z.string())
    .min(1, "Please select at least one service."),

  // Step 3 - Contact

  firstName: z
    .string()
    .trim()
    .min(1, "First name is required."),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required."),

  message: z
    .string()
    .trim()
    .min(1, "Message is required."),
})


// TypeScript Data Type


export type OnboardingData =
  z.infer<typeof onboardingSchema>

// Step-wise Validation Schemas

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