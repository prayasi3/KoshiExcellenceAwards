import { createContext } from "react";

export const EditionsContext = createContext({
  editions: [],
  loading: true,
  error: "",
});
