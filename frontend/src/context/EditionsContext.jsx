import { useEffect, useMemo, useState } from "react";
import { fetchItems } from "../lib/api";
import { EditionsContext } from "./editionsContextValue";

export function EditionsProvider({ children }) {
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    fetchItems("/editions?limit=50&sortBy=year&sort=DESC")
      .then((items) => {
        if (!isMounted) return;
        setEditions(items);
        setError("");
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Unable to load editions.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(() => ({ editions, loading, error }), [editions, loading, error]);

  return (
    <EditionsContext.Provider value={value}>
      {children}
    </EditionsContext.Provider>
  );
}
