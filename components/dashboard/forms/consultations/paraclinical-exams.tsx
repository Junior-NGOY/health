"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Trash2, Upload, FileText, Clock, AlertCircle, Printer } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Simulated database of paraclinical examinations
const examsDatabase = [
  { id: "1", name: "Numération Formule Sanguine (NFS)", category: "blood" },
  { id: "2", name: "Glycémie à jeun", category: "blood" },
  { id: "3", name: "Créatinine", category: "blood" },
  { id: "4", name: "Transaminases (ASAT, ALAT)", category: "blood" },
  { id: "5", name: "Radiographie thoracique", category: "imaging" },
  { id: "6", name: "Échographie abdominale", category: "imaging" },
  { id: "7", name: "Scanner cérébral", category: "imaging" },
  { id: "8", name: "Électrocardiogramme (ECG)", category: "cardio" },
  { id: "9", name: "Test de grossesse", category: "other" },
  { id: "10", name: "Analyse d'urine", category: "other" },
]

// Laboratoires et centres d'imagerie fictifs
const medicalFacilities = [
  { id: "1", name: "Laboratoire Central", type: "lab" },
  { id: "2", name: "Centre d'Imagerie Médicale", type: "imaging" },
  { id: "3", name: "Clinique Cardiologique", type: "cardio" },
  { id: "4", name: "Hôpital Universitaire", type: "hospital" },
]

export type ExamStatus = "prescribed" | "pending" | "completed" | "cancelled"

export interface Exam {
  id: string;
  name: string;
  prescriptionDate: string;
  expectedDate?: string;
  completionDate?: string;
  result?: string;
  category: string;
  status: ExamStatus;
  priority?: "normal" | "urgent";
  facility?: string;
  instructions?: string;
}
interface ParaclinicalExamsProps {
  formData: {
    exams: Exam[];
    paraclinicalConclusion: string;
  };
  updateFormData: (data: Partial<{
    exams: Exam[];
    paraclinicalConclusion: string;
  }>) => void;
}
export default function ParaclinicalExams({ formData, updateFormData }: ParaclinicalExamsProps) {
  const [activeTab, setActiveTab] = useState("prescribe")
  const [openExamSelector, setOpenExamSelector] = useState(false)
  const [openFacilitySelector, setOpenFacilitySelector] = useState(false)
  //const [exams, setExams] = useState<Exam[]>([])
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    name: "",
    prescriptionDate: new Date().toISOString().split("T")[0],
    category: "",
    status: "prescribed",
    priority: "normal",
  })
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false)

  const handleSelectExam = (exam: { id: string; name: string; category: string }) => {
    setNewExam({
      ...newExam,
      name: exam.name,
      category: exam.category,
    })
    setOpenExamSelector(false)
  }

  const handleSelectFacility = (facility: { id: string; name: string }) => {
    setNewExam({
      ...newExam,
      facility: facility.name,
    })
    setOpenFacilitySelector(false)
  }

  const handleAddExam = () => {
    if (newExam.name) {
      const exam: Exam = {
        id: Date.now().toString(),
        name: newExam.name,
        prescriptionDate: newExam.prescriptionDate || new Date().toISOString().split("T")[0],
        expectedDate: newExam.expectedDate,
        category: newExam.category || "",
        status: (newExam.status as ExamStatus) || "prescribed",
        priority: (newExam.priority as "normal" | "urgent") || "normal",
        facility: newExam.facility,
        instructions: newExam.instructions,
      }

      updateFormData({
        exams: [...formData.exams, exam]
      })
      setNewExam({
        name: "",
        prescriptionDate: new Date().toISOString().split("T")[0],
        category: "",
        status: "prescribed",
        priority: "normal",
      })
    }
  }

  const handleRemoveExam = (id: string) => {
    updateFormData({
      exams: formData.exams.filter((exam) => exam.id !== id)
    })
  }

  const handleUpdateExamStatus = (id: string, status: ExamStatus) => {
    updateFormData({
      exams: formData.exams.map((exam) => {
        if (exam.id === id) {
          return { ...exam, status }
        }
        return exam
      })
    })
  }

  const handleAddResult = (exam: Exam) => {
    setSelectedExam(exam)
    setIsResultDialogOpen(true)
  }

  const handleSaveResult = () => {
    if (selectedExam) {
      updateFormData({
        exams: formData.exams.map((exam) => {
          if (exam.id === selectedExam.id) {
            return {
              ...selectedExam,
              status: "completed",
              completionDate: selectedExam.completionDate || new Date().toISOString().split("T")[0],
            }
          }
          return exam
        })
      })
      setIsResultDialogOpen(false)
      setSelectedExam(null)
    }
  }

  const getStatusBadge = (status: ExamStatus) => {
    switch (status) {
      case "prescribed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Prescrit
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            En attente
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Complété
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Annulé
          </Badge>
        )
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }

  const getPriorityBadge = (priority: "normal" | "urgent") => {
    return priority === "urgent" ? (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        Urgent
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
        Normal
      </Badge>
    )
  }

  const printPrescription = () => {
    const prescribedExams = formData.exams.filter((exam) => exam.status === "prescribed")
    if (prescribedExams.length === 0) {
      alert("Aucun examen prescrit à imprimer.")
      return
    }

    // Ici, vous pourriez implémenter la logique d'impression réelle
    // Pour cet exemple, nous allons simplement afficher un message
    alert("Impression de l'ordonnance pour " + prescribedExams.length + " examens.")
  }
