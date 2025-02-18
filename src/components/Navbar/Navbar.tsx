import { Link, useLocation } from 'react-router-dom'
import { Container } from './styles'

type NavLink = {
  path: string
  pageName: string
}

type Props = {
  styles?: React.CSSProperties
}

const links: NavLink[] = [{ path: '/', pageName: 'Dashboard' }]

const Navbar = ({ styles }: Props) => {
  const { pathname } = useLocation()
  return (
    <Container style={styles}>
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          className={pathname === link.path ? 'active' : ''}
        >
          {link.pageName}
        </Link>
      ))}
    </Container>
  )
}

export default Navbar
