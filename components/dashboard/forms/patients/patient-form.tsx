"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormHeader from "../FormHeader";
import FormFooter from "../FormFooter";
import TextArea from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
//import PasswordInput from "@/components/FormInputs/PasswordInput";
import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import toast from "react-hot-toast";
import { createPatient } from "@/actions/patients";
import { generateRegistrationNumber } from "@/lib/generateRegNo";
import { PatientProps } from "@/types/props";
//import useSchoolStore from "@/store/school";

export type SelectOptionProps = {
  label: string;
  value: string;
};
type SinglePatientFormProps = {
  editingId?: string | undefined;
  initialData?: Partial<PatientProps> | null;
  //classes: Class[];
  //parents: Parent[];
  nextSeq: number;
};

export default function SinglePatientForm({
  //parents,
  //classes,
  nextSeq,
  editingId,
  initialData
}: SinglePatientFormProps) {
   //Genders
  const genders = [
    {
      label: "Femme",
      value: "FEMALE"
    },
    {
      label: "Homme",
      value: "MALE"
    }
  ];
  const maritalStatus = [
    {
      label: "Marié",
      value: "MARRIED"
    },
    {
      label: "Céliabataire",
      value: "SINGLE"
    },
    {
      label: "Divorcé",
      value: "DIVORCED"
    },
    {
      label: "Veuf",
      value: "WIDOWED"
    },
  ];
  const [selectedMarital, setSelectedMarital] = useState<SelectOptionProps>();
  const [selectedGender, setSelectedGender] = useState<SelectOptionProps>();
  const [selectedTitle, setSelectedTitle] = useState<SelectOptionProps>();
  //Patient types
  const titles = [
    {
      label: "Mr.",
      value: "Mr"
    },
    {
      label: "Mme.",
      value: "Mme"
    },
    {
      label: "Mlle.",
      value: "Mlle  "
    }
  ];
  //Nationality
  const nationalities = [
    { value: "cd", label: "Congolaise", code: "CD" },
    { value: "fr", label: "France", code: "FR" },
    { value: "de", label: "Allemagne", code: "DE" },
    { value: "it", label: "Italie", code: "IT" },
    { value: "es", label: "Espagne", code: "ES" },
    { value: "uk", label: "Royaume-Uni", code: "GB" },
    { value: "us", label: "États-Unis", code: "US" },
    { value: "ca", label: "Canada", code: "CA" },
    { value: "jp", label: "Japon", code: "JP" },
    { value: "cn", label: "Chine", code: "CN" },
    { value: "au", label: "Australie", code: "AU" }
  ];
  //const initialCountryCode = "CD";
  /*   const initialCountry = countries.find(
    (item) => item.code === initialCountryCode
  ); */
  
  const [selectedNationality, setSelectedNationality] =
    useState<SelectOptionProps>(nationalities[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PatientProps>({
    defaultValues: {
      name: ""
    }
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  //const initialImage = initialData?.imageUrl || "/images/student.png";
  //const [imageUrl, setImageUrl] = useState(initialImage);
  //const { school } = useSchoolStore();
  async function savePatient(data: PatientProps) {
    try {
      setLoading(true);
      data.gender = selectedGender?.value ?? "";
      data.nationality = selectedNationality.value;
      data.category = "INDIVIDUAL";
      data.title = selectedTitle?.value ?? "";  
      data.maritalStatus = selectedMarital?.value ?? "";  
      console.log(data);
      if (editingId) {
        /*   await updateCategoryById(editingId, data);
        setLoading(false);
        // Toast
        toast.success("Updated Successfully!");
        //reset
        reset();
        //route
        router.push("/dashboard/categories");
        setImageUrl("/placeholder.svg"); */
      } else {
        //const rollNo = generateRollNumber();
        const regNo = generateRegistrationNumber("HOPE", "IND", nextSeq);
        data.regNo = regNo;
        console.log(data);
        const res = await createPatient(data);
        setLoading(false);
        // Toast
        toast.success("Successfully Created!");
        //reset
        reset();
        //setImageUrl("/placeholder.svg");
        //route
        router.push("/dashboard/patients");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  // async function handleDeleteAll() {
  // setLoading(true);
  // try {
  // await deleteManyCategories();
  // setLoading(false);
  // } catch (error) {
  // console.log(error);
  // }
  // }

  return (
    <form className="" onSubmit={handleSubmit(savePatient)}>
      <FormHeader
        href="/patients"
        parent=""
        title="Patient"
        editingId={editingId}
        loading={loading}
      />

      <div className="grid grid-cols-12 gap-6 py-8">
        <div className="lg:col-span-12 col-span-full space-y-3">
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <FormSelectInput
                label="Titre"
                options={titles}
                option={selectedTitle as SelectOptionProps}
                setOption={setSelectedTitle}
                isSearchable={false}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Prénom"
                name="firstName"
              />
            
              <TextInput
                register={register}
                errors={errors}
                label="Nom de famille"
                name="name"
              />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <TextInput
                register={register}
                errors={errors}
                label="Post-nom"
                name="lastName"
              />
              <TextInput
                register={register}
                errors={errors}
                 label="Numéro de téléphone"
                name="phoneNumber"
              />
              <TextInput
                register={register}
                errors={errors}
                label="Email"
                name="email"
                type="email"
              />
              <FormSelectInput
                label="Gender"
                options={genders}
                option={selectedGender as SelectOptionProps}
                setOption={setSelectedGender}
                isSearchable={false}
              />
              <FormSelectInput
                label="Etat-civil"
                options={maritalStatus}
                option={selectedMarital as SelectOptionProps}
                setOption={setSelectedMarital}
                isSearchable={false}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
              />
              
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <TextInput
                register={register}
                errors={errors}
                label="Profession"
                name="profession"
              />
             {/*    <TextInput
                register={register}
                errors={errors}
                 label="Contact d'urgence"
                name="emergencyContact"
              /> */}
              <FormSelectInput
                label="Nationality"
                options={nationalities}
                option={selectedNationality}
                setOption={setSelectedNationality}
              />
              <TextInput
                register={register}
                errors={errors}
                label="Date of admission"
                name="admissionDate"
                type="date"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
                            <div className="grid gap-3">
                  <TextArea
                    register={register}
                    errors={errors}
                    label="Addresse"
                    name="address"
                  />
                </div>
              <div className="grid ">
                {/* <ImageInput
                  title="Patient Image"
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  endpoint="patientProfileImage"
                  className="object-contain"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormFooter
        href="/patients"
        editingId={editingId}
        loading={loading}
        title="Patient"
        parent=""
      />
    </form>
  );
}
