"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"


interface TreatmentProps {
  formData: {
    medications: Medication[];
    nonPharmacological: string;
    treatmentPlan: string;
  };
  updateFormData: (data: Partial<{
    medications: Medication[];
    nonPharmacological: string;
    treatmentPlan: string;
  }>) => void;
}
// Simulated database of medications
const medicationsDatabase = [
  { id: "1", name: "Paracétamol", category: "analgesic" },
  { id: "2", name: "Ibuprofène", category: "nsaid" },
  { id: "3", name: "Amoxicilline", category: "antibiotic" },
  { id: "4", name: "Oméprazole", category: "gastro" },
  { id: "5", name: "Amlodipine", category: "cardio" },
  { id: "6", name: "Metformine", category: "diabetes" },
  { id: "7", name: "Salbutamol", category: "respiratory" },
  { id: "8", name: "Prednisone", category: "corticosteroid" },
  { id: "9", name: "Lorazépam", category: "anxiolytic" },
  { id: "10", name: "Lévothyroxine", category: "hormone" },
]

type Medication = {
  id: string
  name: string
  dosage: string
  frequency: string
  duration: string
  route: string
  instructions: string
}

export default function Treatment({ formData, updateFormData }: TreatmentProps) {
  const [open, setOpen] = useState(false)
 // const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    route: "",
    instructions: "",
  })

  const handleSelectMedication = (medication: { id: string; name: string }) => {
    setNewMedication({
      ...newMedication,
      name: medication.name,
    })
    setOpen(false)
  }

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      const medication: Medication = {
        id: Date.now().toString(),
        name: newMedication.name || "",
        dosage: newMedication.dosage || "",
        frequency: newMedication.frequency || "",
        duration: newMedication.duration || "",
        route: newMedication.route || "",
        instructions: newMedication.instructions || "",
      }

      updateFormData({
        medications: [...formData.medications, medication]
      })
      setNewMedication({
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        route: "",
        instructions: "",
      })
    }
  }

  const handleRemoveMedication = (id: string) => {
    updateFormData({
      medications: formData.medications.filter((medication) => medication.id !== id)
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traitement et Prescription</CardTitle>
        <CardDescription>Prescription médicale et plan de traitement</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Médicament</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4" />
                    {newMedication.name || "Rechercher un médicament"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" align="start" side="bottom">
                  <Command>
                    <CommandInput placeholder="Rechercher un médicament..." />
                    <CommandList>
                      <CommandEmpty>Aucun médicament trouvé.</CommandEmpty>
                      <CommandGroup>
                        {medicationsDatabase.map((medication) => (
                          <CommandItem key={medication.id} onSelect={() => handleSelectMedication(medication)}>
                            {medication.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="Ex: 500mg"
                value={newMedication.dosage}
                onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Fréquence</Label>
              <Input
                id="frequency"
                placeholder="Ex: 3 fois par jour"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Durée</Label>
              <Input
                id="duration"
                placeholder="Ex: 7 jours"
                value={newMedication.duration}
                onChange={(e) => setNewMedication({ ...newMedication, duration: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="route">Voie d&apos,administration</Label>
              <Select
                value={newMedication.route}
                onValueChange={(value) => setNewMedication({ ...newMedication, route: value })}
              >
                <SelectTrigger id="route">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oral">Orale</SelectItem>
                  <SelectItem value="iv">Intraveineuse</SelectItem>
                  <SelectItem value="im">Intramusculaire</SelectItem>
                  <SelectItem value="sc">Sous-cutanée</SelectItem>
                  <SelectItem value="topical">Topique</SelectItem>
                  <SelectItem value="inhalation">Inhalation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions spéciales</Label>
            <Textarea
              id="instructions"
              placeholder="Instructions spéciales pour la prise du médicament (ex: à prendre avec de la nourriture)"
              className="min-h-[80px]"
              value={newMedication.instructions}
              onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
            />
          </div>

          <Button
            onClick={handleAddMedication}
            className="flex items-center gap-2"
            disabled={!newMedication.name || !newMedication.dosage || !newMedication.frequency}
          >
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>

        {formData.medications.length > 0 && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médicament</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Fréquence</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Voie</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.medications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell>{medication.name}</TableCell>
                    <TableCell>{medication.dosage}</TableCell>
                    <TableCell>{medication.frequency}</TableCell>
                    <TableCell>{medication.duration}</TableCell>
                    <TableCell>
                      {medication.route === "oral" && "Orale"}
                      {medication.route === "iv" && "Intraveineuse"}
                      {medication.route === "im" && "Intramusculaire"}
                      {medication.route === "sc" && "Sous-cutanée"}
                      {medication.route === "topical" && "Topique"}
                      {medication.route === "inhalation" && "Inhalation"}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveMedication(medication.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Supprimer</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="nonPharmacological">Traitement non pharmacologique</Label>
          <Textarea
            id="nonPharmacological"
            value={formData.nonPharmacological}
            onChange={(e) => updateFormData({ nonPharmacological: e.target.value })}
            placeholder="Décrivez les traitements non pharmacologiques recommandés..."
            className="min-h-[100px]"
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="treatmentPlan">Plan de traitement global</Label>
          <Textarea
            id="treatmentPlan"
            value={formData.treatmentPlan}
            onChange={(e) => updateFormData({ treatmentPlan: e.target.value })}
            placeholder="Décrivez le plan de traitement global..."
            className="min-h-[150px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}

