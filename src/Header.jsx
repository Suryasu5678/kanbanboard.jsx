import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Modal,
  Typography,
  Checkbox,
} from "@mui/material";
import { Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Header = ({ filter, setFilter, onCreateTask }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [reporter, setReporter] = useState("");
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [tempFilter, setTempFilter] = useState({ ...filter });

  const handleClickOpen = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleSave = () => {
    const newTask = {
      assignee,
      reporter,
      task,
      description,
      status: "Backlog",
    };
    onCreateTask(newTask);
    handleCloseDialog();
    setAssignee("");
    setReporter("");
    setTask("");
    setDescription("");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTempFilter({ ...filter });
  };

  const handleSaveFilter = () => {
    setFilter(tempFilter);
    handleClose();
  };

  const handleCheckboxChange = (e, category) => {
    const { value, checked } = e.target;
    setTempFilter((prev) => {
      const updatedFilter = { ...prev };
      if (checked) {
        updatedFilter[category].push(value);
      } else {
        updatedFilter[category] = updatedFilter[category].filter(
          (item) => item !== value
        );
      }
      return updatedFilter;
    });
  };

  return (
    <div
      style={{
        height: "70px",
        background: "black",
        color: "white",
        display: "flex",
        flexWrap: "wrap", 
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        gap: "10px", 
      }}
    >
      <Button
        variant="outlined"
        sx={{
          fontSize: { xs: "10px", sm: "12px", md: "14px" },
          width: { xs: "100%", sm: "auto" },
        }}
        onClick={handleClickOpen}
      >
        Create New
      </Button>

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
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
          <TextField
            label="Task Title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            fullWidth
            style={{ marginBottom: "16px" }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            style={{ marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Button
        onClick={handleOpen}
        sx={{
          fontSize: { xs: "10px", sm: "12px", md: "14px" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        FILTER
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "400px", 
            background: "lightcoral",
            padding: "20px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", textAlign: "center" }}
          >
            Assignee
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Checkbox
              value="Niteesh"
              checked={tempFilter.assignee.includes("Niteesh")}
              onChange={(e) => handleCheckboxChange(e, "assignee")}
            />
            Niteesh
            <Checkbox
              value="Surya"
              checked={tempFilter.assignee.includes("Surya")}
              onChange={(e) => handleCheckboxChange(e, "assignee")}
            />
            Surya
            <Checkbox
              value="Karthi"
              checked={tempFilter.assignee.includes("Karthi")}
              onChange={(e) => handleCheckboxChange(e, "assignee")}
            />
            Karthi
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", textAlign: "center", mt: 2 }}
          >
            Reporter
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Checkbox
              value="Sasi"
              checked={tempFilter.reporter.includes("Sasi")}
              onChange={(e) => handleCheckboxChange(e, "reporter")}
            />
            Sasi
            <Checkbox
              value="Siva"
              checked={tempFilter.reporter.includes("Siva")}
              onChange={(e) => handleCheckboxChange(e, "reporter")}
            />
            Siva
            <Checkbox
              value="Rishi"
              checked={tempFilter.reporter.includes("Rishi")}
              onChange={(e) => handleCheckboxChange(e, "reporter")}
            />
            Rishi
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "white", textAlign: "center", mt: 2 }}
          >
            Status
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Checkbox
              value="Backlog"
              checked={tempFilter.status.includes("Backlog")}
              onChange={(e) => handleCheckboxChange(e, "status")}
            />
            Backlog
            <Checkbox
              value="ToDo"
              checked={tempFilter.status.includes("ToDo")}
              onChange={(e) => handleCheckboxChange(e, "status")}
            />
            ToDo
            <Checkbox
              value="Inprogress"
              checked={tempFilter.status.includes("Inprogress")}
              onChange={(e) => handleCheckboxChange(e, "status")}
            />
            Inprogress
            <Checkbox
              value="QA"
              checked={tempFilter.status.includes("QA")}
              onChange={(e) => handleCheckboxChange(e, "status")}
            />
            QA
            <Checkbox
              value="Complete"
              checked={tempFilter.status.includes("Complete")}
              onChange={(e) => handleCheckboxChange(e, "status")}
            />
            Complete
          </Typography>
          <Button
            sx={{
              border: "1px solid white",
              background: "green",
              color: "white",
              marginTop: "20px",
              width: "100%",
            }}
            onClick={handleSaveFilter}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
