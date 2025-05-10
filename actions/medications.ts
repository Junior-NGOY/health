"use server"
import axios from "axios";
import { api } from "./hospitals";
import { z } from "zod";
import { generateSlug } from "@/lib/generateSlug";
import { medicationFormSchema } from "@/types";


  export async function getAllMedications() {
    try {
      const response = await api.get("/medications");
      
      if (!response.data || response.data.error) {
        throw new Error(response.data?.error || "Impossible de récupérer les médicaments");
      }
  
      const medications = response.data.data.medications || [];
      return medications;
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching medications:", error);
        return []; // Return empty array instead of throwing
      }
      console.error("Unexpected error:", error);
      return []; // Return empty array for unexpected errors
    }
  }

  export async function createMedication(data: z.infer<typeof medicationFormSchema>) {
    try {
      // Generate slug from medication name
      const slug = generateSlug(data.name);
  
      // Add slug to the medication data
      const medicationData = {
        ...data,
        slug: slug
      };
  
      const response = await api.post("/medications", medicationData);
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
  
      return response.data;
    } catch (error) {
      console.error("Error creating medication:", error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Erreur lors de la création du médicament";
        throw new Error(message);
      }
      throw error;
    }
  }