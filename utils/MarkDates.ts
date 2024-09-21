import { TaskListType } from "@/constants/DataDummy";

interface MarkedDates {
  [key: string]: {
    marked: boolean;
    dotColor: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

export const markDates = (dataDummy: TaskListType, selectedDate: string) => {
  let marked: MarkedDates = {};

  dataDummy.forEach((item) => {
    marked[item.title] = {
      marked: true,
      dotColor: "blue",
    };
  });

  marked[selectedDate] = {
    ...marked[selectedDate],
    selected: true,
    selectedColor: "orange",
  };

  return marked;
};
