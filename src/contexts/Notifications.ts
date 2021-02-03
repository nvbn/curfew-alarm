import { createContext } from "react";

import INotifications, {
  NotificationsDefaultImpl,
} from "../dependencies/INotifications";

const Notifications = createContext<INotifications>(NotificationsDefaultImpl);

export default Notifications;
