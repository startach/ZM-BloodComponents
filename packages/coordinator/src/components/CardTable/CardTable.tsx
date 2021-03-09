import Divider from "../Divider";
import GridStyles from "../../styles/layout/grid.module.scss";
import Styles from "./CardTable.module.scss";
import classnames from "classnames";
import { useState, useEffect } from "react";
import { SortFunction } from "../../utils/types";
import CardTableItem from "./CardTableItem";

export interface CardTableColumn<T> {
  label?: string;
  sortBy?: SortFunction<CardTableRow<T>>;
  cellRenderer: (cellData: { [key: string]: any }) => React.ReactNode;
  /** If no data available, ignore col and collapse it in row */
  isCollapsable?: boolean;
}

export interface CardTableGroup<T> {
  label: (group: CardTableRow<T>[]) => string;
  isInGroup: (group: CardTableRow<T>[], item: T) => boolean;
  sortGroupsBy: SortFunction<CardTableRow<T>[]>;
}

export interface CardTableRow<T> {
  rowSummary: T;
  expandedRow?: React.ReactNode;
}

export enum ColumnPositions {
  centered = "centered",
  justify = "justify",
}

interface CardTableProps<T> {
  columns: CardTableColumn<T>[];
  rows: CardTableRow<T>[];
  groupBy?: CardTableGroup<T>;
  hasColumnHeaders?: boolean;
  /** default items appear in middle of column, justify acts as justify-content: space-between */
  columnPositions?: ColumnPositions;
  className?: string;
  defaultSort?: SortFunction<T>;
}

const GetColClass = (colCount: number): string => {
  switch (colCount) {
    case 2:
      return "col-1-of-2";
    case 3:
      return "col-1-of-3";
    case 4:
      return "col-1-of-4";
    default:
      return "";
  }
};

export const GetRowStyle = (columnPositions: ColumnPositions): string =>
  columnPositions === ColumnPositions.centered
    ? GridStyles["row"]
    : Styles["justify-row"];

export const GetColumnStyle = (
  columnPositions: ColumnPositions,
  activeCols: number
): string =>
  columnPositions === ColumnPositions.centered
    ? GridStyles[GetColClass(activeCols)]
    : Styles["justify-col"];

export default function CardsTable({
  rows,
  columns,
  groupBy,
  hasColumnHeaders,
  columnPositions = ColumnPositions.centered,
  className,
  defaultSort,
}: CardTableProps<any>) {
  const [sortByColumnIndex, setSortByColumnIndex] = useState(
    defaultSort ? -1 : 0
  );
  const [isReversedSort, setIsReversedSort] = useState(false);
  const [groups, setGroups] = useState([rows]);

  useEffect(() => {
    let nextGroups: CardTableRow<any>[][] = [];

    if (groupBy) {
      rows.forEach((row) => {
        const foundGroupIndex: number = nextGroups.findIndex((group) =>
          groupBy?.isInGroup(group, row.rowSummary)
        );

        if (foundGroupIndex !== -1) {
          nextGroups[foundGroupIndex].push(row);
        } else {
          nextGroups.push([row]);
        }
      });
    } else {
      nextGroups = [rows];
    }

    const sortByFunction =
      sortByColumnIndex === -1
        ? defaultSort
        : columns[sortByColumnIndex].sortBy;

    if (sortByFunction !== undefined) {
      nextGroups = nextGroups.map((group) =>
        group.sort(
          isReversedSort ? (a, b) => sortByFunction(b, a) : sortByFunction
        )
      );
    }
    setGroups(nextGroups);
  }, [rows, sortByColumnIndex, isReversedSort]);

  const handleChangeSort = (nextIndex: number) => {
    let nextIsReversedsort = isReversedSort;
    if (nextIndex === sortByColumnIndex) {
      nextIsReversedsort = !nextIsReversedsort;
    } else {
      nextIsReversedsort = false;
    }
    setSortByColumnIndex(nextIndex);
    setIsReversedSort(nextIsReversedsort);
  };

  return (
    <div
      className={classnames(
        className || Styles["full-width"],
        Styles["card-table"]
      )}
    >
      {hasColumnHeaders && (
        <div className={Styles["header-bar"]}>
          <div
            className={classnames(
              GetRowStyle(columnPositions),
              Styles["low-row"]
            )}
          >
            {columns.map((column, i) => (
              <div
                className={GetColumnStyle(columnPositions, columns.length)}
                key={column?.label || i}
              >
                <div
                  className={Styles["centered-table-cell"]}
                  onClick={() => handleChangeSort(i)}
                >
                  {column.label}
                </div>
              </div>
            ))}
          </div>
          <Divider />
        </div>
      )}
      {groups
        .sort(groupBy?.sortGroupsBy)
        .filter((group) => group && group.length > 0)
        .map((group, i) => (
          <div key={i} className={Styles["full-width"]}>
            {groupBy && <div>{groupBy.label(group)}</div>}
            {group.map((row, i) => (
              <CardTableItem
                {...{ columns, row, columnPositions }}
                key={`${i}${sortByColumnIndex}${isReversedSort}`}
              />
            ))}
          </div>
        ))}
    </div>
  );
}
