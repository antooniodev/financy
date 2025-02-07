import { ContainerLoading } from './styles'
import CircularProgress from '@mui/material/CircularProgress'
const Loading = () => {
  return (
    <ContainerLoading>
      <CircularProgress size={80} />
    </ContainerLoading>
  )
}

export default Loading
