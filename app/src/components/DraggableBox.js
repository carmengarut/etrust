import { memo, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Box } from './Box'

function getStyles (left, top, isDragging, hasDragged, setHasDragged) {
  const transform = `translate3d(${left}px, ${top + (left < 310 ? window.pageYOffset : 0)}px, 0)`

  console.log('entra')
  console.log(top + (left < 310 ? window.pageYOffset : 0))
  if (isDragging && !hasDragged) {
    setHasDragged(1)
  }
  return {
    position: hasDragged ? 'absolute' : 'fixed',
    transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ''
  }
}
export const DraggableBox = memo(function DraggableBox (props) {
  const [hasDragged, setHasDragged] = useState(0)
  const { id, title, left, top } = props
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'div',
      item: { id, left, top, title },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [id, left, top, title]
  )
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])
  return (
    <div
      ref={drag}
      className='cv-signature'
      style={getStyles(left, top, isDragging, hasDragged, setHasDragged)}
      role='DraggableBox'
    >
      <Box title={title} />
    </div>
  )
})
