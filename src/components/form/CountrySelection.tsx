
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, COUNTRIES } from "@/lib/data";

interface CountrySelectionProps {
  country: Country;
  onCountryChange: (country: Country) => void;
  disabled: boolean;
}

const CountrySelection = ({ country, onCountryChange, disabled }: CountrySelectionProps) => {
  return (
    <div>
      <Label htmlFor="country">Country</Label>
      <Select
        value={country}
        onValueChange={(value: Country) => onCountryChange(value)}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {COUNTRIES.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountrySelection;
