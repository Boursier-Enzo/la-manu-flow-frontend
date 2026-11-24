import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CandidatureCard } from "./CandidatureCard";

describe("CandidatureCard", () => {
  it("affiche les informations principales et le statut lisible", () => {
    render(
      <CandidatureCard
        candidature={{
          id: 1,
          entreprise: "Acme",
          poste: "Développeuse",
          statut: "en_cours",
          dateCandidature: "2026-01-15",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Développeuse" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Acme")).toBeInTheDocument();
    expect(screen.getByText("en cours")).toBeInTheDocument();
    expect(screen.getByRole("time")).toHaveAttribute(
      "dateTime",
      "2026-01-15",
    );
  });
});
