"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react"

import * as Stepperize from "@stepperize/react"

import { cn } from "@/lib/utils"

// -----------------------------------------------------
// Types
// -----------------------------------------------------

type StepperOrientation = "horizontal" | "vertical"

type StepState = "active" | "completed" | "inactive" | "loading"

type StepIndicators = {
  active?: ReactNode
  completed?: ReactNode
  inactive?: ReactNode
  loading?: ReactNode
}

type StepDefinition = {
  id: string
  title?: string
  description?: string
  icon?: ReactElement
}

// -----------------------------------------------------
// Context Types
// -----------------------------------------------------

interface StepperContextValue {
  stepper: Stepperize.Stepper<StepDefinition[]>
  steps: StepDefinition[]
  orientation: StepperOrientation
  configOrientation: StepperOrientation
  responsive?: boolean
  registerTrigger: (
    node: HTMLButtonElement | null,
    remove?: boolean,
  ) => void
  triggerNodes: HTMLButtonElement[]
  focusNext: (currentIndex: number) => void
  focusPrev: (currentIndex: number) => void
  focusFirst: () => void
  focusLast: () => void
  indicators: StepIndicators
}

interface StepItemContextValue {
  step: StepDefinition
  index: number
  state: StepState
  isDisabled: boolean
  isLoading: boolean
}

// -----------------------------------------------------
// Context
// -----------------------------------------------------

const StepperContext = createContext<
  StepperContextValue | undefined
>(undefined)

const StepItemContext = createContext<
  StepItemContextValue | undefined
>(undefined)

// -----------------------------------------------------
// Hooks
// -----------------------------------------------------

function useStepper() {
  const context = useContext(StepperContext)

  if (!context) {
    throw new Error("useStepper must be used within a Stepper")
  }

  return context
}

function useStepItem() {
  const context = useContext(StepItemContext)

  if (!context) {
    throw new Error(
      "useStepItem must be used within a StepperItem",
    )
  }

  return context
}

// -----------------------------------------------------
// Stepper
// -----------------------------------------------------

export interface StepperProps
  extends HTMLAttributes<HTMLDivElement> {
  steps: StepDefinition[]
  defaultValue?: string
  orientation?: StepperOrientation
  responsive?: boolean
  indicators?: StepIndicators
  value?: string
  onValueChange?: (value: string) => void
}

function Stepper({
  steps,
  defaultValue,
  orientation = "horizontal",
  responsive = false,
  className,
  children,
  indicators = {},
  value,
  onValueChange,
  ...props
}: StepperProps) {
  const stepperDefinition = useRef<
    Stepperize.StepperDefinition<StepDefinition[]> | null
  >(null)

  if (stepperDefinition.current === null) {
    stepperDefinition.current = Stepperize.defineStepper(steps)
  }

  const definition = stepperDefinition.current

  if (definition === null) {
    throw new Error("Stepper definition could not be created.")
  }

  const stepper = definition.useStepper({
    defaultStep: defaultValue ?? steps[0]?.id,
  })

  const [triggerNodes, setTriggerNodes] = useState<
    HTMLButtonElement[]
  >([])

  const [isMdUp, setIsMdUp] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : true,
  )

  // ---------------------------------------------------
  // Responsive orientation
  // ---------------------------------------------------

  useEffect(() => {
    if (!responsive) return

    const mediaQuery = window.matchMedia(
      "(min-width: 768px)",
    )

    const handleChange = () => {
      setIsMdUp(mediaQuery.matches)
    }

    handleChange()

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange,
      )
    }
  }, [responsive])

  const effectiveOrientation: StepperOrientation =
    responsive && orientation === "horizontal"
      ? isMdUp
        ? "horizontal"
        : "vertical"
      : orientation

  // ---------------------------------------------------
  // Trigger registration
  // ---------------------------------------------------

  const registerTrigger = useCallback(
    (
      node: HTMLButtonElement | null,
      remove = false,
    ) => {
      setTriggerNodes((previous) => {
        if (!node) {
          return previous
        }

        if (remove) {
          return previous.filter(
            (item) => item !== node,
          )
        }

        return previous.includes(node)
          ? previous
          : [...previous, node]
      })
    },
    [],
  )

  // ---------------------------------------------------
  // Keyboard navigation
  // ---------------------------------------------------

  const focusNext = useCallback(
    (currentIndex: number) => {
      if (!triggerNodes.length) return

      triggerNodes[
        (currentIndex + 1) % triggerNodes.length
      ]?.focus()
    },
    [triggerNodes],
  )

  const focusPrev = useCallback(
    (currentIndex: number) => {
      if (!triggerNodes.length) return

      triggerNodes[
        (currentIndex - 1 + triggerNodes.length) %
          triggerNodes.length
      ]?.focus()
    },
    [triggerNodes],
  )

  const focusFirst = useCallback(() => {
    triggerNodes[0]?.focus()
  }, [triggerNodes])

  const focusLast = useCallback(() => {
    triggerNodes[triggerNodes.length - 1]?.focus()
  }, [triggerNodes])

  // ---------------------------------------------------
  // Controlled value
  // ---------------------------------------------------

  useEffect(() => {
    if (
      typeof value === "string" &&
      value !== stepper.current.id
    ) {
      stepper.goTo(value)
    }
  }, [value, stepper])

  // ---------------------------------------------------
  // Notify parent
  // ---------------------------------------------------

  useEffect(() => {
    onValueChange?.(stepper.current.id)
  }, [stepper.current.id, onValueChange])

  // ---------------------------------------------------
  // Context
  // ---------------------------------------------------

  const contextValue = useMemo(
    () => ({
      stepper,
      steps,
      orientation: effectiveOrientation,
      configOrientation: orientation,
      responsive,
      registerTrigger,
      triggerNodes,
      focusNext,
      focusPrev,
      focusFirst,
      focusLast,
      indicators,
    }),
    [
      stepper,
      steps,
      effectiveOrientation,
      orientation,
      responsive,
      registerTrigger,
      triggerNodes,
      focusNext,
      focusPrev,
      focusFirst,
      focusLast,
      indicators,
    ],
  )

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        role="tablist"
        aria-orientation={effectiveOrientation}
        data-slot="stepper"
        data-orientation={effectiveOrientation}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  )
}

