import type { Candidature } from "../types/candidature.types";

type ApiError = {
  message: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ApiError | null;
    throw new Error(error?.message ?? "Une erreur est survenue.");
  }

  return response.json() as Promise<T>;
}

export async function getCandidatures(): Promise<Candidature[]> {
  const response = await fetch("/api/backend/candidatures", {
    cache: "no-store",
  });

  return parseResponse<Candidature[]>(response);
}
