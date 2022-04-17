import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import backIcon from '../public/back-icon.svg'

import '../css/KYCExplanation.css'
import { userEdit } from '../reducers/userReducer'
import { sendVerificationEmail } from '../services/deals'

export default function KYCSucceed () {
  const user = useSelector(state => state.user)
  const { t } = useTranslation('global')
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(userEdit(user.id, { status: 'kyc_in_progress' }))
    sendVerificationEmail({ userId: user.id, email: user.email })
    history.push('/deals')
  }
  return (
    <div className='ke-container'>
      <button onClick={() => history.push('/kyc-take-selfie')} className='ke-back-button'>
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
          {t('kyc.your_identity_is_being_verified')}
        </div>
        <div>
          {t('kyc.it_should_take_between_1_and_2_days')}
        </div>
        <button onClick={handleClick} className='ke-button-2'>
          {t('kyc.ok')}
        </button>
      </div>

    </div>
  )
}
