"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Phone,
  Flag,
  MapPin,
  Book,
  Calendar,
  CreditCard,
  Users,
  Clock,
  Edit,
  Trash2,
  School,
  Bookmark,
  ArrowUp01
} from "lucide-react";
 
import { Patient } from "@/types";
//import { addPatientToQueue } from "@/actions/queues";
//import toast from "react-hot-toast";
//import { QueueProps } from "../forms/patients/patient-queue";
import { useRouter } from "next/navigation";

interface PatientInfoModalProps {
  patient: Patient;
   onEdit: (patient: Patient) => void;
  // onDelete: (student: Student) => void;
}

export function PatientInfoModal({
  patient,
}: // onEdit,
// onDelete
PatientInfoModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  /* const handleAddToQueue = async () => {
    const data: QueueProps = {
      patientId: patient.id,
      arrivalTime: new Date().toISOString(),
      status: "WAITING",
      patientName:patient.name,
      patientFirstName: patient.firstName,
      patientLastName:patient.lastName,
      patientRegNo:patient.regNo,
      patientGender:patient.gender,
      patientPhoneNumber:patient.phoneNumber, 
    };
    console.log("data modale...", data); 
    try {
      setLoading(true);
      console.log("data modale", data);
      await addPatientToQueue(data );
      toast.success("Patient added to queue successfully"); // Optionnel : afficher une notification
      router.push("/dashboard/queues");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add patient to queue"); // Optionnel : afficher une notification
    } finally {
      setLoading(false);
    }
  }; */
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Voir</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Patient Information</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh] px-4 py-2">
          <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
            <Avatar className="w-24 h-24 mb-2 md:mb-0 md:mr-4">
              <AvatarImage
                src={""}
                alt={`${patient.firstName} ${patient.lastName}`}
              />
              <AvatarFallback>
                {patient.firstName[0]}
                {patient.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className=" text-xs text-muted-foreground">ID: {patient.id}</p>
            {/*   <p className=" text-xs text-muted-foreground">
                Roll No: {patient.regNo}
              </p>
              <p className=" text-xs text-muted-foreground">
                Reg No: {patient.regNo}
              </p> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem icon={<Mail />} label="Email" value={patient?.email || "" } />
           {/*  <InfoItem icon={<Phone />} label="Phone" value={patient.phoneNumber} />
            <InfoItem
              icon={<MapPin />}
              label="Address"
              value={patient.address}
            /> */}
       {/*      <InfoItem
              icon={<Flag />}
              label="Nationality"
              value={patient.nationality}
            /> */}
{/*             <InfoItem icon={<MapPin />} label="State" value={patient.maritalStatus} /> */}
            <InfoItem icon={<Users />} label="Gender" value={patient.gender} />
            <InfoItem
              icon={<Calendar />}
              label="Date of Birth"
              value={format(new Date(patient.dateOfBirth), "PP")}
            />
           {/*  <InfoItem
              icon={<Book />}
              label="Religion"
              value={patient.religion}
            />
            <InfoItem icon={<CreditCard />} label="BCN" value={patient.BCN} />*/}
         {/*    <InfoItem
              icon={<School />}
              label="Profession"
              value={patient?.profession || "N/A"}
            /> */}
            <InfoItem
              icon={<Bookmark />}
              label="Contact d'urgence"
              value={patient?.emergencyContact || "N/A"}
            />
            <InfoItem
              icon={<User />}
              label="Catégorie"
              value={patient?.category }
            /> 
            <InfoItem
              icon={<Calendar />}
              label="Admission Date"
              value={format(new Date(patient.createdAt), "PP")}
            />
            <InfoItem
              icon={<Clock />}
              label="Created At"
              value={format(new Date(patient.createdAt), "PPp")}
            />
            <InfoItem
              icon={<Clock />}
              label="Updated At"
              value={format(new Date(patient.updatedAt), "PPp")}
            />
          </div>
        </ScrollArea>
        <div className="flex justify-end space-x-2 mt-4">
          {/* <Button variant="outline" onClick={handleAddToQueue} disabled={loading}>
            <ArrowUp01 className="w-4 h-4 mr-2" />
            {"File d'attente"}
          </Button> */}
          <Button variant="destructive" /* onClick={onDelete} */>
            <Trash2 className="w-4 h-4 mr-2" />
            Annuler
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
