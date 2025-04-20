"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Campaign name must be at least 2 characters.",
    })
    .max(50, {
      message: "Campaign name must not exceed 50 characters.",
    }),
})

export function CampaignNameForm({ data, onUpdate }: { data: string; onUpdate: (data: string) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values.name)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid) {
      onUpdate(data.name || "")
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input placeholder="Q2 SaaS Outreach" {...field} />
              </FormControl>
              <FormDescription>Choose a descriptive name to easily identify your campaign.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
