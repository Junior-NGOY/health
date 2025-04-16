import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Hospital = {
  id: string;
  name: string;
  logo: string | null;
  slug: string;
};

interface HospitalState {
  hospital: Hospital | null;
  setHospital: (hospital: Hospital | null) => void;
  //addSchool: (schoolData: Omit<School, "id">) => void;
  //getSchoolBySlug: (slug: string) => School | undefined;
}

const useHospitalStore = create<HospitalState>()(
  persist(
    (set) => ({
      hospital: null,
      setHospital: (hospital) => set({ hospital })
    }),
    {
      name: "hospital-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ hospital: state.hospital })
    }
  )
);

export default useHospitalStore;

// Example usage in a component:
/*
import useSchoolStore from './your-store-file';

const MyComponent = () => {
  const { addSchool, getSchoolBySlug } = useSchoolStore();

  const handleAddSchool = () => {
    addSchool({ name: 'New School', logo: null, slug: 'new-school' });
  };

  const schoolBySlug = getSchoolBySlug('new-school');

  return (
    <div>
      <button onClick={handleAddSchool}>Add School</button>
      {schoolBySlug && <p>School by slug: {schoolBySlug.name}</p>}
    </div>
  );
};
*/
