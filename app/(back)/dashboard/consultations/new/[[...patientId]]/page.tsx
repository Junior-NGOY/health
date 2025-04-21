import MedicalRecordForm from "@/components/dashboard/forms/consultations/medical-record-form"
 
interface PageProps {
  params: Promise<{
    patientId?: string[];
  }>;
}
 
 

export interface ConsultationNotes {
  mainComplaint: string
  medicalHistory: string
  clinicalExamination: string
  paraclinicalExamination: string
  treatment: string
  additionalNotes: string
}



export default async function MedicalConsultation({ params}: PageProps) {

  const resolvedParams = await params;
  return (
    <div className="">

       <MedicalRecordForm params={resolvedParams} />
    </div>
  )
}

