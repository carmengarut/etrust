import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import '../css/privacyPolicy.css'

export default function TermsAndConditions () {
  const { t } = useTranslation('global')
  const history = useHistory()

  return (
    <div className='pp-container'>
      <div className='pp-page-title'>
        {t('terms_and_conditions.title')}
      </div>
      <div className='pp-block'>
        <div className='pp-paragraf'>
          {t('terms_and_conditions.1-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('terms_and_conditions.1-content-2')}
        </div>
        <div className='pp-paragraf'>
          {t('terms_and_conditions.1-content-3')}
        </div>
        <ul>
          <li>
            {t('terms_and_conditions.1-content-4')}
          </li>
          <li>
            <a href='' onClick={() => { history.push('/privacy-policy') }}>
              {t('terms_and_conditions.1-content-5')}
            </a>
          </li>
          <li>
            {t('terms_and_conditions.1-content-6')}
          </li>
        </ul>
        <div className='pp-paragraf'>
          {t('terms_and_conditions.1-content-7')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('terms_and_conditions.2-title')}
        </div>
        <ol type='1'>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-1')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-2')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-3')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-4')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-5')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-6')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-7')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-8')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-9')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-10')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-11')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-12')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-13')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-14')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-15')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-16')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-17')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-18')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-19')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-20')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-21')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-22')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-23')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-24')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-25')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-26')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-27')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-28')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-29')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-30')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-31')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-32')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-33')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-34')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-35')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-36')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-37')}
            </div>
            <div className='pp-paragraf'>
              {t('terms_and_conditions.2-content-38')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-39')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-40')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-41')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('terms_and_conditions.2-content-42')}
            </div>
            <div>
              {t('terms_and_conditions.2-content-43')}
            </div>
          </li>
        </ol>
      </div>
    </div>
  )
}
