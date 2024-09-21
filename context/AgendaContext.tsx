import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { markDates } from "@/utils/MarkDates";
import { today } from "@/utils/todat";
import { useNotifications } from "@/hooks/useNotifications";
import { TaskDetailType, TaskListType } from "@/constants/DataDummy";
import useDataAgenda from "@/hooks/useDataAgenda";
import useModal from "@/hooks/useModal";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/schema/todoSchema";

interface AgendaContextType {
  markedDates: { [key: string]: any };
  selectedDate: string;
  onDayPress: (day: { dateString: string }) => void;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  filteredItems: TaskListType;
  showNotification: (title: string, message: string) => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleItemPress: (item: TaskDetailType) => void;
  handleAddTodo: () => void;
  selectedTask: {
    name: string;
    time: string;
    status: string;
  } | null;
  agendaForm: UseFormReturn<
    {
      title: string;
      time: string;
      status: string;
    },
    any,
    undefined
  >;
}

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

// Provider component
export const AgendaProvider = ({ children }: { children: React.ReactNode }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTask, setSelectedTask] = useState<TaskDetailType | null>(null);

  const { modalVisible, setModalVisible } = useModal();

  const { showNotification } = useNotifications();

  // data management fetch
  const { filterItemsByDate, isError, isLoading, items, refetch } =
    useDataAgenda();

  /**
   * The form for creating or updating a todo item
   * This form uses the `useForm` hook from `react-hook-form`
   * and the `zodResolver` function to validate the form data
   * with the `todoSchema` schema
   */
  const agendaForm = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      time: "",
      status: "Pending",
    },
  });

  // filtered todo by the date
  const filteredItems = useMemo(
    () => filterItemsByDate(items, selectedDate),
    [items, selectedDate, filterItemsByDate]
  );

  // handle to set the selected date
  const onDayPress = useCallback((day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  }, []);

  // handle to set the selected todo
  const handleItemPress = useCallback(
    (item: TaskDetailType) => {
      agendaForm.setValue("title", item.name);
      agendaForm.setValue("time", item.time);
      agendaForm.setValue("status", item.status);
      setSelectedTask(item);
      setModalVisible(true);
    },
    [setModalVisible]
  );

  // handle to add a new todo
  const handleAddTodo = useCallback(() => {
    setSelectedTask(null);
    setModalVisible(true);
  }, [setModalVisible]);

  //   useEffect
  //   mark dates
  useEffect(() => {
    const marked = markDates(items, selectedDate);
    setMarkedDates(marked);
  }, [selectedDate, items]);

  // schedule notification
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNotificationForMidnight = () => {
      const now = new Date();
      const timeUntilTest = 10000; // test notification
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

      timeoutId = setTimeout(() => {
        const checkUncompletedTodos = () => {
          const todayTodos = items.find((item) => item.title === today);
          if (todayTodos) {
            const uncompletedTodos = todayTodos.data.filter(
              (todo) => todo.status === "Pending"
            );

            if (uncompletedTodos.length > 0) {
              showNotification(
                "Reminder Todos",
                `You have ${uncompletedTodos.length} uncompleted todos for today.`
              );
            } else {
              showNotification("Reminder Todos", `No Todo today, make one!`);
            }
          }
        };

        checkUncompletedTodos();

        scheduleNotificationForMidnight();
      }, timeUntilMidnight);
    };

    scheduleNotificationForMidnight();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [items, showNotification]);

  const contextValue = {
    markedDates,
    selectedDate,
    onDayPress,
    isLoading,
    isError,
    refetch,
    filteredItems,
    showNotification,
    modalVisible,
    setModalVisible,
    handleItemPress,
    handleAddTodo,
    selectedTask,
    agendaForm,
  };

  return (
    <AgendaContext.Provider value={contextValue}>
      {children}
    </AgendaContext.Provider>
  );
};

export const useAgenda = () => {
  const context = useContext(AgendaContext);
  if (!context) {
    throw new Error("useAgenda must be used within an AgendaProvider");
  }
  return context;
};
