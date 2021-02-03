import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { ConstantsDefaultImpl } from "../dependencies/Constants";
import { DateTimeDefaultImpl } from "../dependencies/DateTime";
import { NetworkDefaultImpl } from "../dependencies/Network";
import { NotificationSenderDefaultImpl } from "../dependencies/Notifications";
import { PersistentStorageDefaultImpl } from "../dependencies/PersistentStorage";
import notificationsSender, {
  NOTIFICATIONS_TASK_NAME,
} from "../tasks/notificationsSender";

const setupBackgroundTasks = (): void => {
  TaskManager.defineTask(NOTIFICATIONS_TASK_NAME, async () => {
    notificationsSender(
      ConstantsDefaultImpl,
      DateTimeDefaultImpl,
      PersistentStorageDefaultImpl,
      NetworkDefaultImpl,
      NotificationSenderDefaultImpl,
    ).catch((e) => console.warn("background task failed", e));

    return BackgroundFetch.Result.NoData;
  });

  BackgroundFetch.registerTaskAsync(NOTIFICATIONS_TASK_NAME, {
    startOnBoot: true,
    minimumInterval: 300,
  }).catch((e) =>
    console.warn("unable to register notifications background task", e),
  );
};

export default setupBackgroundTasks;
