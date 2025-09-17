// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext"; // your auth context
import { useNavigate } from "react-router-dom";

// ✅ move animation configs BEFORE usage
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

export default function Register() {
  const { currentUser } = useAuth(); // or isAuthenticated
  const navigate = useNavigate();

  // example form state
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([{ name: "", email: "" }]);

  // protect route: redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleAddMember = () => {
    setMembers([...members, { name: "", email: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit form logic here
  };

  return (
    <motion.div
      className="register-page-container"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 className="register-title">Register Your Team</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </label>

        <h3>Team Members</h3>
        {members.map((m, i) => (
          <div key={i} className="member-inputs">
            <input
              type="text"
              placeholder="Member Name"
              value={m.name}
              onChange={(e) =>
                handleMemberChange(i, "name", e.target.value)
              }
              required
            />
            <input
              type="email"
              placeholder="Member Email"
              value={m.email}
              onChange={(e) =>
                handleMemberChange(i, "email", e.target.value)
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMember}>
          + Add Member
        </button>

        <button type="submit">Submit Registration</button>
      </form>
    </motion.div>
  );
}
