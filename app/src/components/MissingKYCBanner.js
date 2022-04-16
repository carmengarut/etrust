import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import '../css/missingKYCBanner.css'

export default function MissingKYCBanner () {
  const user = useSelector(state => state.user)
  const { t } = useTranslation('global')
  const history = useHistory()

  const handleVerify = () => {
    user.type === 'individual'
      ? history.push('/kyc-explanation')
      : history.push('/kyc-cif')
  }
  return (
    <div className='mkb-container'>
      {t('missing_kyc_banner.account_not_verified')}
      <button onClick={handleVerify} className='mkb-button'>
        {t('missing_kyc_banner.verify_now')}
      </button>
    </div>
  )
}
