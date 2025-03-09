import { ScaleLoader } from "react-spinners"
const Loader = ({loading} : {loading : boolean}) => {
  return (
    loading && <ScaleLoader/>
  )
}

export default Loader