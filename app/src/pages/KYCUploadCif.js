import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import backIcon from '../public/back-icon.svg'

import '../css/KYCIssuingCountry.css'
import { userEdit } from '../reducers/userReducer'
import { uploadFile } from '../services/deals'

export default function KYCUploadCif () {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const { t } = useTranslation('global')
  const history = useHistory()

  const handleClick = async () => {
    const contractFile = document.querySelector('#file')
    const newForm = new FormData()
    newForm.append('files', contractFile.files[0])

    const uploadedFile = await uploadFile(newForm)
    dispatch(userEdit(user.id, { idFrontPhoto: uploadedFile.key }))
    history.push('/kyc-succeed')
  }
  return (
    <div className='kic-container'>
      <button onClick={() => history.push('/deals')} className='kic-back-button'>
        <img
          alt=''
          src={backIcon}
          width='15px'
          height='auto'
          className='kic-back-button-img'
        />
        {t('kyc.back')}
      </button>
      <div className='kic-text-container'>
        <div className='kic-title'>
          {t('kyc.verify_your_identity')}
        </div>
        <div className='kic-text'>
          {t('kyc.you_must_upload_the_company_cif_in_order_to_verify_your_identity')}
        </div>
        <input
          type='file'
          id='file'
          name='CIF'
          required
          className='kic-file-input'
        />

        <button onClick={handleClick} className='kic-button-2'>
          {t('kyc.continue')}
        </button>
      </div>

    </div>
  )
}
