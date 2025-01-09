import React, { useState } from "react";
import Header from "./Header";
import KanbanTemplate from "./KanbanTemplate";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({
    assignee: [],
    reporter: [],
    status: [],
  });

 const updateTask = (updatedTask) => {
  const updatedTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
   console.log("Updated Tasks:", updatedTasks);
   setTasks(updatedTasks);
 };


  const filteredTasks = tasks.filter((task) => {
    const matchesAssignee =
      filter.assignee.length === 0 || filter.assignee.includes(task.assignee);
    const matchesReporter =
      filter.reporter.length === 0 || filter.reporter.includes(task.reporter);
    const matchesStatus =
      filter.status.length === 0 || filter.status.includes(task.status);

    return matchesAssignee && matchesReporter && matchesStatus;
  });

  return (
    <div>
      <Header
        onCreateTask={(newData) => setTasks([...tasks, newData])}
        filter={filter}
        setFilter={setFilter}
      />
      <KanbanTemplate tasks={filteredTasks} updateTask={updateTask} />
    </div>
  );
};
 export default App;