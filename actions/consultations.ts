import { Consultation } from "@/types";
import { api } from "./hospitals";
import axios from "axios";

export async function getAllConsultations() {
    try {
      //send the data to the api
      const response = await api.get("/consultations");
      const consultations = response.data;
      return consultations as Consultation[];
    } catch (error: any) {
      if (axios.isAxiosError(Error)) {
        //type-safe error
        const message = error.response?.data?.message || "Failed to get consultation";
        throw new Error(message);
      }
      throw error;
      console.log(error);
    }
  }

  export async function getAllChefComplaints() {
    try {
      const response = await api.get("/chefcomplaints");
      
      // Check if response has the expected structure
      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || "Impossible de récupérer les patients");
      }
  
      // Extract patients array from the response data structure
      const chefcomplaints = response.data.data|| [];
      return chefcomplaints;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Erreur lors de la récupération des patients";
        console.error("Error fetching patients:", error);
        return []; // Return empty array instead of throwing
      }
      console.error("Unexpected error:", error);
      return []; // Return empty array for unexpected errors
    }
  }