import React, { useState } from "react";
import Header from "./Header";
import KanbanTemplate from "./KanbanTemplate";

const App = () => {
  const [tasks, setTasks] = useState([]);


  const tableData = (newData) => {
    setTasks((prevTasks) => [...prevTasks, newData]);
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.task === updatedTask.task ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <Header tableData={tableData} />
      <KanbanTemplate tasks={tasks} updateTask={updateTask} />
    </div>
  );
};

export default App;
