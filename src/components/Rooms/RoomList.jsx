import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomsData); // real-time update
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {rooms.length === 0 ? (
        <p>No rooms available</p>
      ) : (
        rooms.map((room) => (
          <div
            key={room.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "10px",
              background: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{room.name}</h3>
            <p>Rent: ₹{room.rent}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RoomList;
