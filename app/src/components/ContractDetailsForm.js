import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { signDeal, editDeal } from '../reducers/dealReducer'
import '../css/contractDetailsForm.css'
import { downloadFile } from '../services/deals'
import handleError from '../helpers/errorHandler'

export default function ContractDetailsForm ({ deal }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [fileSigned, setFileSigned] = useState('')

  const user = useSelector(state => state.user)

  const { id } = useParams()

  const dispatch = useDispatch()
  const history = useHistory()
  const { t } = useTranslation('global')

  useEffect(() => {
    if (deal) {
      setTitle(deal.title)
      setContent(deal.content)
      setFile(deal.file)
      setFileSigned(deal.fileSigned)
    }
  }, [deal])

  const handleSign = () => {
    if (deal.type === 'File') {
      deal.fileSigned
        ? history.push(`/place-signatures/${deal.fileSigned}`)
        : history.push(`/place-signatures/${deal.file}`)
    } else {
      const users = [...deal.signedBy.map(user => user.id), user.id]
      dispatch(signDeal(id, users))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const editedContract = {
      title,
      content,
      senderName: user.name,
      receiverName: user.id === deal.member.id ? `${deal.createdBy.name} ${deal.createdBy.surname}` : `${deal.member.name} ${deal.member.surname}`,
      receiverEmail: user.id === deal.member.id ? deal.createdBy.email : deal.member.email
    }
    dispatch(editDeal(id, editedContract))
  }

  const handleDownload = async (fileToDownload) => {
    try {
      const url = await downloadFile(fileToDownload)

      // const url = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileToDownload)
      document.body.appendChild(link)
      link.click()
    } catch (e) {
      handleError(e)
    }
  }

  return (
    <>
      <div>{t('deal_details_form.contract_details')}</div>
      <form onSubmit={handleSubmit} className='cdf-container'>
        <div className='cdf-field-group'>
          <label>{t('deal_details_form.title')}</label>
          <input
            className='cdf-field'
            type='text'
            name='title'
            value={title}
            placeholder={t('deal_details_form.title_placeholder')}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>

        <div className='cdf-field-group'>
          <label>{t('deal_details_form.content')}</label>
          {content
            ? <textarea
                className='cdf-textarea'
                name='content'
                value={content}
                placeholder={t('deal_details_form.content_placeholder')}
                onChange={({ target }) => setContent(target.value)}
                required
              />
            : <></>}
          {fileSigned
            ? (
              <div className='cdf-creation-date'>
                {fileSigned}
                <button
                  type='button'
                  onClick={() => handleDownload(fileSigned)}
                  className='cdf-download-button'
                >
                  {t('deal_details_form.download')}
                </button>
              </div>
              )
            : file
              ? (
                <div className='cdf-creation-date'>
                  {file}
                  <button
                    type='button'
                    onClick={() => handleDownload(file)}
                    className='cdf-download-button'
                  >
                    {t('deal_details_form.download')}
                  </button>
                </div>
                )
              : <></>}
        </div>

        <div className='cdf-creation-date'>{t('deal_details_form.creation_date')}{deal.date.slice(0, 10)}</div>

        <div className='cdf-buttons-container'>
          {(title === deal.title && content === deal.content)
            ? ''
            : (
              <button type='submit' className='cdf-save-button'>
                {t('deal_details_form.propose_changes')}
              </button>)}

          {deal.status === 'New'
            ? deal.signedBy.length > 0
                ? deal.signedBy.find(userSigned => userSigned.id === user.id)
                    ? ''
                    : <button type='button' onClick={handleSign} className='cdf-sign-button'>{t('deal_details_form.sign_now')}</button>
                : <button type='button' onClick={handleSign} className='cdf-sign-button'>{t('deal_details_form.sign_now')}</button>
            : ''}
        </div>
      </form>
    </>
  )
}
