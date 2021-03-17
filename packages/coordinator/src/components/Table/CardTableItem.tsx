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

  const useTableItemStyles = makeStyles({
    root: {
      // From styles/layout/grid -> $gutter-vertical-small
      marginBottom: ".5rem",
      // Overriding expanded:last-child
      "&$expanded": {
        margin: ".5rem 0",
      },
    },
    // https://stackoverflow.com/questions/54056308/cant-override-a-style-of-a-deeply-nested-component-material-ui-jss-styling#answer-54057124
    expanded: {},
  });
  const classes = useTableItemStyles();

  if (!row.expandRow) {
    return <Card className={classes.root}>{DisplayedContent}</Card>;
  }

  return (
    <Accordion
      classes={{ root: classes.root, expanded: classes.expanded }}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        {DisplayedContent}
      </AccordionSummary>
      <AccordionDetails>{row.expandRow(row.rowData)}</AccordionDetails>
    </Accordion>
  );
}
