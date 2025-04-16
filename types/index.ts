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
    familyHistory: Array<{
      id: string;
      relationship: string;
      condition: string;
      age: string;
      status: string;
      notes: string;
    }>;
    lifestyle: {
      smoking: {
        status: string;
        quantity: string;
        duration: string;
        quitDate: string;
        packsPerYear: number;
      };
      alcohol: {
        status: string;
        frequency: string;
        type: string;
        quantity: string;
      };
      diet: {
        type: string;
        restrictions: string;
        habits: string;
        notes: string;
      };
      physicalActivity: {
        frequency: string;
        type: string;
        duration: string;
        intensity: string;
      };
      sleep: {
        quality: string;
        duration: string;
        problems: string;
        notes: string;
      };
    };
    socialHistory: {
      occupation: {
        current: string;
        duration: string;
        exposures: string;
        schedule: string;
      };
      livingConditions: {
        type: string;
        location: string;
        household: string;
        dependents: string;
      };
      stress: {
        level: string;
        sources: string[];
        copingMechanisms: string;
      };
    };
    allergies: Array<{
      id: string;
      type: string;
      allergen: string;
      reaction: string;
      severity: string;
      diagnosis: string;
    }>;
    vaccinations: Array<{
      id: string;
      name: string;
      date: string;
      nextDue: string;
      status: string;
    }>;
    gynecologicalHistory: GynecologicalHistory;
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