"use server";
import { Consultation } from "@/types";
import { api } from "./hospitals";
import axios from "axios";
import { ConsultationProps } from "@/types/props";

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

export async function createConsultation(data: ConsultationProps) {
  try {
    //send the data to the api
    const response = await api.post("/consultations", data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      //type-safe error
      const message =
        error.response?.data?.message || "Failed to create consultation";
     // throw new Error(message);
      console.log(message);
    } 
    throw error;
  }
}


