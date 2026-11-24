import { CandidaturesPage } from "@/features/candidatures";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        Mes candidatures
      </h1>
      <CandidaturesPage />
    </main>
  );
}
