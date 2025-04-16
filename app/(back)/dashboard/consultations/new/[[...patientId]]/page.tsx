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
    <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:py-10 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Consultation Médicale</h1>
       <MedicalRecordForm params={resolvedParams} />
    </div>
  )
}

