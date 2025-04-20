"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Mail, Key, Calendar, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  emailProvider: z.enum(["gmail", "outlook"], {
    required_error: "Please select an email provider.",
  }),
  apolloApiKey: z.string().min(10, {
    message: "API key must be at least 10 characters.",
  }),
  calendarLink: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  productUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
})

export function OnboardingIntegrationsForm({ onUpdate }: { onUpdate: (data: any) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailProvider: "gmail",
      apolloApiKey: "",
      calendarLink: "",
      productUrl: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid) {
      onUpdate(data)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <h3 className="text-lg font-medium">Email Integration</h3>
            <p className="text-sm text-muted-foreground">Connect your email account to send automated emails.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={form.getValues("emailProvider") === "gmail" ? "default" : "outline"}
              className="justify-start gap-2 h-20"
              onClick={() => form.setValue("emailProvider", "gmail")}
            >
              <Mail className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span>Gmail</span>
                <span className="text-xs text-muted-foreground">Connect with Google</span>
              </div>
            </Button>

            <Button
              type="button"
              variant={form.getValues("emailProvider") === "outlook" ? "default" : "outline"}
              className="justify-start gap-2 h-20"
              onClick={() => form.setValue("emailProvider", "outlook")}
            >
              <Mail className="h-5 w-5" />
              <div className="flex flex-col items-start">
                <span>Outlook</span>
                <span className="text-xs text-muted-foreground">Connect with Microsoft</span>
              </div>
            </Button>
          </div>

          <Button className="w-full" variant="outline">
            Connect {form.getValues("emailProvider") === "gmail" ? "Gmail" : "Outlook"}
          </Button>
        </div>

        <FormField
          control={form.control}
          name="apolloApiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apollo.io API Key</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <Key className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input className="rounded-l-none" placeholder="Enter your Apollo.io API key" {...field} />
                </div>
              </FormControl>
              <FormDescription>We'll use this to find and contact your ideal customers.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar Link</TabsTrigger>
            <TabsTrigger value="product">Product URL</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="pt-4">
            <FormField
              control={form.control}
              name="calendarLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cal.com or Calendly Link</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input className="rounded-l-none" placeholder="https://cal.com/yourusername" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>For booking meetings with interested prospects.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          <TabsContent value="product" className="pt-4">
            <FormField
              control={form.control}
              name="productUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product or Checkout URL</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input className="rounded-l-none" placeholder="https://yourproduct.com/checkout" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>Where prospects can purchase your product.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
