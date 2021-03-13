import Divider from "../Divider";
import Styles from "./CardTable.module.scss";
import { useState } from "react";
import { SortFunction } from "../../utils/types";
import CardTableItem from "./CardTableItem";
import { useMemo } from "react";

export interface CardTableColumn<T> {
  label?: string;
  sortBy?: SortFunction<CardTableRow<T>>;
  cellRenderer: (cellData: T) => React.ReactNode;
  /** If no data available, ignore col and collapse it in row */
  isCollapsable?: boolean;
  colRelativeWidth?: number;
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

interface CardTableProps<T> {
  columns: CardTableColumn<T>[];
  rows: CardTableRow<T>[];
  groupBy?: CardTableGroup<T>;
  hasColumnHeaders?: boolean;
  className?: string;
  defaultSort?: SortFunction<CardTableRow<T>>;
}

function sortInGroup<T>(
  group: CardTableRow<T>[],
  sortByFunction: SortFunction<CardTableRow<T>>,
  isReversedSort: boolean
) {
  return group.sort(
    isReversedSort ? (a, b) => sortByFunction(b, a) : sortByFunction
  );
}

export default function CardsTable<T>({
  rows,
  columns,
  groupBy,
  hasColumnHeaders,
  className,
  defaultSort,
}: CardTableProps<T>) {
  const [sortByColumnIndex, setSortByColumnIndex] = useState(
    defaultSort ? -1 : 0
  );
  const [isReversedSort, setIsReversedSort] = useState(false);

  const groups = useMemo(() => {
    let nextGroups: CardTableRow<T>[][] = [];

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

      nextGroups = nextGroups
        .filter((group) => group && group.length > 0)
        .sort(groupBy?.sortGroupsBy);
    } else {
      nextGroups = [rows];
    }

    const getSortBy = () => {
      if (sortByColumnIndex === -1 && defaultSort) {
        return defaultSort;
      }
      let sortByFunction = columns[sortByColumnIndex].sortBy;

      if (!sortByFunction) {
        // making sure unsorted columns don't screw things up
        for (let index = 0; index < columns.length; index++) {
          if (columns[index].sortBy) {
            sortByFunction = columns[index].sortBy;
            if (index !== sortByColumnIndex) {
              setSortByColumnIndex(index);
            }
            break;
          }
        }
      }
      return sortByFunction;
    };
    const sortByFunction = getSortBy();

    nextGroups = sortByFunction
      ? nextGroups.map((group) =>
          sortInGroup(group, sortByFunction, isReversedSort)
        )
      : nextGroups;

    return nextGroups;
  }, [rows, sortByColumnIndex, isReversedSort]);

  const handleChangeSort = (nextIndex: number) => {
    if (columns[nextIndex].sortBy) {
      let nextIsReversedsort = isReversedSort;
      if (nextIndex === sortByColumnIndex) {
        nextIsReversedsort = !nextIsReversedsort;
      } else {
        nextIsReversedsort = false;
      }
      setSortByColumnIndex(nextIndex);
      setIsReversedSort(nextIsReversedsort);
    }
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
          {groups.map((group, i) => (
            <div key={i} className={Styles["group"]}>
              {groupBy && <div>{groupBy.label(group)}</div>}
              {group.map((row, i) => (
                <CardTableItem
                  {...{ columns, row }}
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
