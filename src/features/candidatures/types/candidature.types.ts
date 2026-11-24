export type CandidatureStatus =
  | "brouillon"
  | "envoyee"
  | "en_cours"
  | "acceptee"
  | "refusee";

export type Candidature = {
  id: number;
  entreprise: string;
  poste: string;
  statut: CandidatureStatus;
  dateCandidature: string;
  description?: string;
};
