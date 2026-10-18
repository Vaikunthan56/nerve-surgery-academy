import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BookOpen, CheckCircle2, Clock, Lock, PlayCircle, RotateCcw } from 'lucide-react'
import type { CourseModule, ModuleProgress } from '@/types'

const levelStyles: Record<CourseModule['level'], string> = {
  Foundation: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-amber-50 text-amber-700 border-amber-200',
  Advanced: 'bg-rose-50 text-rose-700 border-rose-200',
}

interface Props {
  module: CourseModule
  progress?: ModuleProgress
}

export function ModuleCard({ module, progress }: Props) {
  const available = Boolean(module.entryFile)
  const status = progress?.status ?? 'not-started'
  const percent = progress?.percent ?? 0

  return (
    <Card className="flex h-full flex-col border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-50">
            {module.category}
          </Badge>
          <Badge variant="outline" className={levelStyles[module.level]}>
            {module.level}
          </Badge>
          <span className="ml-auto flex items-center gap-1 text-xs text-slate-500">
            <Clock className="h-3.5 w-3.5" />
            {module.durationMinutes} min
          </span>
        </div>
        <CardTitle className="font-serif text-lg leading-snug text-slate-900">
          {module.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm text-slate-600">
          {module.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto pt-0">
        {status !== 'not-started' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                {status === 'completed' ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="font-medium text-emerald-700">Completed</span>
                  </>
                ) : (
                  <span className="font-medium text-teal-700">In progress</span>
                )}
              </span>
              <span>{percent}%</span>
            </div>
            <Progress value={percent} className="h-1.5" />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        {available ? (
          <Button asChild className="w-full bg-teal-700 hover:bg-teal-800">
            <Link to={`/module/${module.id}`}>
              {status === 'completed' ? (
                <>
                  <RotateCcw className="mr-2 h-4 w-4" /> Review module
                </>
              ) : status === 'in-progress' ? (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" /> Continue
                </>
              ) : (
                <>
                  <BookOpen className="mr-2 h-4 w-4" /> Start module
                </>
              )}
            </Link>
          </Button>
        ) : (
          <Button variant="outline" disabled className="w-full">
            <Lock className="mr-2 h-4 w-4" /> Content pending
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
