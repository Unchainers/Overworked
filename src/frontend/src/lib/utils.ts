import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(key: string): string | undefined {
  const cookies = document.cookie.split("; ");
  const target = cookies.find((cookie) => cookie.startsWith(key + "="));
  return target ? decodeURIComponent(target.split("=")[1]) : undefined;
}

export function setCookie(
  key: string,
  value: string,
  max_age: number = 7200,
  path: string = "/",
) {
  document.cookie = `${key}=${encodeURIComponent(value)}; max-age=${max_age}; path=${path}`;
}

export function deleteCookie(key: string) {
  setCookie(key, "", 0);
}
