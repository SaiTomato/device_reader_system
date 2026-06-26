import { createContext, useEffect, useState } from "react";

import type { UserInfo } from "../types/entity/auth";

import { storage } from '../utils/identity';

export interface AuthContextType {

  user:
    UserInfo | null;

  setUser:
    React.Dispatch<
      React.SetStateAction<
        UserInfo | null
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
    UserInfo | null
  >(
    () => {
      return storage.getItem('user'); 
    }
  );

  useEffect(() => {

    if(user){
      storage.setItem("user", user);
    }else{
      storage.removeItem("user");
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