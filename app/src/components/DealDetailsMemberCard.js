import { useTranslation } from 'react-i18next'

import '../css/dealDetailsMemberCard.css'

import avatar from '../public/avatar.svg'

export default function DealDetailsMemberCard ({ deal, user }) {
  const { t } = useTranslation('global')

  return (
    <div className='DDMC-container'>
      <div className='DDMC-member-container'>
        <img
          src={user.profileImg || avatar}
          width='40px'
          height='40px'
          className='Avatar'
        /> {' '}
        <div className='DDMC-member-name'>
          <div>{user.name} {user.surname}</div>
          <div className='DDMC-creator'>{t('deal_details_member_card.creator')}</div>
        </div>
      </div>
      <div className='DDMC-signed-container'>
        <span className={
        deal.signedBy.some(userSigned => userSigned.id === user.id)
          ? 'DDMC-signed-green'
          : 'DDMC-signed-red'
      }
        >
          {
        deal.signedBy.some(userSigned => userSigned.id === user.id)
          ? t('deal_details_member_card.signed')
          : t('deal_details_member_card.not_signed')
      }
        </span>
      </div>
    </div>
  )
}