// -----------------------------------------------------
// Stepper Item
// -----------------------------------------------------

export interface StepperItemProps
  extends HTMLAttributes<HTMLDivElement> {
  stepId: string
  completed?: boolean
  disabled?: boolean
  loading?: boolean
}

function StepperItem({
  stepId,
  completed = false,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: StepperItemProps) {
  const { stepper, steps } = useStepper()

  const stepIndex = steps.findIndex(
    (step) => step.id === stepId,
  )

  const currentIndex = steps.findIndex(
    (step) => step.id === stepper.current.id,
  )

  const step = steps.find(
    (item) => item.id === stepId,
  )

  if (!step) {
    return null
  }

  const state: StepState =
    completed || stepIndex < currentIndex
      ? "completed"
      : currentIndex === stepIndex
        ? "active"
        : "inactive"

  const isLoading =
    loading && currentIndex === stepIndex

  return (
    <StepItemContext.Provider
      value={{
        step,
        index: stepIndex,
        state,
        isDisabled: disabled,
        isLoading,
      }}
    >
      <div
        data-slot="stepper-item"
        data-state={state}
        className={cn(
          "group/step flex items-center justify-center not-last:flex-1",
          "group-data-[orientation=horizontal]/stepper-nav:flex-row",
          "group-data-[orientation=vertical]/stepper-nav:flex-col",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepItemContext.Provider>
  )
}

// -----------------------------------------------------
// Stepper Trigger
// -----------------------------------------------------

export interface StepperTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

function StepperTrigger({
  asChild = false,
  className,
  children,
  tabIndex,
  ...props
}: StepperTriggerProps) {
  const { state, isLoading } = useStepItem()

  const {
    stepper,
    registerTrigger,
    triggerNodes,
    focusNext,
    focusPrev,
    focusFirst,
    focusLast,
  } = useStepper()

  const { step, isDisabled } = useStepItem()

  const isSelected =
    stepper.current.id === step.id

  const tabId = `stepper-tab-${step.id}`
  const panelId = `stepper-panel-${step.id}`

  const buttonRef =
    useRef<HTMLButtonElement | null>(null)

  const triggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        buttonRef.current = node
        registerTrigger(node)
      } else if (buttonRef.current) {
        registerTrigger(buttonRef.current, true)
        buttonRef.current = null
      }
    },
    [registerTrigger],
  )

  const myIndex = triggerNodes.findIndex(
    (node) => node === buttonRef.current,
  )

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault()

        if (myIndex !== -1) {
          focusNext(myIndex)
        }

        break

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault()

        if (myIndex !== -1) {
          focusPrev(myIndex)
        }

        break

      case "Home":
        event.preventDefault()
        focusFirst()
        break

      case "End":
        event.preventDefault()
        focusLast()
        break

      case "Enter":
      case " ":
        event.preventDefault()
        stepper.goTo(step.id)
        break
    }
  }

  if (asChild) {
    return (
      <span
        data-slot="stepper-trigger"
        data-state={state}
        className={className}
      >
        {children}
      </span>
    )
  }

  return (
    <button
      ref={triggerRef}
      role="tab"
      id={tabId}
      aria-selected={isSelected}
      aria-controls={panelId}
      tabIndex={
        typeof tabIndex === "number"
          ? tabIndex
          : isSelected
            ? 0
            : -1
      }
      data-slot="stepper-trigger"
      data-state={state}
      data-loading={isLoading}
      className={cn(
        "inline-flex cursor-pointer items-center outline-none",
        "disabled:pointer-events-none disabled:opacity-60",
        "gap-2.5 rounded-full",
        className,
      )}
      onClick={() => stepper.goTo(step.id)}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  )
}

