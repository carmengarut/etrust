import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import backIcon from '../public/back-icon.svg'
import icon1 from '../public/1-icon.svg'
import icon2 from '../public/2-icon.svg'

import '../css/KYCExplanation.css'

export default function KYCExplanation () {
  const user = useSelector(state => state.user)
  const { t } = useTranslation('global')
  const history = useHistory()

  return (
    <div className='ke-container'>
      {
      user.status === 'kyc_in_progress'
        ? (
          <div className='ke-text-container'>
            <div className='ke-title'>
              {t('kyc.your_identity_is_being_verified')}
            </div>
            <div>
              {t('kyc.it_should_take_between_1_and_2_days')}
            </div>
            <button onClick={() => history.push('/deals')} className='ke-button-2'>
              {t('kyc.ok')}
            </button>
          </div>
          )
        : (
          <div>
            <button onClick={() => history.push('/deals')} className='ke-back-button'>
              <img
                alt=''
                src={backIcon}
                width='15px'
                height='auto'
                className='ke-back-button-img'
              />
              {t('kyc.back')}
            </button>
            <div className='ke-text-container'>
              <div className='ke-title'>
                {t('kyc.verify_your_identity')}
              </div>
              <div>
                {t('kyc.it_should_take_a_few_minutes')}
              </div>
              <div className='ke-text'>
                {t('kyc.use_your_device_to_photograph')}
              </div>
              <div className='ke-list'>
                <div className='ke-list-item'>
                  <img
                    alt=''
                    src={icon1}
                    width='25px'
                    height='25px'
                    className='ke-back-button-img'
                  />
                  {t('kyc.your_identity_document')}
                </div>
                <div className='ke-list-item'>
                  <img
                    alt=''
                    src={icon2}
                    width='25px'
                    height='25px'
                    className='ke-back-button-img'
                  />
                  {t('kyc.your_face')}
                </div>
              </div>
              <button onClick={() => history.push('/kyc-document-type')} className='ke-button'>
                {t('kyc.choose_document')}
              </button>
            </div>

          </div>
          )
    }
    </div>
  )
}
