import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import '../../styles/notification.css'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

export const Notification = ({
  id,
  type,
  title,
  message,
  duration = 4500,
  closable = true,
  pauseOnHover = true,
  onClose
}) => {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [paused, setPaused] = useState(false)

  const Icon = iconMap[type]

  // dispara la animación de entrada
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  // cierra tras animación de salida
  const handleClose = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => onClose?.(id), 300)
  }

  return (
    <div
      className={`
        notification-item notification-${type}
        ${visible ? 'notification-enter' : ''}
        ${leaving ? 'notification-exit' : ''}
      `}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="notification-content">
        <Icon className="notification-icon" />
        <div className="notification-text">
          <p className="notification-title">{title}</p>
          {message && <p className="notification-message">{message}</p>}
        </div>
        {closable && (
          <button onClick={handleClose} className="notification-close">
            <span className="sr-only">Close</span>
            <X className="notification-close-icon" />
          </button>
        )}
      </div>

      {/* barra de progreso animada */}
      {duration > 0 && (
        <div className="notification-progress-container">
          <div
            className="notification-progress-bar"
            style={{
              animation: `progress ${duration}ms linear forwards`,
              animationPlayState: paused ? 'paused' : 'running'
            }}
            onAnimationEnd={handleClose}
          />
        </div>
      )}
    </div>
  )
}
