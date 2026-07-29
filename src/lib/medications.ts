export type Medication = {
  id: string;
  name: string;
  /** mg per kg per dose */
  dosePerKg: number;
  /** maximum single dose in mg */
  maxDoseMg: number;
  /** available liquid concentration */
  concentrationMgPerMl: number;
  concentrationLabel: string;
  route: string;
  notes: string;
};

/** Reference-only common OTC / legal medication dosing values. */
export const MEDICATIONS: Medication[] = [
  {
    id: "acetaminophen",
    name: "Acetaminophen (Paracetamol)",
    dosePerKg: 15,
    maxDoseMg: 1000,
    concentrationMgPerMl: 32,
    concentrationLabel: "160 mg / 5 mL suspension",
    route: "Oral, every 4–6 h",
    notes: "Max 4000 mg in 24 hours for adults.",
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    dosePerKg: 10,
    maxDoseMg: 800,
    concentrationMgPerMl: 20,
    concentrationLabel: "100 mg / 5 mL suspension",
    route: "Oral, every 6–8 h",
    notes: "Take with food. Avoid in renal impairment.",
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    dosePerKg: 15,
    maxDoseMg: 1000,
    concentrationMgPerMl: 50,
    concentrationLabel: "250 mg / 5 mL suspension",
    route: "Oral, every 8–12 h",
    notes: "Complete the full prescribed course.",
  },
  {
    id: "cetirizine",
    name: "Cetirizine",
    dosePerKg: 0.25,
    maxDoseMg: 10,
    concentrationMgPerMl: 1,
    concentrationLabel: "5 mg / 5 mL solution",
    route: "Oral, once daily",
    notes: "May cause mild drowsiness.",
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine",
    dosePerKg: 1.25,
    maxDoseMg: 50,
    concentrationMgPerMl: 2.5,
    concentrationLabel: "12.5 mg / 5 mL elixir",
    route: "Oral, every 6 h",
    notes: "Sedating antihistamine.",
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    dosePerKg: 0.15,
    maxDoseMg: 8,
    concentrationMgPerMl: 0.8,
    concentrationLabel: "4 mg / 5 mL solution",
    route: "Oral, every 8 h",
    notes: "Reference dosing only.",
  },
];
