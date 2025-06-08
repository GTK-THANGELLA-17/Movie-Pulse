
import { VotingFormSelect } from "@/components/VotingFormSelect";

interface DemographicsFormFieldsProps {
  gender: string;
  onGenderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  age: string;
  onAgeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const GENDER_OPTIONS = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" }
];

const AGE_GROUPS = [
  { value: "", label: "Select age group" },
  { value: "13-17", label: "13-17" },
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55-64", label: "55-64" },
  { value: "65+", label: "65+" }
];

const DemographicsFormFields = ({
  gender,
  onGenderChange,
  age,
  onAgeChange,
  disabled = false
}: DemographicsFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <VotingFormSelect
        id="gender"
        label="Gender"
        value={gender}
        onChange={onGenderChange}
        disabled={disabled}
        required={true}
        options={GENDER_OPTIONS}
      />

      <VotingFormSelect
        id="age"
        label="Age Group"
        value={age}
        onChange={onAgeChange}
        disabled={disabled}
        required={true}
        options={AGE_GROUPS}
      />
    </div>
  );
};

export default DemographicsFormFields;
