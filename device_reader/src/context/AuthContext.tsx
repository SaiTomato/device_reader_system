import { createContext, useEffect, useState } from "react";

import type { UserInfo } from "../types/entity/auth";

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

      try {
        const saved =
          localStorage.getItem(
            "user"
          );

        return saved
          ? JSON.parse(saved)
          : null;
      } catch (error) {
        console.warn("Failed to parse saved user, clearing it.", error);
        localStorage.removeItem("user"); // 顺手清掉损坏的数据，避免下次还报错
        return null;
      }

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