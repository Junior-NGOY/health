"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AdditionalAnamnesisData } from "@/types"

import { Input } from "@/components/ui/input"

//import { useState } from "react"
interface AdditionalAnamnesisProps {
  formData: AdditionalAnamnesisData;
  updateFormData: (data: Partial<AdditionalAnamnesisProps['formData']>) => void;
}

export default function AdditionalAnamnesis({ formData, updateFormData }: AdditionalAnamnesisProps) {
  // États pour les nouveaux éléments
/*   const [newFamilyHistory, setNewFamilyHistory] = useState({
    relationship: "",
    condition: "",
    age: "",
    status: "",
    notes: "",
  }); */

 /*  const [newAllergy, setNewAllergy] = useState({
    type: "",
    allergen: "",
    reaction: "",
    severity: "",
    diagnosis: "",
  }); */

  // Gestionnaires d'événements
 /*  const handleAddFamilyHistory = () => {
    if (newFamilyHistory.relationship && newFamilyHistory.condition) {
      const newHistory = {
        id: Date.now().toString(),
        ...newFamilyHistory,
      };
      updateFormData({
        familyHistory: [...formData.familyHistory, newHistory]
      });
      setNewFamilyHistory({
        relationship: "",
        condition: "",
        age: "",
        status: "",
        notes: "",
      });
    }
  }; */

 /*  const handleUpdateLifestyle = (section: keyof typeof formData.lifestyle, field: string, value: string | number) => {
    updateFormData({
      lifestyle: {
        ...formData.lifestyle,
        [section]: {
          ...formData.lifestyle[section],
          [field]: value
        }
      }
    });
  }; */
  const updateLifestyle = (
    section: keyof typeof formData.lifestyle,
    data: Partial<typeof formData.lifestyle[typeof section]>
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
  const handleUpdateSocialHistory = (section: keyof typeof formData.socialHistory, field: string, value: string | string[]) => {
    updateFormData({
      socialHistory: {
        ...formData.socialHistory,
        [section]: {
          ...formData.socialHistory[section],
          [field]: value
        }
      }
    });
  };
  const updateFamilyHistory = (updatedHistory: typeof formData.familyHistory) => {
    updateFormData({
      familyHistory: updatedHistory
    });
  };

  // De même pour les autres fonctions de mise à jour
  const updateAllergies = (updatedAllergies: typeof formData.allergies) => {
    updateFormData({
      allergies: updatedAllergies
    });
  };

  const updateVaccinations = (updatedVaccinations: typeof formData.vaccinations) => {
    updateFormData({
      vaccinations: updatedVaccinations
    });
  };

  const updateTravelHistory = (updatedTravel: typeof formData.travelHistory) => {
    updateFormData({
      travelHistory: updatedTravel
    });
  };

  const updateGynecologicalHistory = (updatedHistory: typeof formData.gynecologicalHistory) => {
    updateFormData({
      gynecologicalHistory: updatedHistory
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complément d&apos;Anamnèse</CardTitle>
        <CardDescription>Informations complémentaires sur l&apos;état de santé général du patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Antécédents Familiaux */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Antécédents Familiaux</h3>
          <div className="space-y-4">
            {formData.familyHistory.map((history) => (
              <div key={history.id} className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
                <div className="space-y-2">
                  <Label>Relation</Label>
                  <Input 
                    value={history.relationship}
                    onChange={(e) => {
                      const updatedHistory = formData.familyHistory.map(h => 
                        h.id === history.id ? { ...h, relationship: e.target.value } : h
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
                      const updatedHistory = formData.familyHistory.map(h => 
                        h.id === history.id ? { ...h, condition: e.target.value } : h
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
                      const updatedHistory = formData.familyHistory.map(h => 
                        h.id === history.id ? { ...h, age: e.target.value } : h
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
                      const updatedHistory = formData.familyHistory.map(h => 
                        h.id === history.id ? { ...h, status: e.target.value } : h
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
                      const updatedHistory = formData.familyHistory.map(h => 
                        h.id === history.id ? { ...h, notes: e.target.value } : h
                      );
                      updateFamilyHistory(updatedHistory);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        <Separator />
  
        {/* Mode de vie */}
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
                  onChange={(e) => updateLifestyle('smoking', { 
                    ...formData.lifestyle.smoking,
                    status: e.target.value 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Quantité</Label>
                <Input 
                  value={formData.lifestyle.smoking.quantity}
                  onChange={(e) => updateLifestyle('smoking', { 
                    ...formData.lifestyle.smoking,
                    quantity: e.target.value 
                  })}
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
                  onChange={(e) => updateLifestyle('alcohol', { 
                    ...formData.lifestyle.alcohol,
                    frequency: e.target.value 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input 
                  value={formData.lifestyle.alcohol.type}
                  onChange={(e) => updateLifestyle('alcohol', { 
                    ...formData.lifestyle.alcohol,
                    type: e.target.value 
                  })}
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
                  onChange={(e) => updateLifestyle('diet', { 
                    ...formData.lifestyle.diet,
                    type: e.target.value 
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Restrictions</Label>
                <Textarea 
                  value={formData.lifestyle.diet.restrictions}
                  onChange={(e) => updateLifestyle('diet', { 
                    ...formData.lifestyle.diet,
                    restrictions: e.target.value 
                  })}
                />
              </div>
            </div>
          </div>
        </div>
  
        <Separator />
  
        {/* Histoire sociale */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Histoire Sociale</h3>
          
          {/* Occupation */}
          <div className="space-y-2">
            <Label>Profession</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Poste actuel</Label>
                <Input 
  value={formData.socialHistory.occupation.current}
  onChange={(e) => handleUpdateSocialHistory('occupation', 'current', e.target.value)}
/>
              </div>
              <div className="space-y-2">
                <Label>Durée</Label>
                <Input 
  value={formData.socialHistory.occupation.current}
  onChange={(e) => handleUpdateSocialHistory('occupation', 'current', e.target.value)}
/>
              </div>
            </div>
          </div>
  
          {/* Conditions de vie */}
          <div className="space-y-2">
            <Label>Conditions de vie</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type de logement</Label>
                <Input 
  value={formData.socialHistory.livingConditions.type}
  onChange={(e) => handleUpdateSocialHistory('livingConditions', 'type', e.target.value)}
/>
              </div>
              <div className="space-y-2">
                <Label>Situation familiale</Label>
                <Input 
  value={formData.socialHistory.livingConditions.household}
  onChange={(e) => handleUpdateSocialHistory('livingConditions', 'household', e.target.value)}
/>
              </div>
            </div>
          </div>
        </div>
  
        <Separator />
  
        {/* Allergies */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Allergies</h3>
          {formData.allergies.map((allergy) => (
            <div key={allergy.id} className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
              <div className="space-y-2">
                <Label>Type</Label>
                <Input 
                  value={allergy.type}
                  onChange={(e) => {
                    const updatedAllergies = formData.allergies.map(a => 
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
                    const updatedAllergies = formData.allergies.map(a => 
                      a.id === allergy.id ? { ...a, allergen: e.target.value } : a
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
                    const updatedAllergies = formData.allergies.map(a => 
                      a.id === allergy.id ? { ...a, reaction: e.target.value } : a
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
                    const updatedAllergies = formData.allergies.map(a => 
                      a.id === allergy.id ? { ...a, severity: e.target.value } : a
                    );
                    updateAllergies(updatedAllergies);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
  
        <Separator />
  
        {/* Vaccinations */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Vaccinations</h3>
          {formData.vaccinations.map((vaccination) => (
            <div key={vaccination.id} className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
              <div className="space-y-2">
                <Label>Nom du vaccin</Label>
                <Input 
                  value={vaccination.name}
                  onChange={(e) => {
                    const updatedVaccinations = formData.vaccinations.map(v => 
                      v.id === vaccination.id ? { ...v, name: e.target.value } : v
                    );
                    updateVaccinations(updatedVaccinations);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date"
                  value={vaccination.date}
                  onChange={(e) => {
                    const updatedVaccinations = formData.vaccinations.map(v => 
                      v.id === vaccination.id ? { ...v, date: e.target.value } : v
                    );
                    updateVaccinations(updatedVaccinations);
                  }}
                />
              </div>
            </div>
          ))}
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
                  onChange={(e) => updateGynecologicalHistory({
                    ...formData.gynecologicalHistory,
                    menstrualHistory: e.target.value
                  })}
                />
              </div>
            </div>
          </>
        )}
  
        <Separator />
  
        {/* Histoire des voyages */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Histoire des Voyages</h3>
          {formData.travelHistory.map((travel) => (
            <div key={travel.id} className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
              <div className="space-y-2">
                <Label>Destination</Label>
                <Input 
                  value={travel.destination}
                  onChange={(e) => {
                    const updatedTravel = formData.travelHistory.map(t => 
                      t.id === travel.id ? { ...t, destination: e.target.value } : t
                    );
                    updateTravelHistory(updatedTravel);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input 
                  type="date"
                  value={travel.date}
                  onChange={(e) => {
                    const updatedTravel = formData.travelHistory.map(t => 
                      t.id === travel.id ? { ...t, date: e.target.value } : t
                    );
                    updateTravelHistory(updatedTravel);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

