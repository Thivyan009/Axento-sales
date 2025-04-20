"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { OnboardingBusinessForm } from "@/components/onboarding/business-form"
import { OnboardingCustomerForm } from "@/components/onboarding/customer-form"
import { OnboardingIntegrationsForm } from "@/components/onboarding/integrations-form"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    business: {},
    customer: {},
    integrations: {},
  })

  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to Axento Sales</h1>
        <p className="text-muted-foreground mt-2">Let's set up your autonomous sales assistant</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border border-muted bg-background"}`}
            >
              {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
            </div>
            <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Business Info</span>
          </div>
          <div className="h-px w-16 bg-border self-center" />
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border border-muted bg-background"}`}
            >
              {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
            </div>
            <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Customer Profile</span>
          </div>
          <div className="h-px w-16 bg-border self-center" />
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border border-muted bg-background"}`}
            >
              3
            </div>
            <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Integrations</span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Business Information"}
            {step === 2 && "Ideal Customer Profile"}
            {step === 3 && "Connect Your Accounts"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us about your business and sales goals"}
            {step === 2 && "Define your ideal customer profile for targeted outreach"}
            {step === 3 && "Connect your email and lead generation tools"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && <OnboardingBusinessForm onUpdate={(data) => updateFormData("business", data)} />}
          {step === 2 && <OnboardingCustomerForm onUpdate={(data) => updateFormData("customer", data)} />}
          {step === 3 && <OnboardingIntegrationsForm onUpdate={(data) => updateFormData("integrations", data)} />}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {step < 3 ? (
              <>
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
