import { Notification } from './Notification'

export const NotificationContainer = ({ notifications, onClose }) => {
  if (notifications.length === 0) return null

  // Agrupar notificaciones por posición
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const position = notification.position || 'bottom-right'
    if (!acc[position]) {
      acc[position] = []
    }

    acc[position].push(notification)
    return acc
  }, {})

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'notification-list-top-left'
      case 'top-right':
        return 'notification-list-top-right'
      case 'bottom-left':
        return 'notification-list-bottom-left'
      case 'bottom-right':
      default:
        return 'notification-list-bottom-right'
    }
  }

  return (
    <div className="notification-container">
      {Object.entries(groupedNotifications).map(([position, positionNotifications]) => (
        <div key={position} className={`notification-list ${getPositionClasses(position)}`}>
          {positionNotifications.map((notification) => (
            <div key={notification.id} className="notification-item-wrapper">
              <Notification {...notification} onClose={onClose} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
