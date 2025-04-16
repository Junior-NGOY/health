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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Download, X } from "lucide-react"
import { MedicalEvent } from "./medical-history"
import { Recommendation } from "./recommendations"
import { Exam } from "./paraclinical-exams"
import { VitalSigns } from "@/types"

interface PatientInfo {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
}
interface RequestedExam {
  name: string;
  priority?: 'normal' | 'urgent';
  instructions?: string;
}
interface PreviewData {
  patientInfo: PatientInfo;
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
  patientBackground: {
    conditions: Condition[];
    conditionDetails: string;
  };
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
    clinicalInfo?: string;
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
}
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  route: string;
  instructions?: string;
}
type PreviewModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  patientData: PreviewData
}
interface Condition {
  name: string;
  id: string;
}
export default function PreviewModal({ open, onOpenChange, patientData }: PreviewModalProps) {
  const [activeTab, setActiveTab] = useState("summary")

  // Fonction pour formater la date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Non spécifié"
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Fonction pour imprimer l'aperçu
  const handlePrint = () => {
    window.print()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Aperçu du dossier médical</DialogTitle>
          <DialogDescription>Résumé complet des informations du patient et de la consultation</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="summary">Résumé</TabsTrigger>
              <TabsTrigger value="prescription">Ordonnance</TabsTrigger>
              <TabsTrigger value="exams">Examens</TabsTrigger>
              <TabsTrigger value="certificate">Certificat</TabsTrigger>
              <TabsTrigger value="report">Compte-rendu</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[60vh]">
              <TabsContent value="summary" className="m-0">
                <div className="space-y-6 p-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {patientData?.patientInfo?.firstName} {patientData?.patientInfo?.lastName}
                      </h2>
                      <p className="text-muted-foreground">
                        Né(e) le {formatDate(patientData?.patientInfo?.dob)} -
                        {patientData?.patientInfo?.gender === "male"
                          ? " Homme"
                          : patientData?.patientInfo?.gender === "female"
                            ? " Femme"
                            : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Date de consultation</p>
                      <p>{formatDate(new Date().toISOString())}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Motif de consultation</h3>
                    <p>{patientData?.currentIllness?.chiefComplaint || "Non spécifié"}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Histoire de la maladie actuelle</h3>
                    <p>{patientData?.currentIllness?.illnessDescription || "Non spécifié"}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Terrain et antécédents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Conditions médicales</h4>
                        <ul className="list-disc pl-5">
      {patientData?.patientBackground?.conditions?.map((condition: Condition, index: number) => (
        <li key={index}>{condition.name}</li>
      )) || <li>Aucune condition spécifiée</li>}
    </ul>
  </div>
  <div>
    <h4 className="font-medium">Antécédents personnels</h4>
    <ul className="list-disc pl-5">
      {patientData?.medicalHistory?.medicalEvents?.map((event: MedicalEvent, index: number) => (
        <li key={index}>
          {event.description} ({event.year})
        </li>
      )) || <li>Aucun antécédent spécifié</li>}
    </ul>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Examen clinique</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium">Signes vitaux</h4>
                        <p>Température: {patientData?.clinicalExams?.temperature || "Non mesuré"} °C</p>
                        <p>Pression artérielle: {patientData?.clinicalExams?.bloodPressure || "Non mesuré"} mmHg</p>
                        <p>Fréquence cardiaque: {patientData?.clinicalExams?.heartRate || "Non mesuré"} bpm</p>
                        <p>Fréquence respiratoire: {patientData?.clinicalExams?.respiratoryRate || "Non mesuré"} rpm</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Conclusion</h4>
                        <p>{patientData?.clinicalExams?.clinicalConclusion || "Non spécifié"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Examens paracliniques</h3>
                    {patientData?.paraclinicalExams?.exams?.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {patientData.paraclinicalExams.exams.map((exam: Exam, index: number) => (
                          <li key={index}>
                            <span className="font-medium">{exam.name}</span> - {formatDate(exam.expectedDate)}
                            <p className="text-sm">{exam.result}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucun examen paraclinique spécifié</p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Traitement</h3>
                    {patientData?.treatment?.medications?.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {patientData.treatment.medications.map((med: Medication, index: number) => (
                          <li key={index}>
                            <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency},
                            {med.duration}
                            {med.instructions && <p className="text-sm italic">{med.instructions}</p>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucun traitement spécifié</p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Recommandations</h3>
                    {patientData?.recommendations?.recommendations?.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {patientData.recommendations.recommendations.map((rec: Recommendation, index: number) => (
                          <li key={index}>
                            <span className="font-medium">
                              {rec.type === "diet" && "Régime alimentaire"}
                              {rec.type === "activity" && "Activité physique"}
                              {rec.type === "lifestyle" && "Mode de vie"}
                              {rec.type === "restriction" && "Restriction"}
                              {rec.type === "followup" && "Suivi médical"}
                            </span>
                            : {rec.description}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Aucune recommandation spécifiée</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="prescription" className="m-0">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">ORDONNANCE</h2>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Date</p>
                        <p>{formatDate(new Date().toISOString())}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">PATIENT</h3>
                        <p>
                          {patientData?.patientInfo?.firstName} {patientData?.patientInfo?.lastName}
                        </p>
                        <p>Né(e) le {formatDate(patientData?.patientInfo?.dob)}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="font-medium">MÉDECIN</h3>
                        <p>Dr. [Nom du médecin]</p>
                        <p>[Spécialité]</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Prescription</h3>

                      {patientData?.treatment?.medications?.length > 0 ? (
                        <ul className="space-y-4">
                          {patientData.treatment.medications.map((med: Medication, index: number) => (
                            <li key={index} className="border-b pb-2">
                              <p className="font-bold">
                                {med.name} - {med.dosage}
                              </p>
                              <p>Posologie: {med.frequency}</p>
                              <p>Durée: {med.duration}</p>
                              <p>
                                Voie d&apos,administration:
                                {med.route === "oral"
                                  ? "Orale"
                                  : med.route === "iv"
                                    ? "Intraveineuse"
                                    : med.route === "im"
                                      ? "Intramusculaire"
                                      : med.route === "sc"
                                        ? "Sous-cutanée"
                                        : med.route === "topical"
                                          ? "Topique"
                                          : med.route === "inhalation"
                                            ? "Inhalation"
                                            : med.route}
                              </p>
                              {med.instructions && <p className="italic mt-1">{med.instructions}</p>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Aucun médicament prescrit</p>
                      )}
                    </div>

                    <div className="mt-8 pt-4 border-t">
                      <div className="flex justify-end">
                        <div className="text-center">
                          <p className="font-medium">Signature du médecin</p>
                          <div className="h-16 w-40 border-b mt-10"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="exams" className="m-0">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">DEMANDE D&apos,EXAMENS</h2>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Date</p>
                        <p>{formatDate(new Date().toISOString())}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">PATIENT</h3>
                        <p>
                          {patientData?.patientInfo?.firstName} {patientData?.patientInfo?.lastName}
                        </p>
                        <p>Né(e) le {formatDate(patientData?.patientInfo?.dob)}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="font-medium">MÉDECIN</h3>
                        <p>Dr. [Nom du médecin]</p>
                        <p>[Spécialité]</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Examens demandés</h3>

                      {patientData?.paraclinicalExams?.requestedExams?.length > 0 ? (
                        <ul className="space-y-2">
                          {patientData.paraclinicalExams?.requestedExams.map((exam: RequestedExam, index: number) => (
                            <li key={index} className="border p-3 rounded-md">
                              <div className="flex justify-between">
                                <p className="font-bold">{exam.name}</p>
                                <p>Priorité: {exam.priority || "Normale"}</p>
                              </div>
                              {exam.instructions && <p className="text-sm mt-1 italic">{exam.instructions}</p>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Aucun examen demandé</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Renseignements cliniques</h3>
                      <p>{patientData?.paraclinicalExams?.clinicalInfo || "Non spécifié"}</p>
                    </div>

                    <div className="mt-8 pt-4 border-t">
                      <div className="flex justify-end">
                        <div className="text-center">
                          <p className="font-medium">Signature du médecin</p>
                          <div className="h-16 w-40 border-b mt-10"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certificate" className="m-0">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">CERTIFICAT MÉDICAL</h2>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Date</p>
                        <p>{formatDate(new Date().toISOString())}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <p className="text-lg">
                        Je soussigné(e), Docteur [Nom du médecin], certifie avoir examiné ce jour :
                      </p>

                      <div className="pl-4 border-l-2 border-gray-300">
                        <p className="font-medium">
                          {patientData?.patientInfo?.firstName} {patientData?.patientInfo?.lastName}
                        </p>
                        <p>Né(e) le {formatDate(patientData?.patientInfo?.dob)}</p>
                        <p>Demeurant à {patientData?.patientInfo?.address || "[Adresse du patient]"}</p>
                      </div>

                      <p>Et avoir constaté que :</p>

                      <div className="p-4 border rounded-md min-h-[100px]">
                        <p>
                          {patientData?.certificate?.content ||
                            "Le patient présente les symptômes décrits dans le dossier médical et nécessite les soins prescrits."}
                        </p>
                      </div>

                      <p className="italic text-sm">
                        Ce certificat est établi à la demande de l&apos,intéressé(e) et remis en main propre pour faire
                        valoir ce que de droit.
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t">
                      <div className="flex justify-end">
                        <div className="text-center">
                          <p className="font-medium">Signature et cachet du médecin</p>
                          <div className="h-16 w-40 border-b mt-10"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="report" className="m-0">
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">COMPTE-RENDU DE CONSULTATION</h2>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Date</p>
                        <p>{formatDate(new Date().toISOString())}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">PATIENT</h3>
                        <p>
                          {patientData?.patientInfo?.firstName} {patientData?.patientInfo?.lastName}
                        </p>
                        <p>Né(e) le {formatDate(patientData?.patientInfo?.dob)}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="font-medium">MÉDECIN</h3>
                        <p>Dr. [Nom du médecin]</p>
                        <p>[Spécialité]</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Motif de consultation</h3>
                        <p>{patientData?.currentIllness?.chiefComplaint || "Non spécifié"}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Histoire de la maladie</h3>
                        <p>{patientData?.currentIllness?.illnessDescription || "Non spécifié"}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Examen clinique</h3>
                        <p>{patientData?.clinicalExams?.clinicalConclusion || "Non spécifié"}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Examens complémentaires</h3>
                        {patientData?.paraclinicalExams?.exams?.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {patientData.paraclinicalExams.exams.map((exam: Exam, index: number) => (
                              <li key={index}>
                                <span className="font-medium">{exam.name}</span>: {exam.result}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>Aucun examen complémentaire réalisé</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Diagnostic</h3>
                        <p>{patientData?.diagnosis || "En cours d'évaluation"}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Traitement prescrit</h3>
                        {patientData?.treatment?.medications?.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {patientData.treatment.medications.map((med: Medication, index: number) => (
                              <li key={index}>
                                <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency},{" "}
                                {med.duration}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>Aucun traitement prescrit</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium">Conclusion et recommandations</h3>
                        <p>{patientData?.treatment?.treatmentPlan || "Non spécifié"}</p>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t">
                      <div className="flex justify-end">
                        <div className="text-center">
                          <p className="font-medium">Signature du médecin</p>
                          <div className="h-16 w-40 border-b mt-10"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between items-center pt-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" /> Imprimer
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Télécharger PDF
            </Button>
          </div>
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="flex items-center gap-2">
            <X className="h-4 w-4" /> Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

