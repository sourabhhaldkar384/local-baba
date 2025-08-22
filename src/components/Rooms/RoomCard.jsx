import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{room.name}</h3>
      <p>Price: ₹{room.price}</p>
      <Link to={`/rooms/${room.id}`}>View Details</Link>
    </div>
  );
};

export default RoomCard;
