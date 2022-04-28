import { useTranslation } from 'react-i18next'

import '../css/addSignatureModal.css'

export default function AddSignatureModal ({ show, setShow, setBoxes }) {
  const { t } = useTranslation('global')

  const style = {
    display: show ? 'flex' : 'none'
  }
  const canvas = document.getElementById('firma')

  const COLOR_PINCEL = 'black'
  const GROSOR = 2
  let context
  if (canvas) {
    context = canvas.getContext('2d')

    let xAnterior = 0; let yAnterior = 0; let xActual = 0; let yActual = 0
    const obtenerXReal = (clientX) => clientX - canvas.getBoundingClientRect().left
    const obtenerYReal = (clientY) => clientY - canvas.getBoundingClientRect().top
    let haComenzadoDibujo = false // Bandera que indica si el usuario está presionando el botón del mouse sin soltarlo

    // Lo demás tiene que ver con pintar sobre el canvas en los eventos del mouse
    canvas.addEventListener('mousedown', evento => {
      // En este evento solo se ha iniciado el clic, así que dibujamos un punto
      xAnterior = xActual
      yAnterior = yActual
      xActual = obtenerXReal(evento.clientX)
      yActual = obtenerYReal(evento.clientY)
      context.beginPath()
      context.fillStyle = COLOR_PINCEL
      context.fillRect(xActual, yActual, GROSOR, GROSOR)
      context.closePath()
      // Y establecemos la bandera
      haComenzadoDibujo = true
    })

    canvas.addEventListener('mousemove', (evento) => {
      if (!haComenzadoDibujo) {
        return
      }
      // El mouse se está moviendo y el usuario está presionando el botón, así que dibujamos todo

      xAnterior = xActual
      yAnterior = yActual
      xActual = obtenerXReal(evento.clientX)
      yActual = obtenerYReal(evento.clientY)
      context.beginPath()
      context.moveTo(xAnterior, yAnterior)
      context.lineTo(xActual, yActual)
      context.strokeStyle = COLOR_PINCEL
      context.lineWidth = GROSOR
      context.stroke()
      context.closePath()
    })
    canvas.addEventListener('mouseup', () => {
      haComenzadoDibujo = false
    })

    canvas.addEventListener('mouseout', () => {
      haComenzadoDibujo = false
    })
  }

  const handleClean = () => {
    // Colocar color blanco en fondo de canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  //   const handleDownload = () => {
  //     const enlace = document.createElement('a')
  //     // El título
  //     enlace.download = 'Firma.png'
  //     // Convertir la imagen a Base64 y ponerlo en el enlace
  //     enlace.href = canvas.toDataURL()
  //     // Hacer click en él
  //     enlace.click()
  //   }

  const handleAddSignature = async () => {
    const photo = canvas.toDataURL()
    setShow(false)
    setBoxes(prev => {
      return window.screen.width >= 800
        ? [...prev, { top: 230, left: 85, src: photo, id: prev.length + 1 }]
        : [...prev, { top: 270, left: 10, src: photo, id: prev.length + 1 }]
    })
  }

  return (
    <div className='asm-container' style={style}>
      <div className='asm-modal-inner'>
        <p>{t('contract_viewer.add_your_signature_below')}</p>
        <canvas id='firma' className='asm-canvas' />
        <br />
        <div className='asm-clean-button-container'>
          <button onClick={handleClean} className='asm-clean-button'>{t('contract_viewer.clean')}</button>
        </div>
        <div className='asm-buttons-container'>
          <button onClick={() => { setShow(false) }} className='asm-cancel-button'>{t('contract_viewer.cancel')}</button>
          <button onClick={handleAddSignature} className='asm-signature-button'>
            {t('contract_viewer.add_signature')}
          </button>
        </div>
        <br />
      </div>
    </div>
  )
}
