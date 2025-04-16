"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"


interface RecommendationsProps {
  formData: {
    recommendations: Recommendation[];
    dietaryMeasures: string;
    physicalActivity: string;
    restrictions: string;
    followUp: string;
    additionalNotes: string;
  };
  updateFormData: (data: Partial<RecommendationsProps['formData']>) => void;
}
export type Recommendation = {
  id: string
  type: string
  description: string
}

export default function Recommendations({ formData, updateFormData }: RecommendationsProps) {
  //const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [newRecommendation, setNewRecommendation] = useState<Partial<Recommendation>>({
    type: "",
    description: "",
  })

  const handleAddRecommendation = () => {
    if (newRecommendation.type && newRecommendation.description) {
      const recommendation: Recommendation = {
        id: Date.now().toString(),
        type: newRecommendation.type,
        description: newRecommendation.description,
      }

      updateFormData({
        recommendations: [...formData.recommendations, recommendation]
      })
      setNewRecommendation({
        type: "",
        description: "",
      })
    }
  }

  const handleRemoveRecommendation = (id: string) => {
    updateFormData({
      recommendations: formData.recommendations.filter((rec) => rec.id !== id)
    })
  }
  const handleTextAreaChange = (field: keyof Omit<RecommendationsProps['formData'], 'recommendations'>, value: string) => {
    updateFormData({ [field]: value })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommandations et Conseils</CardTitle>
        <CardDescription>Recommandations, interdictions et mesures hygiéno-diététiques</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recommendationType">Type</Label>
              <Select
                value={newRecommendation.type}
                onValueChange={(value) => setNewRecommendation({ ...newRecommendation, type: value })}
              >
                <SelectTrigger id="recommendationType">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diet">Régime alimentaire</SelectItem>
                  <SelectItem value="activity">Activité physique</SelectItem>
                  <SelectItem value="lifestyle">Mode de vie</SelectItem>
                  <SelectItem value="restriction">Restriction/Interdiction</SelectItem>
                  <SelectItem value="followup">Suivi médical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="recommendationDescription">Description</Label>
              <Input
                id="recommendationDescription"
                placeholder="Description de la recommandation"
                value={newRecommendation.description}
                onChange={(e) => setNewRecommendation({ ...newRecommendation, description: e.target.value })}
              />
            </div>
          </div>

          <Button
            onClick={handleAddRecommendation}
            className="flex items-center gap-2"
            disabled={!newRecommendation.type || !newRecommendation.description}
          >
            <Plus className="h-4 w-4" /> Ajouter
          </Button>
        </div>

        {formData.recommendations.length > 0 && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.recommendations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>
                      {rec.type === "diet" && "Régime alimentaire"}
                      {rec.type === "activity" && "Activité physique"}
                      {rec.type === "lifestyle" && "Mode de vie"}
                      {rec.type === "restriction" && "Restriction/Interdiction"}
                      {rec.type === "followup" && "Suivi médical"}
                    </TableCell>
                    <TableCell>{rec.description}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveRecommendation(rec.id)}>
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Mesures hygiéno-diététiques</h3>

          <div className="space-y-2">
            <Label htmlFor="dietaryMeasures">Mesures alimentaires</Label>
            <Textarea
              id="dietaryMeasures"
              value={formData.dietaryMeasures}
              onChange={(e) => handleTextAreaChange('dietaryMeasures', e.target.value)}
              placeholder="Décrivez les recommandations alimentaires spécifiques"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="physicalActivity">Activité physique</Label>
            <Textarea
              id="physicalActivity"
              value={formData.physicalActivity}
              onChange={(e) => handleTextAreaChange('physicalActivity', e.target.value)}
              placeholder="Décrivez les recommandations d'activité physique"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Restrictions et interdictions</h3>

          <div className="space-y-2">
            <Label htmlFor="restrictions">Restrictions</Label>
            <Textarea
              id="restrictions"
              value={formData.restrictions}
              onChange={(e) => handleTextAreaChange('restrictions', e.target.value)}
              placeholder="Listez les restrictions recommandées (activités, aliments, etc.)"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suivi médical</h3>

          <div className="space-y-2">
            <Label htmlFor="followUp">Plan de suivi</Label>
            <Textarea
              id="followUp"
              value={formData.followUp}
              onChange={(e) => handleTextAreaChange('followUp', e.target.value)}
              placeholder="Décrivez le plan de suivi médical recommandé"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="additionalNotes">Notes supplémentaires</Label>
          <Textarea
            id="additionalNotes"
            value={formData.additionalNotes}
            onChange={(e) => handleTextAreaChange('additionalNotes', e.target.value)}
            placeholder="Notes supplémentaires ou informations importantes pour le patient"
            className="min-h-[150px]"
          />
        </div>
      </CardContent>
    </Card>
  )
}

