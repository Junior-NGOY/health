import { z } from "zod";

export interface Patient {
    id: string;
    fileNumber: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: "MALE" | "FEMALE";
    address: string | null;
    phone: string | null;
    email: string | null;
    bloodType: string | null;
    emergencyContact: string | null;
    category: "PRIVATE" | "SUBSCRIBER";
    createdAt: string;
    updatedAt: string;
     _count?: {
      consultations: number;
      prescriptions: number;
      labTests: number;
      allergies: number;
      medicalHistories: number;
    };
    age: number;
    // Relations optionnelles si nécessaires
   /* consultations?: Consultation[];
    prescriptions?: Prescription[];
    labTests?: LabTest[];
    allergies?: Allergy[];
    medicalHistories?: MedicalHistory[]; */
  }
  export type DiagnosisCertainty = "confirmed" | "probable" | "possible";
  export type DiagnosisSeverity = "mild" | "moderate" | "severe";
  
  export interface DiagnosisData {
    mainDiagnosis: string;
    secondaryDiagnoses: string[];
    differentialDiagnoses: string[];
    notes: string;
    certainty: DiagnosisCertainty;
    severity: DiagnosisSeverity;
  }

  export type Consultation = {
    id: string;
    patientId: string;
    patient: Patient;
    staffId: string;
    staff: string | null;
   // staff: Staff;
    hospitalId: string;
   // hospital: Hospital;
    hospital: string |null;
    chiefComplaintId: string | null;
    chiefComplaint: string | null;
   // chiefComplaint: Complaint | null;
    otherComplaints: string | null;
    historyOfIllness: string;
    diagnosis: string;
    treatment: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    prescriptions: string[];
   // prescriptions: Prescription[];
  };

  export type VitalSigns = {
    id: string;
    staffId: string;
    staff: string | null;
    //staff: Staff | null;
    recordedAt: string;
    temperature: string;
    respirationRate: string;
    height: string;
    weight: string;
    glycemia: string;
    cholesterol: string;
    pa: string;
    ta: string;
    ddr: string;
    dpa: string;
    pc: string;
    imc: string;
    pas: string;
    pad: string;
    fc: string;
    spo2: string;
    notes: string;
  };

  export interface Condition {
    id: string;
    name: string;
  }

  export interface AdditionalAnamnesisData {
    severity: string;
    symptoms: string;
    aggravatingFactors: string;
    relievingFactors: string;
    previousTreatments: string;
    travelHistory: Array<{
      id: string;
      destination: string;
      date: string;
      duration: string;
      illnesses: string;
      vaccinations: string;
    }>;
  }

  export interface IPatientBackground {
    conditions: Condition[];
    conditionDetails: string;
  }

  export interface GynecologicalHistory {
    menstrualHistory: string | null;
    pregnancies: string | null;
    contraception: string | null;
    lastPapSmear: string | null;
  }

  export type Complaint = {
    id: string;
    description: string;
   // slug: string;
    //createdAt: Date;
    //updatedAt: Date;
    //consultations: Consultation[];
  };
 export interface Category {
    id: string;
    name: string;
    description?: string;
    parentCategoryId?: string|null;
    subCategories?: Category[];
  }
 export interface Supplier {
    id: string;
    name: string;
   
  }

 export type Medication = {
    id: string;
    name: string;
    genericName?: string | null;
    form?: string;
    strength?: string;
    fabricant?: string | null;
    description: string | null;
    stock?: number;
    unitPrice?: number;
    sellingPrice?: number;
    dosage: string;
    frequency: string;
    duration: string;
    route: string;
    
    instructions: string;
    category?: {
      id: string
      name: string
    } | null
    supplier?: {
      id: string
      name: string
    } | null
    createdAt: string;
  };


/* export interface Medication {
    id: string;
    name: string;
    category: string;
  } */
  export const medicationFormSchema = z.object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    genericName: z.string().optional(),
    form: z.string(),
    strength: z.string(),
    fabricant: z.string().optional(),
    description: z.string().optional(),
    stock: z.number().min(0, "Le stock ne peut pas être négatif"),
    unitPrice: z.number().min(0, "Le prix unitaire ne peut pas être négatif"),
    sellingPrice: z.number().min(0, "Le prix de vente ne peut pas être négatif"),
    categoryId: z.string().optional(),
    supplierId: z.string().optional(),
  })
  
  export type MedicationFormValues = z.infer<typeof medicationFormSchema> 