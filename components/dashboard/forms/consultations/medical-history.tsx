"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useState } from "react";
import { GynecologicalHistory } from "@/types";

export type MedicalEvent = {
  id: string;
  type: string;
  description: string;
  year: string;
  treatment: string;
};
interface MedicalHistoryProps {
  formData: {
    medicalEvents: MedicalEvent[];
    familyHistory: Array<{
      id: string;
      relationship: string;
      condition: string;
      age: string;
      status: string;
      notes: string;
    }>;
    lifestyle: {
      smoking: {
        status: string;
        quantity: string;
        //duration: string;
        //quitDate: string;
        //packsPerYear: number;
      };
      alcohol: {
       // status: string;
        frequency: string;
        type: string;
       // quantity: string;
      };
      diet: {
        type: string;
        restrictions: string;
        //habits: string;
        //notes: string;
      };
     /*  physicalActivity: {
        frequency: string;
        type: string;
        duration: string;
        intensity: string;
      };
      sleep: {
        quality: string;
        duration: string;
        problems: string;
        notes: string;
      }; */
    };
    allergies: Array<{
      id: string;
      type: string;
      allergen: string;
      reaction: string;
      severity: string;
      //diagnosis: string;
    }>;
    gynecologicalHistory: GynecologicalHistory ;
  };
  updateFormData: (
    data: Partial<{
      medicalEvents: MedicalEvent[];
      familyHistory: Array<{
        id: string;
        relationship: string;
        condition: string;
        age: string;
        status: string;
        notes: string;
      }>;
      lifestyle: {
        smoking: {
          status: string;
          quantity: string;
         // duration: string;
         // quitDate: string;
         // packsPerYear: number;
        };
        alcohol: {
         // status: string;
          frequency: string;
          type: string;
         // quantity: string;
        };
        diet: {
          type: string;
          restrictions: string;
          //habits: string;
          //notes: string;
        };
       /*  physicalActivity: {
          frequency: string;
          type: string;
          duration: string;
          intensity: string;
        };
        sleep: {
          quality: string;
          duration: string;
          problems: string;
          notes: string;
        }; */
      };
      allergies: Array<{
        id: string;
        type: string;
        allergen: string;
        reaction: string;
        severity: string;
        //diagnosis: string;
      }>;
      gynecologicalHistory: GynecologicalHistory;
    }>
  ) => void;
}
export default function MedicalHistory({
  formData,
  updateFormData
}: MedicalHistoryProps) {
  //const [medicalEvents, setMedicalEvents] = useState<MedicalEvent[]>([])
  const [newEvent, setNewEvent] = useState<Partial<MedicalEvent>>({
    type: "",
    description: "",
    year: "",
    treatment: ""
  });

  const handleAddEvent = () => {
    if (newEvent.type && newEvent.description) {
      const event: MedicalEvent = {
        id: Date.now().toString(),
        type: newEvent.type || "",
        description: newEvent.description || "",
        year: newEvent.year || "",
        treatment: newEvent.treatment || ""
      };

      updateFormData({
        medicalEvents: [...formData.medicalEvents, event]
      });
      setNewEvent({
        type: "",
        description: "",
        year: "",
        treatment: ""
      });
    }
  };

  const handleRemoveEvent = (id: string) => {
    updateFormData({
      medicalEvents: formData.medicalEvents.filter((event) => event.id !== id)
    });
  };
  const handleTextAreaChange = (
    field: "familyHistory" | "allergies",
    value: string
  ) => {
    updateFormData({ [field]: value });
  };
  const updateFamilyHistory = (
    updatedHistory: typeof formData.familyHistory
  ) => {
    updateFormData({
      familyHistory: updatedHistory
    });
  };
  const updateLifestyle = (
    section: keyof typeof formData.lifestyle,
    data: Partial<(typeof formData.lifestyle)[typeof section]>
  ) => {
    updateFormData({
      lifestyle: {
        ...formData.lifestyle,
        [section]: {
          ...formData.lifestyle[section],
          ...data
        }
      }
    });
  };
  const updateGynecologicalHistory = (
    updatedHistory: typeof formData.gynecologicalHistory
  ) => {
    updateFormData({
      gynecologicalHistory: updatedHistory
    });
  };
  // De même pour les autres fonctions de mise à jour
  const updateAllergies = (updatedAllergies: typeof formData.allergies) => {
    updateFormData({
      allergies: updatedAllergies
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Antécédents</CardTitle>
        <CardDescription>
          Historique médical du patient et de sa famille
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Antécédents personnels</h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType">Type</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, type: value })
                  }
                >
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
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  placeholder="Description de l'antécédent"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventYear">Année</Label>
                <Input
                  id="eventYear"
                  value={newEvent.year}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, year: e.target.value })
                  }
                  placeholder="Année"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventTreatment">Traitement reçu</Label>
              <Input
                id="eventTreatment"
                value={newEvent.treatment}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, treatment: e.target.value })
                }
                placeholder="Traitement reçu pour cet antécédent"
              />
            </div>

            <Button
              onClick={handleAddEvent}
              className="flex items-center gap-2"
            >
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveEvent(event.id)}
                        >
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
          {/* Antécédents Familiaux */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Antécédents Familiaux</h3>
            <div className="space-y-4">
              {formData.familyHistory.map((history) => (
                <div
                  key={history.id}
                  className="grid grid-cols-2 gap-4 border p-4 rounded-lg"
                >
                  <div className="space-y-2">
                    <Label>Relation</Label>
                    <Input
                      value={history.relationship}
                      onChange={(e) => {
                        const updatedHistory = formData.familyHistory.map((h) =>
                          h.id === history.id
                            ? { ...h, relationship: e.target.value }
                            : h
                        );
                        updateFamilyHistory(updatedHistory);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Condition</Label>
                    <Input
                      value={history.condition}
                      onChange={(e) => {
                        const updatedHistory = formData.familyHistory.map((h) =>
                          h.id === history.id
                            ? { ...h, condition: e.target.value }
                            : h
                        );
                        updateFamilyHistory(updatedHistory);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input
                      value={history.age}
                      onChange={(e) => {
                        const updatedHistory = formData.familyHistory.map((h) =>
                          h.id === history.id
                            ? { ...h, age: e.target.value }
                            : h
                        );
                        updateFamilyHistory(updatedHistory);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Input
                      value={history.status}
                      onChange={(e) => {
                        const updatedHistory = formData.familyHistory.map((h) =>
                          h.id === history.id
                            ? { ...h, status: e.target.value }
                            : h
                        );
                        updateFamilyHistory(updatedHistory);
                      }}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Notes</Label>
                    <Textarea
                      value={history.notes}
                      onChange={(e) => {
                        const updatedHistory = formData.familyHistory.map((h) =>
                          h.id === history.id
                            ? { ...h, notes: e.target.value }
                            : h
                        );
                        updateFamilyHistory(updatedHistory);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Toxico-Allergie</h3>
          {/* Allergies */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Allergies</h3>
            {formData.allergies.map((allergy) => (
              <div
                key={allergy.id}
                className="grid grid-cols-2 gap-4 border p-4 rounded-lg"
              >
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input
                    value={allergy.type}
                    onChange={(e) => {
                      const updatedAllergies = formData.allergies.map((a) =>
                        a.id === allergy.id ? { ...a, type: e.target.value } : a
                      );
                      updateAllergies(updatedAllergies);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Allergène</Label>
                  <Input
                    value={allergy.allergen}
                    onChange={(e) => {
                      const updatedAllergies = formData.allergies.map((a) =>
                        a.id === allergy.id
                          ? { ...a, allergen: e.target.value }
                          : a
                      );
                      updateAllergies(updatedAllergies);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Réaction</Label>
                  <Input
                    value={allergy.reaction}
                    onChange={(e) => {
                      const updatedAllergies = formData.allergies.map((a) =>
                        a.id === allergy.id
                          ? { ...a, reaction: e.target.value }
                          : a
                      );
                      updateAllergies(updatedAllergies);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sévérité</Label>
                  <Input
                    value={allergy.severity}
                    onChange={(e) => {
                      const updatedAllergies = formData.allergies.map((a) =>
                        a.id === allergy.id
                          ? { ...a, severity: e.target.value }
                          : a
                      );
                      updateAllergies(updatedAllergies);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Mode de vie</h3>

            {/* Tabagisme */}
            <div className="space-y-2">
              <Label>Tabagisme</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Statut</Label>
                  <Input
                    value={formData.lifestyle.smoking.status}
                    onChange={(e) =>
                      updateLifestyle("smoking", {
                        ...formData.lifestyle.smoking,
                        status: e.target.value
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantité</Label>
                  <Input
                    value={formData.lifestyle.smoking.quantity}
                    onChange={(e) =>
                      updateLifestyle("smoking", {
                        ...formData.lifestyle.smoking,
                        quantity: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Alcool */}
            <div className="space-y-2">
              <Label>Alcool</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fréquence</Label>
                  <Input
                    value={formData.lifestyle.alcohol.frequency}
                    onChange={(e) =>
                      updateLifestyle("alcohol", {
                        ...formData.lifestyle.alcohol,
                        frequency: e.target.value
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Input
                    value={formData.lifestyle.alcohol.type}
                    onChange={(e) =>
                      updateLifestyle("alcohol", {
                        ...formData.lifestyle.alcohol,
                        type: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Régime alimentaire */}
            <div className="space-y-2">
              <Label>Alimentation</Label>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label>Type de régime</Label>
                  <Input
                    value={formData.lifestyle.diet.type}
                    onChange={(e) =>
                      updateLifestyle("diet", {
                        ...formData.lifestyle.diet,
                        type: e.target.value
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Restrictions</Label>
                  <Textarea
                    value={formData.lifestyle.diet.restrictions}
                    onChange={(e) =>
                      updateLifestyle("diet", {
                        ...formData.lifestyle.diet,
                        restrictions: e.target.value
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {formData.gynecologicalHistory && (
          <>
            <Separator />
            {/* Histoire gynécologique */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Histoire Gynécologique</h3>
              <div className="space-y-2">
                <Label>Antécédents menstruels</Label>
                <Textarea
                  value={formData.gynecologicalHistory.menstrualHistory || ""}
                  onChange={(e) =>
                    updateGynecologicalHistory({
                      ...formData.gynecologicalHistory,
                      menstrualHistory: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </>
        )}

        </div>
      </CardContent>
    </Card>
  );
}
