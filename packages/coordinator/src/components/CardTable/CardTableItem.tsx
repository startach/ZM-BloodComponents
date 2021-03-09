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
  const CalculatedContent = columns.flatMap((column, i) => {
    const result = column.cellRenderer(row.rowSummary);
    if (result || !column.isCollapsable) return [result];
    return [];
  }, []);

  const DisplayedContent = (
    <>
      {CalculatedContent.map((calculatedNode: React.ReactNode, i) => (
        <div
          className={GetColumnStyle(columnPositions, CalculatedContent.length)}
          key={i}
        >
          <div className={Styles["centered-table-cell"]}>{calculatedNode}</div>
        </div>
      ))}
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
    return (
      <Card className={GetRowStyle(columnPositions)}>{DisplayedContent}</Card>
    );
  }

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <div
          className={classnames(
            GetRowStyle(columnPositions),
            Styles["absolute-row"]
          )}
        >
          {DisplayedContent}
        </div>
      </AccordionSummary>
      <AccordionDetails>{row.expandedRow}</AccordionDetails>
    </Accordion>
  );
}
