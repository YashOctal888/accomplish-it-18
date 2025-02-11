
export interface Accomplishment {
  id: string;
  title: string;
  date: string;
  role: string;
  company: string;
  privateDetails: string;
  selected?: boolean;
}

export type View = "private" | "public";
