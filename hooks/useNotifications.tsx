import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const useNotifications = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {}
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  const showNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  };

  return { showNotification };
};

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
}
