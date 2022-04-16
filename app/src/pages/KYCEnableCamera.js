import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import backIcon from '../public/back-icon.svg'
import cameraAccessIcon from '../public/camera-access-icon.svg'

import '../css/KYCEnableCamera.css'

export default function KYCEnableCamera () {
  const { t } = useTranslation('global')
  const history = useHistory()

  function stopStreamedVideo (stream) {
    const tracks = stream.getTracks()

    tracks.forEach(function (track) {
      track.stop()
    })
  }
  const handleEnableCamera = () => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then((stream) => {
        stopStreamedVideo(stream)
        history.push('/kyc-id-front')
      })
      .catch(() => history.push('/kyc-access-denied'))
  }

  return (
    <div className='kec-container'>
      <button onClick={() => history.push('/kyc-issuing-country')} className='kec-back-button'>
        <img
          alt=''
          src={backIcon}
          width='15px'
          height='auto'
          className='kec-back-button-img'
        />
        {t('kyc.back')}
      </button>
      <div className='kec-text-container'>
        <div className='kec-title'>
          {t('kyc.allow_camera_access')}
        </div>
        <div>
          {t('kyc.you_must_enable_camera_access')}
        </div>
        <img
          alt=''
          src={cameraAccessIcon}
          width='200px'
          height='auto'
          className='kec-img'
        />
        <div className='kec-text'>
          {t('kyc.we_cant_verify_you_without_your_camera')}
        </div>
        <button onClick={handleEnableCamera} className='kec-button'>
          {t('kyc.enable_camera')}
        </button>
      </div>

    </div>
  )
}
