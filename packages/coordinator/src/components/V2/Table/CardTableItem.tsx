import { CardTableRow, CardTableColumn } from "./GroupTable";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import Card from "../Card";
import { ExpandMore } from "@material-ui/icons";
import Styles from "./GroupTable.module.scss";
import classnames from "classnames";

type CardTableItemProps<T> = {
  row: CardTableRow<T>;
  columns: CardTableColumn<T>[];
  isExpanded: boolean;
  handleExpandAccordion: () => void;
};

export default function CardTableItem<T>({
  row,
  columns,
  isExpanded,
  handleExpandAccordion,
}: CardTableItemProps<T>) {
  const CalculatedContent = columns.flatMap((column) => {
    const cell = column.cellRenderer(row.rowData);
    // collapse column
    if (cell || !column.hideIfNoData)
      return [
        {
          cell,
          colRelativeWidth: column.colRelativeWidth,
          aditionalCardClass: column.aditionalCardClass,
        },
      ];
    return [];
  }, []);

  const DisplayedContent = (
    <div className={Styles["row"]}>
      {CalculatedContent.map(
        ({ cell, colRelativeWidth, aditionalCardClass }, i) => (
          <div
            style={{ flexGrow: colRelativeWidth ?? 1 }}
            className={classnames(
              Styles["cell"],
              aditionalCardClass && Styles[aditionalCardClass]
            )}
            key={i}
          >
            {cell}
          </div>
        )
      )}
    </div>
  );

  const useTableItemStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        // From styles/layout/grid -> $gutter-vertical-small
        margin: ".5rem 0",
        // Overriding expanded:last-child
        "&$expanded": {
          margin: ".5rem 0",
        },
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      // https://stackoverflow.com/questions/54056308/cant-override-a-style-of-a-deeply-nested-component-material-ui-jss-styling#answer-54057124
      expanded: {},
    })
  );
  const classes = useTableItemStyles();

  if (!row.expandRow) {
    return <Card className={classes.root}>{DisplayedContent}</Card>;
  }

  return (
    <Accordion
      classes={{ root: classes.root, expanded: classes.expanded }}
      TransitionProps={{ unmountOnExit: true }}
      expanded={isExpanded}
      onChange={handleExpandAccordion}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        {DisplayedContent}
      </AccordionSummary>
      <AccordionDetails>{row.expandRow(row.rowData)}</AccordionDetails>
    </Accordion>
  );
}
