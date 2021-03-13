import { CardTableRow, CardTableColumn } from "./CardTable";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import Card from "../Card";
import { ExpandMore } from "@material-ui/icons";
import Styles from "./CardTable.module.scss";

type CardTableItemProps<T> = {
  row: CardTableRow<T>;
  columns: CardTableColumn<T>[];
};

export default function CardTableItem<T>({
  row,
  columns,
}: CardTableItemProps<T>) {
  const CalculatedContent = columns.flatMap((column) => {
    const calculatedNode = column.cellRenderer(row.rowSummary);
    // collapse column
    if (calculatedNode || !column.isCollapsable)
      return [{ calculatedNode, column }];
    return [];
  }, []);

  const DisplayedContent = (
    <div className={Styles["row"]}>
      {CalculatedContent.map(({ calculatedNode, column }, i) => (
        <div
          style={{ flexGrow: column?.colRelativeWidth ?? 1 }}
          className={Styles["cell"]}
          key={i}
        >
          {calculatedNode}
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

  if (!row.expandedRow) {
    return <Card>{DisplayedContent}</Card>;
  }

  return (
    <Accordion className={classes.root}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        {DisplayedContent}
      </AccordionSummary>
      <AccordionDetails>{row.expandedRow}</AccordionDetails>
    </Accordion>
  );
}
