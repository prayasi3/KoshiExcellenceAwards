import { useContext } from "react";
import { EditionsContext } from "./editionsContextValue";

export function useEditions() {
  return useContext(EditionsContext);
}
