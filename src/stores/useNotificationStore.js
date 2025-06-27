import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/**
 * @typedef {'success' | 'error' | 'warning' | 'info'} NotificationType
 * @typedef {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} NotificationPosition
 */

/**
 * @typedef {Object} NotificationOptions
 * @property {number} [duration=4500] - Duration in milliseconds
 * @property {boolean} [closable=true] - Whether the notification can be closed
 * @property {boolean} [pauseOnHover=true] - Whether to pause on hover
 * @property {NotificationPosition} [position='bottom-right'] - Position on screen
 */

/**
 * @typedef {Object} Notification
 * @property {string} id - Unique identifier
 * @property {NotificationType} type - Type of notification
 * @property {string} title - Notification title
 * @property {string} [message] - Optional message
 * @property {number} duration - Duration in milliseconds
 * @property {boolean} closable - Whether the notification can be closed
 * @property {boolean} pauseOnHover - Whether to pause on hover
 * @property {NotificationPosition} position - Position on screen
 */

/**
 * @typedef {Object} NotificationStore
 * @property {Notification[]} notifications - Array of notifications
 * @property {(notification: Omit<Notification, 'id'>) => string} addNotification - Add a notification
 * @property {(id: string) => void} removeNotification - Remove a notification by ID
 * @property {() => void} clearAll - Clear all notifications
 * @property {(title: string, message?: string, options?: NotificationOptions) => string} success - Show success notification
 * @property {(title: string, message?: string, options?: NotificationOptions) => string} error - Show error notification
 * @property {(title: string, message?: string, options?: NotificationOptions) => string} warning - Show warning notification
 * @property {(title: string, message?: string, options?: NotificationOptions) => string} info - Show info notification
 */

const store = create()(
  devtools(
    immer((set, get) => (/** @type {NotificationStore} */ ({
      notifications: [],
      /**
       * @param {Omit<Notification, 'id'>} notification - Notification data
       * @returns {string} The notification ID
       */
      addNotification: (notification) => {
        const id = crypto.randomUUID()
        const newNotification = {
          id,
          duration: 4500,
          closable: true,
          pauseOnHover: true,
          position: 'bottom-right',
          ...notification
        }
        set((state) => {
          state.notifications.push(newNotification)
        })
        return id
      },
      /**
       * @param {string} id - Notification ID to remove
       */
      removeNotification: (id) => {
        set((state) => {
          state.notifications = state.notifications.filter((n) => n.id !== id)
        })
      },
      /**
       * Clear all notifications
       */
      clearAll: () => {
        set((state) => {
          state.notifications = []
        })
      },
      /**
       * Show success notification
       * @param {string} title - Notification title
       * @param {string} [message] - Optional message
       * @param {NotificationOptions} [options={}] - Additional options
       * @returns {string} The notification ID
       */
      success: (title, message, options = {}) => {
        return get().addNotification({
          type: 'success',
          title,
          message,
          ...options
        })
      },
      /**
       * Show error notification
       * @param {string} title - Notification title
       * @param {string} [message] - Optional message
       * @param {NotificationOptions} [options={}] - Additional options
       * @returns {string} The notification ID
       */
      error: (title, message, options = {}) => {
        return get().addNotification({
          type: 'error',
          title,
          message,
          ...options
        })
      },
      /**
       * Show warning notification
       * @param {string} title - Notification title
       * @param {string} [message] - Optional message
       * @param {NotificationOptions} [options={}] - Additional options
       * @returns {string} The notification ID
       */
      warning: (title, message, options = {}) => {
        return get().addNotification({
          type: 'warning',
          title,
          message,
          ...options
        })
      },
      /**
       * Show info notification
       * @param {string} title - Notification title
       * @param {string} [message] - Optional message
       * @param {NotificationOptions} [options={}] - Additional options
       * @returns {string} The notification ID
       */
      info: (title, message, options = {}) => {
        return get().addNotification({
          type: 'info',
          title,
          message,
          ...options
        })
      }
    }))),
    { name: 'notification-store' }
  )
)

/**
 * @type {() => NotificationStore}
 */
export const useNotificationStore = store
