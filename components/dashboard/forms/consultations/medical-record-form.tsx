"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import CurrentIllness from "./current-illness";
import AdditionalAnamnesis from "./additional-anamnesis";
import MedicalHistory, { MedicalEvent } from "./medical-history";
import ClinicalExams from "./clinical-exams";
import Treatment from "./treatment";
import Recommendations, { Recommendation } from "./recommendations";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, FileText } from "lucide-react";
import PreviewModal from "./preview-modal";
import {
  AdditionalAnamnesisData,
  Complaint,
  Condition,
  DiagnosisCertainty,
  DiagnosisData,
  DiagnosisSeverity,
  GynecologicalHistory,
  IPatientBackground,
  Medication,
  Patient,
  VitalSigns
} from "@/types";
import { useRouter } from "next/navigation";
import { getAllPatients } from "@/actions/patients";
import VitalSignsForm from "./vital-signs-form";
import PatientBackground from "./patient-background";
import SaveWorkflowModal from "./save-workflow-modal";
import PatientInfoForm from "./patient-info-form";
import Diagnosis from "./diagnosis";
import ParaclinicalExams, { requestedExam } from "./paraclinical-exams";
import { getAllChefComplaints } from "@/actions/complaints";
import toast from "react-hot-toast";

//import { getAllChefComplaints } from "@/actions/consultations";

async function fetchPatientInfo(patientId: string): Promise<Patient | null> {
  // Simuler une requête API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (patientId) {
      } else {
        resolve(null);
      }
    }, 500);
  });
}
interface MedicalRecordFormProps {
  params?: {
    patientId?: string[];
  };
}


