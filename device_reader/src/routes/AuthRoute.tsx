import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROLE } from "../constants/roles";

type RouteProps = {

  children: React.ReactNode;

};

export function AdminRoute({
  children
}: RouteProps){

  const { user } = useAuth();

  if(
    !user
  ){

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  if(
    user.role !== ROLE.ADMIN
  ){

    alert("権限はございません。");

    return (
      <Navigate
        to="/home"
        replace
      />
    );

  }

  return <>{children}</>;

}

export function UserRoute({
  children
}: RouteProps){

  const { user } = useAuth();

  if(
    !user
  ){

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  return <>{children}</>;

}

export function GuestRoute({
  children
}: RouteProps){

  const { user } = useAuth();

  if(user){

    return (
      <Navigate
        to="/home"
        replace
      />
    );

  }

  return <>{children}</>;

}