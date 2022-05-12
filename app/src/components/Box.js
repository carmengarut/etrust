import { memo } from 'react'
// const styles = {
//   border: '1px dashed gray',
//   padding: '0.5rem 1rem',
//   cursor: 'move'
// }
export const Box = memo(function Box ({ src, preview, width }) {
  return <img src={src} alt='' width={width * 0.2} height='auto' role={preview ? 'BoxPreview' : 'Box'} style={{ border: '1px solid #4F8AF4' }} />
})