export default function MedicalRecordForm({
  params = { patientId: undefined }
}: MedicalRecordFormProps) {
  const [activeTab, setActiveTab] = useState("patient-info");
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [chefComplaints, setChefComplaints] = useState<Complaint[]>([]);
  // New state to hold the resolved params
  const [resolvedParams, setResolvedParams] = useState<{
    patientId?: string[];
  } | null>(null);
  // État pour stocker les données du formulaire
  const [patientData, setPatientData] = useState({
    selectedPatient :selectedPatient as Patient,
    vitalSigns: {
      id: "1",
      staffId: "1",
      staff: null,
      recordedAt: "2023-06-10T10:00:00Z",
      temperature: "",
      respirationRate: "",
      height: "",
      weight: "",
      pa: "",
      ta: "",
      ddr: "",
      dpa: "",
      pc: "",
      imc: "",
      pas: "",
      pad: "",
      fc: "",
      spo2: "",
      notes: ""
    } as VitalSigns,
    currentIllness: {
      chiefComplaint: "",
      startDate: "",
      hma: "",
    },
    additionalAnamnesis: {
    } as AdditionalAnamnesisData,
    patientBackground: {
      conditions: [] as Condition[],
      conditionDetails: ""
    } as IPatientBackground,
    medicalHistory: {
      medicalEvents: [] as MedicalEvent[],
      familyHistory: [
        {
          id: "",
          relationship: "",
          condition: "",
          age: "",
          status: "",
          notes: ""
        },
      ]as Array<{
        id: string;
        relationship: string;
        condition: string;
        age: string;
        status: string;
        notes: string;
      }>,
      lifestyle: {
        smoking: {
          status: "Ex-fumeur",
          quantity: "1 paquet/jour",
         // duration: "15 ans",
         // quitDate: "2020",
         // packsPerYear: 15
        },
        alcohol: {
         // status: "Consommation occasionnelle",
          frequency: "1-2 verres/semaine",
          type: "Vin rouge",
         // quantity: "15cl/verre"
        },
        diet: {
          type: "Régime standard",
          restrictions: "Aucune",
          //habits: "3 repas par jour",
          //notes: "Tendance à la consommation excessive de sel"
        },
      /*   physicalActivity: {
          frequency: "2-3 fois/semaine",
          type: "Marche",
          duration: "30 minutes",
          intensity: "Modérée"
        },
        sleep: {
          quality: "Moyenne",
          duration: "6-7 heures",
          problems: "Réveils nocturnes occasionnels",
          notes: "Difficulté d'endormissement en période de stress"
        } */
      },
      allergies: [
        {
          id: "1",
          type: "Médicamenteuse",
          allergen: "Pénicilline",
          reaction: "Urticaire",
          severity: "Modérée",
         // diagnosis: "2005"
        }
      ],
      gynecologicalHistory: {
        menstrualHistory: null,
        //pregnancies: null,
       // contraception: null,
       // lastPapSmear: null
      } as GynecologicalHistory
    },
    clinicalExams: {
      selectedOptions: {},
      //temperature: "",
      //bloodPressure: "",
      //heartRate: "",
      //respiratoryRate: "",
      //clinicalConclusion: ""
    },
    paraclinicalExams: {
      requestedExams: [] as requestedExam[],
      //requestedExams: [] as RequestedExam[],
      //clinicalInfo: "",
      paraclinicalConclusion: ""
    },
    treatment: {
      medications: [
        {
          id: "1",
          name: "Amlodipine",
          dosage: "5mg",
          frequency: "1 fois par jour",
          duration: "3 mois",
          route: "oral",
          instructions: "À prendre le matin"
        },
        {
          id: "2",
          name: "Metformine",
          dosage: "500mg",
          frequency: "2 fois par jour",
          duration: "3 mois",
          route: "oral",
          instructions: "À prendre pendant les repas"
        },
        {
          id: "3",
          name: "Aspirine",
          dosage: "75mg",
          frequency: "1 fois par jour",
          duration: "3 mois",
          route: "oral",
          instructions: "À prendre le soir"
        }
      ] as Medication[],
      nonPharmacological: "",
      treatmentPlan:
        "Traitement antihypertenseur et antidiabétique avec ajout d'aspirine à faible dose. Réévaluation dans 3 mois après réalisation des examens complémentaires."
    },
    recommendations: {
      recommendations: [] as Recommendation[],
      dietaryMeasures: "",
      physicalActivity: "",
      restrictions: "",
      followUp: "",
      additionalNotes: ""
    },
    diagnosis: {
      mainDiagnosis: "",
      secondaryDiagnoses: [] as string[],
      differentialDiagnoses: [] as string[],
      notes: "",
      certainty: "possible" as DiagnosisCertainty,
      severity: "moderate" as DiagnosisSeverity
    } satisfies DiagnosisData,
    //diagnosis:
    //  "Hypertension artérielle mal contrôlée, Diabète de type 2, Douleurs thoraciques à l'effort (à explorer)",
    certificate: {
      content:
        "Le patient présente une hypertension artérielle et un diabète nécessitant un suivi médical régulier. Il est actuellement en cours d'exploration pour des douleurs thoraciques à l'effort. Une activité physique modérée est recommandée, mais les efforts intenses sont à éviter jusqu'à la réalisation d'un test d'effort."
    }
  });

  type PatientDataType = typeof patientData;
  // Fonction de mise à jour des données du formulaire
  const updateFormData = <T extends keyof PatientDataType>(
    section: T,
    data: Partial<PatientDataType[T]>
  ) => {
    setPatientData((prev) => {
      if (typeof prev[section] === "object" && prev[section] !== null) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            ...data
          }
        };
      }
      return {
        ...prev,
        [section]: data
      };
    });
  };
  const tabs = [
    { id: "patient-info", label: "Info Patient" },
    { id: "vital-signs", label: "Signes Vitaux" },
    { id: "current-illness", label: "Motif" },
    { id: "medical-history", label: "Antécédents" },
    { id: "additional-anamnesis", label: "Complément d'A." },
    { id: "patient-background", label: "Terrain" },
    { id: "clinical-exams", label: "Ex. Cliniques" },
    { id: "diagnosis", label: "Diagnostic" },
    { id: "paraclinical-exams", label: "Ex. Paracliniques" },
    { id: "treatment", label: "Traitement" },
    { id: "recommendations", label: "Recommandations" }
  ];

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id);
    }
  };

  const goToPreviousTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id);
    }
  };
  async function fetchAllPatients(): Promise<Patient[]> {
    // Simuler une requête API pour tous les patients
    const patients = (await getAllPatients()) || [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(patients);
      }, 500);
    });
  }
 
  async function fetchAllChefComplaints(): Promise<Complaint[]> {
    // Simuler une requête API pour tous les patients
    const complaints = (await getAllChefComplaints()) || [];
    return new Promise((resolve) => {
      console.log(complaints)
      setTimeout(() => {
        resolve(complaints);
      }, 500);
    });
  }  
 
  
  const router = useRouter();
  const handleAddNewPatient = () => {
    router.push("/dashboard/patients/new");
  };
  useEffect(() => {
    fetchAllPatients().then(setPatients);
  }, []);
    useEffect(() => {
    fetchAllChefComplaints().then(setChefComplaints) 
    console.log(chefComplaints)
  }, []);  
  

  useEffect(() => {
    async function fetchInitialData() {
      // Resolve params and set resolvedParams state
      const resolvedParamsValue = await params;
      setResolvedParams(resolvedParamsValue);
      const patientId = resolvedParamsValue?.patientId?.[0];
      if (patientId) {
        fetchPatientInfo(patientId).then(setSelectedPatient);
      }
    }
    fetchInitialData();
  }, [params]); // Empty dependency array - runs only once on mount

  const handleSaveConsultation = () => {
    const consultationData = {
      // Information du patient
   /*    patient: {
        ...patientData.patientInfo,
        selectedPatient
      }, */
      selectedPatient,
      // Signes vitaux
      vitalSigns: {
        ...patientData.vitalSigns,
        imc: parseFloat(patientData.vitalSigns.imc || "0")
      },
      // Maladie actuelle
      currentIllness: {
        ...patientData.currentIllness,
        chiefComplaint: patientData.currentIllness.chiefComplaint,
        startDate: patientData.currentIllness.startDate,
        hma: patientData.currentIllness.hma,
      },
         // Antécédents médicaux
         medicalHistory: {
          ...patientData.medicalHistory,
          medicalEvents: patientData.medicalHistory.medicalEvents,
          familyHistory: patientData.medicalHistory.familyHistory,
          allergies: patientData.medicalHistory.allergies,
          gynecologicalHistory: patientData.medicalHistory.gynecologicalHistory,
        },
      // Complément d'anamnèse
      additionalAnamnesis: {
        ...patientData.additionalAnamnesis,
        severity: patientData.additionalAnamnesis.severity,
        symptoms: patientData.additionalAnamnesis.symptoms,
        aggravatingFactors: patientData.additionalAnamnesis.aggravatingFactors,
        relievingFactors: patientData.additionalAnamnesis.relievingFactors,
        previousTreatments: patientData.additionalAnamnesis.previousTreatments,
      
        
      },
      // Terrain du patient
      patientBackground: {
        ...patientData.patientBackground,
        conditions: patientData.patientBackground.conditions,
        conditionDetails: patientData.patientBackground.conditionDetails
      },
      // Examens cliniques
      clinicalExams: {
        ...patientData.clinicalExams,
        selectedOptions: patientData.clinicalExams.selectedOptions,
       // clinicalConclusion: patientData.clinicalExams.clinicalConclusion
      },
          // Diagnostic
    diagnosis: {
      ...patientData.diagnosis,
      mainDiagnosis: patientData.diagnosis.mainDiagnosis,
      secondaryDiagnoses: patientData.diagnosis.secondaryDiagnoses,
      differentialDiagnoses: patientData.diagnosis.differentialDiagnoses,
      notes: patientData.diagnosis.notes,
      certainty: patientData.diagnosis.certainty,
      severity: patientData.diagnosis.severity
    },
      // Examens paracliniques
      paraclinicalExams: {
        ...patientData.paraclinicalExams,
        requestedExams: patientData.paraclinicalExams.requestedExams,
        paraclinicalConclusion:
          patientData.paraclinicalExams.paraclinicalConclusion
      },
      // Traitement
      treatment: {
        ...patientData.treatment,
        medications: patientData.treatment.medications,
        nonPharmacological: patientData.treatment.nonPharmacological,
        treatmentPlan: patientData.treatment.treatmentPlan
      },

      // Recommandations
      recommendations: {
        ...patientData.recommendations,
        recommendations: patientData.recommendations.recommendations,
        dietaryMeasures: patientData.recommendations.dietaryMeasures,
        physicalActivity: patientData.recommendations.physicalActivity,
        restrictions: patientData.recommendations.restrictions,
        followUp: patientData.recommendations.followUp,
        additionalNotes: patientData.recommendations.additionalNotes
      },
      // certificat
      certificate: patientData.certificate,

      // Métadonnées de la consultation
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "completed"
      }
    };
    // Afficher les données dans la console
    console.log("=== DONNÉES DE LA CONSULTATION ===");
    console.log(JSON.stringify(consultationData, null, 2));
    return consultationData;
    toast.success("Successfully Created!");
  };

  return (
    <div className="space-y-6 p-2 sm:p-4 md:p-6">
      <Card className="w-full">
        <CardContent className="p-2 sm:p-4 md:p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full justify-start flex-wrap gap-2">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="text-xs sm:text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="patient-info" className="mt-6">
              <PatientInfoForm
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                onAddNewPatient={handleAddNewPatient}
                allowSearch={!resolvedParams?.patientId}
                patients={patients || []}
              />
            </TabsContent>
            <TabsContent value="vital-signs" className="mt-6">
              <VitalSignsForm
                vitalSigns={patientData.vitalSigns}
                setVitalSigns={(newVitalSigns) =>
                  updateFormData("vitalSigns", newVitalSigns)
                }
              />
            </TabsContent>
            <TabsContent value="current-illness" className="mt-6">
              <CurrentIllness
                formData={patientData.currentIllness}
                updateFormData={(data) =>
                  updateFormData("currentIllness", data)
                }
              />
              
            </TabsContent>

            <TabsContent value="additional-anamnesis" className="mt-6">
              <AdditionalAnamnesis
                formData={patientData.additionalAnamnesis}
                updateFormData={(data) =>
                  updateFormData("additionalAnamnesis", data)
                }
              />
            </TabsContent>

            <TabsContent value="patient-background" className="mt-6">
              <PatientBackground
                formData={patientData.patientBackground}
                updateFormData={(data: Partial<IPatientBackground>) =>
                  updateFormData("patientBackground", data)
                }
              />
            </TabsContent>

            <TabsContent value="medical-history" className="mt-6">
              <MedicalHistory
                formData={patientData.medicalHistory}
                updateFormData={(data) =>
                  updateFormData("medicalHistory", data)
                }
              />
            </TabsContent>

            <TabsContent value="clinical-exams" className="mt-6">
              <ClinicalExams
                formData={patientData.clinicalExams}
                updateFormData={(data) => updateFormData("clinicalExams", data)}
              />
            </TabsContent>
            <TabsContent value="diagnosis" className="mt-6">
              <Diagnosis
                formData={patientData.diagnosis}
                updateFormData={(data) => updateFormData("diagnosis", data)}
              />
            </TabsContent>
            <TabsContent value="paraclinical-exams" className="mt-6">
              <ParaclinicalExams
                formData={patientData.paraclinicalExams}
                updateFormData={(data) =>
                  updateFormData("paraclinicalExams", data)
                }
              />
            </TabsContent>

            <TabsContent value="treatment" className="mt-6">
              <Treatment
                formData={patientData.treatment}
                updateFormData={(data) => updateFormData("treatment", data)}
              />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <Recommendations
                formData={patientData.recommendations}
                updateFormData={(data) =>
                  updateFormData("recommendations", data)
                }
              />
            </TabsContent>
          </Tabs>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={goToPreviousTab}
              disabled={currentTabIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Précédent
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setPreviewModalOpen(true)}
              >
                <FileText className="h-4 w-4" /> Aperçu
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full sm:w-auto"
                onClick={() => {
                  handleSaveConsultation();
                  setSaveModalOpen(true);
                }}
              >
                <Save className="h-4 w-4" /> Enregistrer
              </Button>
            </div>
            <Button
              onClick={goToNextTab}
              disabled={currentTabIndex === tabs.length - 1}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              Suivant <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

        <PreviewModal
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
        patientData={{
          patientInfo: selectedPatient, // Make sure this matches
          ...patientData
        }}
        className="w-full max-w-4xl mx-auto"
      /> 

<SaveWorkflowModal
  open={saveModalOpen}
  onOpenChange={setSaveModalOpen}
  patientData={{
    patientInfo: selectedPatient, // Make sure this matches
    ...patientData
  }}
  className="w-full max-w-2xl mx-auto"
/>  
    </div>
  );
}
