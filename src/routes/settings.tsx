import { createFileRoute } from "@tanstack/react-router"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1050px]">

      {/* ================================================
          ACCOUNT SETTINGS
      ================================================= */}

      <div className="mb-5">
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          Account Settings
        </h1>
      </div>

      {/* ================================================
          MY PROFILE
      ================================================= */}

      <section className="w-full">

        {/* My Profile Heading */}

        <div className="border-b border-border pb-3">
          <h2 className="text-[16px] font-semibold text-foreground">
            My Profile
          </h2>
        </div>

        {/* Profile Content */}

        <div className="pt-5">

          {/* ============================================
              PROFILE IMAGE + BUTTONS
          ============================================= */}

          <div className="flex items-center gap-3">

            {/* Profile Picture */}

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

            {/* Buttons */}

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

          {/* ============================================
              IMAGE HELP TEXT
          ============================================= */}

          <p className="mt-2 text-[11px] text-muted-foreground">
            We support PNGs, JPEGs and GIFs under 2MB.
          </p>

          {/* ============================================
              NAME FIELDS
          ============================================= */}

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* First Name */}

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

            {/* Last Name */}

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

    </div>
  )
}