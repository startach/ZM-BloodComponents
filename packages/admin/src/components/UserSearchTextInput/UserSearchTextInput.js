import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const UserSearchTextInput = ({ setText }) => {
  const onChange = (e) => setText(e.target.value);

  return (
    <TextField
      id="filled-basic"
      label="חיפוש משתמש לפי שם / טלפון"
      variant="filled"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
};

export default UserSearchTextInput;
