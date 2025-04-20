"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  emailPitch: z.string().min(20, {
    message: "Email pitch must be at least 20 characters.",
  }),
})

// Sample AI-generated email templates
const aiTemplates = {
  professional: `Dear {{First Name}},

I noticed that {{Company}} has been expanding its operations in the {{Industry}} sector. Our platform has helped similar companies increase their sales efficiency by 35% on average.

Would you be open to a 15-minute call next week to discuss how we might be able to help your team achieve similar results?

Best regards,
{{Your Name}}`,

  friendly: `Hi {{First Name}}!

I was checking out {{Company}}'s recent work in {{Industry}} and was really impressed with what you're doing. We've built a tool that I think could be a perfect fit for your team's needs.

I'd love to show you how it works - maybe we could hop on a quick call next week? I promise to keep it short and focused on what matters to you.

Cheers,
{{Your Name}}`,

  witty: `Hey {{First Name}},

Imagine having a sales team that works 24/7 without needing coffee breaks or vacation time. That's what our AI sales assistant does for companies like {{Company}} in the {{Industry}} space.

Curious? I'd love to give you a quick demo that will either blow your mind or at least give you a 15-minute break from your inbox. How's next Tuesday?

Looking forward,
{{Your Name}}`,
}

export function CampaignEmailForm({ data, onUpdate }: { data: string; onUpdate: (data: string) => void }) {
  const [activeTab, setActiveTab] = useState("write")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailPitch: data || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values.emailPitch)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid) {
      onUpdate(data.emailPitch || "")
    }
  })

  const generateAIEmail = (tone: string) => {
    let template = ""

    if (tone === "professional") {
      template = aiTemplates.professional
    } else if (tone === "friendly") {
      template = aiTemplates.friendly
    } else if (tone === "witty") {
      template = aiTemplates.witty
    }

    form.setValue("emailPitch", template)
    onUpdate(template)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="write" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write">Write Your Own</TabsTrigger>
            <TabsTrigger value="generate">AI-Generated</TabsTrigger>
          </TabsList>
          <TabsContent value="write" className="pt-4">
            <FormField
              control={form.control}
              name="emailPitch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Pitch</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your email pitch here..." className="min-h-[200px]" {...field} />
                  </FormControl>
                  <FormDescription>
                    Write a compelling email that will be sent to your prospects. Use &#123;&#123;First
                    Name&#125;&#125;, &#123;&#123;Company&#125;&#125;, and other placeholders for personalization.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="generate" className="pt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Select a template style</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a template and our AI will generate an email pitch for you
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {["professional", "friendly", "witty"].map((tone) => (
                  <Card
                    key={tone}
                    className="cursor-pointer hover:border-primary"
                    onClick={() => generateAIEmail(tone)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="capitalize">{tone}</h4>
                        <Button size="sm" variant="ghost">
                          <Sparkles className="h-4 w-4 mr-1" />
                          Generate
                        </Button>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {tone === "professional" && "Formal and business-oriented tone"}
                        {tone === "friendly" && "Warm and conversational approach"}
                        {tone === "witty" && "Clever and humorous messaging"}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <FormField
                control={form.control}
                name="emailPitch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Generated Email</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your AI-generated email will appear here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>You can edit this email to better fit your needs.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
