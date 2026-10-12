import { useState } from "react"

import { createFileRoute } from "@tanstack/react-router"
import { Check } from "lucide-react"

import {
  Stepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  onboardingSchema,
  onboardingStepSchemas,
  type OnboardingData,
} from "@/schemas/onboarding-schema"

// -----------------------------------------------------
// Steps
// -----------------------------------------------------

const steps = [
  {
    id: "company",
    title: "Company",
    description: "Tell us about your company",
  },
  {
    id: "services",
    title: "What you need",
    description: "Choose what you need help with",
  },
  {
    id: "contact",
    title: "Contact",
    description: "How can we reach you?",
  },
] as const

// -----------------------------------------------------
// Company Types
// -----------------------------------------------------

const companyTypes = [
  "Tech Startup",
  "Software Agency",
  "Design Agency",
  "Freelancer",
  "Solopreneur",
  "eCommerce Business",
  "Consulting Firm",
  "VC Firm",
  "University",
  "Tech Enterprise",
  "Pre-seed Startup",
  "Legal Business",
]

// -----------------------------------------------------
// Services
// -----------------------------------------------------

const services = [
  "Website Design",
  "Website Development",
  "UX Research",
  "Content Creation",
  "SEO Optimization",
  "Branding",
  "Mobile App Development",
  "Something Else",
]

// -----------------------------------------------------
// Form Errors
// -----------------------------------------------------

type FormErrors = Partial<
  Record<keyof OnboardingData, string>
>

// -----------------------------------------------------
// Onboarding Page
// -----------------------------------------------------

