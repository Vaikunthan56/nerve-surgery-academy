import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Maximize,
  Minimize,
  RotateCcw,
  TriangleAlert,
} from 'lucide-react'
import { modules } from '@/config'
import { useProgress } from '@/hooks/use-progress'

export default function Player() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const module = modules.find((m) => m.id === id)
  const { progress, markInProgress, markCompleted, reset } = useProgress()
  const frameWrapRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const status = module ? (progress[module.id]?.status ?? 'not-started') : 'not-started'

  // Resolve the course entry relative to the app URL (works with HashRouter
  // on any static host, including sub-path deployments).
  const entryUrl = useMemo(() => {
    if (!module?.entryFile) return null
    return new URL(`courses/${module.id}/${module.entryFile}`, window.location.href).toString()
  }, [module])

  useEffect(() => {
    if (module?.entryFile) markInProgress(module.id)
  }, [module, markInProgress])

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  if (!module) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center">
        <TriangleAlert className="h-10 w-10 text-amber-500" />
        <p className="font-medium text-slate-800">This module is not registered in the catalogue.</p>
        <Button asChild variant="outline">
          <Link to="/">Back to library</Link>
        </Button>
      </div>
    )
  }

  if (!module.entryFile || !entryUrl) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center">
        <TriangleAlert className="h-10 w-10 text-amber-500" />
        <p className="font-medium text-slate-800">“{module.title}” has no published content yet.</p>
        <p className="max-w-md text-sm text-slate-500">
          Export the course from Articulate as Web/HTML5 and place it in{' '}
          <code className="rounded bg-slate-100 px-1 text-xs">public/courses/{module.id}/</code>,
          then set <code className="rounded bg-slate-100 px-1 text-xs">entryFile</code> in the
          catalogue.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Back to library</Link>
        </Button>
      </div>
    )
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void frameWrapRef.current?.requestFullscreen()
    }
  }

  return (
    <div className="flex h-screen flex-col bg-slate-900">
      {/* Player toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-700 bg-slate-800 px-4 py-2.5 text-white">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-200 hover:bg-slate-700 hover:text-white"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" /> Library
        </Button>

        <div className="min-w-0">
          <h1 className="truncate font-serif text-sm font-semibold sm:text-base">
            {module.title}
          </h1>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Badge variant="secondary" className="bg-slate-700 text-slate-200 hover:bg-slate-700">
              {module.category}
            </Badge>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {module.durationMinutes} min
            </span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {status === 'completed' ? (
            <span className="flex items-center gap-1.5 rounded-md bg-emerald-900/60 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> Completed
            </span>
          ) : (
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => markCompleted(module.id)}
            >
              <CheckCircle2 className="mr-1.5 h-4 w-4" /> Mark complete
            </Button>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:bg-slate-700 hover:text-white"
              >
                <RotateCcw className="mr-1.5 h-4 w-4" /> Reset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset progress for this module?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your completion record for “{module.title}” will be cleared from this browser.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => reset(module.id)}>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:bg-slate-700 hover:text-white"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="mr-1.5 h-4 w-4" />
            ) : (
              <Maximize className="mr-1.5 h-4 w-4" />
            )}
            {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Articulate content */}
      <div ref={frameWrapRef} className="relative flex-1 bg-white">
        <iframe
          key={entryUrl}
          src={entryUrl}
          title={module.title}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  )
}
