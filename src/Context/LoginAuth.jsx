import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthorized: false,
};

function reducer(curState, action) {
  switch (action.type) {
    case "login":
      return { ...curState, user: action.payload, isAuthorized: true };
    case "logout":
      return { ...curState, isAuthorized: false, user: null };
    default:
      throw new Error("Unknown Error");
  }
}

function LoginAuth({ children }) {
  const [{ user, isAuthorized }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  console.log(`user: ${user} Auth : ${isAuthorized}`);

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <>
      <AuthContext.Provider value={{ login, logout, isAuthorized, user }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === "undefined")
    throw new Error("Use COntext is used Before Provider");
  return context;
}

export { LoginAuth, useAuth };
