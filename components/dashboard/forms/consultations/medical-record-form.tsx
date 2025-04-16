"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import CurrentIllness from "./current-illness"
import AdditionalAnamnesis from "./additional-anamnesis"
import MedicalHistory, { MedicalEvent } from "./medical-history"
import ClinicalExams from "./clinical-exams"
import ParaclinicalExams, { Exam } from "./paraclinical-exams"
import Treatment from "./treatment"
import Recommendations, { Recommendation } from "./recommendations"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Save, FileText } from "lucide-react"
import PreviewModal from "./preview-modal"
//import PatientInfoForm from "./patient-info-form"
import { AdditionalAnamnesisData, Condition, GynecologicalHistory, IPatientBackground, Patient,   VitalSigns } from "@/types"
import { useRouter } from "next/navigation"
import { getAllPatients } from "@/actions/patients"
import VitalSignsForm from "./vital-signs-form"
import PatientBackground from "./patient-background"
import SaveWorkflowModal from "./save-workflow-modal"
import PatientInfoForm from "./patient-info-form"
 


async function fetchPatientInfo(patientId: string): Promise<Patient | null> {
  // Simuler une requête API
  return new Promise((resolve) => {
    setTimeout(() => {
      if (patientId) {
        
      } else {
        resolve(null)
      }
    }, 500)
  })
}  
interface MedicalRecordFormProps {
  params?: {
    patientId?: string[];
  };
}
export interface RequestedExam {
  name: string;
  priority?: 'normal' | 'urgent';
  instructions?: string;
}
export default function MedicalRecordForm({ params = { patientId: undefined } }: MedicalRecordFormProps) {
  const [activeTab, setActiveTab] = useState("patient-info")
  const [previewModalOpen, setPreviewModalOpen] = useState(false)
  const [saveModalOpen, setSaveModalOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState<Patient[]>([]);
     // New state to hold the resolved params
  const [resolvedParams, setResolvedParams] = useState<{ patientId?: string[] } | null>(null);
  // État pour stocker les données du formulaire
  const [patientData, setPatientData] = useState({
    patientInfo: {
      firstName: "Jean",
      lastName: "Dupont",
      dob: "1975-05-15",
      gender: "male",
      address: "123 Rue Principale, Paris",
      phone: "01 23 45 67 89",
      email: "jean.dupont@email.com",
    },
    vitalSigns: {
      id: "1",
      staffId: "1",
      staff: null,
      recordedAt: "2023-06-10T10:00:00Z",
      temperature: "",
      respirationRate: "",
      height: "",
      weight: "",
      glycemia: "",
      cholesterol: "",
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
      //chiefComplaint: "Douleurs thoraciques et essoufflement",
      chiefComplaint: "",
      startDate: "2023-06-10",
      severity: "moderate",
      illnessDescription:
        "Le patient se plaint de douleurs thoraciques intermittentes depuis environ 2 semaines, accompagnées d'un essoufflement à l'effort modéré. Les douleurs sont décrites comme une pression, principalement localisées au centre de la poitrine, sans irradiation. Les symptômes s'aggravent à l'effort et s'améliorent au repos.",
      symptoms:"",
      aggravatingFactors:"",
      relievingFactors:"",
      previousTreatments:"",
    },
    additionalAnamnesis: {
      familyHistory: [
        {
          id: "1",
          relationship: "Père",
          condition: "Hypertension artérielle",
          age: "65",
          status: "Vivant",
          notes: "Sous traitement depuis 10 ans"
        },
        {
          id: "2",
          relationship: "Mère",
          condition: "Diabète type 2",
          age: "60",
          status: "Vivante",
          notes: "Diagnostic il y a 5 ans"
        }
      ],
      lifestyle: {
        smoking: {
          status: "Ex-fumeur",
          quantity: "1 paquet/jour",
          duration: "15 ans",
          quitDate: "2020",
          packsPerYear: 15
        },
        alcohol: {
          status: "Consommation occasionnelle",
          frequency: "1-2 verres/semaine",
          type: "Vin rouge",
          quantity: "15cl/verre"
        },
        diet: {
          type: "Régime standard",
          restrictions: "Aucune",
          habits: "3 repas par jour",
          notes: "Tendance à la consommation excessive de sel"
        },
        physicalActivity: {
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
        }
      },
      socialHistory: {
        occupation: {
          current: "Cadre commercial",
          duration: "12 ans",
          exposures: "Stress professionnel important",
          schedule: "Horaires irréguliers"
        },
        livingConditions: {
          type: "Appartement",
          location: "Zone urbaine",
          household: "Vit avec conjoint",
          dependents: "2 enfants"
        },
        stress: {
          level: "Modéré à élevé",
          sources: ["Travail", "Responsabilités familiales"],
          copingMechanisms: "Activité physique, lecture"
        }
      },
      allergies: [
        {
          id: "1",
          type: "Médicamenteuse",
          allergen: "Pénicilline",
          reaction: "Urticaire",
          severity: "Modérée",
          diagnosis: "2005"
        }
      ],
      vaccinations: [
        {
          id: "1",
          name: "DTP",
          date: "2020-03-15",
          nextDue: "2030-03-15",
          status: "À jour"
        },
        {
          id: "2",
          name: "Grippe",
          date: "2022-10-10",
          nextDue: "2023-10-10",
          status: "À renouveler"
        }
      ],
      gynecologicalHistory: {
        menstrualHistory: null,
        pregnancies: null,
        contraception: null,
        lastPapSmear: null
      } as GynecologicalHistory,
      travelHistory: [
        {
          id: "1",
          destination: "Afrique du Sud",
          date: "2019",
          duration: "2 semaines",
          illnesses: "Aucune",
          vaccinations: "Fièvre jaune"
        }
      ]
    } as AdditionalAnamnesisData,
    patientBackground: {
      conditions: [] as Condition[],
      conditionDetails: "",
    } as IPatientBackground,
    medicalHistory: {
      medicalEvents: [] as MedicalEvent[],
      familyHistory: "",
      allergies: "",
    },
    clinicalExams: {
      selectedOptions: {},
      temperature: "",
      bloodPressure: "",
      heartRate: "",
      respiratoryRate: "",
      clinicalConclusion: "",
    },
    paraclinicalExams: {
      exams: [] as Exam[],
      requestedExams: [] as RequestedExam[], 
      clinicalInfo: "",
      paraclinicalConclusion: "",
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
          instructions: "À prendre le matin",
        },
        {
          id: "2",
          name: "Metformine",
          dosage: "500mg",
          frequency: "2 fois par jour",
          duration: "3 mois",
          route: "oral",
          instructions: "À prendre pendant les repas",
        },
        {
          id: "3",
          name: "Aspirine",
          dosage: "75mg",
          frequency: "1 fois par jour",
          duration: "3 mois",
          route: "oral",
          instructions: "À prendre le soir",
        },
      ],
      nonPharmacological: "",
      treatmentPlan:
        "Traitement antihypertenseur et antidiabétique avec ajout d'aspirine à faible dose. Réévaluation dans 3 mois après réalisation des examens complémentaires.",
    },
    recommendations: {
      recommendations: [] as Recommendation[],
      dietaryMeasures: "",
      physicalActivity: "",
      restrictions: "",
      followUp: "",
      additionalNotes: "",
    },
    diagnosis: "Hypertension artérielle mal contrôlée, Diabète de type 2, Douleurs thoraciques à l'effort (à explorer)",
    certificate: {
      content:
        "Le patient présente une hypertension artérielle et un diabète nécessitant un suivi médical régulier. Il est actuellement en cours d'exploration pour des douleurs thoraciques à l'effort. Une activité physique modérée est recommandée, mais les efforts intenses sont à éviter jusqu'à la réalisation d'un test d'effort.",
    },
  })

  type PatientDataType = typeof patientData;
    // Fonction de mise à jour des données du formulaire
    const updateFormData = <T extends keyof PatientDataType>(
      section: T,
      data: Partial<PatientDataType[T]>
    ) => {
      setPatientData((prev) => {
        if (typeof prev[section] === 'object' && prev[section] !== null) {
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
    { id: "current-illness", label: "Maladie Actuelle" },
    { id: "medical-history", label: "Antécédents" },
    { id: "additional-anamnesis", label: "Complément d'Anamnèse" },
    { id: "patient-background", label: "Terrain" },
    { id: "clinical-exams", label: "Examens Cliniques" },
    { id: "paraclinical-exams", label: "Examens Paracliniques" },
    { id: "treatment", label: "Traitement" },
    { id: "recommendations", label: "Recommandations" },
  ]

  const currentTabIndex = tabs.findIndex((tab) => tab.id === activeTab)

  const goToNextTab = () => {
    if (currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1].id)
    }
  }

  const goToPreviousTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1].id)
    }
  }
 async function fetchAllPatients(): Promise<Patient[]> {
        // Simuler une requête API pour tous les patients
    const patients = (await getAllPatients()) || [];
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(patients);
            }, 500);
        });
    }
   const router = useRouter()
    const handleAddNewPatient = () => {
      router.push("/dashboard/patients/new")
    }
  useEffect(() => {
    fetchAllPatients().then(setPatients);
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
        patient: {
          ...patientData.patientInfo,
          selectedPatient,
        },
    
        // Signes vitaux
        vitalSigns: {
          ...patientData.vitalSigns,
          imc: parseFloat(patientData.vitalSigns.imc || '0'),
        },
    
        // Maladie actuelle
        currentIllness: {
          ...patientData.currentIllness,
          severity: patientData.currentIllness.severity,
          symptoms: patientData.currentIllness.symptoms,
          aggravatingFactors: patientData.currentIllness.aggravatingFactors,
          relievingFactors: patientData.currentIllness.relievingFactors,
          previousTreatments: patientData.currentIllness.previousTreatments,
        },
    
        // Complément d'anamnèse
        additionalAnamnesis: {
          ...patientData.additionalAnamnesis,
          familyHistory: patientData.additionalAnamnesis.familyHistory,
          lifestyle: patientData.additionalAnamnesis.lifestyle,
          socialHistory: patientData.additionalAnamnesis.socialHistory,
          allergies: patientData.additionalAnamnesis.allergies,
          vaccinations: patientData.additionalAnamnesis.vaccinations,
          gynecologicalHistory: patientData.additionalAnamnesis.gynecologicalHistory,
          travelHistory: patientData.additionalAnamnesis.travelHistory,
        },
    
        // Terrain du patient
        patientBackground: {
          ...patientData.patientBackground,
          conditions: patientData.patientBackground.conditions,
          conditionDetails: patientData.patientBackground.conditionDetails,
        },
    
        // Antécédents médicaux
        medicalHistory: {
          ...patientData.medicalHistory,
          medicalEvents: patientData.medicalHistory.medicalEvents,
          familyHistory: patientData.medicalHistory.familyHistory,
          allergies: patientData.medicalHistory.allergies,
        },
    
        // Examens cliniques
        clinicalExams: {
          ...patientData.clinicalExams,
          selectedOptions: patientData.clinicalExams.selectedOptions,
          clinicalConclusion: patientData.clinicalExams.clinicalConclusion,
        },
    
        // Examens paracliniques
        paraclinicalExams: {
          ...patientData.paraclinicalExams,
          exams: patientData.paraclinicalExams.exams,
          paraclinicalConclusion: patientData.paraclinicalExams.paraclinicalConclusion,
        },
    
        // Traitement
        treatment: {
          ...patientData.treatment,
          medications: patientData.treatment.medications,
          nonPharmacological: patientData.treatment.nonPharmacological,
          treatmentPlan: patientData.treatment.treatmentPlan,
        },
    
        // Recommandations
        recommendations: {
          ...patientData.recommendations,
          recommendations: patientData.recommendations.recommendations,
          dietaryMeasures: patientData.recommendations.dietaryMeasures,
          physicalActivity: patientData.recommendations.physicalActivity,
          restrictions: patientData.recommendations.restrictions,
          followUp: patientData.recommendations.followUp,
          additionalNotes: patientData.recommendations.additionalNotes,
        },
    
        // Diagnostic et certificat
        diagnosis: patientData.diagnosis,
        certificate: patientData.certificate,
    
        // Métadonnées de la consultation
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: "completed",
        }
      }
    
      // Afficher les données dans la console
      console.log('=== DONNÉES DE LA CONSULTATION ===');
      console.log(JSON.stringify(consultationData, null, 2));
      
      return consultationData;
    }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full justify-start">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
    setVitalSigns={(newVitalSigns) => updateFormData('vitalSigns', newVitalSigns)}
  />
