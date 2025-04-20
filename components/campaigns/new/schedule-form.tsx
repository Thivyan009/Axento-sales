"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  emailsPerDay: z.number().min(1).max(500),
  startDate: z.date(),
})

export function CampaignScheduleForm({
  data,
  onUpdate,
}: {
  data: { emailsPerDay: number; startDate: Date }
  onUpdate: (data: { emailsPerDay: number; startDate: Date }) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailsPerDay: data?.emailsPerDay || 100,
      startDate: data?.startDate || new Date(),
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid && data.emailsPerDay && data.startDate) {
      onUpdate({
        emailsPerDay: data.emailsPerDay,
        startDate: data.startDate,
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="emailsPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emails Per Day</FormLabel>
              <div className="space-y-4">
                <Slider
                  min={10}
                  max={500}
                  step={10}
                  defaultValue={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">10</span>
                  <FormControl>
                    <Input
                      type="number"
                      className="w-20 text-center"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <span className="text-sm text-muted-foreground">500</span>
                </div>
              </div>
              <FormDescription>
                Set how many emails to send per day. We recommend 100 emails per day for optimal results.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Choose when to start your campaign. You can start immediately or schedule for a future date.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
