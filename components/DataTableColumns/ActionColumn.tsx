import Link from "next/link";
//import { deleteContact } from "@/actions/admin";

type RowType = {
  isActive?: boolean;
  // Add other properties as needed
};

type ActionColumnProps = {
  row: RowType;
  model: string;
  editEndpoint: string;
  id: string | undefined;
  // revPath: string;
};

export default function ActionColumn({
  //row,
  model,
  editEndpoint,
  id = ""
}: ActionColumnProps) {
  //const isActive = row.isActive;
  async function handleDelete() {
    try {
      if (model === "contact") {
        //const res = await deleteContact(id);
        //const res = "";
      }
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  return (
    <div>
      <Link href={`${editEndpoint}/${id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
