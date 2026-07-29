export type DoseUnit = "mg" | "mL" | "IU";

export type Medication = {
  id: string;
  name: string;
  /** dose per kg per dose in the doseUnit */
  dosePerKg: number;
  /** unit for dosePerKg and maxDose */
  doseUnit: DoseUnit;
  /** maximum single dose in the doseUnit */
  maxDose: number;
  /** concentration amount per 1 mL (e.g. 32 mg/mL or 100 IU/mL) */
  concentrationValue: number;
  concentrationLabel: string;
  concentrationUnit: string;
  route: string;
  notes: string;
};

/** Reference-only common OTC / legal medication dosing values. */
export const MEDICATIONS: Medication[] = [
  {
    id: "acetaminophen",
    name: "Acetaminophen (Paracetamol)",
    dosePerKg: 15,
    doseUnit: "mg",
    maxDose: 1000,
    concentrationValue: 32,
    concentrationLabel: "160 mg / 5 mL suspension",
    concentrationUnit: "mg/mL",
    route: "Oral, every 4–6 h",
    notes: "Max 4000 mg in 24 hours for adults.",
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen",
    dosePerKg: 10,
    doseUnit: "mg",
    maxDose: 800,
    concentrationValue: 20,
    concentrationLabel: "100 mg / 5 mL suspension",
    concentrationUnit: "mg/mL",
    route: "Oral, every 6–8 h",
    notes: "Take with food. Avoid in renal impairment.",
  },
  {
    id: "amoxicillin",
    name: "Amoxicillin",
    dosePerKg: 15,
    doseUnit: "mg",
    maxDose: 1000,
    concentrationValue: 50,
    concentrationLabel: "250 mg / 5 mL suspension",
    concentrationUnit: "mg/mL",
    route: "Oral, every 8–12 h",
    notes: "Complete the full prescribed course.",
  },
  {
    id: "cetirizine",
    name: "Cetirizine",
    dosePerKg: 0.25,
    doseUnit: "mg",
    maxDose: 10,
    concentrationValue: 1,
    concentrationLabel: "5 mg / 5 mL solution",
    concentrationUnit: "mg/mL",
    route: "Oral, once daily",
    notes: "May cause mild drowsiness.",
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine",
    dosePerKg: 1.25,
    doseUnit: "mg",
    maxDose: 50,
    concentrationValue: 2.5,
    concentrationLabel: "12.5 mg / 5 mL elixir",
    concentrationUnit: "mg/mL",
    route: "Oral, every 6 h",
    notes: "Sedating antihistamine.",
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    dosePerKg: 0.15,
    doseUnit: "mg",
    maxDose: 8,
    concentrationValue: 0.8,
    concentrationLabel: "4 mg / 5 mL solution",
    concentrationUnit: "mg/mL",
    route: "Oral, every 8 h",
    notes: "Reference dosing only.",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3 (Cholecalciferol)",
    dosePerKg: 25,
    doseUnit: "IU",
    maxDose: 4000,
    concentrationValue: 400,
    concentrationLabel: "400 IU / mL drops",
    concentrationUnit: "IU/mL",
    route: "Oral, once daily",
    notes: "Reference dosing only. Typical adult supplementation is 600-4000 IU daily.",
  },
];
