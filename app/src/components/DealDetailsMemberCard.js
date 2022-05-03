import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import '../css/dealDetailsMemberCard.css'

import avatar from '../public/avatar.svg'

export default function DealDetailsMemberCard ({ deal, user }) {
  const users = useSelector(state => state.users)
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
          <div>
            {
            user
              ? user.name
                  ? `${user.name} ${user.surname}`
                  : user.email
                    ? `${user.email} ${t('deal_details_member_card.invitation_pending')}`
                    : users.find(userElem => userElem.id === user).name
                      ? `${users.find(userElem => userElem.id === user).name} ${users.find(userElem => userElem.id === user).surname}`
                      : `${users.find(userElem => userElem.id === user).email}  ${t('deal_details_member_card.invitation_pending')}`
              : `${users.find(userElem => userElem.id === user).name} ${users.find(userElem => userElem.id === user).surname}`
            }
          </div>
          {deal.createdBy === user
            ? <div className='DDMC-creator'>{t('deal_details_member_card.creator')}</div>
            : ''}
        </div>
      </div>
      <div className='DDMC-signed-container'>
        <span className={
        deal.signedBy.some(userSigned => {
          if (userSigned.id) {
            if (user.id) {
              return userSigned.id === user.id
            } else {
              return userSigned.id === user
            }
          } else {
            if (user.id) {
              return userSigned === user.id
            } else {
              return userSigned === user
            }
          }
        })
          ? 'DDMC-signed-green'
          : 'DDMC-signed-red'
      }
        >
          {
        deal.signedBy.some(userSigned => {
          console.log('user')
          console.log(user)
          console.log('userSigned')
          console.log(userSigned)
          if (userSigned.id) {
            if (user.id) {
              return userSigned.id === user.id
            } else {
              return userSigned.id === user
            }
          } else {
            if (user.id) {
              return userSigned === user.id
            } else {
              return userSigned === user
            }
          }
        })
          ? t('deal_details_member_card.signed')
          : t('deal_details_member_card.not_signed')
      }
        </span>
      </div>
    </div>
  )
}
