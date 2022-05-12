import { Route, Switch, Redirect } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import RatingForm from './components/RatingForm'
import Profile from './Profile'
import { useSelector } from 'react-redux'
import Users from './Users'
import LandingPage from './LandingPage'
import CreateContract from './pages/CreateContract'
import ContractDetails from './pages/ContractDetails'
import ContractsOverview from './pages/ContractsOverview'
import KYCExplanation from './pages/KYCExplanation'
import MissingKYCBanner from './components/MissingKYCBanner'
import KYCDocumentType from './pages/KYCDocumentType'
import KYCIssuingCountry from './pages/KYCIssuingCountry'
import KYCEnableCamera from './pages/KYCEnableCamera'
import KYCCameraAccessDenied from './pages/KYCCameraAccessDenied'
import KYCIdFront from './pages/KYCIdFront'
import KYCIdBack from './pages/KYCIdBack'
import KYCSelfieExplanation from './pages/KYCSelfieExplanation'
import KYCTakeSelfie from './pages/KYCTakeSelfie'
import KYCSucceed from './pages/KYCSucceed'
import KYCInProgress from './components/KYCInProgress'
import KYCUploadCif from './pages/KYCUploadCif'
import VerificationRequest from './pages/VerificationRequest'
import ContractViewer from './pages/ContractViewer'

export default function RouterApp () {
  const user = useSelector(state => state.user)

  return (
    <Switch>
      <Route path='/deals/:id'>
        {user.status === 'missing-kyc'
          ? <MissingKYCBanner />
          : user.status === 'kyc_in_progress'
            ? <KYCInProgress />
            : <></>}
        <ContractDetails />
      </Route>

      <Route path='/profile'>
        {user.status === 'missing-kyc'
          ? <MissingKYCBanner />
          : user.status === 'kyc_in_progress'
            ? <KYCInProgress />
            : <></>}
        <Profile />
      </Route>

      <Route path='/deals'>
        {user.status === 'missing-kyc'
          ? <MissingKYCBanner />
          : user.status === 'kyc_in_progress'
            ? <KYCInProgress />
            : <></>}
        <ContractsOverview />
      </Route>

      <Route path='/users'>
        {user.status === 'missing-kyc'
          ? <MissingKYCBanner />
          : user.status === 'kyc_in_progress'
            ? <KYCInProgress />
            : <></>}
        <Users />
      </Route>

      <Route path='/create-deal'>
        <CreateContract />
      </Route>

      <Route path='/landing'>
        <LandingPage />
      </Route>

      <Route path='/rate/:id'>
        <RatingForm />
      </Route>

      <Route path='/kyc-explanation'>
        <KYCExplanation />
      </Route>

      <Route path='/kyc-document-type'>
        <KYCDocumentType />
      </Route>

      <Route path='/kyc-issuing-country'>
        <KYCIssuingCountry />
      </Route>

      <Route path='/kyc-enable-camera'>
        <KYCEnableCamera />
      </Route>

      <Route path='/kyc-access-denied'>
        <KYCCameraAccessDenied />
      </Route>

      <Route path='/kyc-id-front'>
        <KYCIdFront />
      </Route>

      <Route path='/kyc-id-back'>
        <KYCIdBack />
      </Route>

      <Route path='/kyc-selfie'>
        <KYCSelfieExplanation />
      </Route>

      <Route path='/kyc-take-selfie'>
        <KYCTakeSelfie />
      </Route>

      <Route path='/kyc-succeed'>
        <KYCSucceed />
      </Route>

      <Route path='/kyc-cif'>
        <KYCUploadCif />
      </Route>

      <Route path='/verify/:id'>
        <VerificationRequest />
      </Route>

      <Route path='/place-signatures/:key'>
        <DndProvider backend={HTML5Backend}>
          <ContractViewer />
        </DndProvider>
      </Route>

      <Route
        path='/login' render={() => {
          return user.email ? <Redirect to='/' /> : <LoginForm />
        }}
      />

      <Route
        path='/register' render={() => {
          return user.email ? <Redirect to='/' /> : <RegistrationForm />
        }}
      />

      <Route path='/'>
        {user.status === 'missing-kyc'
          ? <MissingKYCBanner />
          : user.status === 'kyc_in_progress'
            ? <KYCInProgress />
            : <></>}
        <ContractsOverview />
      </Route>
    </Switch>
  )
}
