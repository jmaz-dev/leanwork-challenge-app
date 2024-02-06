import React, { createContext, useReducer, useContext, ReactNode } from "react";

export interface UserData {
 username: string;
 email: string;
 cpf: string;
 tel: string;
}

interface UserState {
 formData: UserData | null;
}

type UserAction = { type: "SET_FORM_DATA"; payload: UserData };

interface UserContextType {
 state: UserState;
 setFormData: (formData: UserData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialState: UserState = {
 formData: null,
};

const reducer = (state: UserState, action: UserAction): UserState => {
 switch (action.type) {
  case "SET_FORM_DATA":
   return {
    ...state,
    formData: action.payload,
   };
  default:
   return state;
 }
};

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [state, dispatch] = useReducer(reducer, initialState);

 const setFormData = (formData: UserData) => {
  dispatch({ type: "SET_FORM_DATA", payload: formData });
 };

 return <UserContext.Provider value={{ state, setFormData }}>{children}</UserContext.Provider>;
};

const useUserContext = (): UserContextType => {
 const context = useContext(UserContext);
 if (!context) {
  throw new Error("useUserContext precisa ser utilizado com um UserProvider");
 }
 return context;
};

export { UserProvider, useUserContext };
