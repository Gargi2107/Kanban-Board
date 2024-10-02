import React from "react";
import Card from "./Card";
import "./KanbanBoard.css";
import addIcon from "../assets/add.svg";
import menuIcon from "../assets/3 dot menu.svg";
import noPriorityIcon from "../assets/No-priority.svg";
import highPriorityIcon from "../assets/Img - High Priority.svg";
import mediumPriorityIcon from "../assets/Img - Medium Priority.svg";
import lowPriorityIcon from "../assets/Img - Low Priority.svg";
import urgentPriorityIcon from "../assets/SVG - Urgent Priority colour.svg";
import todoIcon from "../assets/To-do.svg";
import inProgressIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import backlogIcon from "../assets/Backlog.svg";
import cancelledIcon from "../assets/Cancelled.svg";

const Board = ({ tickets }) => {
    console.log("Current Tickets:", tickets);

    const retrieveIcon = (group) => {
        let icon;
        switch (group) {
            case "Todo":
                icon = todoIcon;
                break;
            case "In progress":
                icon = inProgressIcon;
                break;
            case "Done":
                icon = doneIcon;
                break;
            case "Backlog":
                icon = backlogIcon;
                break;
            case "No Priority":
                icon = noPriorityIcon;
                break;
            case "Low":
                icon = lowPriorityIcon;
                break;
            case "Medium":
                icon = mediumPriorityIcon;
                break;
            case "High":
                icon = highPriorityIcon;
                break;
            case "Urgent":
                icon = urgentPriorityIcon;
                break;
            case "Cancelled":
                icon = cancelledIcon;
                break;
            default:
                icon = inProgressIcon;
                break;
        }
        return icon;
    };

    return (
        <div className="board">
            {Object.keys(tickets).map((groupName) => (
                <div className="column" key={groupName}>
                    <div className="head">
                        <div className="heading">
                            <img
                                src={retrieveIcon(groupName)}
                                alt={`${groupName} icon`}
                                className="group-icon"
                            />
                            <div>{groupName}</div>
                            <div className="ticket-count">
                                {tickets[groupName].length}
                            </div>
                        </div>
                        <div className="menu">
                            <img src={addIcon} alt="Add new" />
                            <img src={menuIcon} alt="Menu options" />
                        </div>
                    </div>
                    {tickets[groupName].map((ticket) => (
                        <Card key={ticket.id} {...ticket} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
