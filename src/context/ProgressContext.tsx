import React, { createContext, useContext, useMemo, useState } from "react";

type DoneSetsMap = Record<string, boolean>;

type ProgressContextValue = {
  doneSets: DoneSetsMap;
  toggleSet: (key: string) => void;
  completedSets: number;
};

const ProgressContext = createContext<ProgressContextValue | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [doneSets, setDoneSets] = useState<DoneSetsMap>({});

  function toggleSet(key: string) {
    setDoneSets((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const completedSets = useMemo(() => {
    return Object.values(doneSets).filter(Boolean).length;
  }, [doneSets]);

  const value = useMemo(
    () => ({ doneSets, toggleSet, completedSets }),
    [doneSets, completedSets]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
