import { useTranslation } from 'react-i18next'

import '../css/missingKYCBanner.css'

export default function KYCInProgress () {
  const { t } = useTranslation('global')
  return (
    <div className='mkb-container'>
      {t('missing_kyc_banner.your_account_is_being_verified')}
    </div>
  )
}
