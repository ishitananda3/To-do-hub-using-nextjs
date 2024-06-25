"use client"

import React, { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import { format } from "date-fns"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useSession } from "next-auth/react"
import PropTypes from "prop-types"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Divider,
  User,
  Listbox,
  ListboxItem,
  Tabs,
  Tab,
} from "@nextui-org/react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import toast from "react-hot-toast"
import fetchNotifications from "./NotificationData"
import deleteNotification from "./clearAllNotifications"
import { useGlobalSyncupContext } from "@/src/context/SyncUpStore"
import { mapEventToMessage } from "./eventMapper"

function NotificationModal({ open, handleClose, anchorEl }) {
  const [notifications, setNotifications] = useState([])
  const [showListbox, setShowListbox] = useState(false)
  const [selected, setSelected] = React.useState("0")
  const { setcreatenotification } = useGlobalSyncupContext()
  const { data: session } = useSession()
  const { allUserData } = useGlobalSyncupContext()

  useEffect(() => {
    const lastSeenNotificationId = localStorage.getItem(
      "lastSeenNotificationId",
    )
    const fetchNotificationsData = async () => {
      try {
        const fetchedNotifications = await fetchNotifications(
          lastSeenNotificationId,
          session?.user?.email,
        )
        setNotifications(fetchedNotifications)
      } catch (error) {
        toast.error("Error fetching notifications:")
      }
    }

    fetchNotificationsData()
  }, [open])

  const handleCloseModal = () => {
    setNotifications([])
    handleClose()
  }

  const unreadNotifications = notifications.filter(
    (notification) => notification.new,
  )

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        new: false,
      })),
    )
  }

  const handleDelete = async () => {
    try {
      await deleteNotification()
      setcreatenotification(false)
      setNotifications([])
      handleClose()
    } catch (error) {
      toast.error("Error deleting card:")
    }
  }

  return (
    <Popover
      placement="bottom-end"
      offset={22}
      trigger="click"
      isOpen={open}
      onClose={handleCloseModal}
      anchorEl={anchorEl}
    >
      <PopoverTrigger>
        <div />
      </PopoverTrigger>
      <PopoverContent className="dark:bg">
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              marginTop: "12px",
              marginRight: "4px",
            }}
          >
            <NotificationsIcon sx={{ fontSize: "1.8rem", marginRight: 0.5 }} />
            All Notifications:
            <Popover
              placement="bottom-start"
              offset={1}
              trigger="click"
              isOpen={showListbox}
              onClose={() => setShowListbox(false)}
              anchorEl={anchorEl}
            >
              <PopoverTrigger>
                <MoreVertIcon
                  color="primary"
                  sx={{ fontSize: "1.8rem", marginLeft: 12 }}
                  onClick={() => setShowListbox(!showListbox)}
                />
              </PopoverTrigger>
              <PopoverContent>
                <Listbox aria-label="Actions">
                  <ListboxItem
                    key="copy"
                    sx={{ fontSize: "0.1rem" }}
                    onClick={handleMarkAllAsRead}
                  >
                    Mark All as read
                  </ListboxItem>

                  <ListboxItem
                    key="delete"
                    sx={{ fontSize: "0.1rem" }}
                    onClick={handleDelete}
                  >
                    Clear all
                  </ListboxItem>
                </Listbox>
              </PopoverContent>
            </Popover>
          </span>
        </Typography>
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="0" title="All Notifications">
            <div
              style={{
                maxHeight: 400,
                width: 312,
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {notifications.map((notification) => (
                <>
                  <Divider sx={{ my: 3 }} />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <User
                      avatarProps={{
                        src: allUserData?.find(
                          (user) => user.name === notification.author,
                        )?.photo,
                      }}
                    >
                      {!allUserData?.find(
                        (user) => user.name === notification.author,
                      )?.photo && notification.author.charAt(0).toUpperCase()}
                    </User>

                    <div
                      style={{
                        marginLeft: "12px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ marginTop: "6px" }}
                        dangerouslySetInnerHTML={{
                          __html: mapEventToMessage(
                            notification.event,
                            notification.author,
                            notification.details,
                          ),
                        }}
                      />

                      <Typography
                        className="dark:text-text"
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          marginTop: "4px",
                          fontSize: "10px",
                          marginBottom: "6px",
                        }}
                      >
                        {format(notification.createdAt, "dd MMM yyyy HH:mm")}
                      </Typography>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </Tab>
          <Tab key="1" title="Unread Notifications">
            <div
              style={{
                maxHeight: 400,
                width: 312,
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
            >
              {unreadNotifications.map((notification, index) => (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <User
                    avatarProps={{
                      src: allUserData?.find(
                        (user) => user.name === notification.author,
                      )?.photo,
                    }}
                  >
                    {!allUserData?.find(
                      (user) => user.name === notification.author,
                    )?.photo && notification.author.charAt(0).toUpperCase()}
                  </User>
                  <div
                    style={{
                      marginLeft: "12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ marginTop: "6px" }}
                      dangerouslySetInnerHTML={{
                        __html: mapEventToMessage(
                          notification.event,
                          notification.author,
                          notification.details,
                        ),
                      }}
                    />

                    <Typography
                      className="dark:text-text"
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        marginTop: "4px",
                        fontSize: "10px",
                        marginBottom: "6px",
                      }}
                    >
                      {format(notification.createdAt, "dd MMM yyyy HH:mm")}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </Tab>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

NotificationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
}
NotificationModal.defaultProps = {
  anchorEl: null,
}
export default NotificationModal
