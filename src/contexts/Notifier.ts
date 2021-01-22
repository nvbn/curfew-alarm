import { createContext } from "react";
import * as Notifications from "expo-notifications";
import { INotifications } from "../dependencies";

const Notifier = createContext<INotifications>(Notifications);

export default Notifier;
