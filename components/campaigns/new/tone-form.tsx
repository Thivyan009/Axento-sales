"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const formSchema = z.object({
  tone: z.enum(["professional", "friendly", "witty"], {
    required_error: "Please select a tone for your emails.",
  }),
})

export function CampaignToneForm({ data, onUpdate }: { data: string; onUpdate: (data: string) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tone: (data as any) || "professional",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values.tone)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid) {
      onUpdate(data.tone || "professional")
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="tone"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel>Email Tone</FormLabel>
              <FormDescription>
                Select the tone that best represents your brand and resonates with your audience.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="professional" className="peer sr-only" id="professional" />
                    </FormControl>
                    <label
                      htmlFor="professional"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M20 7h-3a2 2 0 0 0-2 2v.5"></path>
                          <path d="M15 13v-1"></path>
                          <path d="M4 7h11"></path>
                          <path d="M9 11V7"></path>
                          <rect x="4" y="11" width="6" height="4" rx="1"></rect>
                          <path d="M4 17h16"></path>
                          <path d="M11 21h6"></path>
                          <path d="M9 21h.01"></path>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Professional</p>
                        <p className="text-sm text-muted-foreground">Formal and business-oriented</p>
                      </div>
                    </label>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="friendly" className="peer sr-only" id="friendly" />
                    </FormControl>
                    <label
                      htmlFor="friendly"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" x2="9.01" y1="9" y2="9"></line>
                          <line x1="15" x2="15.01" y1="9" y2="9"></line>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Friendly</p>
                        <p className="text-sm text-muted-foreground">Warm and conversational</p>
                      </div>
                    </label>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <RadioGroupItem value="witty" className="peer sr-only" id="witty" />
                    </FormControl>
                    <label
                      htmlFor="witty"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 rounded-full bg-primary/10 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M2 12c0-3.5 2.5-6 6.5-6 4 0 6 2.5 6 6 0 3.5-2 6-6 6s-5.5-2.5-6.5-6Z"></path>
                          <path d="M8 9h.01"></path>
                          <path d="M11 9h.01"></path>
                          <path d="M8 13c0 .5.5 1 1.5 1s1.5-.5 1.5-1"></path>
                          <path d="m15.5 9-.5 3h4l-1.5 8h-1"></path>
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Witty</p>
                        <p className="text-sm text-muted-foreground">Clever and humorous</p>
                      </div>
                    </label>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
