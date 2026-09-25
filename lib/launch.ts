import { siteConfig } from "@/lib/config";

function timezoneOffset(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const map = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );
  const hour = map.hour === "24" ? 0 : Number(map.hour);
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    hour,
    Number(map.minute),
    0,
  );
  return asUtc - date.getTime();
}

function madridWallTime(year: number, month: number, day: number, hour: number): Date {
  let utc = Date.UTC(year, month - 1, day, hour, 0, 0);
  for (let pass = 0; pass < 2; pass += 1) {
    utc = Date.UTC(year, month - 1, day, hour, 0, 0) - timezoneOffset(new Date(utc));
  }
  return new Date(utc);
}

export const serverOpensAt = madridWallTime(2026, 9, 26, siteConfig.saturdayEventHour);

export function isServerOpen(now: Date): boolean {
  return now.getTime() >= serverOpensAt.getTime();
}
