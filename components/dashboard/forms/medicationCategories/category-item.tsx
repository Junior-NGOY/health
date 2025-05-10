import { Category } from "@/types";
import { ChevronDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// Composant pour un élément de catégorie
export function CategoryItem({ 
    category, 
    level, 
    onEdit, 
    onDelete, 
    isExpanded, 
    onToggle 
  }: { 
    category: Category; 
    level: number; 
    onEdit: (category: Category) => void; 
    onDelete: (id: string) => void; 
    isExpanded: boolean;
    onToggle: () => void;
  }) {
    return (
      <div className="space-y-2">
        <div 
          className={`flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50
            ${level > 0 ? 'ml-6' : ''}`}
        >
          <div className="flex items-center gap-2">
            {category.subCategories?.length ? (
              <button onClick={onToggle}>
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            ) : (
              <div className="w-5" />
            )}
            <span className="font-medium">{category.name}</span>
          </div>
  
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(category)}
              className="rounded p-1 hover:bg-gray-200"
            >
              <PencilIcon className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="rounded p-1 hover:bg-gray-200"
            >
              <TrashIcon className="h-4 w-4 text-red-600" />
            </button>
          </div>
        </div>
  
        {isExpanded && category.subCategories?.map((subCategory) => (
          <CategoryItem
            key={subCategory.id}
            category={subCategory}
            level={level + 1}
            onEdit={onEdit}
            onDelete={onDelete}
            isExpanded={false}
            onToggle={() => {}}
          />
        ))}
      </div>
    );
  }