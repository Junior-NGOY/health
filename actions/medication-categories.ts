"use server";
import { Category } from "@/types";
import { api } from "./hospitals";
import axios from "axios";
 

export async function getAllCategories() {
  try {
    const response = await api.get("/medication-categories");
    
    if (!response.data || response.data.error) {
      throw new Error(response.data?.error || "Impossible de récupérer les catégories");
    }

    const categories = response.data.data || [];
    return categories;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching categories:", error);
      return []; // Return empty array instead of throwing
    }
    console.error("Unexpected error:", error);
    return []; // Return empty array for unexpected errors
  }
}

export async function createCategory(data: Omit<Category, "id">) {
    try {
      const response = await api.post("/medication-categories", data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create category");
    }
  }
  
  export async function updateCategory(id: string, data: Partial<Category>) {
    try {
      const response = await api.put(`/medication-categories/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update category");
    }
  }
  
  export async function deleteCategory(id: string) {
    try {
      await api.delete(`/medication-categories/${id}`);
      return true;
    } catch (error) {
      throw new Error("Failed to delete category");
    }
  }