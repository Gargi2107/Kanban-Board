import React from "react";
import "./Card.css";
import highPriorityIcon from "../assets/Img - High Priority.svg";
import mediumPriorityIcon from "../assets/Img - Medium Priority.svg";
import lowPriorityIcon from "../assets/Img - Low Priority.svg";
import urgentPriorityIcon from "../assets/SVG - Urgent Priority grey.svg";
import noPriorityIcon from "../assets/No-priority.svg";

const Card = ({ id, title, priority, user, status }) => {
  const determinePriorityIcon = () => {
    switch (priority) {
      case 1:
        return lowPriorityIcon;
      case 2:
        return mediumPriorityIcon;
      case 3:
        return highPriorityIcon;
      case 4:
        return urgentPriorityIcon;
      default:
        return noPriorityIcon;
    }
  };

  return (
    <div className="card">
      <p>{id}</p>
      <div>{title}</div>
      <div className="want">
        <img
          src={determinePriorityIcon()}
          alt="Priority level"
          className="priority-badge"
        />
        <div className="feature-request">Feature Request</div>
      </div>

    </div>
  );
};

export default Card;
