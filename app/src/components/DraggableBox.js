import { memo, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Box } from './Box'

export const DraggableBox = memo(function DraggableBox (props) {
  const [hasDragged, setHasDragged] = useState(0)
  const { id, src, left, top, page, currentPage } = props

  function getStyles (left, top, page, isDragging, hasDragged, setHasDragged) {
    const transform = `translate3d(${left}px, ${top + (left < 310 ? window.pageYOffset : 0)}px, 0)`

    if (isDragging && !hasDragged) {
      setHasDragged(1)
    }
    console.log('Current Page: ' + currentPage)
    console.log('Signature Page: ' + page)
    return {
      display: page
        ? currentPage === page ? 'block' : 'none'
        : 'block',
      position: hasDragged ? 'absolute' : 'fixed',
      transform,
      WebkitTransform: transform,
      // IE fallback: hide the real node using CSS when dragging
      // because IE will ignore our custom "empty image" drag preview.
      opacity: isDragging ? 0 : 1,
      height: isDragging ? 0 : ''
    }
  }
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'div',
      item: { id, left, top, src },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top, src]
  )
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])
  return (
    <div
      ref={drag}
      style={getStyles(left, top, page, isDragging, hasDragged, setHasDragged)}
      role='DraggableBox'
    >
      <Box src={src} />
    </div>
  )
})
