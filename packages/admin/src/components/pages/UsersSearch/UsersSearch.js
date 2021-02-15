import UserSearchTextInput from '../../UserSearchTextInput';
import { useState, Fragment } from 'react';
import UsersTable from '../../UsersTable';
import './UsersSearch.css';

const UsersSearch = () => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <div className="inputContainer">
        <UserSearchTextInput setText={setText} />
      </div>
      <div className="tableContainer">
        <div className="usersTable">
          <UsersTable nameOrNumber={text} />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersSearch;
