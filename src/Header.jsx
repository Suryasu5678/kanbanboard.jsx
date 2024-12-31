import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import './app.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Header = ({ onClick, taskCount }) => {
  const displayTaskCount =
    taskCount > 10 ? "10+" : taskCount > 5 ? "5+" : taskCount;

  return (
    <div
      style={{
        height: "70px",
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="outlined" onClick={onClick}>
        Create New
      </Button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {displayTaskCount}
        </p>
        <div style={{ position: "relative", left: "200px" }}>
          <img
            src="https://img.icons8.com/?size=48&id=20750&format=png"
            alt="GIF"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              border: "2px solid white",
              bottom: "19px",
              position: "absolute",
            }}
            onClick={onClick}
          />
          <p className="clickme"
            style={{ top: "24px", position: "relative", right: "12px" ,cursor:'pointer'}}
            onClick={onClick}
          >
            click me!
          </p>
        </div>
      </div>
    </div>
  );
};

export default function DialogWithDropdown({ tableData }) {
  const [open, setOpen] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const newTask = {
      assignee,
      reporter,
      task,

      description,
      status: "Backlog",
    };
    tableData(newTask);
    console.log(handleSave);
    handleClose();
    setAssignee("");
    setReporter("");
    setTask("");
    setDescription("");
  };

  return (
    <React.Fragment>
      <Header onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle style={{ textAlign: "center" }}>Kanban Board</DialogTitle>
        <DialogContent>
          <FormControl fullWidth style={{ margin: "16px 0" }}>
            <InputLabel id="assignee-label">Assignee</InputLabel>
            <Select
              labelId="assignee-label"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              <MenuItem value="Niteesh">Niteesh</MenuItem>
              <MenuItem value="Surya">Surya</MenuItem>
              <MenuItem value="Karthi">Karthi</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "16px" }}>
            <InputLabel id="reporter-label">Reporter</InputLabel>
            <Select
              labelId="reporter-label"
              value={reporter}
              onChange={(e) => setReporter(e.target.value)}
            >
              <MenuItem value="Sasi">Sasi</MenuItem>
              <MenuItem value="Siva">Siva</MenuItem>
              <MenuItem value="Rishi">Rishi</MenuItem>
            </Select>
          </FormControl>
          <input
            type="text"
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ padding: "10px", marginBottom: "16px", width: "95%" }}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "10px", width: "95%" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
