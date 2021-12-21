import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { userEdit, userLogout } from './reducers/userReducer'
import { useState } from 'react'
import titleIcon from './public/deals-icon.svg'
import avatar from './public/avatar.svg'
import './css/profile.css'

const Profile = () => {
  const user = useSelector(state => state.user)
  const [name, setName] = useState(user.name || '')
  const [surname, setSurname] = useState(user.surname || '')
  const [email, setEmail] = useState(user.email || '')
  const dispatch = useDispatch()
  const { t } = useTranslation('global')

  return (
    <div className='ProfileContainer'>
      <div className='ProfileHeader'>
        <div className='ProfileTitle'>
          <img
            alt=''
            src={titleIcon}
            width='30px'
            height='30px'
          />
          <h1 className='Title'>{t('profile_page.profile')}</h1>
        </div>
        <button className='LogoutButton' onClick={() => { dispatch(userLogout()) }}>
          {t('profile_page.logout')}
        </button>
      </div>
      <div className='ProfileCard'>
        <div>{t('profile_page.edit_your_account_info')}</div>
        <div className='ProfileSubcontainer1'>
          <img
            style={{
              width: '100px',
              height: '100px',
              resizeMode: 'contain',
              borderRadius: '50%'
            }}
            src={user.profileImg || avatar}
            alt={user.name}
          />

          <div className='ProfileName'>{user.name} {user.surname} {' '}
            <span className='ProfileTrustRate'>{user.trustRate} % trust</span>
          </div>
        </div>

        <form
          className='ProfileForm'
        >
          <div className='ProfileRow1'>
            <div className='ProfileFieldGroup'>
              <label>{t('profile_page.name')}</label>
              <input
                className='Field'
                type='text'
                value={name}
                name='Name'
                placeholder={t('profile_page.name')}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div className='ProfileFieldGroup'>
              <label>{t('profile_page.surname')}</label>
              <input
                className='Field'
                type='text'
                value={surname}
                name='Surname'
                placeholder={t('profile_page.surname')}
                onChange={({ target }) => setSurname(target.value)}
              />

            </div>
          </div>

          <div className='ProfileFieldGroup'>
            <label>{t('profile_page.email')}</label>
            <input
              className='Field'
              type='text'
              value={email}
              name='Email'
              placeholder={t('profile_page.email')}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>

        </form>

      </div>
      <button className='SaveButton' onClick={() => { dispatch(userEdit(user.id, { email, name, surname })) }}>
        {t('profile_page.save_changes')}
      </button>

    </div>
  )
}

export default Profile
