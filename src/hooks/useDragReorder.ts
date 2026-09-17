import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

type Options = {
  /** Commit a finished drag: move `id` by `delta` places. */
  onReorder: (id: string, delta: number) => void
  itemCount: number
}

export type DragState = {
  id: string
  fromIndex: number
  /** Live pixel offset of the lifted row. */
  offset: number
  /** How many places it would land from its start, if dropped now. */
  delta: number
}

const EDGE_ZONE = 52
const EDGE_SPEED = 9

/**
 * Touch-first drag reordering, with no dependencies.
 *
 * Built on Pointer Events with pointer capture, so one code path covers touch,
 * pen and mouse. Two details make it usable on a phone specifically: the
 * handle sets `touch-action: none` so a vertical drag is not stolen by the
 * scroll container, and dragging near either edge of that container
 * auto-scrolls, since on a small screen the destination is often off-screen
 * when the drag begins.
 *
 * Reordering is by whole rows: rows are uniform, so the landing index is just
 * the travelled distance divided by the row pitch.
 */
export function useDragReorder({ onReorder, itemCount }: Options) {
  const [drag, setDrag] = useState<DragState | null>(null)

  const listRef = useRef<HTMLUListElement>(null)
  const scrollerRef = useRef<HTMLElement | null>(null)
  /** Row pitch (height + gap), measured once per drag. */
  const pitch = useRef(0)
  const startY = useRef(0)
  const startScroll = useRef(0)
  const pointerY = useRef(0)
  const frame = useRef<number | null>(null)
  /** Mirrors `drag` for reads inside rAF and pointer handlers. */
  const live = useRef<DragState | null>(null)

  const stopAutoScroll = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current)
      frame.current = null
    }
  }, [])

  useEffect(() => stopAutoScroll, [stopAutoScroll])

  const clampDelta = useCallback(
    (raw: number, fromIndex: number) => {
      const min = -fromIndex
      const max = itemCount - 1 - fromIndex
      return Math.max(min, Math.min(max, raw))
    },
    [itemCount],
  )

  /** Recompute the lifted row's offset and landing index from the pointer. */
  const update = useCallback(() => {
    const current = live.current
    if (!current) return
    const scroller = scrollerRef.current
    const scrolled = scroller ? scroller.scrollTop - startScroll.current : 0
    const offset = pointerY.current - startY.current + scrolled
    const raw = pitch.current > 0 ? Math.round(offset / pitch.current) : 0
    const delta = clampDelta(raw, current.fromIndex)

    if (offset === current.offset && delta === current.delta) return
    const next = { ...current, offset, delta }
    live.current = next
    setDrag(next)
  }, [clampDelta])

  /** Scroll the list when the finger sits near its top or bottom edge. */
  const tickAutoScroll = useCallback(() => {
    frame.current = null
    const scroller = scrollerRef.current
    if (!live.current || !scroller) return

    const box = scroller.getBoundingClientRect()
    let step = 0
    if (pointerY.current < box.top + EDGE_ZONE) step = -EDGE_SPEED
    else if (pointerY.current > box.bottom - EDGE_ZONE) step = EDGE_SPEED

    if (step !== 0) {
      const before = scroller.scrollTop
      scroller.scrollTop += step
      if (scroller.scrollTop !== before) update()
    }
    frame.current = requestAnimationFrame(tickAutoScroll)
  }, [update])

  const onHandlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>, id: string, fromIndex: number) => {
      const list = listRef.current
      if (!list) return

      const rows = Array.from(list.children) as HTMLElement[]
      pitch.current =
        rows.length > 1
          ? rows[1].offsetTop - rows[0].offsetTop
          : (rows[0]?.offsetHeight ?? 0)
      if (pitch.current <= 0) return

      // The nearest scrollable ancestor is the list's own viewport.
      scrollerRef.current = list.parentElement
      startScroll.current = scrollerRef.current?.scrollTop ?? 0
      startY.current = event.clientY
      pointerY.current = event.clientY

      event.currentTarget.setPointerCapture(event.pointerId)
      const next = { id, fromIndex, offset: 0, delta: 0 }
      live.current = next
      setDrag(next)
      frame.current = requestAnimationFrame(tickAutoScroll)
    },
    [tickAutoScroll],
  )

  const onHandlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!live.current) return
      pointerY.current = event.clientY
      update()
    },
    [update],
  )

  const onHandlePointerUp = useCallback(() => {
    stopAutoScroll()
    const current = live.current
    live.current = null
    setDrag(null)
    if (current && current.delta !== 0) onReorder(current.id, current.delta)
  }, [onReorder, stopAutoScroll])

  return {
    listRef,
    drag,
    pitch: pitch.current,
    handlers: {
      onPointerDown: onHandlePointerDown,
      onPointerMove: onHandlePointerMove,
      onPointerUp: onHandlePointerUp,
      onPointerCancel: onHandlePointerUp,
    },
  }
}
