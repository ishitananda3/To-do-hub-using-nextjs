import React, { useState, useEffect } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
} from "@nextui-org/react"
import toast from "react-hot-toast"
import { userList } from "@/server/user"

function tabMember() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const fetchedUsers = await userList()
        setUsers(fetchedUsers)
      } catch (error) {
        toast.error("Error fetching users:", error)
      }
    }
    fetchUsersData()
  }, [])

  return (
    <div
      style={{
        margin: "0 20px",
        maxHeight: "50vh",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      <Table
        aria-label="Members table"
        selectionMode="multiple"
        color="secondary"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
          <TableColumn>Tasks Assigned</TableColumn>
          <TableColumn>Tasks Progress</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.name.length > 15
                  ? `${user.name.substring(0, 25)}...`
                  : user.name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                Development of Project A, Coordination of Project B
              </TableCell>
              <TableCell>
                <Progress
                  aria-label="Task progress"
                  size="md"
                  value={90}
                  color="secondary"
                  showValueLabel
                  className="max-w-md"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default tabMember
