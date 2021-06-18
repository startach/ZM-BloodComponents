import { SelectOption } from "@zm-blood-components/common";
import _ from "lodash";
import { ButtonVariant } from "../Button";
import styles from "./Picker.module.scss";
import Button from "../Button";

export type PickerProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  itemsPerRow: number;
  buttonClassName?: string;
};

export default function Picker<T>({
  label,
  options,
  onChange,
  value,
  itemsPerRow,
  buttonClassName,
}: PickerProps<T>) {
  // We want all buttons to have the same width, and since they have "flex: 1"
  // every row have the same number of elements.
  // For this reason we need to "pad" the last row, here I am padding it with null items.
  const padOptions: (SelectOption<T> | null)[] = [...options];
  const itemsInTheLastRow = options.length % itemsPerRow;
  const itemsToAdd = (itemsPerRow - itemsInTheLastRow) % itemsPerRow;
  for (let i = 0; i < itemsToAdd; i++) {
    padOptions.push(null);
  }

  const optionGroups = _.chunk(padOptions, itemsPerRow);

  return (
    <div>
      <div className={styles.pickerLabel}>{label}</div>
      <div className={styles.buttonRow}>
        {optionGroups.map((group, groupIndex) => (
          <>
            {group.map((option, optionIndex) => (
              <OptionButton
                value={value}
                onChange={onChange}
                option={option}
                buttonClassName={buttonClassName}
                key={`${groupIndex}.${optionIndex}.${option?.label}`}
              />
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

function OptionButton<T>(props: {
  value?: T;
  onChange: (value: T) => void;
  option: SelectOption<T> | null;
  buttonClassName?: string;
}) {
  if (props.option === null) {
    return <div className={styles.pickerButton} />;
  }

  return (
    <div className={styles.pickerButton}>
      <Button
        title={props.option.label}
        onClick={() => props.onChange(props.option!.value)}
        variant={ButtonVariant.outlined}
        color={props.value === props.option.value ? "secondary" : "default"}
        className={props.buttonClassName}
      />
    </div>
  );
}
