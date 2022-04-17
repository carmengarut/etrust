import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

import '../css/verificationRequest.css'
import { userEdit } from '../reducers/userReducer'
import { downloadFile, getImage, sendVerifConfirmationEmail } from '../services/deals'

export default function VerificationRequest () {
  const { id } = useParams()
  const user = useSelector(state => state.users).find(user => user.id === id.toString())

  const [frontPhoto, setFrontPhoto] = useState('')
  const [backPhoto, setBackPhoto] = useState('')
  const [selfie, setSelfie] = useState('')

  const dispatch = useDispatch()

  const handleDownload = async () => {
    const url = await downloadFile(user.idFrontPhoto)

    // const url = window.URL.createObjectURL(new Blob([response]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', user.idFrontPhoto)
    document.body.appendChild(link)
    link.click()
  }
  const handleAccept = () => {
    dispatch(userEdit(user.id, { status: 'active' }))
    sendVerifConfirmationEmail({ receiverEmail: user.email, receiverName: user.name })
  }

  const handleDeny = () => {
    dispatch(userEdit(user.id, { status: 'missing-kyc' }))
  }

  if (!user) {
    return <></>
  } else {
    getImage(user.idFrontPhoto).then(data => {
      setFrontPhoto(data)
    }).catch(err => { console.log(err) })
    if (user.idBackPhoto) {
      getImage(user.idBackPhoto).then(data => {
        setBackPhoto(data)
      }).catch(err => { console.log(err) })
    }
    if (user.selfie) {
      getImage(user.selfie).then(data => {
        setSelfie(data)
      }).catch(err => { console.log(err) })
    }
  }
  return (
    <div className='vr-container'>
      <h1>Verificación de identidad</h1>
      <div>Status: {user.status} </div>
      <div>Nombre: {user.name}</div>
      <div>Apellidos: {user.surname}</div>
      <div>Tipo de cuenta: {user.type}</div>
      <div>Tipo de documento: {user.documentType}</div>
      <div>Número de documento: {user.documentNumber}</div>
      <div>País de expedición: {user.name}</div>
      {user.type === 'individual'
        ? (
          <div>
            <div>
              <div>Parte delantera del Documento: </div>
              <img src={frontPhoto} alt='' width='200px' height='auto' />
            </div>
            <div>
              <div>Parte trasera del Documento: </div>
              <img src={backPhoto} alt='' width='200px' height='auto' />
            </div>
            <div>
              <div>Selfie: </div>
              <img src={selfie} alt='' width='200px' height='auto' />
            </div>
          </div>)
        : (
          <div>
            <div>CIF: </div>
            <button
              type='button'
              onClick={handleDownload}
            >
              Descargar
            </button>

          </div>
          )}
      {user.status === 'kyc_in_progress'
        ? (
          <div>
            <button onClick={handleAccept}>
              Aceptar
            </button>
            <button onClick={handleDeny}>
              Denegar
            </button>
          </div>)
        : <></>}
    </div>
  )
}
