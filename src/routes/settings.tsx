import { useState } from "react"

import { createFileRoute, useNavigate } from "@tanstack/react-router"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Separator } from "@/components/ui/separator"

import { Switch } from "@/components/ui/switch"

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
})

function SettingsPage() {
  const navigate = useNavigate()

  const [action, setAction] = useState<"logout" | "delete" | null>(null)

  const [twoStepEnabled, setTwoStepEnabled] = useState(true)

  const [supportAccess, setSupportAccess] = useState(true)

  const handleConfirmAction = () => {
    if (action === "logout") {
    
      navigate({
        to: "/",
      })
    }

    if (action === "delete") {

      console.log("Delete account requested")
    }

    setAction(null)
  }

  return (
    <div className="mx-auto w-full max-w-[1050px]">

      {/* ACCOUNT SETTINGS*/}

      <div className="mb-5">
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          Account Settings
        </h1>
      </div>

      {/*MY PROFILE */}

      <section className="w-full">

        {/* My Profile Heading */}

        <div className="border-b border-border pb-3">
          <h2 className="text-[16px] font-semibold text-foreground">
            My Profile
          </h2>
        </div>

        {/* Profile Content */}

        <div className="pt-5">

          {/* Profile Image */}

          <div className="flex items-center gap-3">

            <Avatar className="size-14 border border-border">

              <AvatarImage
                src="https://i.pravatar.cc/160?img=12"
                alt="Profile picture"
                className="object-cover"
              />

              <AvatarFallback className="bg-[#110E29] text-sm text-white dark:bg-white dark:text-[#110E29]">
                AH
              </AvatarFallback>

            </Avatar>

            <div className="flex items-center gap-2">

              <Button
                size="sm"
                className="h-9 bg-[#131313] px-3.5 text-xs font-medium text-white hover:bg-[#2a2a2a] dark:bg-white dark:text-[#131313] dark:hover:bg-gray-200"
              >
                <span className="mr-1.5 text-base leading-none">
                  +
                </span>

                Change Image
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-9 border-border px-3.5 text-xs font-medium"
              >
                Remove Image
              </Button>

            </div>

          </div>

          {/* Image Help */}

          <p className="mt-2 text-[11px] text-muted-foreground">
            We support PNGs, JPEGs and GIFs under 2MB.
          </p>

          {/* Name Fields */}

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="space-y-1.5">

              <Label
                htmlFor="first-name"
                className="text-[11px] font-medium text-foreground"
              >
                First Name
              </Label>

              <Input
                id="first-name"
                defaultValue="Ali"
                className="h-9 rounded-[4px] border-border text-sm"
              />

            </div>

            <div className="space-y-1.5">

              <Label
                htmlFor="last-name"
                className="text-[11px] font-medium text-foreground"
              >
                Last Name
              </Label>

              <Input
                id="last-name"
                defaultValue="Haider"
                className="h-9 rounded-[4px] border-border text-sm"
              />

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          ACCOUNT SECURITY
      ================================================= */}

      <section className="mt-10 w-full">

        {/* Heading */}

        <div className="border-b border-border pb-3">

          <h2 className="text-[16px] font-semibold text-foreground">
            Account Security
          </h2>

        </div>

        <div className="pt-4">

          {/* =================================================
              EMAI*/}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div className="w-full max-w-[500px] space-y-1.5">

              <Label
                htmlFor="email"
                className="text-[11px] font-medium text-foreground"
              >
                Email
              </Label>

              <Input
                id="email"
                type="email"
                defaultValue="alihaider@gmail.com"
                disabled
                className="h-9 rounded-[4px] border-border bg-muted text-sm"
              />

            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 shrink-0 text-[10px]"
            >
              Change email
            </Button>

          </div>

          {/* PASSWORD*/}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div className="w-full max-w-[500px] space-y-1.5">

              <Label
                htmlFor="password"
                className="text-[11px] font-medium text-foreground"
              >
                Password
              </Label>

              <Input
                id="password"
                type="password"
                defaultValue="password123"
                disabled
                className="h-9 rounded-[4px] border-border bg-muted text-sm"
              />

            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 shrink-0 text-[10px]"
            >
              Change password
            </Button>

          </div>

          {/* 2-STEP VERIFICATION*/}

          <div className="mt-5 flex items-center justify-between gap-4">

            <div>

              <p className="text-[12px] font-medium text-foreground">
                2-Step Verification
              </p>

              <p className="mt-1 max-w-[700px] text-[10px] leading-4 text-muted-foreground">
                Add an additional layer of security to your account during login.
              </p>

            </div>

            <Switch
              checked={twoStepEnabled}
              onCheckedChange={setTwoStepEnabled}
              aria-label="Toggle 2-Step Verification"
            />

          </div>

        </div>

      </section>

      {/* 
          SUPPORT ACCESS*/}

      <section className="mt-8 w-full">

        <div className="border-b border-border pb-3">

          <h2 className="text-[16px] font-semibold text-foreground">
            Support Access
          </h2>

        </div>

        <div className="pt-4">

          <div className="flex items-center justify-between gap-4">      

            <div>

              <p className="text-[12px] font-medium text-foreground">
                Support access
              </p>

              <p className="mt-1 max-w-[750px] text-[10px] leading-4 text-muted-foreground">
                You have granted us access to your account for support purposes until Aug 31, 2023, 9:40 PM.
              </p>

            </div>

            <Switch
              checked={supportAccess}
              onCheckedChange={setSupportAccess}
              aria-label="Toggle support access"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          ACCOUNT ACTIONS
      ================================================= */}

      <section className="mt-8 w-full">

        {/* Logout */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-[12px] font-medium text-foreground">
              Log out of all devices
            </p>

            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
              Log out of all other active sessions on other devices besides this one.
            </p>

          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 shrink-0 text-[10px]"
            onClick={() => setAction("logout")}
          >
            Log out
          </Button>

        </div>

        <Separator className="my-4" />

        {/* Delete Account */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-[12px] font-medium text-destructive">
              Delete my account
            </p>

            <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
              Permanently delete your account and remove access from all workspaces.
            </p>

          </div>

          <Button
            variant="destructive"
            size="sm"
            className="h-8 shrink-0 text-[10px]"
            onClick={() => setAction("delete")}
          >
            Delete Account
          </Button>

        </div>

      </section>

      {/* =================================================
          CONFIRMATION DIALOG
      ================================================= */}

      <Dialog
        open={action !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAction(null)
          }
        }}
      >

        <DialogContent className="sm:max-w-[420px]">

          <DialogHeader>

            <DialogTitle>
              {action === "logout"
                ? "Log out of all devices?"
                : "Delete your account?"}
            </DialogTitle>

            <DialogDescription>
              {action === "logout"
                ? "You will be signed out from all other active sessions."
                : "This action cannot be undone. Your account and workspace access will be permanently removed."}
            </DialogDescription>

          </DialogHeader>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() => setAction(null)}
            >
              Cancel
            </Button>

            <Button
              variant={
                action === "delete"
                  ? "destructive"
                  : "default"
              }
              onClick={handleConfirmAction}
            >
              {action === "logout"
                ? "Log out"
                : "Delete Account"}
            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>

    </div>
  )
}