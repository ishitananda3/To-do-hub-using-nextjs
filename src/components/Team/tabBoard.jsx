import React, { useState, useEffect } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  AvatarGroup,
  Avatar,
  Tooltip,
} from "@nextui-org/react"
import toast from "react-hot-toast"
import { getAllboards } from "../../../server/board"

function tabBoard() {
  const [boards, setBoards] = useState([])

  useEffect(() => {
    async function fetchBoards() {
      try {
        const allBoards = await getAllboards()
        const sortedBoards = allBoards.sort((a, b) => a.id - b.id)
        setBoards(sortedBoards)
      } catch (error) {
        toast.error("Error fetching boards:", error)
      }
    }
    fetchBoards()
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
        aria-label="Boards table"
        selectionMode="multiple"
        color="secondary"
      >
        <TableHeader>
          <TableColumn>Board ID</TableColumn>
          <TableColumn>Board Name</TableColumn>
          <TableColumn>Members</TableColumn>
        </TableHeader>
        <TableBody>
          {boards.map((board) => (
            <TableRow key={board.id}>
              <TableCell>{board.id}</TableCell>
              <TableCell>
                {board.name.length > 15
                  ? `${board.name.substring(0, 15)}...`
                  : board.name}
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AvatarGroup isBordered max={2} size="sm">
                    {board.users &&
                      board.users.map((user) => (
                        <Tooltip
                          key={user.id}
                          placement="bottom"
                          showArrow
                          content={
                            user.name.length > 15 ? (
                              <>
                                {user.name
                                  .match(/.{1,15}/g)
                                  .map((line, idx) => (
                                    <div key={idx}>{line}</div>
                                  ))}
                              </>
                            ) : (
                              user.name
                            )
                          }
                        >
                          <Avatar
                            key={user.id}
                            name={user.name ? user.name.charAt(0) : ""}
                            size="sm"
                            src={user.photo}
                          />
                        </Tooltip>
                      ))}
                  </AvatarGroup>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default tabBoard
