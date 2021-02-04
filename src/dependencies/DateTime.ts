import { createContext } from "react";

export type IDateTime = () => Date;

export const DateTimeDefaultImpl: IDateTime = () => new Date();

export const DateTimeCtx = createContext<IDateTime>(DateTimeDefaultImpl);
