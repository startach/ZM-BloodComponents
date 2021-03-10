import {
  CardTableRow,
  CardTableColumn,
  ColumnPositions,
  GetColumnStyle,
  GetRowStyle,
} from "./CardTable";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import Card from "../Card";
import { ExpandMore } from "@material-ui/icons";
import Styles from "./CardTable.module.scss";
import classnames from "classnames";

type CardTableItemProps = {
  row: CardTableRow<any>;
  columns: CardTableColumn<any>[];
  columnPositions?: ColumnPositions;
};

export default function CardTableItem({
  row,
  columns,
  columnPositions = ColumnPositions.centered,
}: CardTableItemProps) {
  const endColumn = columns.find((column) => column.isUnderRow);

  const CalculatedContent = columns
    .filter((column) => !column.isUnderRow)
    .flatMap((column, i) => {
      const result = column.cellRenderer(row.rowSummary);
      if (result || !column.isCollapsable) return [result];
      return [];
    }, []);

  const DisplayedContent = (
    <>
      <div className={classnames(GetRowStyle(columnPositions))}>
        {CalculatedContent.map((calculatedNode: React.ReactNode, i) => (
          <div
            className={GetColumnStyle(
              columnPositions,
              CalculatedContent.length
            )}
            key={i}
          >
            <div className={Styles["centered-table-cell"]}>
              {calculatedNode}
            </div>
          </div>
        ))}
      </div>
      <div style={{ minWidth: "fit-content" }}>
        {endColumn && endColumn.cellRenderer(row.rowSummary)}
      </div>
    </>
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

  if (!row.expandedRow) {
    return <Card className={Styles["full-width"]}>{DisplayedContent}</Card>;
  }

  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        className={Styles["absolute-row"]}
      >
        {DisplayedContent}
      </AccordionSummary>
      <AccordionDetails>{row.expandedRow}</AccordionDetails>
    </Accordion>
  );
}
