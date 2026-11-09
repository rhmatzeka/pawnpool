import { describe, expect, it } from "vitest";
import { DESKTOP_NAV, NAV, isCurrent } from "./nav";

describe("nav", () => {
  it("marks a section current on its own page and on the pages under it", () => {
    expect(isCurrent("/events", "/events")).toBe(true);
    expect(isCurrent("/events/practice", "/events")).toBe(true);
    expect(isCurrent("/eventsx", "/events")).toBe(false);
    expect(isCurrent("/", "/events")).toBe(false);
    expect(isCurrent(null, "/events")).toBe(false);
  });

  it("puts every page in the phone menu and keeps the desktop bar to four", () => {
    expect(NAV.map((n) => n.href)).toEqual(["/events", "/leaderboard", "/rules", "/sponsor", "/host"]);
    expect(DESKTOP_NAV).toHaveLength(4);
  });
});
