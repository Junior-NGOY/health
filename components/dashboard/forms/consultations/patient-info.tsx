"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useState } from "react"

export default function PatientInfo() {
  const [date, setDate] = useState<Date>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du Patient</CardTitle>
        <CardDescription>Saisissez les informations d&apos;identification du patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input id="lastName" placeholder="Nom du patient" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input id="firstName" placeholder="Prénom du patient" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date de naissance</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'} className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Sexe</Label>
            <Select>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculin</SelectItem>
                <SelectItem value="female">Féminin</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input id="address" placeholder="Adresse du patient" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input id="phone" placeholder="Numéro de téléphone" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email du patient" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Assurance</Label>
            <Select>
              <SelectTrigger id="insurance">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Assurance publique</SelectItem>
                <SelectItem value="private">Assurance privée</SelectItem>
                <SelectItem value="none">Aucune</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Contact d&apos;urgence</Label>
            <Input id="emergencyContact" placeholder="Nom du contact d'urgence" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Téléphone d&apos;urgence</Label>
            <Input id="emergencyPhone" placeholder="Numéro du contact d'urgence" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relationship">Relation</Label>
            <Input id="relationship" placeholder="Relation avec le patient" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

