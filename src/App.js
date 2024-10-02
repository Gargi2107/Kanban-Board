import React, { useState, useEffect } from "react";
import Board from "./components/KanbanBoard";
import "./App.css";
import arrow from "./assets/down.svg";
import display from "./assets/Menu.svg";
import { fetchTicketsAndUsers, getUserName, getUserAvailability, groupTickets, sortTickets } from "./helper";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  );
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    fetchTicketsAndUsers(setTickets, setUsers);
  }, []);

  const groupedTickets = groupTickets(tickets, groupBy, getUserName, users);
  const sortedTickets = {};
  Object.keys(groupedTickets).forEach((key) => {
    sortedTickets[key] = sortTickets(groupedTickets[key], sortBy);
  });

  return (
    <div className="App">
      <header>
        <div className="controls">
          <div className="dropdown" onClick={() => setDropdown(!dropdown)}>
            <img src={display} alt="Display" />
            <div>Display</div>
            <img
              src={arrow}
              alt="Arrow"
              className={`arrow ${dropdown ? "up" : "down"}`}
            />
          </div>
          {dropdown && (
            <div className="dropdown-content">
              <div className="dropdown-item">
                Grouping
                <select
                  value={groupBy}
                  onChange={(e) => {
                    setGroupBy(e.target.value);
                    localStorage.setItem("groupBy", e.target.value);
                    setDropdown(false);
                  }}
                >
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-item">
                Ordering
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    localStorage.setItem("sortBy", e.target.value);
                    setDropdown(false);
                  }}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>
      <Board
        tickets={sortedTickets}
        getUserAvailability={(userId) => getUserAvailability(userId, users)}
      />
    </div>
  );
}

export default App;
