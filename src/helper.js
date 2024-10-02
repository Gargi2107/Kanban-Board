export const fetchTicketsAndUsers = (setTickets, setUsers) => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        if (data.tickets && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error("Expected tickets array but got:", data);
        }
  
        if (data.users && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Expected users array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  
  export const getUserName = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };
  
  export const getUserAvailability = (userId, users) => {
    const user = users.find((user) => user.id === userId);
    return user ? (user.available ? "Available" : "Unavailable") : "Unknown";
  };
  
  export const groupTickets = (tickets, groupBy, getUserName, users) => {
    if (groupBy === "status") {
      return groupByStatus(tickets);
    } else if (groupBy === "user") {
      return groupByUser(tickets, getUserName, users);
    } else {
      return groupByPriority(tickets);
    }
  };
  
  const groupByStatus = (tickets) => {
    const groupedTickets = {
      Backlog: [],
      Todo: [],
      "In progress": [],
      Done: [],
      Cancelled: [],
    };
  
    tickets.forEach((ticket) => {
      let statusLabel;
      switch (ticket.status) {
        case "Backlog":
          statusLabel = "Backlog";
          break;
        case "Todo":
          statusLabel = "Todo";
          break;
        case "In progress":
          statusLabel = "In progress";
          break;
        case "Done":
          statusLabel = "Done";
          break;
        case "Cancelled":
          statusLabel = "Cancelled";
          break;
        default:
          statusLabel = "Backlog";
          break;
      }
      groupedTickets[statusLabel].push(ticket);
    });
  
    return groupedTickets;
  };
  
  const groupByUser = (tickets, getUserName, users) => {
    return tickets.reduce((acc, ticket) => {
      const userName = getUserName(ticket.userId, users);
      if (!acc[userName]) acc[userName] = [];
      acc[userName].push(ticket);
      return acc;
    }, {});
  };
  
  const groupByPriority = (tickets) => {
    const groupedTickets = {
      "No Priority": [],
      Urgent: [],
      High: [],
      Medium: [],
      Low: [],
    };
  
    tickets.forEach((ticket) => {
      let priorityLabel;
      switch (ticket.priority) {
        case 0:
          priorityLabel = "No Priority";
          break;
        case 1:
          priorityLabel = "Low";
          break;
        case 2:
          priorityLabel = "Medium";
          break;
        case 3:
          priorityLabel = "High";
          break;
        case 4:
          priorityLabel = "Urgent";
          break;
        default:
          priorityLabel = "No Priority";
          break;
      }
      groupedTickets[priorityLabel].push(ticket);
    });
  
    return groupedTickets;
  };
  
  export const sortTickets = (tickets, sortBy) => {
    if (sortBy === "priority") {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === "title") {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };
  