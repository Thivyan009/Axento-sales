"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Check, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CampaignNameForm } from "@/components/campaigns/new/name-form"
import { CampaignToneForm } from "@/components/campaigns/new/tone-form"
import { CampaignEmailForm } from "@/components/campaigns/new/email-form"
import { CampaignScheduleForm } from "@/components/campaigns/new/schedule-form"
import { CampaignLeadForm } from "@/components/campaigns/new/lead-form"
import { CampaignReview } from "@/components/campaigns/new/review"

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    tone: "professional",
    emailPitch: "",
    schedule: {
      emailsPerDay: 100,
      startDate: new Date(),
    },
    leadFilters: {
      roles: [],
      locations: [],
      fundingStage: [],
    },
    link: "",
  })

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1)
    } else {
      // Submit the form and redirect
      router.push("/campaigns")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const steps = [
    { title: "Campaign Name", description: "Name your campaign" },
    { title: "Tone Selection", description: "Choose your email tone" },
    { title: "Email Pitch", description: "Write or generate your email pitch" },
    { title: "Schedule", description: "Set your campaign schedule" },
    { title: "Lead Filters", description: "Define your target audience" },
    { title: "Review & Launch", description: "Review and launch your campaign" },
  ]

  return (
    <div className="container max-w-4xl py-10">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/campaigns")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Campaigns
      </Button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Campaign</h1>
        <p className="text-muted-foreground mt-2">Set up your automated email campaign in a few simple steps</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step > index + 1 ? "bg-primary text-primary-foreground" : step === index + 1 ? "border-2 border-primary bg-background text-primary" : "border border-muted bg-background"}`}
              >
                {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className={`mt-2 text-xs ${step === index + 1 ? "font-medium" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[step - 1].title}</CardTitle>
          <CardDescription>{steps[step - 1].description}</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <CampaignNameForm data={formData.name} onUpdate={(data) => updateFormData("name", data)} />}
          {step === 2 && <CampaignToneForm data={formData.tone} onUpdate={(data) => updateFormData("tone", data)} />}
          {step === 3 && (
            <CampaignEmailForm data={formData.emailPitch} onUpdate={(data) => updateFormData("emailPitch", data)} />
          )}
          {step === 4 && (
            <CampaignScheduleForm data={formData.schedule} onUpdate={(data) => updateFormData("schedule", data)} />
          )}
          {step === 5 && (
            <CampaignLeadForm data={formData.leadFilters} onUpdate={(data) => updateFormData("leadFilters", data)} />
          )}
          {step === 6 && <CampaignReview data={formData} />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {step < 6 ? (
              <>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Launch Campaign"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
