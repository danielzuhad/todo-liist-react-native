import { TaskListType } from "@/constants/DataDummy";

export const filterTodo = (todos: TaskListType, status: string) => {
  return todos
    .flatMap((item) => ({
      title: item.title,
      data: item.data.filter((todo) => todo.status === status),
    }))
    .filter((item) => item.data.length > 0);
};
