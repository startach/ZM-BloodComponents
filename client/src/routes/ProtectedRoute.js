import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, isAuthenticated, ...rest }) => {
  const authorizedPages = localStorage.getItem("authorizedPages")?.split(",");
  let isPageAuthorized = authorizedPages?.includes(path);
  const homepageUrl = localStorage.getItem("homepageUrl") || "/donations-management";

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          isPageAuthorized || path === homepageUrl ? (
            <Component {...props} />
          ) : (
            <Redirect to={homepageUrl} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
