"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const formSchema = z.object({
  roles: z.array(z.string()).min(1, {
    message: "Please add at least one role.",
  }),
  locations: z.array(z.string()).min(1, {
    message: "Please add at least one location.",
  }),
  fundingStage: z.array(z.string()),
  newRole: z.string().optional(),
  newLocation: z.string().optional(),
})

const fundingStages = [
  { id: "pre-seed", label: "Pre-seed" },
  { id: "seed", label: "Seed" },
  { id: "series-a", label: "Series A" },
  { id: "series-b", label: "Series B" },
  { id: "series-c", label: "Series C+" },
  { id: "public", label: "Public" },
  { id: "bootstrapped", label: "Bootstrapped" },
]

export function CampaignLeadForm({
  data,
  onUpdate,
}: {
  data: { roles: string[]; locations: string[]; fundingStage: string[] }
  onUpdate: (data: { roles: string[]; locations: string[]; fundingStage: string[] }) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: data?.roles || [],
      locations: data?.locations || [],
      fundingStage: data?.fundingStage || [],
      newRole: "",
      newLocation: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { newRole, newLocation, ...rest } = values
    onUpdate(rest)
  }

  // Update parent component whenever form values change
  form.watch((data) => {
    if (form.formState.isValid) {
      const { newRole, newLocation, ...rest } = data
      onUpdate(rest as any)
    }
  })

  const addRole = () => {
    const newRole = form.getValues("newRole")
    if (newRole && !form.getValues("roles").includes(newRole)) {
      const updatedRoles = [...form.getValues("roles"), newRole]
      form.setValue("roles", updatedRoles)
      form.setValue("newRole", "")
    }
  }

  const removeRole = (role: string) => {
    const updatedRoles = form.getValues("roles").filter((r) => r !== role)
    form.setValue("roles", updatedRoles)
  }

  const addLocation = () => {
    const newLocation = form.getValues("newLocation")
    if (newLocation && !form.getValues("locations").includes(newLocation)) {
      const updatedLocations = [...form.getValues("locations"), newLocation]
      form.setValue("locations", updatedLocations)
      form.setValue("newLocation", "")
    }
  }

  const removeLocation = (location: string) => {
    const updatedLocations = form.getValues("locations").filter((l) => l !== location)
    form.setValue("locations", updatedLocations)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="roles"
          render={() => (
            <FormItem>
              <FormLabel>Target Roles</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.getValues("roles").map((role) => (
                  <Badge key={role} variant="secondary" className="gap-1">
                    {role}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeRole(role)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {role}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="newRole"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="Add a role (e.g., CTO, VP of Sales)"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addRole()
                          }
                        }}
                      />
                    </FormControl>
                  )}
                />
                <Button type="button" onClick={addRole}>
                  Add
                </Button>
              </div>
              <FormDescription>Add the job titles you want to target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locations"
          render={() => (
            <FormItem>
              <FormLabel>Target Locations</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.getValues("locations").map((location) => (
                  <Badge key={location} variant="secondary" className="gap-1">
                    {location}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => removeLocation(location)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {location}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="newLocation"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        placeholder="Add a location (e.g., San Francisco, New York)"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addLocation()
                          }
                        }}
                      />
                    </FormControl>
                  )}
                />
                <Button type="button" onClick={addLocation}>
                  Add
                </Button>
              </div>
              <FormDescription>Add the locations you want to target.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fundingStage"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Funding Stage</FormLabel>
                <FormDescription>Select the funding stages you want to target.</FormDescription>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {fundingStages.map((stage) => (
                  <FormField
                    key={stage.id}
                    control={form.control}
                    name="fundingStage"
                    render={({ field }) => {
                      return (
                        <FormItem key={stage.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(stage.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, stage.id])
                                  : field.onChange(field.value?.filter((value) => value !== stage.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{stage.label}</FormLabel>
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