// -----------------------------------------------------
// Stepper Indicator
// -----------------------------------------------------

interface StepperIndicatorProps
  extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline"
}

function StepperIndicator({
  children,
  className,
  variant = "default",
  ...props
}: StepperIndicatorProps) {
  const { state, isLoading, step } =
    useStepItem()

  const { indicators } = useStepper()

  const baseClasses =
    "relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md text-sm font-medium transition-all duration-300"

  const defaultClasses = cn(
    "border-background bg-muted",
    "data-[state=completed]:bg-primary",
    "data-[state=completed]:text-primary-foreground",
    "data-[state=active]:bg-primary",
    "data-[state=active]:text-primary-foreground",
    "group-data-[state=active]/step:ring-primary/30",
    "group-data-[state=active]/step:ring-2",
    "group-data-[state=active]/step:ring-offset-3",
    baseClasses,
  )

  const outlineClasses = cn(
    "border border-primary/20 bg-transparent text-muted-foreground",
    "data-[state=completed]:border-foreground",
    "data-[state=completed]:text-foreground",
    "data-[state=active]:border-primary",
    "data-[state=active]:text-foreground",
    baseClasses,
  )

  const classes =
    variant === "outline"
      ? outlineClasses
      : defaultClasses

  return (
    <div
      data-slot="stepper-indicator"
      data-state={state}
      className={cn(classes, className)}
      {...props}
    >
      <div className="absolute">
        {(
          isLoading
            ? indicators.loading
            : indicators[state]
        ) ??
          (step.icon ? (
            <span className="*:size-4">
              {step.icon}
            </span>
          ) : (
            children
          ))}
      </div>
    </div>
  )
}

// -----------------------------------------------------
// Separator
// -----------------------------------------------------

function StepperSeparator({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  const { state } = useStepItem()

  return (
    <div
      data-slot="stepper-separator"
      data-state={state}
      className={cn(
        "m-2 rounded-sm bg-muted transition-colors duration-500",
        "group-data-[state=completed]/step:bg-primary",
        "group-data-[orientation=horizontal]/stepper-nav:h-0.5",
        "group-data-[orientation=horizontal]/stepper-nav:flex-1",
        "group-data-[orientation=vertical]/stepper-nav:h-12",
        "group-data-[orientation=vertical]/stepper-nav:w-0.5",
        className,
      )}
    />
  )
}

// -----------------------------------------------------
// Title
// -----------------------------------------------------

function StepperTitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  const { state } = useStepItem()

  return (
    <h3
      data-slot="stepper-title"
      data-state={state}
      className={cn(
        "text-sm font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

// -----------------------------------------------------
// Description
// -----------------------------------------------------

function StepperDescription({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { state } = useStepItem()

  return (
    <div
      data-slot="stepper-description"
      data-state={state}
      className={cn(
        "text-muted-foreground text-xs font-medium",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// -----------------------------------------------------
// Navigation
// -----------------------------------------------------

function StepperNav({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const {
    stepper,
    orientation,
    configOrientation,
    responsive,
  } = useStepper()

  const responsiveClasses =
    responsive &&
    configOrientation === "horizontal"
      ? "flex-col md:flex-row md:w-full"
      : ""

  return (
    <nav
      data-slot="stepper-nav"
      data-state={stepper.current.id}
      data-orientation={orientation}
      className={cn(
        "group/stepper-nav inline-flex",
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=horizontal]:flex-row",
        "data-[orientation=vertical]:flex-col",
        responsiveClasses,
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  )
}

// -----------------------------------------------------
// Panel
// -----------------------------------------------------

function StepperPanel({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { stepper } = useStepper()

  return (
    <div
      data-slot="stepper-panel"
      data-state={stepper.current.id}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}

// -----------------------------------------------------
// Content
// -----------------------------------------------------

export interface StepperContentProps
  extends HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

function StepperContent({
  value,
  forceMount = false,
  children,
  className,
  ...props
}: StepperContentProps) {
  const { stepper } = useStepper()

  const isActive =
    value === stepper.current.id

  if (!forceMount && !isActive) {
    return null
  }

  return (
    <div
      role="tabpanel"
      id={`stepper-panel-${value}`}
      aria-labelledby={`stepper-tab-${value}`}
      data-slot="stepper-content"
      data-state={stepper.current.id}
      className={cn(
        "w-full",
        className,
        !isActive &&
          forceMount &&
          "hidden",
      )}
      hidden={!isActive && forceMount}
      {...props}
    >
      {children}
    </div>
  )
}

// -----------------------------------------------------
// Exports
// -----------------------------------------------------

export {
  useStepper,
  useStepItem,
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperPanel,
  StepperContent,
  StepperNav,
}