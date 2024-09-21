export const DATA_DUMMY = [
  {
    title: "2024-09-19",
    data: [
      { name: "Breakfast Meeting", time: "08:00 AM", status: "Confirmed" },
      { name: "Workshop", time: "02:00 PM", status: "Pending" },
    ],
  },
  {
    title: "2024-09-20",
    data: [
      { name: "Meeting with Team", time: "09:00 AM", status: "Confirmed" },
      { name: "Lunch with Client", time: "12:30 PM", status: "Pending" },
    ],
  },
  {
    title: "2024-09-21",
    data: [
      { name: "Project Presentation", time: "10:00 AM", status: "Confirmed" },
      { name: "Gym", time: "05:00 PM", status: "Cancelled" },
    ],
  },
  {
    title: "2024-09-22",
    data: [
      { name: "Doctor Appointment", time: "08:30 AM", status: "Confirmed" },
      { name: "Dinner with Friends", time: "07:00 PM", status: "Pending" },
    ],
  },
];

export type TaskListType = typeof DATA_DUMMY;
export type TaskType = (typeof DATA_DUMMY)[number];
export type TaskDetailType = (typeof DATA_DUMMY)[number]["data"][number];
