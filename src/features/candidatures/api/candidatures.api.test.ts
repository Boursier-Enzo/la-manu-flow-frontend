import { afterEach, describe, expect, it, vi } from "vitest";
import { getCandidatures } from "./candidatures.api";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getCandidatures", () => {
  it("demande les candidatures au relais Next et retourne les données", async () => {
    const candidatures = [
      {
        id: 1,
        entreprise: "Acme",
        poste: "Développeuse",
        statut: "envoyee",
        dateCandidature: "2026-01-15",
      },
    ];
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(candidatures), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getCandidatures()).resolves.toEqual(candidatures);
    expect(fetchMock).toHaveBeenCalledWith("/api/backend/candidatures", {
      cache: "no-store",
    });
  });

  it("remonte le message de l'API en cas de réponse en erreur", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: "Accès refusé" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );

    await expect(getCandidatures()).rejects.toThrow("Accès refusé");
  });

  it("retourne un message générique si la réponse d'erreur n'est pas du JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Erreur", { status: 500 })),
    );

    await expect(getCandidatures()).rejects.toThrow(
      "Une erreur est survenue.",
    );
  });
});
