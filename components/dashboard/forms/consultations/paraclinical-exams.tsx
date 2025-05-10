"use client"

import type React from "react"

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
  { id: "1", name: "Sang", category: "blood" },
  { id: "2", name: "Badelette Urinaire (BU)", category: "blood" },
  { id: "3", name: "Tomodencytometrie (TDM) ou Uroscanner", category: "blood" },
  { id: "4", name: "Imagerie par raisonnace magnetique (IRM)", category: "blood" },
  { id: "5", name: "Urographie intraveineuse", category: "imaging" },
  { id: "6", name: "Uretro-Cystographie retrograde", category: "imaging" },
]

// Laboratoires et centres d'imagerie fictifs
const medicalFacilities = [
  { id: "1", name: "Laboratoire Central", type: "lab" },
  { id: "2", name: "Centre d'Imagerie Médicale", type: "imaging" },
  { id: "3", name: "Clinique Cardiologique", type: "cardio" },
  { id: "4", name: "Hôpital Universitaire", type: "hospital" },
]

export type ExamStatus = "prescribed" | "pending" | "completed" | "cancelled"

export interface requestedExam {
  id: string
  name: string
  prescriptionDate: string
  expectedDate?: string
  completionDate?: string
  result?: string
  category: string
  status: ExamStatus
  priority?: "normal" | "urgent"
  facility?: string
  instructions?: string
}
interface ParaclinicalExamsProps {
  formData: {
    requestedExams: requestedExam[]
    paraclinicalConclusion: string
  }
  updateFormData: (
    data: Partial<{
      requestedExams: requestedExam[]
      paraclinicalConclusion: string
    }>,
  ) => void
}
export default function ParaclinicalExams({ formData, updateFormData }: ParaclinicalExamsProps) {
  const [activeTab, setActiveTab] = useState("prescribe")
  const [openExamSelector, setOpenExamSelector] = useState(false)
  const [openFacilitySelector, setOpenFacilitySelector] = useState(false)
  const [newExam, setNewExam] = useState<Partial<requestedExam>>({
    name: "",
    prescriptionDate: new Date().toISOString().split("T")[0],
    category: "",
    status: "prescribed",
    priority: "normal",
    expectedDate: "",
    facility: "",
    instructions: "",
  })
  const [selectedExam, setSelectedExam] = useState<requestedExam | null>(null)
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
      const requestedExam: requestedExam = {
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
        requestedExams: [...formData.requestedExams, requestedExam],
      })
      setNewExam({
        name: "",
        prescriptionDate: new Date().toISOString().split("T")[0],
        category: "",
        status: "prescribed",
        priority: "normal",
        expectedDate: "",
        facility: "",
        instructions: "",
      })
    }
  }

  const handleRemoveExam = (id: string) => {
    updateFormData({
      requestedExams: formData.requestedExams.filter((RequestedExam) => RequestedExam.id !== id),
    })
  }

  const handleUpdateExamStatus = (id: string, status: ExamStatus) => {
    updateFormData({
      requestedExams: formData.requestedExams.map((requestedExam) => {
        if (requestedExam.id === id) {
          return { ...requestedExam, status }
        }
        return requestedExam
      }),
    })
  }

  const handleAddResult = (exam: requestedExam) => {
    setSelectedExam({
      ...exam,
      completionDate: exam.completionDate || new Date().toISOString().split("T")[0],
      result: exam.result || "",
    })
    setIsResultDialogOpen(true)
  }

  const handleSaveResult = () => {
    if (!selectedExam) return

    const updatedExam = {
      ...selectedExam,
      status: "completed" as const,
      completionDate: selectedExam.completionDate || new Date().toISOString().split("T")[0],
      result: selectedExam.result || "",
    }

    updateFormData({
      requestedExams: formData.requestedExams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam)),
    })

    setIsResultDialogOpen(false)
    setSelectedExam(null)
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
    const prescribedExams = formData.requestedExams.filter((requestedExam) => requestedExam.status === "prescribed")
    if (prescribedExams.length === 0) {
      alert("Aucun examen prescrit à imprimer.")
      return
    }

    // Ici, vous pourriez implémenter la logique d'impression réelle
    // Pour cet exemple, nous allons simplement afficher un message
    alert("Impression de l'ordonnance pour " + prescribedExams.length + " examens.")
  }
  const handleConclusionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      paraclinicalConclusion: e.target.value,
    })
  }

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
                  <Plus className="h-4 w-4" /> Ajouter à l&apos;ordonnance
                </Button>

                <Button variant="outline" className="flex items-center gap-2" onClick={printPrescription}>
                  <Printer className="h-4 w-4" /> Imprimer l&apos;ordonnance
                </Button>
              </div>
            </div>

            {formData.requestedExams.filter((e) => e.status === "prescribed").length > 0 && (
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
                    {formData.requestedExams
                      .filter((e) => e.status === "prescribed")
                      .map((requestedExam) => (
                        <TableRow key={requestedExam.id}>
                          <TableCell>{requestedExam.name}</TableCell>
                          <TableCell>{requestedExam.prescriptionDate}</TableCell>
                          <TableCell>{requestedExam.expectedDate || "-"}</TableCell>
                          <TableCell>{getPriorityBadge(requestedExam.priority || "normal")}</TableCell>
                          <TableCell>{requestedExam.facility || "-"}</TableCell>
                          <TableCell className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUpdateExamStatus(requestedExam.id, "pending")}
                              title="Marquer comme en attente"
                            >
                              <Clock className="h-4 w-4 text-yellow-500" />
                              <span className="sr-only">En attente</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveExam(requestedExam.id)}
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

            {formData.requestedExams.filter((e) => e.status === "pending").length > 0 ? (
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
                    {formData.requestedExams
                      .filter((e) => e.status === "pending")
                      .map((requestedExam) => (
                        <TableRow key={requestedExam.id}>
                          <TableCell>{requestedExam.name}</TableCell>
                          <TableCell>{requestedExam.prescriptionDate}</TableCell>
                          <TableCell>{requestedExam.expectedDate || "-"}</TableCell>
                          <TableCell>{getStatusBadge(requestedExam.status)}</TableCell>
                          <TableCell className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleAddResult(requestedExam)}
                              title="Ajouter un résultat"
                            >
                              <FileText className="h-4 w-4 text-blue-500" />
                              <span className="sr-only">Ajouter un résultat</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUpdateExamStatus(requestedExam.id, "cancelled")}
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

            {formData.requestedExams.filter((e) => e.status === "completed").length > 0 ? (
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
                    {formData.requestedExams
                      .filter((e) => e.status === "completed")
                      .map((requestedExam) => (
                        <TableRow key={requestedExam.id}>
                          <TableCell>{requestedExam.name}</TableCell>
                          <TableCell>{requestedExam.prescriptionDate}</TableCell>
                          <TableCell>{requestedExam.completionDate || "-"}</TableCell>
                          <TableCell>{getStatusBadge(requestedExam.status)}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{requestedExam.result || "-"}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveExam(requestedExam.id)}
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
                value={formData.paraclinicalConclusion ?? ""} // Add controlled value
                onChange={handleConclusionChange} // Add onChange handler
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Dialog pour ajouter un résultat d'examen */}
        <Dialog
          open={isResultDialogOpen}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedExam(null)
            }
            setIsResultDialogOpen(open)
          }}
        >
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un résultat d'examen</DialogTitle>
              <DialogDescription>{selectedExam?.name}</DialogDescription>
            </DialogHeader>
            {selectedExam && (
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="completionDate">Date de réalisation</Label>
                  <Input
                    id="completionDate"
                    type="date"
                    value={selectedExam?.completionDate ?? new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      setSelectedExam({
                        ...selectedExam,
                        completionDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resultText">Résultat</Label>
                  <Textarea
                    id="resultText"
                    placeholder="Saisissez le résultat de l'examen"
                    className="min-h-[150px]"
                    value={selectedExam?.result ?? ""}
                    onChange={(e) =>
                      setSelectedExam({
                        ...selectedExam,
                        result: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
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
