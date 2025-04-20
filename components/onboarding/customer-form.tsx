"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  jobTitles: z.string().min(2, {
    message: "Please enter at least one job title.",
  }),
  industries: z.string().min(2, {
    message: "Please enter at least one industry.",
  }),
  companySize: z.array(z.string()).min(1, {
    message: "Please select at least one company size.",
  }),
  regions: z.array(z.string()).min(1, {
    message: "Please select at least one region.",
  }),
})

const companySizes = [
  { id: "1-10", label: "1-10 employees" },
  { id: "11-50", label: "11-50 employees" },
  { id: "51-200", label: "51-200 employees" },
  { id: "201-500", label: "201-500 employees" },
  { id: "501-1000", label: "501-1000 employees" },
  { id: "1001+", label: "1001+ employees" },
]

const regions = [
  { id: "north-america", label: "North America" },
  { id: "europe", label: "Europe" },
  { id: "asia-pacific", label: "Asia Pacific" },
  { id: "latin-america", label: "Latin America" },
  { id: "middle-east", label: "Middle East & Africa" },
]

export function OnboardingCustomerForm({ onUpdate }: { onUpdate: (data: any) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitles: "",
      industries: "",
      companySize: [],
      regions: [],
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
        <FormField
          control={form.control}
          name="jobTitles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Job Titles</FormLabel>
              <FormControl>
                <Input placeholder="CEO, CTO, VP of Sales (comma separated)" {...field} />
              </FormControl>
              <FormDescription>Enter the job titles of your ideal customers, separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Industries</FormLabel>
              <FormControl>
                <Input placeholder="SaaS, Finance, Healthcare (comma separated)" {...field} />
              </FormControl>
              <FormDescription>Enter the industries your ideal customers work in, separated by commas.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companySize"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Company Size</FormLabel>
                <FormDescription>Select the company sizes you want to target.</FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {companySizes.map((size) => (
                  <FormField
                    key={size.id}
                    control={form.control}
                    name="companySize"
                    render={({ field }) => {
                      return (
                        <FormItem key={size.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(size.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, size.id])
                                  : field.onChange(field.value?.filter((value) => value !== size.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{size.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Target Regions</FormLabel>
                <FormDescription>Select the regions you want to target.</FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {regions.map((region) => (
                  <FormField
                    key={region.id}
                    control={form.control}
                    name="regions"
                    render={({ field }) => {
                      return (
                        <FormItem key={region.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(region.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, region.id])
                                  : field.onChange(field.value?.filter((value) => value !== region.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{region.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
