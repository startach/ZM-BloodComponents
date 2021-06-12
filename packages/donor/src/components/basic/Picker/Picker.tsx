import { SelectOption } from "@zm-blood-components/common";
import _ from "lodash";
import { ButtonVariant } from "../Button";
import styles from "./Picker.module.scss";
// TODO (Yaron) point to button once V2 is merged
import Button from "../Button/ButtonV2";

export type PickerProps<T> = {
  label?: string;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  itemsPerRow: number;
  errorMessage?: string;
};

export default function Picker<T>({
  label,
  options,
  onChange,
  value,
  itemsPerRow,
}: PickerProps<T>) {
  // We want all buttons to have the same width, and since they have "flex: 1"
  // we should have every row have the same number of elements.
  // For this reason we need to "pad" the last row
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
      <div>
        {optionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.buttonRow}>
            {group.map((option) => (
              <OptionButton value={value} onChange={onChange} option={option} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function OptionButton<T>(props: {
  value?: T;
  onChange: (value: T) => void;
  option: SelectOption<T> | null;
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
      />
    </div>
  );
}
