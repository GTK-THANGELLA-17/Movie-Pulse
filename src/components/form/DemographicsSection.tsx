
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DemographicsSectionProps {
  demographics: {
    gender: string;
    age: string;
    region: string;
  };
  onDemographicsChange: (demographics: { gender: string; age: string; region: string }) => void;
  disabled: boolean;
}

const DemographicsSection = ({ demographics, onDemographicsChange, disabled }: DemographicsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Select
          value={demographics.gender}
          onValueChange={(value) => onDemographicsChange({ ...demographics, gender: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="age">Age</Label>
        <Select
          value={demographics.age}
          onValueChange={(value) => onDemographicsChange({ ...demographics, age: value })}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="13-17">13-17</SelectItem>
            <SelectItem value="18-24">18-24</SelectItem>
            <SelectItem value="25-34">25-34</SelectItem>
            <SelectItem value="35-44">35-44</SelectItem>
            <SelectItem value="45-54">45-54</SelectItem>
            <SelectItem value="55-64">55-64</SelectItem>
            <SelectItem value="65+">65+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="region">Region</Label>
        <Input
          id="region"
          type="text"
          value={demographics.region}
          onChange={(e) => onDemographicsChange({ ...demographics, region: e.target.value })}
          placeholder="Enter your city/town/village"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default DemographicsSection;
