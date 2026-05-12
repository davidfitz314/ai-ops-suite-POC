import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../../api/settings";
import type { AppSettings } from "../../api/settings";

const SettingsContext = createContext<{
  settings: AppSettings | null;
  setSettings: (s: AppSettings) => void;
}>({
  settings: null,
  setSettings: () => {},
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    if (settings) return;

    getSettings()
      .then(setSettings)
      .finally(() => setLoading(false));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
