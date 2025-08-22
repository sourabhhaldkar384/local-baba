import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      const docRef = doc(db, "rooms", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRoom(docSnap.data());
      } else {
        console.log("No such room!");
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <div>
      <h2>{room.name}</h2>
      <p>Price: ₹{room.price}</p>
      <p>Created At: {room.createdAt?.toDate().toString()}</p>
      {/* Yahan aage chat component add karenge */}
    </div>
  );
};

export default RoomDetail;
