import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-1 flex-col justify-center px-6 py-16">
      <p className="text-sm font-semibold tracking-wide text-indigo-600">
        CAMPUSFLOW
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
        Bienvenue sur CampusFlow
      </h1>
      <p className="mt-4 max-w-xl text-lg text-slate-600">
        Suivez votre alternance et retrouvez vos démarches au même endroit.
      </p>
      <Link
        className="mt-8 w-fit rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        href="/candidatures"
      >
        Voir mes candidatures
      </Link>
    </main>
  );
}
