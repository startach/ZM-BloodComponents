import GroupsTable, {
  CardTableRow,
  CardTableRowGroup,
  CommonTableProps,
} from "./GroupTable";

interface TableProps<T> extends CommonTableProps<T> {
  rows: CardTableRow<T>[];
}

export default function Table<T>({
  rows = [],
  columns,
  hasColumnHeaders,
  className,
  initialSortByColumnIndex,
}: TableProps<T>) {
  const theOnlyGroup: CardTableRowGroup<T> = {
    groupLabel: undefined,
    rowsInGroup: rows,
  };

  const groups = [theOnlyGroup];

  return (
    <GroupsTable
      groups={groups}
      columns={columns}
      hasColumnHeaders={hasColumnHeaders}
      className={className}
      initialSortByColumnIndex={initialSortByColumnIndex}
    />
  );
}
