/**
 * usePlanStatus — client-side plan tier hook.
 *
 * Fetches /api/plan-status once on mount and caches the result.
 * Falls back to { pro: false } on any error (safe default = free tier).
 *
 * Usage:
 *   const { pro, loading } = usePlanStatus();
 */

import { useEffect, useState } from "react";

interface PlanStatus {
  plan: "free" | "pro";
  pro: boolean;
}

const CACHE_KEY = "skissify-plan-status";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function usePlanStatus(): PlanStatus & { loading: boolean } {
  const [status, setStatus] = useState<PlanStatus>({ plan: "free", pro: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check in-memory session cache first (survives re-renders, not page reloads)
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const { data, ts } = JSON.parse(raw) as { data: PlanStatus; ts: number };
        if (Date.now() - ts < CACHE_TTL_MS) {
          setStatus(data);
          setLoading(false);
          return;
        }
      }
    } catch {
      // ignore sessionStorage errors
    }

    let cancelled = false;
    fetch("/api/plan-status")
      .then((r) => r.json())
      .then((data: PlanStatus) => {
        if (cancelled) return;
        setStatus(data);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // On error: stay at free tier default
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { ...status, loading };
}
