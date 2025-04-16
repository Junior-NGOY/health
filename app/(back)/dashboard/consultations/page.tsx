import React from "react";

//import { Contact } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";

import { columns } from "./columns";
import { Consultation} from "@/types";
//import { getAllConsultations } from "@/actions/consultations";



export default async function page() {
  const consultations: Consultation[] =  [];
 // const consultations: Consultation[] = (await getAllConsultations()) || [];
  
  return (
    <div className="p-8">
      <TableHeader
        title="Consultations"
        linkTitle="New Consultation"
        href="/dashboard/consultations/new"
        data={consultations}
        model="patient"
      />
      <div className="py-8">
        <DataTable data={consultations} columns={columns} />
      </div>
    </div>
  );
}
