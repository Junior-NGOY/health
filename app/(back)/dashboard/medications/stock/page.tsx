/* "use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const medication = {
  id: "1",
  name: "Paracétamol",
  genericName: "Acetaminophen",
  form: "Tablet",
  strength: "500mg",
  stock: 150,
}

const formSchema = z.object({
  adjustmentType: z.enum(["add", "remove"]),
  quantity: z.coerce.number().min(1, {
    message: "La quantité doit être au moins 1.",
  }),
  reason: z.string().min(3, {
    message: "La raison doit contenir au moins 3 caractères.",
  }),
})

export default function AdjustStockPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adjustmentType: "add",
      quantity: 1,
      reason: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Here you would normally call your API
    console.log(values)

    // Calculate the actual adjustment value (positive or negative)
    const adjustment = values.adjustmentType === "add" ? values.quantity : -values.quantity

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(`/medications/${params.id}`)
    }, 1000)
  }
  // Add useEffect to handle client-side mounting
  useEffect(() => {
    setIsClient(true)
  }, [])
    // Don't render until client-side hydration is complete
    if (!isClient) {
      return null; // or a loading skeleton
    }
  return (
    <div className="container mx-auto py-6 px-4 md:px-4 lg:px-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => router.push(`/dashboard/medications/${params.id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Ajuster le Stock</h1>
          <p className="text-muted-foreground">
            {medication.name} - {medication.genericName} ({medication.form} {medication.strength})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Ajustement du Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">Stock Actuel:</div>
                  <Badge
                    variant="outline"
                    className="text-lg bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                  >
                    {medication.stock} unités
                  </Badge>
                </div>

                <FormField
                  control={form.control}
                  name="adjustmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d&apos;Ajustement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type d'ajustement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="add">Ajouter au stock</SelectItem>
                          <SelectItem value="remove">Retirer du stock</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantité</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nombre d&apos;unités à {form.watch("adjustmentType") === "add" ? "ajouter" : "retirer"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raison de l&apos;Ajustement</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Expliquez la raison de cet ajustement..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Par exemple: nouvelle livraison, inventaire, perte, expiration...
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.push(`/medications/${params.id}`)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer l&apos;ajustement
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Utilisez ce formulaire pour ajuster le stock du médicament. Vous pouvez ajouter ou retirer des unités du
              stock.
            </p>

            <div className="p-4 bg-amber-50 text-amber-800 rounded-lg">
              <h3 className="font-semibold">Remarque</h3>
              <p className="text-sm mt-1">
                Tous les ajustements de stock sont enregistrés dans l&apos;historique du système pour des raisons de
                traçabilité et d&apos;audit.
              </p>
            </div>

            <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
              <h3 className="font-semibold">Conseil</h3>
              <p className="text-sm mt-1">
                Pour les ajustements liés à des ventes ou des prescriptions, utilisez plutôt les modules correspondants
                qui mettront automatiquement à jour le stock.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
 */
"use client"
 export default function page() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-4 lg:px-2 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Ajuster le Stock</h1>
      <p className="text-muted-foreground">Cette page est en cours de développement.</p>
    </div>
  ) }