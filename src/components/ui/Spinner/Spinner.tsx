import { CgSpinner } from 'react-icons/cg'

export interface SpinnerProps extends React.DetailedHTMLProps<React.HTMLAttributes<JSX.Element>, JSX.Element> {
  /** size spinner */
  size?: number | string
}

/**
 * Spinner - indicator loading component
 */
const Spinner = (props:SpinnerProps) => {
  const { size } = props

  const spinnerStyle = {
    height: size,
    width: size,
  }

  return <CgSpinner className="animate-spin" style={spinnerStyle} />
}

Spinner.defaultProps = {
  size: 20,
}

export default Spinner
