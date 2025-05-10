"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AdditionalAnamnesisData } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

//import { useState } from "react"
interface AdditionalAnamnesisProps {
  formData: AdditionalAnamnesisData;
  updateFormData: (data: Partial<AdditionalAnamnesisProps["formData"]>) => void;
}

export default function AdditionalAnamnesis({
  formData,
  updateFormData
}: AdditionalAnamnesisProps) {
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

  const updateTravelHistory = (
    updatedTravel: typeof formData.travelHistory
  ) => {
    updateFormData({
      travelHistory: updatedTravel
    });
  };

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ symptoms: e.target.value });
  };

  const handleAggravatingFactorsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateFormData({ aggravatingFactors: e.target.value });
  };

  const handleRelievingFactorsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateFormData({ relievingFactors: e.target.value });
  };

  const handlePreviousTreatmentsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    updateFormData({ previousTreatments: e.target.value });
  };
  const handleSeverityChange = (value: string) => {
    updateFormData({ severity: value });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complément d'Anamnèse</CardTitle>
        <CardDescription>
          {`Informations complémentaires sur l'état de santé général du
          patient`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />

        <div className="space-y-2">
          <Label htmlFor="severity">Sévérité</Label>
          <Select
            onValueChange={handleSeverityChange}
            defaultValue={formData.severity}
          >
            <SelectTrigger id="severity">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mild">Légère</SelectItem>
              <SelectItem value="moderate">Modérée</SelectItem>
              <SelectItem value="severe">Sévère</SelectItem>
              <SelectItem value="critical">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptômes associés</Label>
            <Textarea
              id="symptoms"
              placeholder="Listez les symptômes associés à la maladie actuelle"
              className="min-h-[100px]"
              value={formData.symptoms}
              onChange={handleSymptomsChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aggravatingFactors">Facteurs aggravants</Label>
            <Textarea
              id="aggravatingFactors"
              placeholder="Facteurs qui aggravent les symptômes"
              className="min-h-[80px]"
              value={formData.aggravatingFactors}
              onChange={handleAggravatingFactorsChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relievingFactors">Facteurs soulageants</Label>
            <Textarea
              id="relievingFactors"
              placeholder="Facteurs qui soulagent les symptômes"
              className="min-h-[80px]"
              value={formData.relievingFactors}
              onChange={handleRelievingFactorsChange}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="previousTreatments">
            Traitements antérieurs pour cette maladie
          </Label>
          <Textarea
            id="previousTreatments"
            placeholder="Décrivez les traitements déjà essayés pour cette maladie et leurs résultats"
            className="min-h-[100px]"
            value={formData.previousTreatments}
            onChange={handlePreviousTreatmentsChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
