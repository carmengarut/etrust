import { memo } from 'react'
import { Box } from './Box.js'

export const BoxDragPreview = memo(function BoxDragPreview ({ src }) {
  return <Box src={src} preview />
})
