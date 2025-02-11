
import { create } from "zustand";
import { Accomplishment, View } from "../types/accomplishment";

export const sampleAccomplishments: Accomplishment[] = [
  {
    id: "1",
    title: "Reached 100% of sales quota for Q2",
    date: "2024-06-15",
    role: "Sales Executive",
    company: "HorizonCorp",
    privateDetails: "Managed a 20-client portfolio worth $1.2M in revenue",
  },
  {
    id: "2",
    title: "Led a team of 4 to develop a new sales dashboard",
    date: "2024-07-10",
    role: "Project Manager",
    company: "HorizonCorp",
    privateDetails: "Used Agile methodology to reduce development time by 25%",
  },
  // ... add the remaining 8 accomplishments here with similar structure
];

interface AccomplishmentStore {
  accomplishments: Accomplishment[];
  view: View;
  setView: (view: View) => void;
  toggleSelected: (id: string) => void;
  getSelectedAccomplishments: () => Accomplishment[];
  clearSelection: () => void;
}

export const useAccomplishmentStore = create<AccomplishmentStore>((set, get) => ({
  accomplishments: sampleAccomplishments,
  view: "private",
  setView: (view) => set({ view }),
  toggleSelected: (id) =>
    set((state) => ({
      accomplishments: state.accomplishments.map((acc) =>
        acc.id === id ? { ...acc, selected: !acc.selected } : acc
      ),
    })),
  getSelectedAccomplishments: () =>
    get().accomplishments.filter((acc) => acc.selected),
  clearSelection: () =>
    set((state) => ({
      accomplishments: state.accomplishments.map((acc) => ({
        ...acc,
        selected: false,
      })),
    })),
}));
