import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
  const [selectedTask, setSelectedTask] = useState(null);

  const onTaskClick = (task) => {
    setSelectedTask({ ...task });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleStatusChange = (event) => {
    const updatedTask = { ...selectedTask, status: event.target.value };
    setSelectedTask(updatedTask);
  };
  const handleSaveDialog = () => {
    console.log("Selected Task Before Save:", selectedTask);
    if (selectedTask) {
      updateTask(selectedTask);
    }
    setOpenDialog(false);
    setSelectedTask(null);
  };

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "auto",
          height: "88.5vh",
          maxHeight: "88.5vh",
          overflowY: "auto",
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
                  fontSize: "clamp(10px, 2vw, 16px)",
                  backgroundColor: "lightgray",
                  wordWrap: "break-word",
                }}
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
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
                        borderRadius: "5px",
                        cursor: "pointer",
                        color: "white",
                        backgroundColor: statusColors[task.status],
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordWrap: "break-word",
                        height: "200px",
                      }}
                      onClick={() => onTaskClick(task)}
                    >
                      <First assignee={task.assignee} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column", 
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <h4
                          style={{
                            margin: 0,
                            textAlign: "center",
                            paddingTop: "30px",
                            fontSize: "clamp(14px, 2vw, 18px)",
                            position: "relative",
                          }}
                        >
                          Task: {task.task}
                        </h4>
                        <style>
                          {`
      @media (max-width: 600px) {
        h4 {
          position: absolute;
          bottom: 20px; /* Moves the task to the bottom */
          padding-top: 0;
        }
      }
    `}
                        </style>
                      </div>
                    </div>
                  ))}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {/* Task Details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          style={{
            textAlign: "center",
            background: "lightblue",
            paddingBottom: "40px",
          }}
        >
          Task Details
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
              <strong>Task: </strong>
              <input
                value={selectedTask.task}
                onChange={(e) =>
                  setSelectedTask({ ...selectedTask, task: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "16px",
                }}
              />
              <strong>Description:</strong>
              <textarea
                value={selectedTask.description}
                onChange={(e) =>
                  setSelectedTask({
                    ...selectedTask,
                    description: e.target.value,
                  })
                }
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "16px",
                  minHeight: "80px",
                }}
              />
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
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleSaveDialog}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KanbanTemplate;
