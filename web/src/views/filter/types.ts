export interface FilterProps {
  title: string;
  options: string[];
  value: string | undefined;
  onValueChange: <T>(value: T) => void;
}
