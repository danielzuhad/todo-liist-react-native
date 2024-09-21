import { TaskListType } from "@/constants/DataDummy";
import { markDates } from "@/utils/MarkDates";
import { getTodos } from "@/utils/storage";
import { today } from "@/utils/todat";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNotifications } from "./useNotifications";

const useAgenda = () => {
  // const [items, setItems] = useState<TaskListType>([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);

  const { showNotification } = useNotifications();

  console.log({ selectedDate });

  const {
    data: items = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<TaskListType>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const filterItemsByDate = useCallback((data: TaskListType, date: string) => {
    return data.filter((item) => item.title === date);
  }, []);

  const filteredItems = useMemo(
    () => filterItemsByDate(items, selectedDate),
    [items, selectedDate, filterItemsByDate]
  );

  console.log({ filteredItems });

  const onDayPress = useCallback((day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  }, []);

  useEffect(() => {
    const marked = markDates(items, selectedDate);
    setMarkedDates(marked);
  }, [selectedDate, items]);

  useEffect(() => {
    const checkUncompletedTodos = () => {
      const todayTodos = items.find((item) => item.title === today);
      if (todayTodos) {
        const uncompletedTodos = todayTodos.data.filter(
          (todo) => todo.status !== "Confirmed"
        );
        if (uncompletedTodos.length > 0) {
          showNotification(
            "Uncompleted Todos",
            `You have ${uncompletedTodos.length} uncompleted todos for today.`
          );
        }
      }
    };

    checkUncompletedTodos();
    const interval = setInterval(checkUncompletedTodos, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, [items, showNotification]);

  return {
    markedDates,
    selectedDate,
    onDayPress,
    isLoading,
    isError,
    items,
    refetch,
    filteredItems,
    showNotification,
  };
};

export default useAgenda;
