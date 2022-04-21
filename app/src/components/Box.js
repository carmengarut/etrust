import { memo } from 'react'
const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move'
}
export const Box = memo(function Box ({ title, preview }) {
  const backgroundColor = 'white'
  return (
    <div
      style={{ ...styles, backgroundColor }}
      role={preview ? 'BoxPreview' : 'Box'}
    >
      {title}
    </div>
  )
})
