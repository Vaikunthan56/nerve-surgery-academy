import { useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpenCheck, GraduationCap, LibraryBig, Search } from 'lucide-react'
import { categories, modules, siteConfig } from '@/config'
import { useProgress } from '@/hooks/use-progress'
import { ModuleCard } from '@/components/ModuleCard'
import { SiteHeader } from '@/components/SiteHeader'

export default function Home() {
  const { progress } = useProgress()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return modules.filter((m) => {
      const inCategory = category === 'All' || m.category === category
      const inQuery =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q))
      return inCategory && inQuery
    })
  }, [query, category])

  const available = modules.filter((m) => m.entryFile).length
  const completed = modules.filter((m) => progress[m.id]?.status === 'completed').length
  const inProgress = modules.filter((m) => progress[m.id]?.status === 'in-progress').length

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-teal-900/10 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-teal-200">
            {siteConfig.tagline}
          </p>
          <h1 className="max-w-2xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            Learning modules for the junior surgeon
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-teal-100/90 sm:text-base">
            {siteConfig.subtitle}
          </p>

          <div className="mt-8 grid max-w-lg grid-cols-3 gap-4">
            <Stat icon={<LibraryBig className="h-4 w-4" />} value={available} label="Modules live" />
            <Stat icon={<GraduationCap className="h-4 w-4" />} value={inProgress} label="In progress" />
            <Stat icon={<BookOpenCheck className="h-4 w-4" />} value={completed} label="Completed" />
          </div>
        </div>
      </section>

      {/* Library */}
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-serif text-2xl font-semibold text-slate-900">Module library</h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, tags, titles…"
              className="pl-9"
            />
          </div>
        </div>

        <Tabs value={category} onValueChange={setCategory} className="mb-8">
          <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
            {['All', ...categories].map((c) => (
              <TabsTrigger
                key={c}
                value={c}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm data-[state=active]:border-teal-700 data-[state=active]:bg-teal-700 data-[state=active]:text-white"
              >
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="font-medium text-slate-700">No modules match your search.</p>
            <p className="mt-1 text-sm text-slate-500">Try a different keyword or category.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => (
              <ModuleCard key={m.id} module={m} progress={progress[m.id]} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 sm:px-6">
          {siteConfig.name} · Self-hosted interactive learning · Progress is stored privately in
          your browser.
        </div>
      </footer>
    </div>
  )
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number
  label: string
}) {
  return (
    <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-teal-200">{icon}
        <span className="text-2xl font-semibold text-white">{value}</span>
      </div>
      <p className="mt-0.5 text-xs text-teal-100/80">{label}</p>
    </div>
  )
}
