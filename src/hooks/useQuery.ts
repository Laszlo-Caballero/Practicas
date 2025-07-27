import { env } from "../app/config/env";
import { useAuth } from "./../context/AuthContext";
import { useEffect, useState } from "react";

interface QueryProps<T> {
  dependencies?: unknown[];
  queryFn: (url: string, token: string) => Promise<T>;
}

export function useQuery<T>({ queryFn, dependencies }: QueryProps<T>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: true, error: "" });
  const { user } = useAuth();

  const refreshData = (data: T) => {
    setFetch((prev) => ({ ...prev, data }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetch({
          isLoading: true,
          isError: false,
          error: "",
          data: undefined,
        });
        const data = await queryFn(env.url_api || "", user?.token || "");
        setFetch({ isLoading: false, data, isError: false, error: "" });
      } catch (error: unknown) {
        setFetch({ isLoading: false, isError: true, error: String(error) });
      }
    };
    fetchData();
  }, [...(dependencies || [])]);

  return {
    ...fetch,
    refreshData,
  };
}
