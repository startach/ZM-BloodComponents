import React, { useEffect, useState } from "react";
import Divider from "../Divider";
import Styles from "./GroupTable.module.scss";
import { SortFunction } from "../../../utils/types";
import CardTableItem from "./CardTableItem";
import classnames from "classnames";

export interface CommonTableProps<T> {
  columns: CardTableColumn<T>[];
  hasColumnHeaders?: boolean;
  className?: string;
  /** If present, will use this column to initially sort the table.
   User can then select a different column to sort by. */
  initialSortByColumnIndex?: number;
  /** Index of table in the page, for React Key problems */
  tableIndex?: number;
}

export interface GroupTableProps<T> extends CommonTableProps<T> {
  groups?: CardTableRowGroup<T>[];
}

export interface CardTableRow<T> {
  rowData: T;
  /** If present, show table with expandable accordion.
  If missing, show plain rows. */
  expandRow?: (rowData: T) => React.ReactNode;
}

export interface CardTableColumn<T> {
  aditionalCardClass?: string;
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

export default function GroupsTable<T>({
  columns,
  groups = [],
  hasColumnHeaders,
  className,
  initialSortByColumnIndex,
  tableIndex,
}: GroupTableProps<T>) {
  const getInitialSortIndex = () => {
    if (initialSortByColumnIndex) {
      const initialIndexExists = initialSortByColumnIndex < columns.length;
      if (initialIndexExists && columns[initialSortByColumnIndex].sortBy) {
        return initialSortByColumnIndex;
      }
    }
    return 0;
  };

  const [sortByColumnIndex, setSortByColumnIndex] = useState<number>(
    getInitialSortIndex()
  );

  const [isReversedSort, setIsReversedSort] = useState(false);

  const [internallySortedGroups, setInternallySortedGroups] =
    useState<CardTableRowGroup<T>[]>(groups);

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const sortGroup = (group: CardTableRowGroup<T>) => {
      let sortingFunction: SortFunction<T>;

      const sortBy = columns[sortByColumnIndex].sortBy;
      if (sortBy === undefined) {
        return group;
      }

      sortingFunction = sortBy;

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

    const sortedGroups = groups.map(sortGroup);
    setInternallySortedGroups(sortedGroups);
  }, [sortByColumnIndex, isReversedSort, groups, columns]);

  useEffect(() => {
    setExpandedItems([]);
  }, [groups.length]);

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

  const handleExpandAccordion = (groupIndex: number, rowIndex: number) => {
    let nextExpandedItems = [...expandedItems];

    const nextRow = "" + groupIndex + rowIndex;

    if (nextExpandedItems.includes(nextRow)) {
      nextExpandedItems = nextExpandedItems.filter(
        (expandedIndex) => expandedIndex !== nextRow
      );
    } else {
      nextExpandedItems.push(nextRow);
    }
    setExpandedItems([...nextExpandedItems]);
  };
  return (
    <div className={className || Styles["full-width"]}>
      <div className={Styles["component"]}>
        {hasColumnHeaders && (
          <div className={Styles["header"]}>
            <div className={Styles["row"]}>
              {columns.map((column, i) => {
                const headerCellClasses = classnames(
                  Styles["cell"],
                  columns[i].sortBy && Styles["header-cell"],
                  sortByColumnIndex === i && Styles["header-cell-active"]
                );
                return (
                  <div
                    style={{ flexGrow: column.colRelativeWidth ?? 1 }}
                    className={headerCellClasses}
                    key={column?.label || i}
                    onClick={() => handleChangeSort(i)}
                  >
                    {column.label}
                  </div>
                );
              })}
            </div>
            <Divider isCentered />
          </div>
        )}
        <div className={Styles["body"]}>
          {internallySortedGroups.map((group, i) => (
            <div key={i} className={Styles["group"]}>
              <div>{group.groupLabel}</div>
              {group.rowsInGroup.map((row, j) => (
                <CardTableItem
                  row={row}
                  columns={columns}
                  handleExpandAccordion={() => handleExpandAccordion(i, j)}
                  key={`${i}${j}${sortByColumnIndex}${isReversedSort}${tableIndex}`}
                  isExpanded={expandedItems.includes("" + i + j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