</TabsContent>
            <TabsContent value="current-illness" className="mt-6">
              <CurrentIllness 
                formData={patientData.currentIllness}
                updateFormData={(data) => updateFormData('currentIllness', data)} />
            </TabsContent>

            <TabsContent value="additional-anamnesis" className="mt-6">
            <AdditionalAnamnesis 
    formData={patientData.additionalAnamnesis}
    updateFormData={(data) => updateFormData('additionalAnamnesis', data)}
  />
            </TabsContent>

            <TabsContent value="patient-background" className="mt-6">
            <PatientBackground
    formData={patientData.patientBackground}
    updateFormData={(data: Partial<IPatientBackground>) => 
      updateFormData('patientBackground', data)
    }
  />
            </TabsContent>

            <TabsContent value="medical-history" className="mt-6">
            <MedicalHistory
    formData={patientData.medicalHistory}
    updateFormData={(data) => updateFormData('medicalHistory', data)}
  />
            </TabsContent>

            <TabsContent value="clinical-exams" className="mt-6">
            <ClinicalExams
    formData={patientData.clinicalExams}
    updateFormData={(data) => updateFormData('clinicalExams', data)}
  />
            </TabsContent>

            <TabsContent value="paraclinical-exams" className="mt-6">
            <ParaclinicalExams
    formData={patientData.paraclinicalExams}
    updateFormData={(data) => updateFormData('paraclinicalExams', data)}
  />
            </TabsContent>

            <TabsContent value="treatment" className="mt-6">
            <Treatment
    formData={patientData.treatment}
    updateFormData={(data) => updateFormData('treatment', data)}
  />
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
            <Recommendations
    formData={patientData.recommendations}
    updateFormData={(data) => updateFormData('recommendations', data)}
  />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={goToPreviousTab}
              disabled={currentTabIndex === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" /> Précédent
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setPreviewModalOpen(true)}>
                <FileText className="h-4 w-4" /> Aperçu
              </Button>
              <Button variant="outline" className="flex items-center gap-2" onClick={() =>{ handleSaveConsultation(); setSaveModalOpen(true)}}>
                <Save className="h-4 w-4" /> Enregistrer
              </Button>
            </div>

            <Button
              onClick={goToNextTab}
              disabled={currentTabIndex === tabs.length - 1}
              className="flex items-center gap-2"
            >
              Suivant <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <PreviewModal open={previewModalOpen} onOpenChange={setPreviewModalOpen} patientData={patientData} />

      <SaveWorkflowModal open={saveModalOpen} onOpenChange={setSaveModalOpen} patientData={patientData} />
    </div>
  )
}

