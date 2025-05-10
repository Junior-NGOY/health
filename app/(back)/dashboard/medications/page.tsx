"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PlusCircle, Search, Filter, ArrowUpDown, Edit, Trash2, Package, ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { getAllMedications } from "@/actions/medications"
import { getAllCategories } from "@/actions/medication-categories"
import { Category, Medication } from "@/types"

export default function MedicationsPage() {
  const router = useRouter()
 // const searchParams = useSearchParams()

  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [medications, setMedications] = useState<Medication[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const handleCreateMedication = () => {
    router.push("/dashboard/medications/new")
  }

  const handleEditMedication = (id: string) => {
    router.push(`/medications/edit/${id}`)
  }

  const handleViewMedication = (id: string) => {
    router.push(`/dashboard/medications/${id}`)
  }

  const handleAdjustStock = (id: string) => {
    router.push(`/dashboard/medications/stock/${id}`)
  }
    // Fonction pour appliquer les filtres
    const handleApplyFilters = () => {
      setCurrentPage(1); // Réinitialiser la pagination lors de l'application des filtres
    };
    // Fonction pour filtrer les médicaments
    const filteredMedications = medications.filter((medication) => {
      // Filtre par recherche (nom ou nom générique)
      const matchesSearch = search.trim() === '' || 
        medication.name.toLowerCase().includes(search.toLowerCase()) ||
        (medication.genericName && medication.genericName.toLowerCase().includes(search.toLowerCase()));
  
      // Filtre par catégorie
      const matchesCategory = selectedCategory === '' || selectedCategory === 'all' || 
        medication.category?.id === selectedCategory;
        const stockLevel = medication.stock ?? 0;
      // Filtre par stock
      const matchesStock = !inStockOnly || stockLevel > 0;
  
      return matchesSearch && matchesCategory && matchesStock;
    });
   // Calcul de la pagination
   const itemsPerPage = 10;
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const paginatedMedications = filteredMedications.slice(startIndex, endIndex);
   const totalPages = Math.ceil(filteredMedications.length / itemsPerPage);
  useEffect(() => {
    async function fetchData() {
      try {
        const [medicationsData, categoriesData] = await Promise.all([
          getAllMedications(),
          getAllCategories()
        ]);
        
        setMedications(medicationsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="container mx-auto py-6 px-4 md:px-4 lg:px-2 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Médicaments</h1>
          <p className="text-muted-foreground">
            Gérez votre inventaire de médicaments, ajoutez de nouveaux produits et suivez les stocks.
          </p>
        </div>
        <Button onClick={handleCreateMedication}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouveau Médicament
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtres et Recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un médicament..."
                className="pl-8"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleApplyFilters();
                }}
              />
            </div>

            <Select 
              value={selectedCategory} 
              onValueChange={(value) => {
                setSelectedCategory(value);
                handleApplyFilters();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
            <Checkbox
                id="inStock"
                checked={inStockOnly}
                onCheckedChange={(checked) => {
                  setInStockOnly(checked as boolean);
                  handleApplyFilters();
                }}
              />
              <label
                htmlFor="inStock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                En stock uniquement
              </label>
            </div>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Appliquer les filtres
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
        
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">
                    <div className="flex items-center space-x-1">
                      <span>Nom</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Forme</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Stock</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead className="text-right">Prix de vente</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">Chargement...</TableCell>
                </TableRow>
              ) : paginatedMedications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">Aucun médicament trouvé</TableCell>
                </TableRow>
              ) : (
                paginatedMedications.map((medication) => (
                  <TableRow
                    key={medication.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleViewMedication(medication.id)}
                  >
                    <TableCell className="font-medium">
                      <div>
                        {medication.name}
                        <p className="text-sm text-muted-foreground">{medication.genericName}</p>
                      </div>
                    </TableCell>
                    <TableCell>{medication.form}</TableCell>
                    <TableCell>{medication.strength}</TableCell>
                    <TableCell>
                      {(medication.stock ?? 0)> 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
                        >
                          {medication.stock} en stock
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          Rupture de stock
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{medication?.category?.name}</TableCell>
                    <TableCell>{medication?.supplier?.name}</TableCell>
                    <TableCell className="text-right">{medication?.sellingPrice?.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Ouvrir le menu</span>
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                              >
                                <path
                                  d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                  fill="currentColor"
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewMedication(medication.id)}>
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditMedication(medication.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdjustStock(medication.id)}>
                              <Package className="mr-2 h-4 w-4" />
                              Ajuster le stock
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
              </TableBody>
            </Table>
         

          <div className="mt-4">
          <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 pl-2.5"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 pr-2.5"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
