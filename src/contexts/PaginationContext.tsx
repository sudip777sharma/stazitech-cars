import React, { createContext, useReducer, useContext, ReactNode } from "react";
interface PaginationState {
  page: number;
}
type PaginationAction =
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" }
  | { type: "SET_PAGE"; payload: number };

const initialState: PaginationState = {
  page: 1,
};

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
): PaginationState => {
  switch (action.type) {
    case "NEXT_PAGE":
      return { ...state, page: Math.min(10, state.page + 1) };
    case "PREV_PAGE":
      return { ...state, page: Math.max(state.page - 1, 1) };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

interface PaginationContextProps {
  children: ReactNode;
}
const PaginationContext = createContext<
  | { state: PaginationState; dispatch: React.Dispatch<PaginationAction> }
  | undefined
>(undefined);

const PaginationProvider: React.FC<PaginationContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  return (
    <PaginationContext.Provider value={{ state, dispatch }}>
      {children}
    </PaginationContext.Provider>
  );
};

const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};

export { PaginationProvider, usePagination };
