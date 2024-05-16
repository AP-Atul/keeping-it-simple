import { Select } from "@radix-ui/themes";
import { FilterProps } from "./types";

export const Filter = (props: FilterProps) => {
  return (
    <Select.Root
      size="1"
      value={props.value || "na"}
      defaultValue={props.value || "na"}
      onValueChange={props.onValueChange}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="na" disabled>
          {props.title}
        </Select.Item>
        {props.options.map((option) => {
          return (
            <Select.Item key={option} value={option}>
              {option}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};