function OnboardingPage() {
  // ---------------------------------------------------
  // Current Step
  // ---------------------------------------------------

  const [currentStep, setCurrentStep] =
    useState("company")

  // ---------------------------------------------------
  // All Onboarding Data
  // ---------------------------------------------------

  const [formData, setFormData] =
    useState<OnboardingData>({
      companyType: "",
      companySize: 1,
      services: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })

  // ---------------------------------------------------
  // Validation Errors
  // ---------------------------------------------------

  const [errors, setErrors] =
    useState<FormErrors>({})

  // ---------------------------------------------------
  // Update Form Data
  // ---------------------------------------------------

  const updateFormData = <
    K extends keyof OnboardingData,
  >(
    field: K,
    value: OnboardingData[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))

    setErrors((previous) => {
      if (!previous[field]) {
        return previous
      }

      const updatedErrors = {
        ...previous,
      }

      delete updatedErrors[field]

      return updatedErrors
    })
  }

  // ---------------------------------------------------
  // Convert Zod Errors to UI Errors
  // ---------------------------------------------------

  const getFormErrors = (
    issues: {
      path: PropertyKey[]
      message: string
    }[],
  ): FormErrors => {
    const newErrors: FormErrors = {}

    issues.forEach((issue) => {
      const field = issue.path[0]

      if (
        typeof field === "string" &&
        field in formData
      ) {
        const key = field as keyof OnboardingData

        if (!newErrors[key]) {
          newErrors[key] = issue.message
        }
      }
    })

    return newErrors
  }

  // ---------------------------------------------------
  // Validate Current Step
  // ---------------------------------------------------

  const validateStep = (stepId: string) => {
    const schema =
      onboardingStepSchemas[
        stepId as keyof typeof onboardingStepSchemas
      ]

    if (!schema) {
      return true
    }

    const result = schema.safeParse(formData)

    if (result.success) {
      setErrors({})
      return true
    }

    setErrors(
      getFormErrors(result.error.issues),
    )

    return false
  }

  // ---------------------------------------------------
  // Validate Complete Form
  // ---------------------------------------------------

  const validateCompleteForm = () => {
    const result = onboardingSchema.safeParse(
      formData,
    )

    if (result.success) {
      setErrors({})
      return true
    }

    setErrors(
      getFormErrors(result.error.issues),
    )

    return false
  }

  // ---------------------------------------------------
  // Current Step Information


  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep,
  )

  const isFirstStep = currentIndex === 0

  const isLastStep =
    currentIndex === steps.length - 1

  // ---------------------------------------------------
  // Next
  // ---------------------------------------------------

  const handleNext = () => {
    if (isLastStep) {
      return
    }

    const isValid = validateStep(currentStep)

    if (!isValid) {
      return
    }

    setCurrentStep(
      steps[currentIndex + 1].id,
    )
  }

  // ---------------------------------------------------
  // Previous
  // ---------------------------------------------------

  const handlePrevious = () => {
    if (isFirstStep) {
      return
    }

    setCurrentStep(
      steps[currentIndex - 1].id,
    )

    setErrors({})
  }

  // ---------------------------------------------------
  // Toggle Service
  // ---------------------------------------------------

  const toggleService = (service: string) => {
    const alreadySelected =
      formData.services.includes(service)

    const updatedServices = alreadySelected
      ? formData.services.filter(
          (item) => item !== service,
        )
      : [...formData.services, service]

    updateFormData(
      "services",
      updatedServices,
    )
  }

  // ---------------------------------------------------
  // Complete
  // ---------------------------------------------------

  const handleComplete = () => {
    const isValid = validateCompleteForm()

    if (!isValid) {
      return
    }

    console.log(
      "Onboarding completed:",
      formData,
    )
  }

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Page Header */}

      <div className="mb-8 text-center">
        <div className="bg-primary mx-auto mb-4 flex size-10 items-center justify-center rounded-xl text-primary-foreground shadow-sm">
          <span className="text-sm font-bold">
            N
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Let's get to know you
        </h1>

        <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-sm">
          Answer a few questions to help us
          personalize your Nexus experience.
        </p>
      </div>

      {/* Main Card */}

      <div className="rounded-2xl border bg-card shadow-sm">
        <Stepper
          steps={[...steps]}
          value={currentStep}
          onValueChange={setCurrentStep}
          orientation="horizontal"
          responsive
        >
          {/* Step Navigation */}

          <StepperNav className="border-b px-6 py-6 md:px-10">
            {steps.map((step, index) => (
              <StepperItem
                key={step.id}
                stepId={step.id}
                disabled={index > currentIndex}
              >
                <StepperTrigger>
                  <StepperIndicator>
                    {index < currentIndex ? (
                      <Check className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </StepperIndicator>

                  <div className="hidden text-left sm:block">
                    <StepperTitle>
                      {step.title}
                    </StepperTitle>

                    <div className="text-muted-foreground text-xs">
                      {step.description}
                    </div>
                  </div>
                </StepperTrigger>

                {index < steps.length - 1 && (
                  <StepperSeparator />
                )}
              </StepperItem>
            ))}
          </StepperNav>

          {/* Content */}

          <StepperPanel className="px-6 py-8 md:px-10 md:py-10">
            {/* ===================================== */}
            {/* STEP 1 - COMPANY */}
            {/* ===================================== */}

            <StepperContent value="company">
              <div className="mx-auto max-w-3xl space-y-9">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Can you tell us about your company?
                  </h2>

                  <p className="text-muted-foreground mt-2 text-sm">
                    We've worked with small startups
                    and growing businesses.
                  </p>
                </div>

                {/* Company Type */}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold">
                      What kind of company are you?
                    </h3>

                    <p className="text-muted-foreground mt-1 text-xs">
                      Select the option that best
                      describes your company.
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {companyTypes.map((type) => {
                      const selected =
                        formData.companyType === type

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            updateFormData(
                              "companyType",
                              type,
                            )
                          }
                          className={[
                            "group min-h-14 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                            "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            selected
                              ? "border-primary bg-primary/5 text-foreground shadow-sm ring-1 ring-primary/40 dark:bg-primary/10"
                              : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">
                              {type}
                            </span>

                            <span
                              className={[
                                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/30 bg-background group-hover:border-primary/50",
                              ].join(" ")}
                            >
                              {selected && (
                                <Check className="size-3" />
                              )}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {errors.companyType && (
                    <p className="text-destructive text-xs">
                      {errors.companyType}
                    </p>
                  )}
                </div>

                {/* Company Size */}

                <div className="rounded-xl border bg-muted/20 p-5 dark:bg-muted/10">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold">
                        How large is your company?
                      </h3>

                      <p className="text-muted-foreground mt-1 text-xs">
                        Approximately how many people
                        are on your team?
                      </p>
                    </div>

                    <div className="shrink-0 rounded-lg border bg-background px-3 py-1.5 text-sm font-semibold shadow-sm">
                      {formData.companySize}{" "}
                      {formData.companySize === 1
                        ? "person"
                        : "people"}
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={formData.companySize}
                    onChange={(event) =>
                      updateFormData(
                        "companySize",
                        Number(event.target.value),
                      )
                    }
                    className="h-2 w-full cursor-pointer accent-primary"
                    aria-label="Company size"
                  />

                  <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                    <span>1 person</span>
                    <span>10 people</span>
                  </div>

                  {errors.companySize && (
                    <p className="text-destructive mt-2 text-xs">
                      {errors.companySize}
                    </p>
                  )}
                </div>
              </div>
            </StepperContent>

            {/* ===================================== */}
            {/* STEP 2 - SERVICES */}
            {/* ===================================== */}

            <StepperContent value="services">
              <div className="mx-auto max-w-3xl space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    What do you need help with?
                  </h2>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Select all the services that are
                    relevant to you.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => {
                    const selected =
                      formData.services.includes(
                        service,
                      )

                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() =>
                          toggleService(service)
                        }
                        className={[
                          "group rounded-xl border p-5 text-left transition-all duration-200",
                          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                          selected
                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/40 dark:bg-primary/10"
                            : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold">
                              {service}
                            </p>

                            <p className="text-muted-foreground mt-1 text-xs">
                              {selected
                                ? "Selected"
                                : "Click to select"}
                            </p>
                          </div>

                          <span
                            className={[
                              "flex size-5 shrink-0 items-center justify-center rounded border transition-all",
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30 bg-background group-hover:border-primary/50",
                            ].join(" ")}
                          >
                            {selected && (
                              <Check className="size-3" />
                            )}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {errors.services && (
                  <p className="text-destructive text-xs">
                    {errors.services}
                  </p>
                )}
              </div>
            </StepperContent>

            {/* ===================================== */}
            {/* STEP 3 - CONTACT */}
            {/* ===================================== */}

            <StepperContent value="contact">
              <div className="mx-auto max-w-3xl space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    How do we get in touch?
                  </h2>

                  <p className="text-muted-foreground mt-2 text-sm">
                    Leave us your details and we'll
                    reach out to you.
                  </p>
                </div>

                <div
                  autoComplete="off"
                  className="grid gap-5 md:grid-cols-2"
                >
                  {/* First Name */}

                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium"
                    >
                      First name
                    </label>

                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(event) =>
                        updateFormData(
                          "firstName",
                          event.target.value,
                        )
                      }
                      placeholder="Enter first name"
                      autoComplete="off"
                      aria-invalid={
                        !!errors.firstName
                      }
                    />

                    {errors.firstName && (
                      <p className="text-destructive text-xs">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium"
                    >
                      Last name
                    </label>

                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(event) =>
                        updateFormData(
                          "lastName",
                          event.target.value,
                        )
                      }
                      placeholder="Enter last name"
                      autoComplete="off"
                      aria-invalid={
                        !!errors.lastName
                      }
                    />

                    {errors.lastName && (
                      <p className="text-destructive text-xs">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium"
                    >
                      Email
                    </label>

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        updateFormData(
                          "email",
                          event.target.value,
                        )
                      }
                      placeholder="you@example.com"
                      autoComplete="off"
                      aria-invalid={!!errors.email}
                    />

                    {errors.email && (
                      <p className="text-destructive text-xs">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium"
                    >
                      Phone number
                    </label>

                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(event) =>
                        updateFormData(
                          "phone",
                          event.target.value,
                        )
                      }
                      placeholder="+92 300 1234567"
                      autoComplete="off"
                      aria-invalid={!!errors.phone}
                    />

                    {errors.phone && (
                      <p className="text-destructive text-xs">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message */}

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium"
                    >
                      Message
                    </label>

                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(event) =>
                        updateFormData(
                          "message",
                          event.target.value,
                        )
                      }
                      placeholder="Leave us a message..."
                      autoComplete="off"
                      className="min-h-32 resize-none"
                      aria-invalid={
                        !!errors.message
                      }
                    />

                    {errors.message && (
                      <p className="text-destructive text-xs">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </StepperContent>
          </StepperPanel>

          {/* Navigation Buttons */}

          <div className="flex items-center justify-between border-t px-6 py-6 md:px-10">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
              className="min-w-24"
            >
              Go back
            </Button>

            {!isLastStep ? (
              <Button
                type="button"
                onClick={handleNext}
                className="min-w-24"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleComplete}
                className="min-w-24"
              >
                Finish
              </Button>
            )}
          </div>
        </Stepper>
      </div>
    </div>
  )
}

// -----------------------------------------------------
// TanStack Router Route
// -----------------------------------------------------

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
})