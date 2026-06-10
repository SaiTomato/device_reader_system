import { createContext, useEffect, useState } from "react";

import type { EmployeeInfo } from "../types/entity/employee";

export interface AuthContextType {

  user:
    EmployeeInfo | null;

  setUser:
    React.Dispatch<
      React.SetStateAction<
        EmployeeInfo | null
      >
    >;

}

export const AuthContext =
  createContext<AuthContextType>(

    {
      user: null,

      setUser: () => {}
    }

  );

type Props = {

  children:
    React.ReactNode;

};

export function AuthProvider({
  children
}: Props){

  const [
    user,
    setUser
  ] = useState<
    EmployeeInfo | null
  >(
    () => {

      const saved =
        localStorage.getItem(
          "user"
        );

      return saved
        ? JSON.parse(saved)
        : null;

    }
  );

  useEffect(() => {

    if(user){

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

    }else{

      localStorage.removeItem(
        "user"
      );

    }

  }, [user]);

  return (

    <AuthContext.Provider

      value={{

        user,

        setUser

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}