"use server";
import axios from "axios";
import { api } from "./hospitals";
import { generateSlug } from "@/lib/generateSlug";

export async function getAllChefComplaints() {
    try {
      const response = await api.get("/chefcomplaints");
      
      // Check if response has the expected structure
      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || "Impossible de récupérer les plaintes");
      }
  
      // Extract complaints array from the response data structure
      const chefcomplaints = response.data.data|| [];
      console.log(chefcomplaints)
      return chefcomplaints;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Erreur lors de la récupération des plaintes";
        console.error("Error fetching plaintes:", error);
        return []; // Return empty array instead of throwing
      }
      console.error("Unexpected error:", error);
      return []; // Return empty array for unexpected errors
    }
}

export async function createComplaint(data: { description: string }) {
  try {
    // Générer le slug à partir de la description
    const slug = generateSlug(data.description);

    // Ajouter le slug aux données envoyées
    const complaintData = {
      ...data,
      slug: slug
    };

    const response = await api.post("/chefcomplaints", complaintData);
    return response.data;
  } catch (error) {
    console.error("Error creating complaint:", error);
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Erreur lors de la création de la plainte";
      throw new Error(message);
    }
    throw error;
  }
}