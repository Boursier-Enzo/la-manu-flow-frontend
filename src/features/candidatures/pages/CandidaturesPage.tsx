"use client";

import { CandidatureCard } from "../components/CandidatureCard";
import { useCandidatures } from "../hooks/use-candidatures";

export function CandidaturesPage() {
  const { candidatures, isLoading, error } = useCandidatures();

  if (isLoading) {
    return <p className="text-sm text-slate-600">Chargement...</p>;
  }

  if (error) {
    return (
      <p role="alert" className="text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (candidatures.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-600">
        Aucune candidature enregistrée.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {candidatures.map((candidature) => (
        <CandidatureCard
          key={candidature.id}
          candidature={candidature}
        />
      ))}
    </div>
  );
}
