"use client"

import { useEffect, useState } from "react"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import { Patient } from "@/types"


interface PatientInfoFormProps {
  selectedPatient: Patient | null
  setSelectedPatient: (patient: Patient | null) => void
  onAddNewPatient: () => void
  allowSearch: boolean
  patients: Patient[];
}
export type SelectOptionProps = {
  label: string;
  value: string;
};
export default function PatientInfoForm({
  selectedPatient,
  setSelectedPatient,
 // onAddNewPatient,
  allowSearch,
  patients,
}: PatientInfoFormProps) {
  console.log('Patients value:', patients)
  console.log('Patients type:', Object.prototype.toString.call(patients))
  console.log('Is Array?:', Array.isArray(patients))
  //const [searchQuery, setSearchQuery] = useState("")
 // const [searchResults, setSearchResults] = useState<Patient[]>([])
  const [selectedPatientOption, setSelectedPatientOption] = useState<SelectOptionProps | null>(null);
  
 /*    const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchPatients(searchQuery)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }  */ 
    const patientOptions: SelectOptionProps[] = Array.isArray(patients) 
    ? patients.map((patient) => ({
        value: patient.id,
        label: `${patient.firstName} ${patient.lastName}`,
      }))
    : []
  useEffect(() => {
    if (selectedPatientOption && patients) {
      const selectedPatient = patients.find((patient) => patient.id === selectedPatientOption.value);
      setSelectedPatient(selectedPatient || null);
    }

  }, [selectedPatientOption, patients, setSelectedPatient]);

  useEffect(() => {
    if (selectedPatient) {
      const selectedPatientOption = {
        value: selectedPatient.id,
        label: `${selectedPatient.firstName} ${selectedPatient.lastName} ${selectedPatient.firstName}`,
      };
      setSelectedPatientOption(selectedPatientOption);
    }
  }, [selectedPatient]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold">Informations du Patient</h2>
      </div>

      {allowSearch && (
        <div className="space-y-2">
          <div className="flex space-x-2">
          <FormSelectInput
              label="Patient..."
              options={patientOptions}
              option={selectedPatientOption || { label: "", value: "" }}
              setOption={setSelectedPatientOption}
              toolTipText="Ajouter un nouveau patient"
              href="/dashboard/patients/new"  // Ajouter un lien vers la page de création de patient
              className="w-full "
            />
          </div>
         {/*  {searchResults.length > 0 && (
            <ul className="mt-2 border rounded-md divide-y">
              {searchResults.map((patient) => (
                <li
                  key={patient.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  {patient.firstName} {patient.lastName}  
                </li>
              ))}
            </ul>
          )} */}
        </div>
      )}

      {selectedPatient && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoField label="Nom" value={selectedPatient.firstName} />
              <InfoField label="Postnom" value={selectedPatient.lastName} />
              <InfoField label="Prénom" value={selectedPatient.firstName} />
              <InfoField label="Sexe" value={selectedPatient.gender} />
              <InfoField label="Date de Naissance" value={selectedPatient.dateOfBirth} />
              <InfoField label="Age" value={selectedPatient?.age || ""} />
              <InfoField label="Catégorie" value={selectedPatient.category} />
              <InfoField label="Num Doss." value={selectedPatient.fileNumber} />
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedPatient && (
        <div className="text-center text-gray-500 p-4">
          {allowSearch
            ? "Veuillez rechercher et sélectionner un patient."
            : "Aucun patient sélectionné. Veuillez sélectionner un patient dans la file d'attente."}
        </div>
      )}
    </div>
  )
}

function InfoField({ label, value, className = "" }: { label: string; value: string|number; className?: string }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <Label className="font-medium">{label}</Label>
      <div className="p-2 bg-gray-100 rounded text-gray-800">{value}</div>
    </div>
  )
}

