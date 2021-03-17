import React, { useEffect, useState } from "react";
import Divider from "../Divider";
import Styles from "./GroupTable.module.scss";
import { SortFunction } from "../../utils/types";
import CardTableItem from "./CardTableItem";

export interface CommonTableProps<T> {
  columns: CardTableColumn<T>[];
  hasColumnHeaders?: boolean;
  className?: string;
  /** If present, will use this function to initially sort the table.
   User can then select a different column to sort by. */
  initialRowSorter?: SortFunction<T>;
}

interface GroupTableProps<T> extends CommonTableProps<T> {
  groups?: CardTableRowGroup<T>[];
}

export interface CardTableRow<T> {
  rowData: T;
  /** If present, show table with expandable accordion.
  If missing, show plain rows. */
  expandRow?: (rowData: T) => React.ReactNode;
}

export interface CardTableColumn<T> {
  label?: string;
  /** When user asks to sort by this column, use this function */
  sortBy?: SortFunction<T>;
  /** Renders the specific cell from row */
  cellRenderer: (rowData: T) => React.ReactNode;
  /** If no data available, ignore col and collapse it in row */
  hideIfNoData?: boolean;

  colRelativeWidth?: number;
}

export interface CardTableRowGroup<T> {
  groupLabel?: string;

  rowsInGroup: CardTableRow<T>[];
}

// TODO what happens if groups prop changes
export default function GroupsTable<T>({
  columns,
  groups = [],
  hasColumnHeaders,
  className,
  initialRowSorter,
}: GroupTableProps<T>) {
  const [sortByColumnIndex, setSortByColumnIndex] = useState<
    number | undefined
  >(initialRowSorter ? undefined : 0);

  const [isReversedSort, setIsReversedSort] = useState(false);

  const getSortByFunction = () => {
    if (sortByColumnIndex === undefined) {
      if (initialRowSorter) {
        return initialRowSorter;
      }
      return undefined;
    }

    return columns[sortByColumnIndex].sortBy;
  };

  const sortGroup = (group: CardTableRowGroup<T>) => {
    const sortingFunction = getSortByFunction();
    if (!sortingFunction) {
      return group;
    }

    const sortedRows = group.rowsInGroup.sort((a, b) => {
      if (isReversedSort) {
        return sortingFunction(b.rowData, a.rowData);
      }
      return sortingFunction(a.rowData, b.rowData);
    });

    return {
      ...group,
      rowsInGroup: sortedRows,
    };
  };

  const [internallySortedGroups, setInternallySortedGroups] = useState<
    CardTableRowGroup<T>[]
  >(groups);

  useEffect(() => {
    const sortedGroups = groups.map(sortGroup);
    setInternallySortedGroups(sortedGroups);
  }, [sortByColumnIndex, isReversedSort]);

  const handleChangeSort = (nextIndex: number) => {
    if (!columns[nextIndex].sortBy) {
      return;
    }

    let nextIsReversedSort = isReversedSort;
    if (nextIndex === sortByColumnIndex) {
      nextIsReversedSort = !nextIsReversedSort;
    } else {
      nextIsReversedSort = false;
    }
    setSortByColumnIndex(nextIndex);
    setIsReversedSort(nextIsReversedSort);
  };

  return (
    <div className={className || Styles["full-width"]}>
      <div className={Styles["component"]}>
        {hasColumnHeaders && (
          <div className={Styles["header"]}>
            <div className={Styles["row"]}>
              {columns.map((column, i) => (
                <div
                  style={{ flexGrow: column.colRelativeWidth ?? 1 }}
                  className={Styles["cell"]}
                  key={column?.label || i}
                  onClick={() => handleChangeSort(i)}
                >
                  {column.label}
                </div>
              ))}
            </div>
            <Divider isCentered />
          </div>
        )}
        <div className={Styles["body"]}>
          {internallySortedGroups.map((group, i) => (
            <div key={i} className={Styles["group"]}>
              <div>{group.groupLabel}</div>
              {group.rowsInGroup.map((row, i) => (
                <CardTableItem
                  row={row}
                  columns={columns}
                  key={`${i}${sortByColumnIndex}${isReversedSort}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
