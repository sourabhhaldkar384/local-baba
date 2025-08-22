import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomRent, setNewRoomRent] = useState("");
  const navigate = useNavigate();

  // Save Profile
  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { fullName, email }, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile. Check console.");
    }
  };

  // Auth + rooms listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return navigate("/");
      setUser(currentUser);
    });

    const unsubscribeRooms = onSnapshot(collection(db, "rooms"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRooms(data);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeRooms();
    };
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // Create Room
  const handleCreateRoom = async () => {
    if (!newRoomName || !newRoomRent) return alert("Please fill all fields");
    try {
      await addDoc(collection(db, "rooms"), {
        name: newRoomName.trim(),
        rent: Number(newRoomRent),
        description: "Newly added room",
        createdBy: user?.uid,
        createdAt: Date.now(),
      });
      setNewRoomName("");
      setNewRoomRent("");
    } catch (error) {
      console.error(error);
      alert("Failed to create room");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="dashboard-sidebar">
          <h2 className="sidebar-title">Local Baba</h2>
          <nav>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("dashboard")}
            >
              Dashboard
            </button>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("rooms")}
            >
              My Rooms
            </button>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("profile")}
            >
              Profile
            </button>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("notifications")}
            >
              Notifications
            </button>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("billing")}
            >
              Billing
            </button>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("settings")}
            >
              Settings
            </button>
            <button
              className="sidebar-link"
              onClick={() => setActivePage("support")}
            >
              Support
            </button>
            <button className="sidebar-link" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="dashboard-main">
        <div className="dashboard-navbar">
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <span>Welcome, {user?.email || "User"}</span>
        </div>

        {/* Pages */}
        {activePage === "dashboard" && (
          <section className="dashboard-section">
            <h2>Available Rooms</h2>
            <div className="room-grid">
              {rooms.length ? (
                rooms.map((room) => (
                  <div className="room-card" key={room.id}>
                    <h4>{room.name}</h4>
                    <p>{room.description}</p>
                    <p>Rent: ₹{room.rent}</p>
                    <small>Created by: {room.createdBy}</small>
                  </div>
                ))
              ) : (
                <p>No rooms available yet.</p>
              )}
            </div>
          </section>
        )}

        {activePage === "rooms" && (
          <section className="dashboard-section">
            <h2>My Rooms</h2>
            <div className="room-grid">
              {rooms.length ? (
                rooms.map((room) => (
                  <div className="room-card" key={room.id}>
                    <h4>{room.name}</h4>
                    <p>Rent: ₹{room.rent}</p>
                    <p>{room.description}</p>
                    <small>Created by: {room.createdBy}</small>
                  </div>
                ))
              ) : (
                <p>No rooms created yet.</p>
              )}
            </div>
            <div className="room-card">
              <h4>Create a New Room</h4>
              <input
                type="text"
                placeholder="Room Name"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="login-input"
              />
              <input
                type="number"
                placeholder="Rent"
                value={newRoomRent}
                onChange={(e) => setNewRoomRent(e.target.value)}
                className="login-input"
              />
              <button onClick={handleCreateRoom}>Create Room</button>
            </div>
          </section>
        )}

        {activePage === "profile" && (
          <section className="dashboard-section">
            <h2>My Profile</h2>
            <div className="room-card">
              <h4>User Information</h4>
              <p>Name: Test User</p>
              <p>Email: {user?.email}</p>
            </div>
          </section>
        )}

        {activePage === "settings" && (
          <section className="dashboard-section">
            <h2>Profile Settings</h2>
            <div className="room-card">
              <h4>Update Profile</h4>
              <input
                type="text"
                placeholder="Full Name"
                className="login-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Change Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </section>
        )}

        {activePage === "notifications" && (
          <section className="dashboard-section">
            <h2>Notifications</h2>
            <div className="room-card">
              <p>No notifications yet.</p>
            </div>
          </section>
        )}

        {activePage === "billing" && (
          <section className="dashboard-section">
            <h2>Billing / Payments</h2>
            <div className="room-card">
              <p>No payment history available.</p>
            </div>
          </section>
        )}

        {activePage === "support" && (
          <section className="dashboard-section">
            <h2>Support</h2>
            <div className="room-card">
              <input
                type="text"
                placeholder="Your Issue"
                className="login-input"
              />
              <textarea
                placeholder="Describe your problem"
                className="login-input"
              ></textarea>
              <button>Submit</button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
