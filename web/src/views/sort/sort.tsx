import { Select } from "@radix-ui/themes";
import { SortProps } from "./types";

export const Sort = (props: SortProps) => {
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
        {props.options.map(({ title, value }) => {
          return (
            <Select.Item key={value} value={value}>
              {title}
            </Select.Item>
          );
        })}
      </Select.Content>
    </Select.Root>
  );
};
