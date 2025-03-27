import { ContainerLoading } from "./styles"
import MoonLoader from "react-spinners/MoonLoader"
const Loading = () => {
  return (
    <ContainerLoading>
      <MoonLoader size={80} />
    </ContainerLoading>
  )
}

export default Loading
