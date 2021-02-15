import './ConfirmButton.css';
import { makeStyles } from '@material-ui/core/styles';
import { createData } from '../../Table2/utils';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    minWidth: 100,
    color: 'black',
  },
}));

// const ConfirmButton = ({ text, width, data, rows, setRows }) => {
const ConfirmButton = ({ text, width, disabled, onClick }) => {
  const classes = useStyles();
  const style = {
    width: 110,
  };
  // const { donation, hospital, date, hour, squares } = data;
  const BuildData = (donation, hospital, date, hour, squares) => {
    // console.log("aaaaaa", data)
    // let newRows = [...rows];
    let newRow = createData(donation, hospital, date, hour, squares);
    // setRows(newRows.push(newRow));
    // console.log("bbbbbb", rows)
  }

  return (
    // <form className={classes.container} noValidate>
    //   <button type={"button"} onClick={() => BuildData(donation, hospital, date, hour, squares)} className="confirmButton" style={style} >
    <div className={classes.container}>
      <button
        className="confirmButton"
        style={style}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ConfirmButton;
