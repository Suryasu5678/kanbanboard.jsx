import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FormControl } from "@mui/material";
import {InputLabel} from "@mui/material";
import {Select} from "@mui/material";
import {MenuItem} from "@mui/material";
import First from "./First";

const KanbanTemplate = ({
  tasks,
  updateTask,
  mappingHeader = ["Backlog", "ToDo", "Inprogress", "QA", "Complete"],
}) => {
  const statusColors = {
    Backlog: "#f0ad4e",
    ToDo: "#5bc0de",
    Inprogress: "rgb(135, 156, 48)",
    QA: "#d9534f",
    Complete: "#5cb85c",
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [hover, setHover] = useState(true);
  const [isHover, setIsHover] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const onTaskClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };
  const handlSaveDialog = () => {
    setIsHover(true);
    setOpenDialog(false);
  };

  const handleStatusChange = (event) => {
    const updatedTask = { ...selectedTask, status: event.target.value };
    setSelectedTask(updatedTask);
    updateTask(updatedTask);
  };

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {mappingHeader.map((th, index) => (
              <th
                key={index}
                style={{
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "8px",
                }}
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ height: "83.6vh" }}>
          <tr>
            {mappingHeader.map((td, index) => (
              <td
                key={index}
                style={{
                  border: "1px solid black",
                  verticalAlign: "top",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {tasks
                  .filter((task) => task.status === td)
                  .map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      style={{
                        marginBottom: "8px",
                        border: "2px solid gray",
                        borderRadius: "30px",
                        cursor: "pointer",
                        color: "white",
                        backgroundColor: statusColors[task.status],
                      }}
                      onClick={() => onTaskClick(task)}
                    >
                      <First assignee={task.assignee} />
                      <p>Assignee: {task.assignee}</p>
                      <p>Reporter: {task.reporter}</p>
                    </div>
                  ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <Dialog open={openDialog} sx={{}} onClose={handleCloseDialog}>
        <div style={{ background: "lightcoral", width: "400px" }}>
          <DialogTitle
            style={{
              textAlign: "center",
              background: "lightblue",
              paddingBottom: "20px",
              position: "relative",
              top: "5px",
            }}
          >
            Task Details
            <img
              src="https://img.icons8.com/?size=48&id=20750&format=png"
              alt="GIF"
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid white",
                top: "10px",
                left: "10px",
              }}
            />
          </DialogTitle>
          <DialogContent style={{ padding: "30px" }}>
            {selectedTask && (
              <div>
                <FormControl fullWidth style={{ marginBottom: "16px" }}>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={selectedTask.status}
                    onChange={handleStatusChange}
                  >
                    {mappingHeader.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <strong>Task: {selectedTask.task || "Mandatory field"}</strong>
                <p>
                  <strong>Description:</strong> {selectedTask.description}
                </p>
                <p>
                  <strong>Assignee:</strong> {selectedTask.assignee}
                </p>
                <p>
                  <strong>Reporter:</strong> {selectedTask.reporter}
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              style={{
                color: hover ? "white" : "white",
                border: "1px solid gray",
                background: hover ? "rgb(114, 149, 19)" : "#dc3545",
                position: "absolute",
                bottom: hover ? "0%" : "2.5%",
                left: "0%",
                transition: "all 1s ease-in-out",
                borderRadius: hover ? "5px" : "50px",
                Top: "20px",
              }}
              onMouseEnter={() => setHover(false)}
              onMouseLeave={() => setHover(true)}
            >
              Close
            </Button>
            <Button
              onClick={handlSaveDialog}
              style={{
                color: isHover ? "white" : "black",
                border: "1px solid gray",
                background: isHover ? "#007bff" : "#28a745",
                position: "absolute",
                bottom: isHover ? "0%" : "2.5%",
                right: "0%",
                transition: "all 1s ease-in-out",
                borderRadius: isHover ? "5px" : "50px",
                Top: "20px",
              }}
              onMouseEnter={() => setIsHover(false)}
              onMouseLeave={() => setIsHover(true)}
            >
              Save
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default KanbanTemplate;
