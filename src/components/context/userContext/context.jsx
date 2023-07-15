// THE HEART BEAT OF OUR APP
import { createContext, useEffect, useReducer } from "react";
// creastecontext for creating context, useEffect for  swapping context, useReducer for managing context
import Reducer from "./reducer";

// /initial state
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null, //WHEN USER IS NOT LOGGED IN THE  VALUE IS NULL;
}

// expoting created context
export const Context = createContext(INITIAL_STATE);

// export CREATE CONTEXT provider
export const ContextProvider = ({ children }) => {
    const[state,dispatch]= useReducer(Reducer, INITIAL_STATE);
    useEffect(() => {
localStorage.setItem("user", JSON.stringify(state.user));
}, [state.user])

// CONTEXT PROVIDER; PROVIDING THIS STATE/CONTEXT GLOBALLY.
return(
    <Context.Provider value={{user:state.user, dispatch}}>
        {children}
    </Context.Provider>
)
}

