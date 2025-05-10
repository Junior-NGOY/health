export type PatientProps = {
    fileNumber: string;
    title: string;
    name: string;
    firstName: string;
    lastName?: string;
    email?: string;
    gender: string;
    bloodType: string;
    maritalStatus: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    admissionDate: string;
    address: string;
    emergencyContact?: string;
    profession: string;
    category: string;
   // regNo: string;
  };

  export type ConsultationProps = {
    patientId: string;      }