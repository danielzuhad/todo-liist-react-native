import { TaskDetailType, TaskListType } from "@/constants/DataDummy";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@todos";

export const getTodos = async (): Promise<TaskListType> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error reading todos", e);
    return [];
  }
};

export const addTodo = async (newTodo: {
  title: string;
  data: TaskDetailType;
}) => {
  try {
    const todos = await getTodos();
    const existingDateIndex = todos.findIndex(
      (item) => item.title === newTodo.title
    );

    if (existingDateIndex !== -1) {
      todos[existingDateIndex].data.push(newTodo.data);
    } else {
      todos.push({ title: newTodo.title, data: [newTodo.data] });
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error("Error adding todo", e);
  }
};

export const updateTodo = async (
  date: string,
  oldName: string,
  updatedTodo: TaskDetailType
) => {
  try {
    const todos = await getTodos();
    const dateIndex = todos.findIndex((item) => item.title === date);

    if (dateIndex !== -1) {
      const todoIndex = todos[dateIndex].data.findIndex(
        (item) => item.name === oldName
      );

      if (todoIndex !== -1) {
        todos[dateIndex].data[todoIndex] = updatedTodo;
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      }
    }
  } catch (e) {
    console.error("Error updating todo", e);
  }
};

export const deleteTodo = async (date: string, todoName: string) => {
  try {
    const todos = await getTodos();
    const dateIndex = todos.findIndex((item) => item.title === date);

    if (dateIndex !== -1) {
      todos[dateIndex].data = todos[dateIndex].data.filter(
        (item) => item.name !== todoName
      );

      if (todos[dateIndex].data.length === 0) {
        todos.splice(dateIndex, 1);
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  } catch (e) {
    console.error("Error deleting todo", e);
  }
};
