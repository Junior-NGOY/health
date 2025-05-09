"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";
//import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import { Consultation } from "@/types";


export const columns: ColumnDef<Consultation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: "Noms",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-1">
          {/*   <Image
            src={patient.imageUrl}
            alt={patient.firstName}
            width={512}
            height={512}
            className="w-10 h-10 rounded-full"
          /> */}
          <div className="">
            <h2 className="font-medium capitalize">
              {patient.patient.firstName.toLowerCase()} {patient.patient.firstName}{" "}
            </h2>
            <p className="text-xm text-muted-foreground">{patient.patient.email}</p>
          </div>
        </div>
      );
    }
  },
   {
    accessorKey: "gender",
    header: "Sexe",
    cell: ({ row }) => {
      const genre = row.original;
      return (
        <div className="">
             <h2 className="font-medium">{genre.patient.gender ?? ""}</h2>
        {/*   <p className="text-xm text-muted-foreground">
            {genre.emergencyContact ?? ""}
          </p> */}  
        </div>
      );
    }
  }, 
   {
    accessorKey: "phone",
    header: "Téléphone",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="">
             {/* <h2 className="font-medium">{patient.chiefComplaint ?? ""}</h2> */}
          <p className="text-xm text-muted-foreground">
            {patient.hospital ?? ""}
          </p>  
        </div>
      );
    }
  }, 
 
 /*  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        
      );
    }
  }, */

  {
    accessorKey: "rollNumber",
    header: "Matricule",
    cell: ({ row }) => {
      const rollNo = row.original;
      return (
        <div className="">
          <h2 className="font-medium">{rollNo.staffId ?? ""}</h2>
      {/*     <p className="text-xm text-muted-foreground">{rollNo.gender?? ""}</p> */}
        </div>
      );
    }
  },  
  /* {
    id: "action",
    header: "View",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("View", patient.appointments)}
        >
          View
        </Button>
      );
    }
  }, */
    /*  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => (
      <PatientInfoModal
        // onEdit={() => ""}
        // onDelete={() => ""}
        patient={row.original}
      />
    )
  },  */ 
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />
  },
/*   {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <ActionColumn
          row={row}
          model="patient"
          editEndpoint={`#`}
          id={patient.id}
        />
      );
    }
  } */
];
