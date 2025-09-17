import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './Sidebar.module.css';

// 1. Import the new icons from lucide-react
import { Home, Search, Tag, Bot, FileText, Users, UserCog, ShieldCheck } from "lucide-react";

// 2. Define the navigation links in an array to make them easy to manage
const menuItems = [
  { to: "/dashboard", label: "Home", icon: <Home size={20} /> },
  { to: "/questions", label: "Questions", icon: <Search size={20} /> },
  { to: "/tags", label: "Tags", icon: <Tag size={20} /> },
  { to: "/AiAssistant", label: "AI Assistant", icon: <Bot size={20} /> },
  { to: "/articles", label: "Articles", icon: <FileText size={20} /> },
  { to: "/user", label: "Users", icon: <Users size={20} /> },
  { to: "/moderator", label: "Moderator", icon: <ShieldCheck size={20} /> },
  { to: "/admin", label: "Admin", icon: <UserCog size={20} />},
];

const Sidebar = ({ isOpen }) => {
  // 3. Get the current URL location to highlight the active link
  const location = useLocation();

  return (
    // 4. We keep the original responsive wrapper div
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <nav className={styles.nav}>
        {/* 5. We map over the array to dynamically create the links */}
        {menuItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            // The 'active' class is added if the link matches the current URL
            className={`${styles.navLink} ${location.pathname === item.to ? styles.active : ""}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className={styles.collectives}>
        <p>COLLECTIVES</p>
        <Link to="/collectives" className={styles.navLink}>
          Explore all Collectives
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;