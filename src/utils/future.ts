/**
 * Abstraction around value that might not be yet available,
 * can be used with hooks when the values is produce asynchronously.
 * */

export const FUTURE_NOT_READY = "__FUTURE_NOT_READY__";

export type Future<T> = T | typeof FUTURE_NOT_READY;

export const isReady = <T>(val: Future<T>): val is T =>
  val !== FUTURE_NOT_READY;
