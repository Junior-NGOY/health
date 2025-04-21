"use server";
import axios from "axios";
import { api } from "./hospitals";
import { PatientProps } from "@/types/props";
import { revalidatePath } from "next/cache";
 
 

//const BASE_API_URL = process.env.API_URL || "";

export async function createPatient(data: PatientProps) {
  try {
    //send the data to the api
    const response = await api.post("/patients", data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      //type-safe error
      const message =
        error.response?.data?.message || "Failed to create patient";
     // throw new Error(message);
      console.log(message);
    } 
    throw error;
  }
}

export async function deletePatient(id: string) {
  console.log("deleted", id);
  return {
    ok: true
  };
}

export async function getPatientNextSequence() {
  try {
    //send the data to the api
    const response = await api.get("/patients/seq");
   // revalidatePath("/dashboard/patients");
    const nextSeq = response.data;
    return nextSeq as number;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //type-safe error
      
      const message =
        error.response?.data?.message || "Failed to get next sequence";
      throw new Error(message);
    }
    throw error;
  }
}

export async function getAllPatients() {
  try {
    const response = await api.get("/patients");
    
    // Check if response has the expected structure
    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || "Impossible de récupérer les patients");
    }

    // Extract patients array from the response data structure
    const patients = response.data.data|| [];
    return patients;

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
