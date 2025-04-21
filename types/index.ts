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
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    consultations: Consultation[];
  };