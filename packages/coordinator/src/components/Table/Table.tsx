import React from "react";
import styles from "./Table.module.scss";
import classNames from "classnames";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Table as TableMD,
} from "@material-ui/core";

export interface TableEntryData extends Object {
  key: string;
}

export interface TableProps<T extends TableEntryData> {
  headerContent: React.ReactNode[];
  bodyContent?: T[];
  ConvertContentToCells: (data: T) => React.ReactNode[];
  tableClassName?: string;
  tableContainerClassName?: string;
  headerCellClassName?: string;
  contentCellClassName?: string;
  "aria-label"?: string;
}

function Table<T extends TableEntryData>({
  tableClassName,
  tableContainerClassName,
  headerCellClassName,
  contentCellClassName,
  headerContent,
  bodyContent,
  ConvertContentToCells,
  ...props
}: TableProps<T>) {
  return (
    <TableContainer className={tableContainerClassName}>
      <TableMD
        className={tableClassName}
        stickyHeader
        aria-label={props["aria-label"]}
      >
        <TableHead>
          <TableRow>
            {headerContent.map((node, index) => (
              <TableCell
                key={index}
                className={classNames(styles.headerCells, headerCellClassName)}
              >
                {node}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodyContent?.map((data) => (
            <TableRow key={data.key}>
              {ConvertContentToCells(data).map((cell, index) => (
                <TableCell
                  className={contentCellClassName}
                  key={`${data.key}_cell_${index}`}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableMD>
    </TableContainer>
  );
}

export default Table;
