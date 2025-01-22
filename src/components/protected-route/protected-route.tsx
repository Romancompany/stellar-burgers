import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUser, getIsAuthChecked } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  UnAuth?: boolean;
  component: React.JSX.Element;
};

const ProtectedRoute = ({
  UnAuth = false,
  component
}: TProtectedRouteProps): React.JSX.Element => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
  const location = useLocation();

  // url == "/profile" onlyUnAuth = false, user == null
  // url == "/login", from: "/profile", onlyUnAuth = true, user == null
  // url == "/login", from: "/profile", onlyUnAuth = true, user != null
  // url == "/profile" onlyUnAuth = false, user != null
  // url == "/profile" onlyUnAuth = false, user == null

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!UnAuth && !user) {
    // route for authorized, but unauthorized
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (UnAuth && user) {
    // route for unauthorized, but authorized
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // onlyUnAuth && !user, route for unauthorized and unauthorized
  // !onlyUnAuth && user, route for authorized and authorized

  return component;
};

export const OnlyAuth = ProtectedRoute;

export const OnlyUnAuth = ({
  component
}: {
  component: JSX.Element;
}): JSX.Element => <ProtectedRoute UnAuth component={component} />;
