import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VitalSigns } from "@/types"


interface VitalSignsFormProps {
  vitalSigns: VitalSigns;
  setVitalSigns: (vitalSigns: Partial<VitalSigns>) => void;
}
export interface Staff {
  id: string;
  name: string;
  // autres propriétés du staff...
}
export default function VitalSignsForm({ vitalSigns, setVitalSigns }: VitalSignsFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setVitalSigns({
      ...vitalSigns,
      [name]: value
    });
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-semibold">Signes Vitaux</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="temperature">Température (°C)</Label>
          <Input
            id="temperature"
            name="temperature"
            type="number"
            step="0.1"
            placeholder="Entrer la température"
            value={vitalSigns.temperature}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="respirationRate">Fréquence Respiratoire (resp/min)</Label>
          <Input
            id="respirationRate"
            name="respirationRate"
            type="number"
            placeholder="Entrer la fréquence respiratoire"
            value={vitalSigns.respirationRate}
            onChange={handleInputChange}
          />
        </div>
  {/*       <div className="space-y-2">
          <Label htmlFor="oxygenSaturation">Saturation en oxygène (%)</Label>
          <Input
            id="oxygenSaturation"
            name="oxygenSaturation"
            type="number"
            step="0.1"
            placeholder="Entrer la saturation"
            value={vitalSigns.oxygenSaturation}
            onChange={handleInputChange}
          />
        </div> */}
   {/*      <div className="space-y-2">
          <Label htmlFor="bloodType">Groupe sanguin</Label>
          <Input
            id="bloodType"
            name="bloodType"
            placeholder="Entrer le groupe sanguin"
            value={vitalSigns.bloodType}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="height">Taille (cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            placeholder="Entrer la taille"
            value={vitalSigns.height}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Poids (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            placeholder="Entrer le poids"
            value={vitalSigns.weight}
            onChange={handleInputChange}
          />
        </div>
    {/*     <div className="space-y-2">
          <Label htmlFor="allergies">Allergies</Label>
          <Input
            id="allergies"
            name="allergies"
            placeholder="Entrer les allergies"
            value={vitalSigns.allergies}
            onChange={handleInputChange}
          />
        </div> */}
     
     
        <div className="space-y-2">
          <Label htmlFor="pa">Pression artérielle</Label>
          <Input
            id="pa"
            name="pa"
            type="number"
            placeholder="Entrer la PA"
            value={vitalSigns.pa}
            onChange={handleInputChange}
          />
        </div>
     {/*    <div className="space-y-2">
          <Label htmlFor="pulse">Pouls (bpm)</Label>
          <Input
            id="pulse"
            name="pulse"
            type="number"
            placeholder="Entrer le pouls"
            value={vitalSigns.pulse}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="space-y-2">
          <Label htmlFor="ta">Tension artérielle</Label>
          <Input
            id="ta"
            name="ta"
            placeholder="ex: 120/80"
            value={vitalSigns.ta}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ddr">Date des dernières règles</Label>
          <Input
            id="ddr"
            name="ddr"
            type="date"
            value={vitalSigns.ddr}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dpa">{"Date prévue d'accouchement"}</Label>
          <Input
            id="dpa"
            name="dpa"
            type="date"
            value={vitalSigns.dpa}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pc">Périmètre crânien (cm)</Label>
          <Input
            id="pc"
            name="pc"
            type="number"
            step="0.1"
            placeholder="Entrer le périmètre crânien"
            value={vitalSigns.pc}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="imc">IMC</Label>
          <Input
            id="imc"
            name="imc"
            type="number"
            step="0.1"
            placeholder="Entrer l'IMC"
            value={vitalSigns.imc}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
    <Label htmlFor="pas">PAS (mmHg)</Label>
    <Input
      id="pas"
      name="pas"
      type="number"
      placeholder="Pression artérielle systolique"
      value={vitalSigns.pas}
      onChange={handleInputChange}
    />
  </div>
  <div className="space-y-2">
    <Label htmlFor="pad">PAD (mmHg)</Label>
    <Input
      id="pad"
      name="pad"
      type="number"
      placeholder="Pression artérielle diastolique"
      value={vitalSigns.pad}
      onChange={handleInputChange}
    />
  </div>

  <div className="space-y-2">
    <Label htmlFor="fc">Fréquence cardiaque (bpm)</Label>
    <Input
      id="fc"
      name="fc"
      type="number"
      placeholder="Fréquence cardiaque"
      value={vitalSigns.fc}
      onChange={handleInputChange}
    />
  </div>

{/*   <div className="space-y-2">
    <Label htmlFor="fr">Fréquence respiratoire</Label>
    <Input
      id="fr"
      name="fr"
      type="number"
      placeholder="Respirations par minute"
      value={vitalSigns.fr}
      onChange={handleInputChange}
    />
  </div> */}

  <div className="space-y-2">
    <Label htmlFor="spo2">SpO2 (%)</Label>
    <Input
      id="spo2"
      name="spo2"
      type="number"
      step="0.1"
      min="0"
      max="100"
      placeholder="Saturation en oxygène"
      value={vitalSigns.spo2}
      onChange={handleInputChange}
    />
  </div>
  <div className="space-y-2 sm:col-span-4">
          <Label htmlFor="notes">Notes</Label>
          <Input
            id="notes"
            name="notes"
            placeholder="Entrer les notes"
            value={vitalSigns.notes}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}