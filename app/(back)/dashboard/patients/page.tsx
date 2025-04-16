import React from "react";

//import { Contact } from "@prisma/client";
import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/dashboard/Tables/TableHeader";

import { columns } from "./columns";
import { Patient } from "@/types";
//import { getAllPatients } from "@/actions/patients";


export default async function page() {
 // const patients: Patient[] = (await getAllPatients()) || [];
  const patients: Patient[] =  [];
  
  return (
    <div className="p-8">
      <TableHeader
        title="Patients"
        linkTitle="Add patient"
        href="/dashboard/patients/new"
        data={patients}
        model="patient"
      />
      <div className="py-8">
        <DataTable data={patients} columns={columns} />
      </div>
    </div>
  );
}
