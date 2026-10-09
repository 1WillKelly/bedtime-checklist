import { useCallback, useEffect, useRef, useState } from 'react'

import { CompletionButton } from '../../components/CompletionButton'
import { CompletionEffect } from '../../components/CompletionEffect'
import { ProgressIndicator } from '../../components/ProgressIndicator'
import { Screen } from '../../components/Screen'
import { ScreenHeader } from '../../components/ScreenHeader'
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
  /** Tap on a step in the progress chain. */
  onGoToTask: (index: number) => void
  /** Back one step, or out to the opening screen from the first. */
  onBack: () => void
  onOpenParentSettings: () => void
}

/**
 * A completion runs celebrate -> slide -> idle. The button is dead for the
 * whole of it, not just the celebration: leaving it live during the page turn
 * was enough for a fast tapper to skip tasks.
 */
type Stage = 'idle' | 'celebrating' | 'sliding'

/** Which way the page turns: forward on Next or a later step, back otherwise. */
type Direction = 'forward' | 'back'

const CELEBRATION_MS = 800
const SLIDE_MS = 340

const ArrowIcon = ({ direction }: { direction: Direction }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d={direction === 'back' ? 'M19 12H5.5M11 5.5 4.5 12l6.5 6.5' : 'M5 12h13.5M13 5.5l6.5 6.5-6.5 6.5'}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * The child-facing routine: exactly one task and one enormous button. Back,
 * Next and the step chain are there for the parent, to step around a night
 * that did not go in order; none of them celebrate.
 */
export function RoutineScreen({
  tasks,
  currentIndex,
  completedCount,
  transitioning,
  childName,
  onComplete,
  onCelebrationEnd,
  onGoToTask,
  onBack,
  onOpenParentSettings,
}: Props) {
  const [stage, setStage] = useState<Stage>('idle')
  /** Snapshot of the task turning away, kept only for the length of the slide. */
  const [outgoing, setOutgoing] = useState<RoutineItem | null>(null)
  const [direction, setDirection] = useState<Direction>('forward')
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

  /**
   * Starts the page turn. Shared by every way of changing step so the lock and
   * the slide behave identically however the parent or child got there.
   */
  const turnPage = useCallback((leaving: RoutineItem, way: Direction) => {
    setOutgoing(leaving)
    setDirection(way)
    setStage('sliding')

    const slideId = window.setTimeout(() => {
      setOutgoing(null)
      setStage('idle')
      busy.current = false
    }, readDurationToken('--d-slide', SLIDE_MS))
    timers.current.push(slideId)
  }, [])

  /**
   * True if a step change may start now, and takes the lock if so. Every
   * control goes through it, so no mix of taps can double-advance.
   *
   * Three independent guards, because a toddler generates taps faster than
   * React re-renders: the ref (same frame), the stage (this render), and
   * `transitioning` from the reducer (which ignores a second begin anyway).
   */
  const claim = useCallback(() => {
    if (busy.current || stage !== 'idle' || transitioning || !task) return false
    busy.current = true
    return true
  }, [stage, task, transitioning])

  /**
   * "We already did this one." Marks the step done and moves on without the
   * celebration — the child did not just earn it, so we do not pretend they
   * did.
   */
  const handleNext = useCallback(() => {
    if (!claim()) return
    onComplete()
    onCelebrationEnd()
    turnPage(task, 'forward')
  }, [claim, onCelebrationEnd, onComplete, task, turnPage])

  const handleGoTo = useCallback(
    (index: number) => {
      if (index === currentIndex || !claim()) return
      onGoToTask(index)
      turnPage(task, index > currentIndex ? 'forward' : 'back')
    },
    [claim, currentIndex, onGoToTask, task, turnPage],
  )

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      handleGoTo(currentIndex - 1)
      return
    }
    // From the first step this leaves the routine: no page to turn, and no lock
    // to take, since this screen is about to unmount.
    if (busy.current || stage !== 'idle' || transitioning) return
    onBack()
  }, [currentIndex, handleGoTo, onBack, stage, transitioning])

  const handlePress = useCallback(() => {
    if (!claim()) return

    onComplete()
    successFeedback()
    setStage('celebrating')

    const celebrateId = window.setTimeout(() => {
      // Advancing and starting the slide happen in one batched update, so the
      // button is never briefly live between the two animations.
      onCelebrationEnd()
      turnPage(task, 'forward')
    }, readDurationToken('--d-celebrate', CELEBRATION_MS))
    timers.current.push(celebrateId)
  }, [claim, onCelebrationEnd, onComplete, task, turnPage])

  if (!task) return null

  const locked = stage !== 'idle' || transitioning

  return (
    <Screen>
      <div className={styles.routine}>
        <ScreenHeader onOpenSettings={onOpenParentSettings}>
          <ProgressIndicator
            tasks={tasks}
            completed={completedCount}
            currentIndex={currentIndex}
            onSelect={handleGoTo}
            locked={locked}
          />
        </ScreenHeader>

        <div className={styles.secondaryRow}>
          <button
            type="button"
            className={styles.textNav}
            onClick={handleBack}
            disabled={locked}
            aria-label={currentIndex === 0 ? 'Back to the start' : 'Back one step'}
          >
            <ArrowIcon direction="back" />
            Back
          </button>
          <button
            type="button"
            className={styles.textNav}
            onClick={handleNext}
            disabled={locked}
            aria-label={`${task.title} — we already did this, next step`}
          >
            Next
            <ArrowIcon direction="forward" />
          </button>
        </div>

        <div className={styles.stage}>
          {outgoing && (
            <TaskStep
              key={`out-${outgoing.id}`}
              task={outgoing}
              motion="out"
              direction={direction}
            />
          )}
          <TaskStep
            key={task.id}
            task={task}
            motion={outgoing ? 'in' : 'none'}
            direction={direction}
          />
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
          taskTitle={task.title}
          illustration={task.illustration}
          nextTitle={nextTask ? nextTask.title : null}
          tasks={tasks}
          completed={completedCount}
        />
      )}
    </Screen>
  )
}
