import { TaskListType } from "@/constants/DataDummy";
import { getTodos } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const useDataAgenda = () => {
  const {
    data: items = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const filterItemsByDate = useCallback((data: TaskListType, date: string) => {
    return data.filter((item) => item.title === date);
  }, []);

  return { items, isLoading, isError, refetch, filterItemsByDate };
};

export default useDataAgenda;
