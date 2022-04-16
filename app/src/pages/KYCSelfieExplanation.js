import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import backIcon from '../public/back-icon.svg'
import faceIcon from '../public/face-icon.svg'
import glassesIcon from '../public/glasses-icon.svg'

import '../css/KYCCameraAccessDenied.css'

export default function KYCSelfieExplanation () {
  const { t } = useTranslation('global')
  const history = useHistory()

  const handleEnableCamera = () => {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(() => history.push('/kyc-take-selfie'))
      .catch(() => history.push('/kyc-access-denied'))
  }

  return (
    <div className='kcad-container'>
      <button onClick={() => history.push('/kyc-id-back')} className='kcad-back-button'>
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
          {t('kyc.take_a_selfie')}
        </div>
        <div>
          {t('kyc.we_will_compare_it_to_your_document')}
        </div>
        <div className='kcad-list'>
          <div className='kcad-list-item'>
            <img
              alt=''
              src={faceIcon}
              width='30px'
              height='30px'
              className='kcad-back-button-img'
            />
            {t('kyc.face_forward_and_make_sure')}
          </div>
          <div className='kcad-list-item'>
            <img
              alt=''
              src={glassesIcon}
              width='30px'
              height='30px'
              className='kcad-back-button-img'
            />
            {t('kyc.remove_your_glasses')}
          </div>
        </div>
        <button onClick={handleEnableCamera} className='kcad-button-2'>
          {t('kyc.take_selfie')}
        </button>
      </div>

    </div>
  )
}
