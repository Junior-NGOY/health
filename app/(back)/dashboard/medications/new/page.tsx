"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createMedication } from "@/actions/medications"
import toast from "react-hot-toast"
import { getAllCategories } from "@/actions/medication-categories"
import { Category } from "@/types"



const suppliers = [
  { id: "1", name: "PharmaSup" },
  { id: "2", name: "MediSource" },
  { id: "3", name: "HealthDirect" },
]

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  genericName: z.string().min(2, {
    message: "Le nom générique doit contenir au moins 2 caractères.",
  }),
  form: z.string().min(1, {
    message: "Veuillez sélectionner une forme.",
  }),
  strength: z.string().min(1, {
    message: "Veuillez indiquer le dosage.",
  }),
  categoryId: z.string().min(1, {
    message: "Veuillez sélectionner une catégorie.",
  }),
  supplierId: z.string().optional(),
  purchasePrice: z.coerce.number().min(0, {
    message: "Le prix d'achat doit être un nombre positif.",
  }),
  unitPrice: z.coerce.number().min(0, {
    message: "Le prix unitaire doit être un nombre positif.",
  }),
  markupPercentage: z.coerce.number().min(0, {
    message: "La marge doit être un nombre positif.",
  }),
  sellingPrice: z.coerce
    .number()
    .min(0, {
      message: "Le prix de vente doit être un nombre positif.",
    })
    .optional(),
  stock: z.coerce.number().min(0, {
    message: "Le stock doit être un nombre positif.",
  }),
  taxRate: z.coerce.number().min(0, {
    message: "Le taux de TVA doit être un nombre positif.",
  }),
  description: z.string().optional(),
  dosageInstructions: z.string().optional(),
  sideEffects: z.string().optional(),
  contraindications: z.string().optional(),
})

export default function CreateMedicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      genericName: "",
      form: "",
      strength: "",
      categoryId: "",
      supplierId: "",
      purchasePrice: 0,
      unitPrice: 0,
      markupPercentage: 20,
      sellingPrice: 0,
      stock: 0,
      taxRate: 20,
      description: "",
      //dosageInstructions: "",
      //sideEffects: "",
      //contraindications: "",
    },
  })

  const watchPurchasePrice = form.watch("purchasePrice")
  const watchMarkupPercentage = form.watch("markupPercentage")

  // Calculate selling price when purchase price or markup changes
  const calculateSellingPrice = () => {
    if (watchPurchasePrice && watchMarkupPercentage) {
      const sellingPrice = watchPurchasePrice * (1 + watchMarkupPercentage / 100)
      form.setValue("sellingPrice", Number.parseFloat(sellingPrice.toFixed(2)))
    }
  }

  // Update selling price when purchase price or markup changes
  useState(() => {
    calculateSellingPrice()
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const medicationData = {
        name: values.name,
        genericName: values.genericName,
        form: values.form,
        strength: values.strength,
        categoryId: values.categoryId,
        supplierId:   undefined,
       // supplierId: values.supplierId || undefined,
        purchasePrice: values.purchasePrice,
        markupPercentage: values.markupPercentage,
        description: values.description,
       // fabricant: values.fabricant,
        stock: values.stock,
        unitPrice: values.purchasePrice, // Map purchasePrice to unitPrice
        sellingPrice: values.sellingPrice || values.purchasePrice * (1 + (values.markupPercentage || 0) / 100),
      }
      await createMedication(medicationData)
      toast.success("Médicament créé avec succès")
      router.push("/dashboard/medications")
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur s'est produite")
    } finally {
      setIsSubmitting(false)
    }
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/dashboard/medications")
    }, 1000)
  }
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error loading categories:', error)
        toast.error("Erreur lors du chargement des catégories")
      } finally {
        setIsLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])
  return (
    <div className="container mx-auto py-6 px-4 md:px-4 lg:px-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/dashboard/medications")}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Ajouter un Médicament</h1>
          <p className="text-muted-foreground">Créez un nouveau médicament dans votre inventaire.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Informations Générales</TabsTrigger>
              <TabsTrigger value="pricing">Prix et Stock</TabsTrigger>
              <TabsTrigger value="medical">Informations Médicales</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Générales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom Commercial</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Doliprane" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="genericName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom Générique</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Paracétamol" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="form"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Forme</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une forme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="TABLET">Comprimé</SelectItem>
                              <SelectItem value="CAPSULE">Gélule</SelectItem>
                              <SelectItem value="SYRUP">Sirop</SelectItem>
                              <SelectItem value="INJECTION">Injectable</SelectItem>
                              <SelectItem value="CREAM">Crème</SelectItem>
                              <SelectItem value="Ointment">Pommade</SelectItem>
                              <SelectItem value="Drops">Gouttes</SelectItem>
                              <SelectItem value="Powder">Poudre</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="strength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dosage</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: 500mg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
    control={form.control}
    name="categoryId"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Catégorie</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

                    <FormField
                      control={form.control}
                      name="supplierId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fournisseur</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un fournisseur" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {suppliers.map((supplier) => (
                                <SelectItem key={supplier.id} value={supplier.id}>
                                  {supplier.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description du médicament..." className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prix et Stock</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="purchasePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix d&apos;Achat (€)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                calculateSellingPrice()
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="markupPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marge (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e)
                                calculateSellingPrice()
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sellingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix de Vente (€)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" min="0" {...field} readOnly className="bg-muted" />
                          </FormControl>
                          <FormDescription>Calculé automatiquement</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock Initial</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Taux de TVA (%)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informations Médicales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="dosageInstructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructions de Dosage</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Instructions de dosage..." className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sideEffects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effets Secondaires</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Effets secondaires potentiels..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contraindications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contre-indications</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Contre-indications..." className="min-h-[100px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/medications")}>
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
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
