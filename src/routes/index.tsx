import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { ArrowRightLeft, Scale, AlertTriangle, Pill } from "lucide-react";
import bgImage from "../assets/gradient-bg.jpg";
import { MEDICATIONS } from "@/lib/medications";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pounds to Kilograms Converter" },
      { name: "description", content: "Quickly convert pounds to kilograms with this simple, beautiful conversion app." },
      { property: "og:title", content: "Pounds to Kilograms Converter" },
      { property: "og:description", content: "Quickly convert pounds to kilograms with this simple, beautiful conversion app." },
    ],
  }),
  component: Index,
});

const LBS_TO_KG = 0.45359237;

function formatNumber(n: number): string {
  if (Number.isNaN(n) || !Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  if (n < 0.001) return n.toExponential(3);
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}

function Index() {
  const [pounds, setPounds] = useState<string>("");
  const [medId, setMedId] = useState<string>("");


  const kilograms = useCallback(() => {
    const val = parseFloat(pounds);
    if (Number.isNaN(val)) return 0;
    return val * LBS_TO_KG;
  }, [pounds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setPounds(value);
    }
  };

  const kg = kilograms();
  const hasValue = pounds !== "" && !Number.isNaN(parseFloat(pounds));

  const med = MEDICATIONS.find((m) => m.id === medId);
  const rawDose = med ? kg * med.dosePerKg : 0;
  const exceedsMax = !!med && rawDose > med.maxDoseMg;
  const cappedDose = med ? Math.min(rawDose, med.maxDoseMg) : 0;
  const volumeMl = med ? cappedDose / med.concentrationMgPerMl : 0;
  const showDose = hasValue && !!med && kg > 0;


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <img
        src={bgImage}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        width={1920}
        height={1080}
      />
      <div className="pointer-events-none absolute inset-0 bg-background/60 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl bg-card/80 p-8 shadow-glow ring-1 ring-border/50 backdrop-blur-xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-lg">
              <Scale className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gradient">
              Weight Converter
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter pounds to get kilograms instantly
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="pounds"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Pounds (lb)
              </label>
              <div className="relative">
                <input
                  id="pounds"
                  type="text"
                  inputMode="decimal"
                  value={pounds}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-2xl border border-input bg-secondary/50 px-5 py-4 text-2xl font-semibold text-foreground outline-none ring-0 transition-all placeholder:text-muted-foreground/50 focus:border-primary/50 focus:bg-card focus:ring-4 focus:ring-primary/10"
                  autoFocus
                />
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  lb
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <ArrowRightLeft className="h-5 w-5" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">
                Kilograms (kg)
              </label>
              <div className="relative">
                <div className="w-full rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 px-5 py-4">
                  <span className="text-2xl font-bold text-primary">
                    {hasValue ? formatNumber(kg) : "—"}
                  </span>
                </div>
                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                  kg
                </span>
              </div>
            </div>

            {hasValue && (
              <div className="rounded-xl bg-secondary/60 px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{pounds}</span> lb ≈{" "}
                  <span className="font-semibold text-foreground">{formatNumber(kg)}</span> kg
                </p>
              </div>
            )}

            <div className="border-t border-border/60 pt-6">
              <label
                htmlFor="medication"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                <Pill className="h-4 w-4 text-primary" />
                Medication
              </label>
              <Select value={medId} onValueChange={setMedId}>
                <SelectTrigger
                  id="medication"
                  className="h-auto w-full rounded-2xl border-input bg-secondary/50 px-5 py-4 text-base"
                >
                  <SelectValue placeholder="Select a medication" />
                </SelectTrigger>
                <SelectContent>
                  {MEDICATIONS.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {med && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {med.dosePerKg} mg/kg · {med.route} · {med.concentrationLabel}
                </p>
              )}

              {showDose && med && (
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 px-5 py-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Recommended dose (based on weight)
                    </p>
                    <p className="mt-1 text-2xl font-bold text-primary">
                      {formatNumber(cappedDose)} mg
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {med.dosePerKg} mg/kg × {formatNumber(kg)} kg
                    </p>
                  </div>

                  <div className="rounded-2xl border border-accent/40 bg-accent/30 px-5 py-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Total amount to administer
                    </p>
                    <p className="mt-1 text-2xl font-bold text-accent-foreground">
                      {formatNumber(volumeMl)} mL
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Using {med.concentrationLabel}
                    </p>
                  </div>

                  {exceedsMax && (
                    <div className="flex gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <p className="text-xs text-destructive">
                        <span className="font-semibold">
                          Warning: calculated dose exceeds the maximum allowed dose.
                        </span>{" "}
                        The weight-based calculation is {formatNumber(rawDose)} mg, which is above
                        the maximum single dose of {formatNumber(med.maxDoseMg)} mg. The result
                        shown has been capped at the maximum. {med.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 rounded-xl bg-secondary/60 px-4 py-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      These calculations are for reference only and should be verified against the
                      approved prescribing information or your institutional guidelines before
                      administration.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          1 lb = {LBS_TO_KG.toFixed(8)} kg
        </p>
      </div>
    </div>
  );
}
