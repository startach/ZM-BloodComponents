import { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateUserRoute = ({ component: Component, ...rest }) => {
  const [info] = useState({
    auth: false,
    loading: true,
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        if (info.auth) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    ></Route>
  );
};

export default PrivateUserRoute;
