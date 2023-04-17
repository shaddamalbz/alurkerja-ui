import { HiCheckCircle, HiInformationCircle, HiExclamation, HiXCircle } from 'react-icons/hi'

export interface StatusIconProps {
  type: 'info' | 'success' | 'warning' | 'danger'
}

const ICONS = {
  success: {
    color: 'text-emerald-400',
    icon: <HiCheckCircle />,
  },
  info: {
    color: 'text-blue-400',
    icon: <HiInformationCircle />,
  },
  warning: {
    color: 'text-yellow-400',
    icon: <HiExclamation />,
  },
  danger: {
    color: 'text-red-400',
    icon: <HiXCircle />,
  },
}

const StatusIcon = (props: StatusIconProps) => {
  const { type } = props

  const icon = ICONS[type]

  return <span className={`text-2xl ${icon.color}`}>{icon.icon}</span>
}

StatusIcon.defaultProps = {
  type: 'info',
}

export default StatusIcon
