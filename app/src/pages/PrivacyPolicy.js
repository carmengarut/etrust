import { useTranslation } from 'react-i18next'

import '../css/privacyPolicy.css'

export default function PrivacyPolicy () {
  const { t } = useTranslation('global')

  return (
    <div className='pp-container'>
      <div className='pp-page-title'>
        {t('privacy_policy.title')}
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.1-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.1-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.1-content-2')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.2-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.2-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.2-content-2')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.2-content-3')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.2-content-4')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.2-content-5')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.2-content-6')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.3-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.3-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.3-content-2')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.4-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.4-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.4-content-2')}
        </div>
        <ol type='1'>
          <li>
            {t('privacy_policy.4-content-3')}
          </li>
          <li className='pp-paragraf'>
            {t('privacy_policy.4-content-4')}
          </li>
          <li className='pp-paragraf'>
            {t('privacy_policy.4-content-5')}
          </li>
          <li className='pp-paragraf'>
            {t('privacy_policy.4-content-6')}
          </li>
          <li className='pp-paragraf'>
            {t('privacy_policy.4-content-7')}
          </li>
        </ol>
        <div className='pp-paragraf'>
          {t('privacy_policy.4-content-8')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.5-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.5-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.5-content-2')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.5-content-3')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.5-content-4')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.6-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.6-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.6-content-2')}
        </div>
        <ol type='1'>
          <li>
            {t('privacy_policy.6-content-3')}
          </li>
          <li className='pp-paragraf'>
            {t('privacy_policy.6-content-4')}
          </li>
        </ol>
        <div className='pp-paragraf'>
          {t('privacy_policy.6-content-5')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.6-content-6')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.7-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.7-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.7-content-2')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.8-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.8-content-1')}
        </div>
        <ul type='1'>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.8-content-2')}
            </div>
            <div className='pp-subtitle'>
              {t('privacy_policy.8-content-3')}
            </div>
            <div>
              {t('privacy_policy.8-content-4')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.8-content-5')}
            </div>
            <div className='pp-paragraf'>
              {t('privacy_policy.8-content-6')}
            </div>
            <div className='pp-subtitle'>
              {t('privacy_policy.8-content-7')}
            </div>
            <div>
              {t('privacy_policy.8-content-8')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.8-content-9')}
            </div>
            <div className='pp-paragraf'>
              {t('privacy_policy.8-content-10')}
            </div>
            <div className='pp-subtitle'>
              {t('privacy_policy.8-content-11')}
            </div>
            <div className='pp-paragraf'>
              {t('privacy_policy.8-content-12')}
            </div>
            <div>
              {t('privacy_policy.8-content-13')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.8-content-14')}
            </div>
            <div className='pp-paragraf'>
              {t('privacy_policy.8-content-15')}
            </div>
          </li>
        </ul>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.9-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.9-content-1')}
        </div>
        <ul type='1'>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-2')}
            </div>
            <div>
              {t('privacy_policy.9-content-3')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-4')}
            </div>
            <div>
              {t('privacy_policy.9-content-5')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-6')}
            </div>
            <div>
              {t('privacy_policy.9-content-7')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-8')}
            </div>
            <div>
              {t('privacy_policy.9-content-9')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-10')}
            </div>
            <div>
              {t('privacy_policy.9-content-11')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-12')}
            </div>
            <div>
              {t('privacy_policy.9-content-13')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-14')}
            </div>
            <div>
              {t('privacy_policy.9-content-15')}
            </div>
          </li>
          <li>
            <div className='pp-title'>
              {t('privacy_policy.9-content-16')}
            </div>
            <div>
              {t('privacy_policy.9-content-17')}
            </div>
          </li>
        </ul>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.10-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.10-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.10-content-2')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.11-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.11-content-1')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.12-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.12-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.12-content-2')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.13-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.13-content-1')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.14-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.14-content-1')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.15-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.15-content-1')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.16-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.16-content-1')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.17-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.17-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.17-content-2')}
        </div>
      </div>
      <div className='pp-block'>
        <div className='pp-title'>
          {t('privacy_policy.18-title')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.18-content-1')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.18-content-2')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.18-content-3')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.18-content-4')}
        </div>
        <div className='pp-paragraf'>
          {t('privacy_policy.18-content-5')}
        </div>
      </div>
    </div>
  )
}
