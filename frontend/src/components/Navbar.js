import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Overlay, Popover, Button } from 'react-bootstrap';
import styles from './Navbar.module.css';
import { FaBars, FaTrophy, FaSignOutAlt } from 'react-icons/fa';
import AchievementsDropdown from './../components/notification/AchievementsDropdown';

// Assuming these components exist in the same folder
import Logone from './Logone';
import NotificationDropdown from './notification/NotificationDropdown';

const Navbar = ({ toggleSidebar }) => {
  // --- Logic from your new component ---
  const [showProducts, setShowProducts] = useState(false);
  const productsRef = useRef(null);

  const handleLogout = () => {
    // Clear user token from storage
    localStorage.removeItem("token");
    // Redirect to the login/home page
    window.location.href = "/";
  };

  return (
    <header className={styles.navbar}>
      {/* --- Left Section (with our mobile toggle) --- */}
      <div className={styles.leftSection}>
        <div className={styles.menuIcon} onClick={toggleSidebar}>
          <FaBars />
        </div>
        <Link to="/dashboard" className={styles.logo}>
          <Logone />
        </Link>
        
        {/* Products Popover */}
        <div
          ref={productsRef}
          className={styles.navLink}
          onClick={() => setShowProducts(!showProducts)}
        >
          Products
        </div>

        <Overlay
          target={productsRef.current}
          show={showProducts}
          placement="bottom-start"
          rootClose
          onHide={() => setShowProducts(false)}
        >
          <Popover id="products-popover" className={styles.productsPopover}>
            <Popover.Body>
              <ul className={styles.popoverList}>
                <li>
                  <a href="https://stoicsalamander.com/#" className={styles.productLink}>
                    <span className={styles.itemTitle}>Stack Overflow for Teams</span>
                    <span className={styles.itemDesc}>Where developers share private knowledge.</span>
                  </a>
                </li>
                <li>
                  <a href="https://stoicsalamander.com/#" className={styles.productLink}>
                    <span className={styles.itemTitle}>Advertising</span>
                    <span className={styles.itemDesc}>Reach developers worldwide.</span>
                  </a>
                </li>
              </ul>
            </Popover.Body>
          </Popover>
        </Overlay>
      </div>

      {/* --- Search Container --- */}
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Search..." />
      </div>

      {/* --- Right Section (with new functionality) --- */}
      <div className={styles.rightSection}>
        <NotificationDropdown />
        <div className={styles.icon}><AchievementsDropdown/></div>
        <Link to="/profile" className={styles.icon}>
          {/* You can use a profile icon here if you like */}
          <i className="bi bi-person-circle fs-4"></i>
        </Link>
        <Button 
          variant="outline-primary" 
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;