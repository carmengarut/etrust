import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import backIcon from '../public/back-icon.svg'
import cameraIcon from '../public/small-camera-icon.svg'
import settingsIcon from '../public/settings-icon.svg'

import '../css/KYCCameraAccessDenied.css'

export default function KYCCameraAccessDenied () {
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
    <div className='kcad-container'>
      <button onClick={() => history.push('/kyc-enable-camera')} className='kcad-back-button'>
        <img
          alt=''
          src={backIcon}
          width='15px'
          height='auto'
          className='kcad-back-button-img'
        />
        {t('kyc.back')}
      </button>
      <div className='kcad-text-container'>
        <div className='kcad-title'>
          {t('kyc.camera_access_denied')}
        </div>
        <div>
          {t('kyc.we_cant_verify_you_without_your_camera')}
        </div>
        <div className='kcad-list'>
          <div className='kcad-list-item'>
            <img
              alt=''
              src={cameraIcon}
              width='30px'
              height='30px'
              className='kcad-back-button-img'
            />
            {t('kyc.you_can_recover_camera_acces')}
          </div>
          <div className='kcad-list-item'>
            <img
              alt=''
              src={settingsIcon}
              width='30px'
              height='30px'
              className='kcad-back-button-img'
            />
            {t('kyc.go_to_browser_settings')}
          </div>
        </div>
        <button onClick={handleEnableCamera} className='kcad-button'>
          {t('kyc.try_again')}
        </button>
      </div>

    </div>
  )
}
