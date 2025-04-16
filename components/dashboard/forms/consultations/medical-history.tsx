"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

 export type MedicalEvent = {
   id: string;
   type: string;
   description: string;
   year: string;
   treatment: string;
 }

interface MedicalHistoryProps {
  formData: {
    medicalEvents: MedicalEvent[];
    familyHistory: string;
    allergies: string;
  };
  updateFormData: (data: Partial<{
    medicalEvents: MedicalEvent[];
    familyHistory: string;
    allergies: string;
  }>) => void;
}
export default function MedicalHistory({ formData, updateFormData }: MedicalHistoryProps) {
  //const [medicalEvents, setMedicalEvents] = useState<MedicalEvent[]>([])
  const [newEvent, setNewEvent] = useState<Partial<MedicalEvent>>({
    type: "",
    description: "",
    year: "",
    treatment: "",
  })

  const handleAddEvent = () => {
    if (newEvent.type && newEvent.description) {
      const event: MedicalEvent = {
        id: Date.now().toString(),
        type: newEvent.type || "",
        description: newEvent.description || "",
        year: newEvent.year || "",
        treatment: newEvent.treatment || "",
      }

      updateFormData({
        medicalEvents: [...formData.medicalEvents, event]
      });
      setNewEvent({
        type: "",
        description: "",
        year: "",
        treatment: "",
      })
    }
  }

  const handleRemoveEvent = (id: string) => {
    updateFormData({
      medicalEvents: formData.medicalEvents.filter((event) => event.id !== id)
    });
  }
  const handleTextAreaChange = (field: 'familyHistory' | 'allergies', value: string) => {
    updateFormData({ [field]: value });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Antécédents Médicaux</CardTitle>
        <CardDescription>Historique médical du patient et de sa famille</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Antécédents personnels</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType">Type</Label>
                <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Médical</SelectItem>
                    <SelectItem value="surgical">Chirurgical</SelectItem>
                    <SelectItem value="trauma">Traumatique</SelectItem>
                    <SelectItem value="psychiatric">Psychiatrique</SelectItem>
                    <SelectItem value="obstetric">Obstétrique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="eventDescription">Description</Label>
                <Input
                  id="eventDescription"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Description de l'antécédent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventYear">Année</Label>
                <Input
                  id="eventYear"
                  value={newEvent.year}
                  onChange={(e) => setNewEvent({ ...newEvent, year: e.target.value })}
                  placeholder="Année"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventTreatment">Traitement reçu</Label>
              <Input
                id="eventTreatment"
                value={newEvent.treatment}
                onChange={(e) => setNewEvent({ ...newEvent, treatment: e.target.value })}
                placeholder="Traitement reçu pour cet antécédent"
              />
            </div>

            <Button onClick={handleAddEvent} className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Ajouter
            </Button>
          </div>

          {formData.medicalEvents.length > 0 && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Année</TableHead>
                    <TableHead>Traitement</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.medicalEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        {event.type === "medical" && "Médical"}
                        {event.type === "surgical" && "Chirurgical"}
                        {event.type === "trauma" && "Traumatique"}
                        {event.type === "psychiatric" && "Psychiatrique"}
                        {event.type === "obstetric" && "Obstétrique"}
                      </TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>{event.year}</TableCell>
                      <TableCell>{event.treatment}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveEvent(event.id)}>
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
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Antécédents familiaux</h3>

          <div className="space-y-2">
            <Label htmlFor="familyHistory">Antécédents familiaux</Label>
            <Textarea
              id="familyHistory"
              value={formData.familyHistory}
              onChange={(e) => handleTextAreaChange('familyHistory', e.target.value)}
              placeholder="Décrivez les antécédents médicaux familiaux pertinents (parents, fratrie, etc.)"
              className="min-h-[150px]"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Allergies et intolérances</h3>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => handleTextAreaChange('allergies', e.target.value)}
              placeholder="Listez les allergies connues (médicaments, aliments, environnementales...)"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

