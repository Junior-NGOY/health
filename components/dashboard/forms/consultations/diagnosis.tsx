"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DiagnosisData } from "@/types";

interface DiagnosisProps {
    formData: DiagnosisData;
    updateFormData: (data: Partial<DiagnosisData>) => void;
}

export default function Diagnosis({ formData, updateFormData }: DiagnosisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnostic</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="mainDiagnosis">Diagnostic principal</Label>
            <Textarea
              id="mainDiagnosis"
              value={formData.mainDiagnosis}
              onChange={(e) =>
                updateFormData({ mainDiagnosis: e.target.value })
              }
              placeholder="Entrez le diagnostic principal"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="certainty">Niveau de certitude</Label>
              <Select
                value={formData.certainty}
                onValueChange={(value) =>
                  updateFormData({
                    certainty: value as "confirmed" | "probable" | "possible",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le niveau de certitude" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmé</SelectItem>
                  <SelectItem value="probable">Probable</SelectItem>
                  <SelectItem value="possible">Possible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Sévérité</Label>
              <Select
                value={formData.severity}
                onValueChange={(value) =>
                  updateFormData({
                    severity: value as "mild" | "moderate" | "severe",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la sévérité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Légère</SelectItem>
                  <SelectItem value="moderate">Modérée</SelectItem>
                  <SelectItem value="severe">Sévère</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryDiagnoses">Diagnostics secondaires</Label>
            <Textarea
              id="secondaryDiagnoses"
              value={formData.secondaryDiagnoses.join("\n")}
              onChange={(e) =>
                updateFormData({
                  secondaryDiagnoses: e.target.value.split("\n"),
                })
              }
              placeholder="Entrez les diagnostics secondaires (un par ligne)"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="differentialDiagnoses">
              Diagnostics différentiels
            </Label>
            <Textarea
              id="differentialDiagnoses"
              value={formData.differentialDiagnoses.join("\n")}
              onChange={(e) =>
                updateFormData({
                  differentialDiagnoses: e.target.value.split("\n"),
                })
              }
              placeholder="Entrez les diagnostics différentiels (un par ligne)"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="notes">Notes et observations</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => updateFormData({ notes: e.target.value })}
              placeholder="Ajoutez des notes ou observations supplémentaires"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}