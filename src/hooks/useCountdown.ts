import { useEffect, useMemo, useState } from "react";

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  isValid: boolean;
}

/**
 * Builds a Date for a given IANA timezone offset by formatting the target
 * wall-clock time as if it were in that timezone, then diffing against now.
 * We avoid a date library by using Intl to compute the current offset.
 */
function getTimezoneOffsetMs(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );
  return asUTC - date.getTime();
}

function targetDateInZone(isoDate: string, time: string, timeZone: string): Date | null {
  const [y, m, d] = isoDate.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) return null;

  const naiveUTC = Date.UTC(y, m - 1, d, hh, mm, 0);
  const offset = getTimezoneOffsetMs(timeZone, new Date(naiveUTC));
  return new Date(naiveUTC - offset);
}

export function useCountdown(isoDate: string, time: string, timeZone: string): CountdownValue {
  const target = useMemo(() => targetDateInZone(isoDate, time, timeZone), [isoDate, time, timeZone]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (!target) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: false, isValid: false };
  }

  const diff = target.getTime() - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true, isValid: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: false, isValid: true };
}
