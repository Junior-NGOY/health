"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
//import { Separator } from "@/components/ui/separator"
//import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Plus } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

interface PatientBackgroundProps {
  formData: {
    conditions: Array<{ id: string; name: string }>;
    conditionDetails: string;
  };
  updateFormData: (data: Partial<{ 
    conditions: Array<{ id: string; name: string }>;
    conditionDetails: string;
  }>) => void;
}
// Simulated database of conditions
const conditionsDatabase = [
  { id: "1", name: "Tuberculose" },
  { id: "2", name: "VIH/SIDA" },
  { id: "3", name: "Diabète" },
  { id: "4", name: "Hypertension" },
  { id: "5", name: "Asthme" },
  { id: "6", name: "Grossesse" },
  { id: "7", name: "Cancer" },
  { id: "8", name: "Insuffisance rénale" },
  { id: "9", name: "Insuffisance cardiaque" },
  { id: "10", name: "Hépatite" },
  { id: "11", name: "Allergie médicamenteuse" },
  { id: "12", name: "Épilepsie" },
  { id: "13", name: "Drépanocytose" },
  { id: "14", name: "Obésité" },
  { id: "15", name: "Malnutrition" },
]

export default function PatientBackground({ formData, updateFormData }: PatientBackgroundProps) {
 // const [selectedConditions, setSelectedConditions] = useState<{ id: string; name: string }[]>([])
  const [open, setOpen] = useState(false)

  const handleSelectCondition = (condition: { id: string; name: string }) => {
    if (!formData.conditions.some((c) => c.id === condition.id)) {
      updateFormData({
        conditions: [...formData.conditions, condition]
      })
    }
    setOpen(false)
  }

  const handleRemoveCondition = (id: string) => {
    updateFormData({
      conditions: formData.conditions.filter((c) => c.id !== id)
    })
  }
  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      conditionDetails: e.target.value
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Terrain du Patient</CardTitle>
        <CardDescription>Informations sur les conditions médicales préexistantes du patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label>Conditions médicales</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.conditions.map((condition) => (
                <Badge key={condition.id} variant="secondary" className="flex items-center gap-1 px-3 py-1.5">
                  {condition.name}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveCondition(condition.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </Badge>
              ))}
            </div>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une condition médicale
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start" side="bottom">
                <Command>
                  <CommandInput placeholder="Rechercher une condition..." />
                  <CommandList>
                    <CommandEmpty>Aucune condition trouvée.</CommandEmpty>
                    <CommandGroup>
                      {conditionsDatabase.map((condition) => (
                        <CommandItem key={condition.id} onSelect={() => handleSelectCondition(condition)}>
                          {condition.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conditionDetails">Détails sur les conditions</Label>
            <Textarea
              id="conditionDetails"
              value={formData.conditionDetails}
              onChange={handleDetailsChange}
              placeholder="Précisez les détails sur les conditions médicales sélectionnées (durée, sévérité, traitement actuel...)"
              className="min-h-[100px]"
            />
          </div>
        </div>

    {/*     <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Facteurs de risque</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="familyHistory" />
                <label
                  htmlFor="familyHistory"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Antécédents familiaux
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="smoking" />
                <label
                  htmlFor="smoking"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tabagisme
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="alcohol" />
                <label
                  htmlFor="alcohol"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Consommation d'alcool
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="sedentary" />
                <label
                  htmlFor="sedentary"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mode de vie sédentaire
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="poorDiet" />
                <label
                  htmlFor="poorDiet"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Alimentation déséquilibrée
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="stress" />
                <label
                  htmlFor="stress"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Stress chronique
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskFactorsDetails">Détails sur les facteurs de risque</Label>
            <Textarea
              id="riskFactorsDetails"
              placeholder="Précisez les détails sur les facteurs de risque identifiés"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Statut immunitaire</h3>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="vaccinations" />
              <label
                htmlFor="vaccinations"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Vaccinations à jour
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="immunocompromised" />
              <label
                htmlFor="immunocompromised"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Immunodépression
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="immuneDetails">Détails sur le statut immunitaire</Label>
            <Textarea
              id="immuneDetails"
              placeholder="Précisez les détails sur le statut immunitaire du patient"
              className="min-h-[100px]"
            />
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

