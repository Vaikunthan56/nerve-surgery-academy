import { useCallback, useEffect, useState } from 'react'
import type { ModuleProgress, ProgressMap, ProgressStatus } from '@/types'

const STORAGE_KEY = 'nsa-module-progress-v1'

function readStore(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

function writeStore(map: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    /* storage unavailable — progress is session-only */
  }
}

/** Loose percentage Articulate-free tracking: started = 25%, finished = 100%. */
const STATUS_PERCENT: Record<ProgressStatus, number> = {
  'not-started': 0,
  'in-progress': 25,
  completed: 100,
}

export function getStatus(map: ProgressMap, id: string): ProgressStatus {
  return map[id]?.status ?? 'not-started'
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => readStore())

  useEffect(() => {
    writeStore(progress)
  }, [progress])

  const markInProgress = useCallback((id: string) => {
    setProgress((prev) => {
      const existing = prev[id]
      if (existing?.status === 'completed') {
        return {
          ...prev,
          [id]: { ...existing, lastAccessed: new Date().toISOString() },
        }
      }
      return {
        ...prev,
        [id]: {
          status: 'in-progress',
          percent: Math.max(existing?.percent ?? 0, STATUS_PERCENT['in-progress']),
          lastAccessed: new Date().toISOString(),
        },
      }
    })
  }, [])

  const markCompleted = useCallback((id: string) => {
    setProgress((prev) => ({
      ...prev,
      [id]: { status: 'completed', percent: 100, lastAccessed: new Date().toISOString() },
    }))
  }, [])

  const reset = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const stats = {
    total: 0, // filled by caller with catalogue length
    started: Object.values(progress).filter((p) => p.status === 'in-progress').length,
    completed: Object.values(progress).filter((p) => p.status === 'completed').length,
  }

  return { progress, markInProgress, markCompleted, reset, stats }
}

export function progressPercent(p: ModuleProgress | undefined): number {
  return p?.percent ?? 0
}
