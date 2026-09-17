import { useCallback, useEffect, useRef, useState } from 'react'

import { CompletionButton } from '../../components/CompletionButton'
import { CompletionEffect } from '../../components/CompletionEffect'
import { ParentAccessTrigger } from '../../components/ParentAccessTrigger'
import { ProgressIndicator } from '../../components/ProgressIndicator'
import { Screen } from '../../components/Screen'
import type { RoutineItem } from '../../models/types'
import { praise } from '../../utils/copy'
import { successFeedback } from '../../utils/haptics'
import { readDurationToken } from '../../utils/motion'
import { TaskStep } from './TaskStep'
import styles from './routine.module.css'

type Props = {
  tasks: RoutineItem[]
  currentIndex: number
  completedCount: number
  /** True while the parent state machine has a completion in flight. */
  transitioning: boolean
  childName: string
  /** Called on a valid tap of the big button. */
  onComplete: () => void
  /** Called when the celebration ends and the routine should advance. */
  onCelebrationEnd: () => void
  onOpenParentSettings: () => void
}

/**
 * A completion runs celebrate -> slide -> idle. The button is dead for the
 * whole of it, not just the celebration: leaving it live during the page turn
 * was enough for a fast tapper to skip tasks.
 */
type Stage = 'idle' | 'celebrating' | 'sliding'

const CELEBRATION_MS = 800
const SLIDE_MS = 340

/**
 * The child-facing routine: exactly one task, one enormous button, and no
 * other way to move forward.
 */
export function RoutineScreen({
  tasks,
  currentIndex,
  completedCount,
  transitioning,
  childName,
  onComplete,
  onCelebrationEnd,
  onOpenParentSettings,
}: Props) {
  const [stage, setStage] = useState<Stage>('idle')
  /** Snapshot of the task turning away, kept only for the length of the slide. */
  const [outgoing, setOutgoing] = useState<RoutineItem | null>(null)
  const timers = useRef<number[]>([])
  /** Mirrors `stage` for synchronous reads — state is a frame behind a tap burst. */
  const busy = useRef(false)

  const task = tasks[currentIndex]
  const nextTask = tasks[currentIndex + 1] ?? null

  useEffect(
    () => () => {
      for (const id of timers.current) window.clearTimeout(id)
      timers.current = []
    },
    [],
  )

  const handlePress = useCallback(() => {
    // Three independent guards, because a toddler generates taps faster than
    // React re-renders: the ref (same frame), the stage (this render), and
    // `transitioning` from the reducer (which ignores a second begin anyway).
    if (busy.current || stage !== 'idle' || transitioning || !task) return
    busy.current = true

    onComplete()
    successFeedback()
    setStage('celebrating')

    const celebrateId = window.setTimeout(() => {
      // Advancing and starting the slide happen in one batched update, so the
      // button is never briefly live between the two animations.
      setOutgoing(task)
      setStage('sliding')
      onCelebrationEnd()

      const slideId = window.setTimeout(() => {
        setOutgoing(null)
        setStage('idle')
        busy.current = false
      }, readDurationToken('--d-slide', SLIDE_MS))
      timers.current.push(slideId)
    }, readDurationToken('--d-celebrate', CELEBRATION_MS))
    timers.current.push(celebrateId)
  }, [onCelebrationEnd, onComplete, stage, task, transitioning])

  if (!task) return null

  const locked = stage !== 'idle' || transitioning

  return (
    <Screen>
      <ParentAccessTrigger onOpen={onOpenParentSettings} />

      <div className={styles.routine}>
        <div className={styles.progressRow}>
          <ProgressIndicator
            total={tasks.length}
            completed={completedCount}
            currentIndex={currentIndex}
          />
        </div>

        <div className={styles.stage}>
          {outgoing && <TaskStep key={`out-${outgoing.id}`} task={outgoing} motion="out" />}
          <TaskStep key={task.id} task={task} motion={outgoing ? 'in' : 'none'} />
        </div>

        <div className={styles.actionRow}>
          <CompletionButton
            label="I did it!"
            ariaLabel={`${task.title} — done`}
            onPress={handlePress}
            locked={locked}
            sparkles
          />
        </div>
      </div>

      {stage === 'celebrating' && (
        <CompletionEffect
          message={praise(childName, currentIndex)}
          caption={`${task.title} complete!`}
          nextTitle={nextTask ? nextTask.title : null}
          total={tasks.length}
          completed={completedCount}
        />
      )}
    </Screen>
  )
}
