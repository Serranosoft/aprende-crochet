import { useCallback } from "react";

export function useRenderName(locale) {
  return useCallback(
    (item) => locale !== "es" ? item.name.en : item.name.es,
    [locale]
  );
}
