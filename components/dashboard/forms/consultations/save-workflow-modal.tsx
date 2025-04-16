"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Calendar, Bell, FileText, Clipboard, ClipboardCheck, FileOutput } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Recommendation } from "./recommendations"
import { Exam } from "./paraclinical-exams"
import { RequestedExam } from "./medical-record-form"
import { AdditionalAnamnesisData, IPatientBackground, VitalSigns } from "@/types"
import { MedicalEvent } from "./medical-history"


interface ISaveWorkflowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patientData: {
    patientInfo: {
      firstName: string;
      lastName: string;
      dob: string;
      gender: string;
      address: string;
      phone: string;
      email: string;
    };
    vitalSigns: VitalSigns;
    currentIllness: {
      chiefComplaint: string;
      startDate: string;
      severity: string;
      illnessDescription: string;
      symptoms: string;
      aggravatingFactors: string;
      relievingFactors: string;
      previousTreatments: string;
    };
    additionalAnamnesis: AdditionalAnamnesisData;
    patientBackground: IPatientBackground;
    medicalHistory: {
      medicalEvents: MedicalEvent[];
      familyHistory: string;
      allergies: string;
    };
    clinicalExams: {
      selectedOptions: Record<string, boolean>;
      temperature: string;
      bloodPressure: string;
      heartRate: string;
      respiratoryRate: string;
      clinicalConclusion: string;
    };
    paraclinicalExams: {
      exams: Exam[];
      requestedExams: RequestedExam[];
      clinicalInfo: string;
      paraclinicalConclusion: string;
    };
    treatment: {
      medications: Array<{
        id: string;
        name: string;
        dosage: string;
        frequency: string;
        duration: string;
        route: string;
        instructions: string;
      }>;
      nonPharmacological: string;
      treatmentPlan: string;
    };
    recommendations: {
      recommendations: Recommendation[];
      dietaryMeasures: string;
      physicalActivity: string;
      restrictions: string;
      followUp: string;
      additionalNotes: string;
    };
    diagnosis: string;
    certificate: {
      content: string;
    };
  };
}
export default function SaveWorkflowModal({ open, onOpenChange }: ISaveWorkflowModalProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [followUpDate, setFollowUpDate] = useState("")

  // Simuler le processus d'enregistrement
  const startSaveProcess = () => {
    setProgress(0)
    setCurrentStep(0)
    setIsComplete(false)

    const steps = [
      "Enregistrement des données patient...",
      "Génération des documents...",
      "Planification du rendez-vous de suivi...",
      "Envoi des notifications...",
      "Finalisation...",
    ]

    let currentStepIndex = 0

    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 20
          if (newProgress >= 100) {
            clearInterval(interval)
            setIsComplete(true)
          }
          return newProgress
        })

        setCurrentStep(currentStepIndex)
        currentStepIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 1000)
  }

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  const handleSave = () => {
    startSaveProcess()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Enregistrement et workflows</DialogTitle>
          <DialogDescription>Enregistrez le dossier médical et configurez les workflows associés</DialogDescription>
        </DialogHeader>

        {!isComplete && progress === 0 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documents à générer</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="prescription" defaultChecked />
                  <label
                    htmlFor="prescription"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" /> Ordonnance
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="exams" defaultChecked />
                  <label
                    htmlFor="exams"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    <Clipboard className="h-4 w-4" /> Demande d&apos,examens
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="certificate" defaultChecked />
                  <label
                    htmlFor="certificate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    <ClipboardCheck className="h-4 w-4" /> Certificat médical
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="report" defaultChecked />
                  <label
                    htmlFor="report"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    <FileOutput className="h-4 w-4" /> Compte-rendu
                  </label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Planification du rendez-vous de suivi</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="followUpDate">Date du prochain rendez-vous</Label>
                  <Input
                    id="followUpDate"
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followUpType">Type de rendez-vous</Label>
                  <Select defaultValue="consultation">
                    <SelectTrigger id="followUpType">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation de suivi</SelectItem>
                      <SelectItem value="results">Résultats d&apos,examens</SelectItem>
                      <SelectItem value="treatment">Suivi de traitement</SelectItem>
                      <SelectItem value="checkup">Contrôle de routine</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notifications aux services</h3>
              <p className="text-sm text-muted-foreground">
                Sélectionnez les services à notifier concernant ce patient
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cardiology"
                    checked={selectedServices.includes("cardiology")}
                    onCheckedChange={() => handleServiceToggle("cardiology")}
                  />
                  <label
                    htmlFor="cardiology"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cardiologie
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="neurology"
                    checked={selectedServices.includes("neurology")}
                    onCheckedChange={() => handleServiceToggle("neurology")}
                  />
                  <label
                    htmlFor="neurology"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Neurologie
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="radiology"
                    checked={selectedServices.includes("radiology")}
                    onCheckedChange={() => handleServiceToggle("radiology")}
                  />
                  <label
                    htmlFor="radiology"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Radiologie
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="laboratory"
                    checked={selectedServices.includes("laboratory")}
                    onCheckedChange={() => handleServiceToggle("laboratory")}
                  />
                  <label
                    htmlFor="laboratory"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Laboratoire
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pharmacy"
                    checked={selectedServices.includes("pharmacy")}
                    onCheckedChange={() => handleServiceToggle("pharmacy")}
                  />
                  <label
                    htmlFor="pharmacy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pharmacie
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="physiotherapy"
                    checked={selectedServices.includes("physiotherapy")}
                    onCheckedChange={() => handleServiceToggle("physiotherapy")}
                  />
                  <label
                    htmlFor="physiotherapy"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Kinésithérapie
                  </label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave}>Enregistrer et lancer les workflows</Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />

              <div className="space-y-2">
                {currentStep === 0 && <p>Enregistrement des données patient...</p>}
                {currentStep === 1 && <p>Génération des documents...</p>}
                {currentStep === 2 && <p>Planification du rendez-vous de suivi...</p>}
                {currentStep === 3 && <p>Envoi des notifications...</p>}
                {currentStep === 4 && <p>Finalisation...</p>}
              </div>
            </div>

            {isComplete && (
              <Card className="border-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-5 w-5" /> Enregistrement terminé
                  </CardTitle>
                  <CardDescription>Toutes les actions ont été effectuées avec succès</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Documents générés
                    </h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Ordonnance médicale</li>
                      <li>Demande d&apos,examens complémentaires</li>
                      <li>Certificat médical</li>
                      <li>Compte-rendu de consultation</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Rendez-vous planifié
                    </h4>
                    <p className="text-sm">
                      {followUpDate ? `Le ${followUpDate}` : "Date à confirmer avec le patient"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Bell className="h-4 w-4" /> Services notifiés
                    </h4>
                    <ul className="list-disc pl-5 text-sm">
                      {selectedServices.map((service, index) => (
                        <li key={index}>
                          {service === "cardiology" && "Cardiologie"}
                          {service === "neurology" && "Neurologie"}
                          {service === "radiology" && "Radiologie"}
                          {service === "laboratory" && "Laboratoire"}
                          {service === "pharmacy" && "Pharmacie"}
                          {service === "physiotherapy" && "Kinésithérapie"}
                        </li>
                      ))}
                      {selectedServices.length === 0 && <li>Aucun service sélectionné</li>}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Fermer</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

