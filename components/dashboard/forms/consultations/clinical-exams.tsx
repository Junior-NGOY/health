"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Base de données des examens cliniques avec leurs sous-options
const examsDatabase = [
  {
    id: "tete-cou",
    name: "Tête et cou",
    options: [
      "Cheveux coloreux et non cassant",
      "Cheveux roux et cassant",
      "Conjonctives palpebrales : coloré, pale",
      "Conjonctives bulbaires : aniterique, icterique",
      "Pupilles : isocoriques, anisocoriques",
      "Reflexe photomoteur : présent, absent",
      "Cou : souple, raide",
      "Thyroïde : normale, augmentée de volume",
    ],
  },
  {
    id: "thorax",
    name: "Thorax",
    options: [
      "Symétrique",
      "Asymétrique",
      "Bonne ampliation thoracique",
      "Ampliation thoracique limitée",
      "Murmure vésiculaire pur",
      "Râles crépitants",
      "Râles sibilants",
      "Frottements pleuraux",
    ],
  },
  {
    id: "abdomen",
    name: "Abdomen",
    options: [
      "Souple",
      "Tendu",
      "Dépressible",
      "Défense",
      "Contracture",
      "Douloureux à la palpation",
      "Indolore",
      "Bruits hydro-aériques présents",
      "Bruits hydro-aériques absents",
    ],
  },
  {
    id: "membres-sup",
    name: "Membres supérieurs",
    options: [
      "Mobilité normale",
      "Mobilité réduite",
      "Force musculaire normale",
      "Force musculaire diminuée",
      "Sensibilité normale",
      "Sensibilité altérée",
      "Réflexes normaux",
      "Réflexes diminués",
      "Réflexes absents",
    ],
  },
  {
    id: "membres-inf",
    name: "Membres inférieurs",
    options: [
      "Mobilité normale",
      "Mobilité réduite",
      "Force musculaire normale",
      "Force musculaire diminuée",
      "Sensibilité normale",
      "Sensibilité altérée",
      "Réflexes normaux",
      "Réflexes diminués",
      "Réflexes absents",
      "Œdèmes",
      "Signes de phlébite",
    ],
  },
  {
    id: "toucher-rectal",
    name: "Toucher rectal",
    options: [
      "Sphincter tonique",
      "Sphincter hypotonique",
      "Prostate normale",
      "Prostate hypertrophiée",
      "Prostate douloureuse",
      "Prostate nodulaire",
      "Présence de sang",
      "Absence de sang",
      "Douleur à l'examen",
      "Examen indolore",
    ],
  },
  {
    id: "toucher-vaginal",
    name: "Toucher vaginal",
    options: [
      "Col utérin normal",
      "Col utérin inflammatoire",
      "Utérus de taille normale",
      "Utérus augmenté de volume",
      "Annexes libres",
      "Masse annexielle",
      "Douleur à la mobilisation utérine",
      "Absence de douleur",
      "Leucorrhées présentes",
      "Leucorrhées absentes",
    ],
  },
  {
    id: "conclusion",
    name: "Conclusion",
    options: [
      "Examen normal",
      "Anomalies mineures",
      "Anomalies significatives",
      "Nécessite des examens complémentaires",
      "Nécessite une consultation spécialisée",
      "Nécessite une hospitalisation",
    ],
  },
]
interface ClinicalExamsProps {
  formData: {
    selectedOptions: Record<string, string[]>;
    temperature: string;
    bloodPressure: string;
    heartRate: string;
    respiratoryRate: string;
    clinicalConclusion: string;
  };
  updateFormData: (data: Partial<ClinicalExamsProps['formData']>) => void;
}
export default function ClinicalExams({ formData, updateFormData }: ClinicalExamsProps) {
  const [activeExam, setActiveExam] = useState(examsDatabase[0].id)
  const [openExamSelector, setOpenExamSelector] = useState(false)
  //const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})

  // Trouver l'examen actif
  const currentExam = examsDatabase.find((exam) => exam.id === activeExam) || examsDatabase[0]

  // Gérer la sélection/désélection d'une option
  const toggleOption = (option: string) => {
    const currentOptions = formData.selectedOptions[activeExam] || []
    
    const newSelectedOptions = {
      ...formData.selectedOptions,
      [activeExam]: currentOptions.includes(option)
        ? currentOptions.filter(item => item !== option)
        : [...currentOptions, option]
    }

    updateFormData({ selectedOptions: newSelectedOptions })
  }

  // Obtenir toutes les options sélectionnées pour tous les examens
  const getAllSelectedOptions = () => {
    const allOptions: { category: string; options: string[] }[] = []

    Object.keys(formData.selectedOptions).forEach((examId) => {
      const exam = examsDatabase.find((e) => e.id === examId)
      if (exam && formData.selectedOptions[examId].length > 0) {
        allOptions.push({
          category: exam.name,
          options: formData.selectedOptions[examId],
        })
      }
    })

    return allOptions
  }

  // Envoyer les données à la base de données
/*   const saveExamData = () => {
    const dataToSave = getAllSelectedOptions()
    console.log("Données à envoyer à la base de données:", dataToSave)
    // Ici, vous ajouteriez la logique pour envoyer les données à votre base de données
    alert("Données enregistrées avec succès!")
  } */

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Examens Cliniques</CardTitle>
        <CardDescription>Sélectionnez les résultats des examens cliniques du patient</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <Popover open={openExamSelector} onOpenChange={setOpenExamSelector}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto justify-between">
                {currentExam.name}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Rechercher un examen..." />
                <CommandList>
                  <CommandEmpty>Aucun examen trouvé.</CommandEmpty>
                  <CommandGroup>
                    {examsDatabase.map((exam) => (
                      <CommandItem
                        key={exam.id}
                        value={exam.id}
                        onSelect={() => {
                          setActiveExam(exam.id)
                          setOpenExamSelector(false)
                        }}
                      >
                        <Check className={`mr-2 h-4 w-4 ${activeExam === exam.id ? "opacity-100" : "opacity-0"}`} />
                        {exam.name}
                        {formData.selectedOptions[exam.id]?.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {formData.selectedOptions[exam.id].length}
                          </Badge>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => {
              const customOption = prompt("Entrez une option personnalisée pour " + currentExam.name)
              if (customOption && customOption.trim()) {
                toggleOption(customOption.trim())
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Ajouter une option personnalisée
          </Button>
        </div>

        <Separator />

        <Tabs value={activeExam} onValueChange={setActiveExam} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto">
            {examsDatabase.map((exam) => (
              <TabsTrigger key={exam.id} value={exam.id} className="relative">
                {exam.name}
                {formData.selectedOptions[exam.id]?.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {formData.selectedOptions[exam.id].length}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {examsDatabase.map((exam) => (
            <TabsContent key={exam.id} value={exam.id} className="space-y-4 mt-4">
              <h3 className="text-lg font-medium">{exam.name}</h3>

              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {exam.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${exam.id}-option-${index}`}
                        checked={formData.selectedOptions[exam.id]?.includes(option) || false}
                        onCheckedChange={() => toggleOption(option)}
                      />
                      <Label htmlFor={`${exam.id}-option-${index}`} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}

                  {/* Afficher les options personnalisées ajoutées */}
                  {formData.selectedOptions[exam.id]
                    ?.filter((opt) => !exam.options.includes(opt))
                    .map((customOpt, idx) => (
                      <div key={`custom-${idx}`} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${exam.id}-custom-${idx}`}
                          checked={true}
                          onCheckedChange={() => toggleOption(customOpt)}
                        />
                        <Label htmlFor={`${exam.id}-custom-${idx}`} className="cursor-pointer">
                          {customOpt}{" "}
                          <Badge variant="outline" className="ml-1">
                            Personnalisé
                          </Badge>
                        </Label>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Résumé des sélections</h3>
          <div className="rounded-md border p-4">
            {getAllSelectedOptions().length > 0 ? (
              <div className="space-y-4">
                {getAllSelectedOptions().map((category, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-medium">{category.category}</h4>
                    <ul className="list-disc pl-5">
                      {category.options.map((opt, optIdx) => (
                        <li key={optIdx}>{opt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Aucune option sélectionnée</p>
            )}
          </div>
        </div>

       {/*  <div className="flex justify-end">
          <Button onClick={saveExamData}>Enregistrer les données</Button>
        </div> */}
      </CardContent>
    </Card>
  )
}

