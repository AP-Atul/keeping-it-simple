export interface SortProps {
  title: string;
  options: {
    title: string;
    value: string;
  }[];
  value: string | undefined;
  onValueChange: <T>(value: T) => void;
}
