import React from "react";
import { CardTableRow, CardTableColumn } from "./GroupTable";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import Card from "../Card";
import { ExpandMore } from "@material-ui/icons";
import Styles from "./GroupTable.module.scss";

type CardTableItemProps<T> = {
  row: CardTableRow<T>;
  columns: CardTableColumn<T>[];
};

export default function CardTableItem<T>({
  row,
  columns,
}: CardTableItemProps<T>) {
  const CalculatedContent = columns.flatMap((column) => {
    const cell = column.cellRenderer(row.rowData);
    // collapse column
    if (cell || !column.hideIfNoData)
      return [{ cell, colRelativeWidth: column.colRelativeWidth }];
    return [];
  }, []);

  const DisplayedContent = (
    <div className={Styles["row"]}>
      {CalculatedContent.map(({ cell, colRelativeWidth }, i) => (
        <div
          style={{ flexGrow: colRelativeWidth ?? 1 }}
          className={Styles["cell"]}
          key={i}
        >
          {cell}
        </div>
      ))}
    </div>
  );

  const useAccordionStyles = makeStyles({
    root: {
      // From styles/layout/grid -> $gutter-vertical-small
      marginBottom: ".5rem",
      // Overriding expanded:last-child
      "&$expanded": {
        margin: "16px 0",
      },
    },
  });
  const classes = useAccordionStyles();

  if (!row.expandRow) {
    return <Card>{DisplayedContent}</Card>;
  }

  return (
    <Accordion
      className={classes.root}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        {DisplayedContent}
      </AccordionSummary>
      <AccordionDetails>{row.expandRow(row.rowData)}</AccordionDetails>
    </Accordion>
  );
}
