import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCandidatures } from "../hooks/use-candidatures";
import { CandidaturesPage } from "./CandidaturesPage";

vi.mock("../hooks/use-candidatures", () => ({
  useCandidatures: vi.fn(),
}));

const useCandidaturesMock = vi.mocked(useCandidatures);

describe("CandidaturesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("affiche l'état de chargement", () => {
    useCandidaturesMock.mockReturnValue({
      candidatures: [],
      isLoading: true,
      error: null,
    });

    render(<CandidaturesPage />);

    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });

  it("affiche l'erreur de chargement", () => {
    useCandidaturesMock.mockReturnValue({
      candidatures: [],
      isLoading: false,
      error: "Service indisponible",
    });

    render(<CandidaturesPage />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Service indisponible",
    );
  });

  it("affiche un état vide lorsqu'il n'y a aucune candidature", () => {
    useCandidaturesMock.mockReturnValue({
      candidatures: [],
      isLoading: false,
      error: null,
    });

    render(<CandidaturesPage />);

    expect(
      screen.getByText("Aucune candidature enregistrée."),
    ).toBeInTheDocument();
  });

  it("affiche une carte par candidature", () => {
    useCandidaturesMock.mockReturnValue({
      candidatures: [
        {
          id: 1,
          entreprise: "Acme",
          poste: "Développeuse",
          statut: "envoyee",
          dateCandidature: "2026-01-15",
        },
        {
          id: 2,
          entreprise: "Globex",
          poste: "Développeuse junior",
          statut: "en_cours",
          dateCandidature: "2026-01-20",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<CandidaturesPage />);

    expect(
      screen.getByRole("heading", { name: "Développeuse" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Développeuse junior" }),
    ).toBeInTheDocument();
  });
});
