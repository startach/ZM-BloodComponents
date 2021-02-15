import './SelectButton.css';
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    paddingHight: '1vh',
    width: '10vw',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectButton({ setData, header, content, data }) {
  const classes = useStyles();
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel >
          <div style={{ marginTop: '0px' }} >{header}</div>
          {header === 'בית חולים' ? <div style={{ paddingLeft: '100%' }}>{<AddLocationOutlinedIcon className="addLocationOutlinedIcon" />}</div> : null}
        </InputLabel>
        <InputLabel >
          {/* {<AddLocationOutlinedIcon className="addLocationOutlinedIcon" />} */}
        </InputLabel>

        <Select
          native
          value={data}
          onChange={handleChange}
          inputProps={{
            name: `${header}`,
            id: 'filled-age-native-simple',
          }}
        >
          {(() => {
            const options = [];
            for (let elem of content) {
              options.push(
                <option key={elem} value={elem}>
                  {elem}
                </option>
              );
            }
            return options;
          })()}
        </Select>
      </FormControl>
    </div >
  );
}
