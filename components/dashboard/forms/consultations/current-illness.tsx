"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useEffect, useState } from "react";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { getAllChefComplaints } from "@/actions/consultations";
import { Complaint } from "@/types";

export type SelectOptionProps = {
  label: string;
  value: string;
};
interface CurrentIllnessFormData {
  chiefComplaint: string;
  startDate: string;
  hma: string;
}
interface CurrentIllnessProps {
  formData: CurrentIllnessFormData;
  updateFormData: (data: Partial<CurrentIllnessFormData>) => void;
}
export default function CurrentIllness({
  formData,
  updateFormData
}: CurrentIllnessProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.startDate ? new Date(formData.startDate) : undefined
  );
  const [selectedComplaintOption, setSelectedComplaintOption] =
    useState<SelectOptionProps | null>(
      formData.chiefComplaint
        ? {
            label: formData.chiefComplaint,
            value: formData.chiefComplaint
          }
        : null
    );
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllChefComplaints().then((data) => {
      setComplaints(data);
      setIsLoading(false);
    });
  }, []);

  const complaintOptions = complaints?.map((complaint) => ({
    value: complaint?.id || "",
    label: `${complaint?.description}` || ""
  }));

  const handleDateChange = (date: Date | undefined) => {
    setStartDate(date);
    updateFormData({ startDate: date ? date.toISOString().split("T")[0] : "" });
  };

  const handleHmaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ hma: e.target.value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Motif de la consultation</CardTitle>
        {/*     <CardDescription>
          Décrivez l&apos, histoire de la maladie actuelle du patient
        </CardDescription> */}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading}
          <div className="space-y-2 md:col-span-2">
            <FormSelectInput
              label="Plainte principale"
              options={complaintOptions}
              option={selectedComplaintOption || { label: "", value: "" }}
              setOption={setSelectedComplaintOption}
              //setOption={handleComplaintChange}
              toolTipText="Ajouter une nouvelle plainte"
              href="/dashboard/patients/new" // Ajouter un lien vers la page de création de patient
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
                <Button
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP", { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
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
        </div>
        <div className="space-y-2">
          <Label htmlFor="illnessDescription">
            Histoire de la maladie Actuelle
          </Label>
          <Textarea
            id="illnessDescription"
            placeholder="Décrivez en détail l'histoire de la maladie actuelle, son évolution, les symptômes associés..."
            className="min-h-[150px]"
            value={formData.hma}
            onChange={handleHmaChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
