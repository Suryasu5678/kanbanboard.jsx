import React from "react";
const First = ({ assignee, taskCount }) => {
  const getInitial = (name) => {
    if (!name) {
      return (
        <img
          src="https://em-content.zobj.net/source/emojidex/112/adult_1f9d1.png"
          alt="GIF"
          style={{ width: "50px", height: "50px" }}
        />
      );
    }
    return name.charAt(0).toUpperCase();
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50px",
          backgroundColor: "rgb(34, 143, 26)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {getInitial(assignee)}
        {taskCount}
      </div>
    </div>
  );
};

export default First;