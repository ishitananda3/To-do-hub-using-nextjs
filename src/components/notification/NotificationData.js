"use server"

import prisma from "@/src/lib/prisma"

const fetchNotifications = async (lastSeenNotificationId, email) => {
  const notifications = await prisma.notification.findMany({
    where: {
      users: {
        some: {
          email,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return notifications.map((notification) => ({
    ...notification,
    new: !lastSeenNotificationId || notification.id > lastSeenNotificationId,
  }))
}
export default fetchNotifications
