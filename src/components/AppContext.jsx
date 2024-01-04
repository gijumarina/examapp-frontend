import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [type, setType] = useState("STUDENT");
  const [group, setGroup] = useState();
  const [studentId, setStudentId] = useState(-1);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [teacherId, setTeacherId] = useState(-1);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        activeUsers,
        setActiveUsers,
        type,
        setType,
        group,
        setGroup,
        studentId,
        setStudentId,
        open,
        setOpen,
        message,
        setMessage,
        teacherId,
        setTeacherId
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
