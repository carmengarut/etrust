import { memo } from 'react'
// const styles = {
//   border: '1px dashed gray',
//   padding: '0.5rem 1rem',
//   cursor: 'move'
// }
export const Box = memo(function Box ({ src, preview }) {
  return <img src={src} alt='' width='200px' height='auto' role={preview ? 'BoxPreview' : 'Box'} />
})
