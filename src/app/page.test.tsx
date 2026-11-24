import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HomePage from "./page";

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("présente LaManuFlow et un lien vers les candidatures", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { name: "Bienvenue sur LaManuFlow" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Voir mes candidatures" }),
    ).toHaveAttribute("href", "/candidatures");
  });
});
