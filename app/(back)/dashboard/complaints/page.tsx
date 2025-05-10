"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getAllChefComplaints } from "@/actions/complaints"
import { Complaint } from "@/types"

export default function ComplaintsPage() {
  const router = useRouter()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchComplaints() {
      try {
        const data = await getAllChefComplaints()
        setComplaints(data)
      } catch (error) {
        console.error("Error fetching complaints:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComplaints()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Liste des Plaintes</CardTitle>
            <CardDescription>
              Gérez les plaintes courantes des patients
            </CardDescription>
          </div>
          <Button
            onClick={() => router.push("/dashboard/complaints/new")}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Nouvelle Plainte
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Chargement...
                  </TableCell>
                </TableRow>
              ) : complaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Aucune plainte trouvée
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          router.push(`/dashboard/complaints/${complaint.id}`)
                        }
                      >
                        Éditer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}