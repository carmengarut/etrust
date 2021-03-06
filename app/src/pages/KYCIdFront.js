import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import backIcon from '../public/back-icon.svg'

import '../css/KYCIdFront.css'
import { uploadIdPhoto } from '../services/deals'
import { userEdit } from '../reducers/userReducer'
import handleError from '../helpers/errorHandler'

export default function KYCIdFront () {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const { t } = useTranslation('global')
  const history = useHistory()

  function stopStreamedVideo (videoElem) {
    const stream = videoElem.srcObject
    const tracks = stream.getTracks()

    tracks.forEach(function (track) {
      track.stop()
    })

    videoElem.srcObject = null
  }

  const deviceType = () => {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet'
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile'
    }
    return 'desktop'
  }

  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'environment'
    }
  })
    .then((stream) => {
      const video = document.getElementById('video')
      const button = document.getElementById('button')
      const canvas = document.getElementById('canvas')
      const retry = document.getElementById('retry')
      const usePhoto = document.getElementById('use-photo')

      video.srcObject = stream
      video.onloadedmetadata = () => video.play()

      button.addEventListener('click', () => {
        video.pause()
        const context = canvas.getContext('2d')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        video.style.display = 'none'
        canvas.style.display = 'block'
        button.style.display = 'none'
        retry.style.display = 'block'
        usePhoto.style.display = 'block'
      })

      retry.addEventListener('click', () => {
        video.play()

        video.style.display = 'block'
        canvas.style.display = 'none'
        button.style.display = 'block'
        retry.style.display = 'none'
        usePhoto.style.display = 'none'
      })

      usePhoto.addEventListener('click', async () => {
        try {
          const photo = canvas.toDataURL()

          const newObject = {
            base64: photo,
            userId: user.id,
            side: 'front'
          }
          const type = photo.split(';')[0].split('/')[1]
          await uploadIdPhoto(newObject)
          dispatch(userEdit(user.id, { idFrontPhoto: user.id + `-front.${type}` }))
          stopStreamedVideo(video)
          if (user.documentType === 'passport') {
            history.push('/kyc-selfie')
          } else {
            history.push('/kyc-id-back')
          }
        } catch (e) {
          handleError(e)
        }
      })
    })
    .catch(() => history.push('/kyc-access-denied'))

  return (
    <div className='kif-container'>
      <button onClick={() => history.push('/kyc-enable-camera')} className='kif-back-button'>
        <img
          alt=''
          src={backIcon}
          width='15px'
          height='auto'
          className='kif-back-button-img'
        />
        {t('kyc.back')}
      </button>
      <div className='kif-text-container'>
        <div className='kif-title'>
          {t('kyc.id-front')}
        </div>
        <div>
          {t('kyc.make_sure_the_entire_document_is_visible')}
        </div>
        <video src='' id='video' className={deviceType() === 'desktop' ? 'kif-video-reverse' : 'kif-video'} playsInline />
        <canvas id='canvas' style={{ display: 'none' }} className='kif-canvas' />
        <button className='kif-use-photo-button' id='use-photo' style={{ display: 'none' }}>
          {t('kyc.use_photo')}
        </button>
        <button className='kif-retry-button' id='retry' style={{ display: 'none' }}>
          {t('kyc.retry')}
        </button>
        <button className='kif-button' id='button'>
          {t('kyc.capture')}
        </button>
      </div>

    </div>
  )
}
