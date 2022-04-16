import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import backIcon from '../public/back-icon.svg'
import passportIcon from '../public/passport-icon.svg'
import idIcon from '../public/id-icon.svg'
import residencePermitIcon from '../public/residence-permit-icon.svg'

import '../css/KYCDocumentType.css'
import { userEdit } from '../reducers/userReducer'

export default function KYCDocumentType () {
  const user = useSelector(state => state.user)
  const { t } = useTranslation('global')
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(userEdit(user.id, { documentType: e.target.value }))
    history.push('/kyc-issuing-country')
  }
  return (
    <div className='kdt-container'>
      <button onClick={() => history.push('/kyc-explanation')} className='kdt-back-button'>
        <img
          alt=''
          src={backIcon}
          width='15px'
          height='auto'
          className='kdt-back-button-img'
        />
        {t('kyc.back')}
      </button>
      <div className='kdt-container2'>
        <div className='kdt-text-container'>
          <div className='kdt-title'>
            {t('kyc.choose_your_document')}
          </div>
          <div>
            {t('kyc.it_must_be_an_offitial_id')}
          </div>
          <div className='kdt-list'>
            <button onClick={handleClick} className='ktd-list-element' value='passport'>
              <img
                alt=''
                src={passportIcon}
                width='80px'
                height='80px'
                className='kdt-img'
              />
              {t('kyc.passport')}
            </button>
            <button onClick={handleClick} className='ktd-list-element' value='id'>
              <img
                alt=''
                src={idIcon}
                width='80px'
                height='80px'
                className='kdt-img'
              />
              {t('kyc.national_identity_card')}
            </button>
            <button onClick={handleClick} className='ktd-list-element' value='residence-permit'>
              <img
                alt=''
                src={residencePermitIcon}
                width='80px'
                height='800x'
                className='kdt-img'
              />
              {t('kyc.residence_permit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
