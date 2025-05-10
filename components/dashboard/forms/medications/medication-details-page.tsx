"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Package, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const medication = {
  id: "1",
  name: "Paracétamol",
  genericName: "Acetaminophen",
  form: "Tablet",
  strength: "500mg",
  stock: 150,
  purchasePrice: 0.5,
  sellingPrice: 1.2,
  markupPercentage: 140,
  taxRate: 20,
  description:
    "Le paracétamol est un antalgique (calme la douleur) et un antipyrétique (fait baisser la fièvre). Il est utilisé pour traiter la douleur et/ou la fièvre par exemple en cas de maux de tête, d'état grippal, de douleurs dentaires, de courbatures.",
  dosageInstructions:
    "Adultes et enfants de plus de 15 ans (plus de 50 kg) : 1 à 2 comprimés, 3 fois par jour. Respecter un intervalle d'au moins 4 heures entre les prises. Ne pas dépasser 6 comprimés par jour.",
  sideEffects:
    "Rarement : réactions allergiques, éruption cutanée. Très rarement : réactions cutanées graves, anomalies sanguines (diminution du nombre de certaines cellules du sang).",
  contraindications: "Allergie au paracétamol, insuffisance hépatocellulaire sévère.",
  category: { id: "1", name: "Analgesics" },
  supplier: { id: "1", name: "PharmaSup" },
  createdAt: "2023-05-15T10:30:00Z",
  updatedAt: "2023-06-20T14:45:00Z",
}

// Modifier les props pour recevoir uniquement l'ID
export default function MedicationDetailsClient({ id }: { id: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleEdit = () => {
    router.push(`/dashboard/medications/edit/${id}`)
  }

  const handleAdjustStock = () => {
    router.push(`/dashboard/medications/stock/${id}`)
  }

  const handleDelete = () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false)
      router.push("/medications")
    }, 1000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-4 lg:px-2 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.push("/medications")}>
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{medication.name}</h1>
          <p className="text-muted-foreground">
            {medication.genericName} - {medication.form} {medication.strength}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAdjustStock}>
            <Package className="mr-2 h-4 w-4" />
            Ajuster le stock
          </Button>
          <Button variant="outline" onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce médicament ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Cela supprimera définitivement le médicament {medication.name} de la
                  base de données.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Détails du Médicament</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="pricing">Prix et Stock</TabsTrigger>
                <TabsTrigger value="medical">Médical</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nom Commercial</h3>
                    <p className="text-base">{medication.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nom Générique</h3>
                    <p className="text-base">{medication.genericName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Forme</h3>
                    <p className="text-base">{medication.form}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Dosage</h3>
                    <p className="text-base">{medication.strength}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Catégorie</h3>
                    <p className="text-base">{medication.category.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Fournisseur</h3>
                    <p className="text-base">{medication.supplier.name}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="text-base">{medication.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Prix d&apos;Achat</h3>
                    <p className="text-base">{medication.purchasePrice.toFixed(2)} €</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Marge</h3>
                    <p className="text-base">{medication.markupPercentage}%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Prix de Vente</h3>
                    <p className="text-base">{medication.sellingPrice.toFixed(2)} €</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Stock Actuel</h3>
                    <p className="text-base">
                      {medication.stock > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                        >
                          {medication.stock} en stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          Rupture de stock
                        </Badge>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Taux de TVA</h3>
                    <p className="text-base">{medication.taxRate}%</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Instructions de Dosage</h3>
                  <p className="text-base">{medication.dosageInstructions}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Effets Secondaires</h3>
                  <p className="text-base">{medication.sideEffects}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contre-indications</h3>
                  <p className="text-base">{medication.contraindications}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations Système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
              <p className="text-base font-mono text-xs">{medication.id}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Créé le</h3>
              <p className="text-base">{formatDate(medication.createdAt)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Dernière mise à jour</h3>
              <p className="text-base">{formatDate(medication.updatedAt)}</p>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Valeur du stock</h3>
              <p className="text-xl font-bold mt-1">{(medication.stock * medication.sellingPrice).toFixed(2)} €</p>
              <p className="text-xs text-muted-foreground">
                Prix d&apos;achat: {(medication.stock * medication.purchasePrice).toFixed(2)} €
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
