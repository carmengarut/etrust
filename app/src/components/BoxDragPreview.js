import { memo } from 'react'
import { Box } from './Box.js'

export const BoxDragPreview = memo(function BoxDragPreview ({ src, width }) {
  return <Box src={src} preview width={width} />
})
