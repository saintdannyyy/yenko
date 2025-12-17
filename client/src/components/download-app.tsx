"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Smartphone, Bell } from "lucide-react"

export function DownloadApp() {
  const [contact, setContact] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setContact("")
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-secondary/20 to-secondary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-20 h-20 rounded-3xl bg-primary mx-auto mb-8 flex items-center justify-center">
          <Smartphone className="w-10 h-10 text-primary-foreground" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance mb-4">
          Get the Yenko App
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Coming soon to Google Play and Apple App Store. Be the first to download when we launch!
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-foreground text-background rounded-xl px-6 py-3 flex items-center gap-3 opacity-60 cursor-not-allowed">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.32 0 .62.1.87.28L18.5 12 5.37 21.72c-.25.18-.55.28-.87.28-.83 0-1.5-.67-1.5-1.5z" />
            </svg>
            <div className="text-left">
              <p className="text-xs opacity-70">Coming soon on</p>
              <p className="font-semibold">Google Play</p>
            </div>
          </div>
          <div className="bg-foreground text-background rounded-xl px-6 py-3 flex items-center gap-3 opacity-60 cursor-not-allowed">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <p className="text-xs opacity-70">Coming soon on</p>
              <p className="font-semibold">App Store</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 sm:p-8 max-w-lg mx-auto border border-border">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <p className="font-semibold text-foreground">Get notified when we launch</p>
          </div>

          {submitted ? (
            <p className="text-green-600 font-medium">Thanks! We'll notify you when the app is ready.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Enter email or phone"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="h-12 rounded-xl flex-1"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-12 px-6"
              >
                Notify Me
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
