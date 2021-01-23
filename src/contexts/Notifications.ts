import * as ExpoNotifications from "expo-notifications";
import { createContext } from "react";

import INotifications from "../dependencies/INotifications";

const Notifications = createContext<INotifications>(ExpoNotifications);

export default Notifications;
