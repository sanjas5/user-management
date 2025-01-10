import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { BASE_URL } from "../constants/usersConstants";

export const useFetchUsers = (
  debouncedQuery: string,
  debouncedEmail: string,
  debouncedPhoneNumber: string,
  refresh: boolean
) => {
  const [users, setUsers] = useState([]);

  const { isLoading, error, data, refetch } = useQuery(
    ["users", debouncedQuery, debouncedEmail, debouncedPhoneNumber],
    () =>
      fetch(
        `${BASE_URL}?query=${debouncedQuery}&email=${debouncedEmail}&phoneNumber=${debouncedPhoneNumber}`
      ).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: refresh,
    }
  );

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return { isLoading, error, users, refetch };
};
