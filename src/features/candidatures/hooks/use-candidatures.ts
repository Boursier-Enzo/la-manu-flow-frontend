"use client";

import { useEffect, useState } from "react";
import { getCandidatures } from "../api/candidatures.api";
import type { Candidature } from "../types/candidature.types";

export function useCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadCandidatures() {
      try {
        const items = await getCandidatures();
        if (isActive) {
          setCandidatures(items);
        }
      } catch (caughtError) {
        if (isActive) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Impossible de charger les candidatures.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadCandidatures();

    return () => {
      isActive = false;
    };
  }, []);

  return { candidatures, isLoading, error };
}
