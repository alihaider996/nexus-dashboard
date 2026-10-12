
import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { InputMask } from "@react-input/mask"
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

type FieldName = keyof OnboardingData

function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState("company")

  const form = useForm({
    defaultValues: {
      companyType: "",
      companySize: 1,
      services: [] as string[],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    } satisfies OnboardingData,

    validators: {
      onSubmit: onboardingSchema,
    },

    onSubmit: async ({ value }) => {
      console.log("Onboarding completed:", value)
    },
  })

  const currentIndex = steps.findIndex(
    (step) => step.id === currentStep,
  )

  const isFirstStep = currentIndex === 0
  const isLastStep = currentIndex === steps.length - 1

  const stepFields: Record<string, FieldName[]> = {
    company: ["companyType", "companySize"],
    services: ["services"],
    contact: [
      "firstName",
      "lastName",
      "email",
      "phone",
      "message",
    ],
  }

  const validateCurrentStep = async () => {
    const fields = stepFields[currentStep]

    const results = await Promise.all(
      fields.map((field) =>
        form.validateField(field, "submit"),
      ),
    )

    return results.every((result) => result.length === 0)
  }

  const handleNext = async () => {
    if (isLastStep) return

    const valid = await validateCurrentStep()

    if (!valid) return

    setCurrentStep(steps[currentIndex + 1].id)
  }

  const handlePrevious = () => {
    if (isFirstStep) return

    setCurrentStep(steps[currentIndex - 1].id)
  }

  const toggleService = (service: string) => {
    const selectedServices = form.getFieldValue("services")

    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((item) => item !== service)
      : [...selectedServices, service]

    form.setFieldValue("services", updatedServices)
  }

  const getError = (errors: unknown[]) => {
    const firstError = errors[0]

    if (typeof firstError === "string") return firstError

    if (
      firstError &&
      typeof firstError === "object" &&
      "message" in firstError
    ) {
      return String(firstError.message)
    }

    return undefined
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <span className="text-sm font-bold">N</span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">
          Let's get to know you
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Answer a few questions to help us personalize your Nexus experience.
        </p>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm">
        <Stepper
          steps={[...steps]}
          value={currentStep}
          onValueChange={setCurrentStep}
          orientation="horizontal"
          responsive
        >
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
                    <StepperTitle>{step.title}</StepperTitle>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </StepperTrigger>

                {index < steps.length - 1 && <StepperSeparator />}
              </StepperItem>
            ))}
          </StepperNav>

          <StepperPanel className="px-6 py-8 md:px-10 md:py-10">
            {/* STEP 1 - COMPANY */}
            <StepperContent value="company">
              <div className="mx-auto max-w-3xl space-y-9">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Can you tell us about your company?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We've worked with small startups and growing businesses.
                  </p>
                </div>

                <form.Field
                  name="companyType"
                  validators={{
                    onSubmit: ({ value }) =>
                      onboardingStepSchemas.company.shape.companyType.safeParse(value)
                        .success
                        ? undefined
                        : "Please select your company type.",
                  }}
                >
                  {(field) => (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold">
                          What kind of company are you?
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Select the option that best describes your company.
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {companyTypes.map((type) => {
                          const selected = field.state.value === type

                          return (
                            <button
                              key={type}
                             type="button"
                              onClick={() => field.handleChange(type)}
                              className={[
                                "group min-h-14 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                selected
                                  ? "border-primary bg-primary/5 text-foreground shadow-sm ring-1 ring-primary/40 dark:bg-primary/10"
                                  : "border-border bg-background hover:border-primary/40 hover:bg-muted/50",
                              ].join(" ")}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-medium">{type}</span>
                                <span
                                  className={[
                                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all",
                                    selected
                                      ? "border-primary bg-primary text-primary-foreground"
                                      : "border-muted-foreground/30 bg-background group-hover:border-primary/50",
                                  ].join(" ")}
                                >
                                  {selected && <Check className="size-3" />}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {field.state.meta.errors.length > 0 && (
                        <p className="text-xs text-destructive">
                          {getError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="companySize"
                  validators={{
                    onSubmit: ({ value }) => {
                      const result =
                        onboardingStepSchemas.company.shape.companySize.safeParse(value)
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message
                    },
                  }}
                >
                  {(field) => (
                    <div className="rounded-xl border bg-muted/20 p-5 dark:bg-muted/10">
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold">
                            How large is your company?
                          </h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Approximately how many people are on your team?
                          </p>
                        </div>

                        <div className="shrink-0 rounded-lg border bg-background px-3 py-1.5 text-sm font-semibold shadow-sm">
                          {field.state.value}{" "}
                          {field.state.value === 1 ? "person" : "people"}
                        </div>
                      </div>

                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(Number(event.target.value))
                        }
                        className="h-2 w-full cursor-pointer accent-primary"
                        aria-label="Company size"
                      />

                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>1 person</span>
                        <span>10 people</span>
                      </div>

                      {field.state.meta.errors.length > 0 && (
                        <p className="mt-2 text-xs text-destructive">
                          {getError(field.state.meta.errors)}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>
            </StepperContent>

            {/* STEP 2 - SERVICES */}
            <StepperContent value="services">
              <div className="mx-auto max-w-3xl space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    What do you need help with?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select all the services that are relevant to you.
                  </p>
                </div>

                <form.Field
                  name="services"
                  validators={{
                    onSubmit: ({ value }) => {
                      const result =
                        onboardingStepSchemas.services.shape.services.safeParse(value)
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message
                    },
                  }}
                >
                  {(field) => (
                    <>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {services.map((service) => {
                          const selected = field.state.value.includes(service)

                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
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
                                  <p className="text-sm font-semibold">{service}</p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {selected ? "Selected" : "Click to select"}
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
                                  {selected && <Check className="size-3" />}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {field.state.meta.errors.length > 0 && (
                        <p className="text-xs text-destructive">
                          {getError(field.state.meta.errors)}
                        </p>
                      )}
                    </>
                  )}
                </form.Field>
              </div>
            </StepperContent>

            {/* STEP 3 - CONTACT */}
            <StepperContent value="contact">
              <div className="mx-auto max-w-3xl space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    How do we get in touch?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Leave us your details and we'll reach out to you.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <form.Field
                    name="firstName"
                    validators={{
                      onSubmit: ({ value }) => {
                        const result =
                          onboardingStepSchemas.contact.shape.firstName.safeParse(value)
                        return result.success
                          ? undefined
                          : result.error.issues[0]?.message
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium">
                          First name
                        </label>
                        <Input
                          id="firstName"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          placeholder="Enter first name"
                          autoComplete="off"
                          aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {getError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="lastName"
                    validators={{
                      onSubmit: ({ value }) => {
                        const result =
                          onboardingStepSchemas.contact.shape.lastName.safeParse(value)
                        return result.success
                          ? undefined
                          : result.error.issues[0]?.message
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium">
                          Last name
                        </label>
                        <Input
                          id="lastName"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          placeholder="Enter last name"
                          autoComplete="off"
                          aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {getError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="email"
                    validators={{
                      onSubmit: ({ value }) => {
                        const result =
                          onboardingStepSchemas.contact.shape.email.safeParse(value)
                        return result.success
                          ? undefined
                          : result.error.issues[0]?.message
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          placeholder="you@example.com"
                          autoComplete="off"
                          aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {getError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="phone"
                    validators={{
                      onSubmit: ({ value }) => {
                        const result =
                          onboardingStepSchemas.contact.shape.phone.safeParse(value)
                        return result.success
                          ? undefined
                          : result.error.issues[0]?.message
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone number
                        </label>
                        <InputMask
                          component={Input}
                          id="phone"
                          name={field.name}
                          type="tel"
                          inputMode="numeric"
                          mask="+92 3__ _______"
                          replacement={{ _: /\d/ }}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => field.handleChange(event.target.value)}
                          placeholder="+92 300 1234567"
                          autoComplete="tel"
                          aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {getError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="message"
                    validators={{
                      onSubmit: ({ value }) => {
                        const result =
                          onboardingStepSchemas.contact.shape.message.safeParse(value)
                        return result.success
                          ? undefined
                          : result.error.issues[0]?.message
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) => {
                            const value = event.target.value
                              .replace(/^\s+/, "")
                              .replace(/ {2,}/g, " ")
                              .slice(0, 500)

                            field.handleChange(value)
                          }}
                          placeholder="Leave us a message..."
                          autoComplete="off"
                          maxLength={500}
                          className="min-h-32 resize-none"
                          aria-invalid={field.state.meta.errors.length > 0}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-xs text-destructive">
                            {getError(field.state.meta.errors)}
                          </p>
                        )}
                      </div>
                    )}
                  </form.Field>
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
                onClick={() => form.handleSubmit()}
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

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
})