/*   const handleConclusionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      paraclinicalConclusion: e.target.value
    })
  } */
  return (
    <Card>
      <CardHeader>
        <CardTitle>Examens Paracliniques</CardTitle>
        <CardDescription>Prescription et résultats des examens paracliniques du patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="prescribe">Prescrire des examens</TabsTrigger>
            <TabsTrigger value="results">Résultats des examens</TabsTrigger>
          </TabsList>

          <TabsContent value="prescribe" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Examen</Label>
                  <Popover open={openExamSelector} onOpenChange={setOpenExamSelector}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Search className="mr-2 h-4 w-4" />
                        {newExam.name || "Rechercher un examen"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start" side="bottom">
                      <Command>
                        <CommandInput placeholder="Rechercher un examen..." />
                        <CommandList>
                          <CommandEmpty>Aucun examen trouvé.</CommandEmpty>
                          <CommandGroup>
                            {examsDatabase.map((exam) => (
                              <CommandItem key={exam.id} onSelect={() => handleSelectExam(exam)}>
                                {exam.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examDate">Date de prescription</Label>
                  <Input
                    id="examDate"
                    type="date"
                    value={newExam.prescriptionDate}
                    onChange={(e) => setNewExam({ ...newExam, prescriptionDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expectedDate">Date prévue</Label>
                  <Input
                    id="expectedDate"
                    type="date"
                    value={newExam.expectedDate}
                    onChange={(e) => setNewExam({ ...newExam, expectedDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priorité</Label>
                  <Select
                    value={newExam.priority}
                    onValueChange={(value) => setNewExam({ ...newExam, priority: value as "normal" | "urgent" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une priorité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Centre médical recommandé</Label>
                <Popover open={openFacilitySelector} onOpenChange={setOpenFacilitySelector}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="mr-2 h-4 w-4" />
                      {newExam.facility || "Sélectionner un centre médical"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start" side="bottom">
                    <Command>
                      <CommandInput placeholder="Rechercher un centre..." />
                      <CommandList>
                        <CommandEmpty>Aucun centre trouvé.</CommandEmpty>
                        <CommandGroup>
                          {medicalFacilities.map((facility) => (
                            <CommandItem key={facility.id} onSelect={() => handleSelectFacility(facility)}>
                              {facility.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions pour le patient</Label>
                <Textarea
                  id="instructions"
                  placeholder="Saisissez les instructions spécifiques pour cet examen (préparation, jeûne, etc.)"
                  className="min-h-[100px]"
                  value={newExam.instructions || ""}
                  onChange={(e) => setNewExam({ ...newExam, instructions: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleAddExam} className="flex items-center gap-2" disabled={!newExam.name}>
                  <Plus className="h-4 w-4" /> Ajouter à l&apos,ordonnance
                </Button>

                <Button variant="outline" className="flex items-center gap-2" onClick={printPrescription}>
                  <Printer className="h-4 w-4" /> Imprimer l&apos,ordonnance
                </Button>
              </div>
            </div>

            {formData.exams.filter((e) => e.status === "prescribed").length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Examen</TableHead>
                      <TableHead>Date de prescription</TableHead>
                      <TableHead>Date prévue</TableHead>
                      <TableHead>Priorité</TableHead>
                      <TableHead>Centre recommandé</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.exams
                      .filter((e) => e.status === "prescribed")
                      .map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.name}</TableCell>
                          <TableCell>{exam.prescriptionDate}</TableCell>
                          <TableCell>{exam.expectedDate || "-"}</TableCell>
                          <TableCell>{getPriorityBadge(exam.priority || "normal")}</TableCell>
                          <TableCell>{exam.facility || "-"}</TableCell>
                          <TableCell className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUpdateExamStatus(exam.id, "pending")}
                              title="Marquer comme en attente"
                            >
                              <Clock className="h-4 w-4 text-yellow-500" />
                              <span className="sr-only">En attente</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveExam(exam.id)}
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Supprimer</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Examens en attente de résultats</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Importer un document
              </Button>
            </div>

            {formData.exams.filter((e) => e.status === "pending").length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Examen</TableHead>
                      <TableHead>Date de prescription</TableHead>
                      <TableHead>Date prévue</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.exams
                      .filter((e) => e.status === "pending")
                      .map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.name}</TableCell>
                          <TableCell>{exam.prescriptionDate}</TableCell>
                          <TableCell>{exam.expectedDate || "-"}</TableCell>
                          <TableCell>{getStatusBadge(exam.status)}</TableCell>
                          <TableCell className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAddResult(exam)}
                              title="Ajouter un résultat"
                            >
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="sr-only">Ajouter un résultat</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUpdateExamStatus(exam.id, "cancelled")}
                              title="Annuler"
                            >
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="sr-only">Annuler</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center p-4 border rounded-md bg-gray-50">
                <p className="text-muted-foreground">Aucun examen en attente de résultats</p>
              </div>
            )}

            <h3 className="text-lg font-medium mt-6">Résultats d&apos,examens</h3>

            {formData.exams.filter((e) => e.status === "completed").length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Examen</TableHead>
                      <TableHead>Date de prescription</TableHead>
                      <TableHead>Date de réalisation</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Résultat</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.exams
                      .filter((e) => e.status === "completed")
                      .map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell>{exam.name}</TableCell>
                          <TableCell>{exam.prescriptionDate}</TableCell>
                          <TableCell>{exam.completionDate || "-"}</TableCell>
                          <TableCell>{getStatusBadge(exam.status)}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{exam.result || "-"}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveExam(exam.id)}
                              title="Supprimer"
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
            ) : (
              <div className="text-center p-4 border rounded-md bg-gray-50">
                <p className="text-muted-foreground">Aucun résultat d&apos,examen disponible</p>
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="paraclinicalConclusion">Interprétation des examens paracliniques</Label>
              <Textarea
                id="paraclinicalConclusion"
                placeholder="Interprétez les résultats des examens paracliniques et leur signification clinique"
                className="min-h-[150px]"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog pour ajouter un résultat d'examen */}
        <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un résultat d&apos,examen</DialogTitle>
              <DialogDescription>{selectedExam?.name}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="completionDate">Date de réalisation</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={selectedExam?.completionDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setSelectedExam(selectedExam ? { ...selectedExam, completionDate: e.target.value } : null)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resultText">Résultat</Label>
                <Textarea
                  id="resultText"
                  placeholder="Saisissez le résultat de l'examen"
                  className="min-h-[150px]"
                  value={selectedExam?.result || ""}
                  onChange={(e) => setSelectedExam(selectedExam ? { ...selectedExam, result: e.target.value } : null)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResultDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSaveResult}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

