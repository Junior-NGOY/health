import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { UserPlus, Users } from "lucide-react";
import SinglePatientForm from "@/components/dashboard/forms/patients/patient-form";
import { getPatientNextSequence } from "@/actions/patients";
import { Metadata } from "next";
//import SingleStudentForm from "@/components/dashboard/forms/students/student-form";
//import BulkStudentForm from "@/components/dashboard/forms/students/bulk-student-form";
//import { InfoBanner } from "@/components/ui/info-banner";
//import { getAllClasses } from "@/actions/classes";
//import { getAllParents } from "@/actions/parents";
 
export const metadata: Metadata = {
  title: "Nouvelle Admission | Patients",
  description: "Formulaire d'admission d'un nouveau patient"
}
export default async function AdmissionTabs() {
  let nextSequence: number
  
  try {
    nextSequence = await getPatientNextSequence()
  } catch (error) {
    console.error("Failed to get next sequence:", error)
    nextSequence = 1 // fallback value
  }

  
  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Patient Admission
          </CardTitle>
          <CardDescription className="text-center">
            Choose between single or bulk patient admission
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="single"
                className="flex items-center justify-center py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Patient privé
              </TabsTrigger>
              <TabsTrigger
                value="bulk"
                className="flex items-center justify-center py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="mr-2 h-4 w-4" />
                Patient abonné
              </TabsTrigger>
            </TabsList>
            <Card className="border-t-4 border-blue-600 shadow">
              <CardContent className="">
                <TabsContent value="single">
                  {/*   <InfoBanner
                    message="Veuillez vous assurer que vous avez déjà créé le parent, la classe et le flux pour cet élève."
                    type="warning"
                  /> */}
                  <SinglePatientForm
                    nextSeq={nextSequence}
                   /* classes={classes}
                    parents={parents} */
                  />
                </TabsContent>
                <TabsContent value="bulk">
                  {/*  <BulkStudentForm /> */}
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
