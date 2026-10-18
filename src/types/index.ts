export type ModuleLevel = 'Foundation' | 'Intermediate' | 'Advanced'

export interface CourseModule {
  /** Folder name under public/courses/ */
  id: string
  title: string
  description: string
  category: string
  level: ModuleLevel
  durationMinutes: number
  /**
   * Entry HTML file inside the module folder.
   * Articulate Storyline exports -> 'story.html'
   * Articulate Rise exports     -> 'index.html'
   * Leave undefined for modules whose content has not been added yet.
   */
  entryFile?: 'story.html' | 'index.html'
  tags: string[]
  updatedAt?: string
}

export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'

export interface ModuleProgress {
  status: ProgressStatus
  /** 0-100, manually tracked (Articulate content runs sandboxed in an iframe) */
  percent: number
  lastAccessed?: string
}

export type ProgressMap = Record<string, ModuleProgress>
