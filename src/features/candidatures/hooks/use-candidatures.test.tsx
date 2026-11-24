import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCandidatures } from "../api/candidatures.api";
import { useCandidatures } from "./use-candidatures";

vi.mock("../api/candidatures.api", () => ({
  getCandidatures: vi.fn(),
}));

const getCandidaturesMock = vi.mocked(getCandidatures);

describe("useCandidatures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("charge les candidatures et termine l'état de chargement", async () => {
    const candidatures = [
      {
        id: 1,
        entreprise: "Acme",
        poste: "Développeuse",
        statut: "envoyee" as const,
        dateCandidature: "2026-01-15",
      },
    ];
    getCandidaturesMock.mockResolvedValue(candidatures);

    const { result } = renderHook(() => useCandidatures());

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.candidatures).toEqual(candidatures);
    expect(result.current.error).toBeNull();
  });

  it("expose le message en cas d'échec du chargement", async () => {
    getCandidaturesMock.mockRejectedValue(new Error("Service indisponible"));

    const { result } = renderHook(() => useCandidatures());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.error).toBe("Service indisponible");
    expect(result.current.candidatures).toEqual([]);
  });
});
