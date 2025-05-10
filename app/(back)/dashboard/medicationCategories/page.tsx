"use client";
import { useEffect, useState } from 'react';
import { PlusIcon} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { Category } from '@/types';
import { CategoryItem } from '@/components/dashboard/forms/medicationCategories/category-item';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '@/actions/medication-categories';



export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // Modal Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentCategoryId: ''
  });
  // Fonction de recherche
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };
  // Gestion de la sauvegarde
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCategory) {
        // Mise à jour
        await updateCategory(selectedCategory.id, formData);
        toast.success('Catégorie modifiée avec succès');
      } else {
        // Création
        await createCategory(formData);
        toast.success('Catégorie créée avec succès');
      }
      // Rafraîchir la liste
      const updatedCategories = await getAllCategories();
      setCategories(updatedCategories);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  };
    // Gestion de la suppression
    const handleDelete = async (id: string) => {
        try {
          await deleteCategory(id);
          // Rafraîchir la liste
          const updatedCategories = await getAllCategories();
          setCategories(updatedCategories);
          toast.success('Catégorie supprimée');
        } catch (error) {
          toast.error('Erreur lors de la suppression');
          console.error(error);
        }
      };
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Erreur lors du chargement des catégories');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* En-tête */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Gestion des Catégories de Médicaments
        </h1>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setFormData({ name: '', description: '', parentCategoryId: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          Nouvelle Catégorie
        </button>
      </div>

      {/* Zone de recherche */}
      <div className="mb-6">
      <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une catégorie..."
          className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Liste des catégories */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        {isLoading ? (
          <div className="text-center py-4">Chargement...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-4">Aucune catégorie trouvée</div>
        ) : (
          <div className="space-y-2">
            {filteredCategories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                level={0}
                onEdit={setSelectedCategory}
                onDelete={handleDelete}
                isExpanded={expandedCategories.has(category.id)}
                onToggle={() => toggleExpand(category.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de création/édition */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {selectedCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
            </h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Logique de sauvegarde
              {handleSave}
              setIsModalOpen(false);
              toast.success(selectedCategory ? 'Catégorie modifiée' : 'Catégorie créée');
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Catégorie parente
                  </label>
                  <select
                    value={formData.parentCategoryId}
                    onChange={(e) => setFormData({ ...formData, parentCategoryId: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  >
                    <option value="">Aucune</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {selectedCategory ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
