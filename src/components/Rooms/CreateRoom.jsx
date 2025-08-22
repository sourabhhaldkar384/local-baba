import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateRoom = ({ onRoomCreated }) => {
  const [roomName, setRoomName] = useState("");
  const [rent, setRent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        rent: Number(rent),
        createdAt: serverTimestamp(),
      });
      onRoomCreated({ id: docRef.id, name: roomName, rent: Number(rent) });
      setRoomName("");
      setRent("");
    } catch (err) {
      alert("Error creating room");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleCreateRoom}>
      <input
        type="text"
        placeholder="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Rent"
        value={rent}
        onChange={(e) => setRent(e.target.value)}
        required
      />
      <button type="submit">{loading ? "Creating..." : "Create Room"}</button>
    </form>
  );
};

export default CreateRoom;
