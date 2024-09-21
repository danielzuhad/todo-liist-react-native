import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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

  /**
   * Shows a notification with a given title and body. The notification is
   * shown immediately, and is not scheduled to appear at a later time.
   *
   * @param title The title of the notification.
   * @param body The body of the notification.
   */
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

/**
 * Registers for push notifications. If the platform is android, it creates a
 * default notification channel with a vibration pattern and light color.
 * Then, it requests notification permissions. If the permissions are granted,
 * it does nothing and returns. If the permissions are not granted, it shows an
 * alert box with an error message.
 */
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
