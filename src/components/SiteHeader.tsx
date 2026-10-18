import { Link } from 'react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Activity, CircleHelp } from 'lucide-react'
import { siteConfig } from '@/config'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white">
            <Activity className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg font-semibold text-slate-900">
              {siteConfig.name}
            </span>
            <span className="hidden text-xs text-slate-500 sm:block">{siteConfig.tagline}</span>
          </span>
        </Link>

        <div className="ml-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CircleHelp className="h-4 w-4" />
                <span className="hidden sm:inline">Adding modules</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Publishing an Articulate module</DialogTitle>
                <DialogDescription>
                  How new learning content gets onto this portal.
                </DialogDescription>
              </DialogHeader>
              <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-700">
                <li>
                  In Articulate Storyline or Rise, publish the course as{' '}
                  <strong>Web / HTML5</strong> and unzip the output.
                </li>
                <li>
                  Copy the exported folder into{' '}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">
                    public/courses/&lt;module-id&gt;/
                  </code>{' '}
                  so that{' '}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">story.html</code>{' '}
                  (Storyline) or{' '}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">index.html</code>{' '}
                  (Rise) sits directly inside it.
                </li>
                <li>
                  Register the module in{' '}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">src/config.ts</code>{' '}
                  with the same id, title, description, and entry file.
                </li>
                <li>Rebuild the site — the module appears in the library automatically.</li>
              </ol>
              <p className="rounded-md bg-teal-50 p-3 text-xs leading-relaxed text-teal-800">
                Full instructions are in the project README. No server-side code is required —
                Articulate HTML5 packages run entirely in the browser inside a sandboxed player.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
