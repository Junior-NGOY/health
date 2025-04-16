"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useEffect, useState } from "react"
import FormSelectInput from "@/components/FormInputs/FormSelectInput"
import { getAllChefComplaints } from "@/actions/consultations"
import { Complaint } from "@/types"


export type SelectOptionProps = {
  label: string;
  value: string;
};
interface CurrentIllnessFormData {
  chiefComplaint: string;
  startDate: string;
  severity: string;
  illnessDescription: string;
  symptoms: string;
  aggravatingFactors: string;
  relievingFactors: string;
  previousTreatments: string;
}
interface CurrentIllnessProps {
  formData: CurrentIllnessFormData;
  updateFormData: (data: Partial<CurrentIllnessFormData>) => void;
}
export default function CurrentIllness({ formData, updateFormData }: CurrentIllnessProps) {
 const [startDate, setStartDate] = useState<Date | undefined>(
  formData.startDate ? new Date(formData.startDate) : undefined
);
  const [selectedComplaintOption, setSelectedComplaintOption] = useState<SelectOptionProps | null>(  formData.chiefComplaint ? { 
    label: formData.chiefComplaint, 
    value: formData.chiefComplaint 
  } : null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      getAllChefComplaints().then((data) => {
        setComplaints(data);
        setIsLoading(false);
      })
    }, []);
    const complaintOptions  = complaints?.map((complaint) => ({
      value: complaint?.id || "",
      label: `${complaint?.description}  ` ||"",
    }));
  
  // Ajouter des gestionnaires d'événements pour mettre à jour les données
  const handleComplaintChange = (option: SelectOptionProps | null) => {
    setSelectedComplaintOption(option);
    updateFormData({ chiefComplaint: option?.label || "" });
  };

  const handleDateChange = (date: Date | undefined) => {
    setStartDate(date);
    updateFormData({ startDate: date ? date.toISOString().split('T')[0] : "" });
  };

  const handleSeverityChange = (value: string) => {
    updateFormData({ severity: value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ illnessDescription: e.target.value });
  };

  const handleSymptomsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ symptoms: e.target.value });
  };

  const handleAggravatingFactorsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ aggravatingFactors: e.target.value });
  };

  const handleRelievingFactorsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ relievingFactors: e.target.value });
  };

  const handlePreviousTreatmentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ previousTreatments: e.target.value });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histoire de la Maladie Actuelle</CardTitle>
        <CardDescription>Décrivez l&apos,histoire de la maladie actuelle du patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading}
          <div className="space-y-2 md:col-span-2">
              <FormSelectInput
                        label="Plainte principale"
                        options={complaintOptions}
                        option={selectedComplaintOption || { label: "", value: "" }}
                        //setOption={setSelectedComplaintOption}
                        setOption={handleComplaintChange}
                        toolTipText="Ajouter une nouvelle plainte"
                        href="/dashboard/patients/new"  // Ajouter un lien vers la page de création de patient
                        className="w-full "
                       // isLoading={isLoading}
                      />
              {selectedComplaintOption && (
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Plainte sélectionnée :</p>
                  <p className="text-sm">{selectedComplaintOption.label}</p>
                </div>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Date de début des symptômes</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
              <Calendar 
  mode="single" 
  selected={startDate || undefined} 
  onSelect={handleDateChange} 
  initialFocus 
  locale={fr} 
/>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="severity">Sévérité</Label>
            <Select onValueChange={handleSeverityChange} defaultValue={formData.severity}>
              <SelectTrigger id="severity">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mild">Légère</SelectItem>
                <SelectItem value="moderate">Modérée</SelectItem>
                <SelectItem value="severe">Sévère</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="illnessDescription">Description détaillée</Label>
          <Textarea
            id="illnessDescription"
            placeholder="Décrivez en détail l'histoire de la maladie actuelle, son évolution, les symptômes associés..."
            className="min-h-[150px]"
            value={formData.illnessDescription}
            onChange={handleDescriptionChange}
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptômes associés</Label>
            <Textarea
              id="symptoms"
              placeholder="Listez les symptômes associés à la maladie actuelle"
              className="min-h-[100px]"
              value={formData.symptoms}
              onChange={handleSymptomsChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aggravatingFactors">Facteurs aggravants</Label>
            <Textarea
              id="aggravatingFactors"
              placeholder="Facteurs qui aggravent les symptômes"
              className="min-h-[80px]"
              value={formData.aggravatingFactors}
              onChange={handleAggravatingFactorsChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relievingFactors">Facteurs soulageants</Label>
            <Textarea
              id="relievingFactors"
              placeholder="Facteurs qui soulagent les symptômes"
              className="min-h-[80px]"
              value={formData.relievingFactors}
              onChange={handleRelievingFactorsChange}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="previousTreatments">Traitements antérieurs pour cette maladie</Label>
          <Textarea
            id="previousTreatments"
            placeholder="Décrivez les traitements déjà essayés pour cette maladie et leurs résultats"
            className="min-h-[100px]"
            value={formData.previousTreatments}
            onChange={handlePreviousTreatmentsChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

