import './DateTimeButton.css';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateAndTimePickers({
  header,
  date,
  setDate,
  hour,
  setHour,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    let longDate = event.target.value.split('T');
    setDate(longDate[0]);
    setHour(longDate[1]);
  };

  return (
    <div>
      <form className={classes.container} noValidate>
        <TextField
          id="datetime-local"
          label={header}
          type="datetime-local"
          className={classes.textField}
          defaultValue=""
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </div>
  );
}
