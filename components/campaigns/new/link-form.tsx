"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar, ShoppingCart } from "lucide-react"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  link: z.string().url({
    message: "Please enter a valid URL.",
  }),
})

export function CampaignLinkForm({ data, onUpdate }: { data: string; onUpdate: (data: string) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: data || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values.link)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid) {
      onUpdate(data.link || "")
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="calendar">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar Link</TabsTrigger>
            <TabsTrigger value="product">Product URL</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="pt-4">
            <FormField
              control={form.control}
              name="link"
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
              name="link"
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
