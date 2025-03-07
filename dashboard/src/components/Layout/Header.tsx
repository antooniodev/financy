import { ContainerHeader, WrapperHeaderContent } from './styles'
import logoFinancy from '../../assets/Logo_com_nome.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Navbar from '../Navbar'
import { useDispatch } from 'react-redux'
import { clearSession } from '../../store/auth/authSlice'
const Header = () => {
  const dispatch = useDispatch()
  return (
    <ContainerHeader>
      <WrapperHeaderContent>
        <div className="container-logo">
          <img src={logoFinancy} alt="logo da financy" />
        </div>
        <Navbar />
        <div className="account-options">
          <div className="wrapper-user-menu">
            <FontAwesomeIcon
              icon={'fa-solid fa-right-from-bracket' as IconProp}
              size={'xl'}
              color="#516778"
              cursor={'pointer'}
              onClick={() => dispatch(clearSession())}
            />
          </div>
        </div>
      </WrapperHeaderContent>
    </ContainerHeader>
  )
}

export default Header
