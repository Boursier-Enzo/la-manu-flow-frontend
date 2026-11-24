import type { Candidature } from "../types/candidature.types";

type CandidatureCardProps = {
  candidature: Candidature;
};

export function CandidatureCard({ candidature }: CandidatureCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            {candidature.poste}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {candidature.entreprise}
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
          {candidature.statut.replace("_", " ")}
        </span>
      </div>

      <time
        className="mt-4 block text-xs text-slate-500"
        dateTime={candidature.dateCandidature}
      >
        Candidature du{" "}
        {new Date(candidature.dateCandidature).toLocaleDateString("fr-FR")}
      </time>
    </article>
  );
}
