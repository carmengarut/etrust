import { memo } from 'react'
import { Box } from './Box.js'
const styles = {
  display: 'inline-block'
}
export const BoxDragPreview = memo(function BoxDragPreview ({ title }) {
  return (
    <div style={styles}>
      <Box title={title} preview />
    </div>
  )
})
