import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const { isSidebarVisible } = useSidebar();
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  const [isVisualizationOpen, setIsVisualizationOpen] = useState(false);

  const handleMouseEnter = () => {
    if (!isSidebarVisible) {
      document.querySelectorAll("#sidebar .divider").forEach((item) => {
        item.textContent = item.dataset.text;
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isSidebarVisible) {
      document.querySelectorAll("#sidebar .divider").forEach((item) => {
        item.textContent = "-";
      });
    }
  };

  return (
    <section
      id="sidebar"
      className={`sidebar ${!isSidebarVisible ? "hide" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to="#" className="brand">
        <i className="bx bx-droplet icon"></i> WaterMs
      </Link>

      <ul className="side-menu">
        <li>
          <Link
            to="/dashboard"
            className={`side-link ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <i className="bx bx-grid-alt icon"></i> Dashboard
          </Link>
          {!isSidebarVisible && (
            <li className="divider" id="dividerElement" data-text="Main">
              -
            </li>
          )}
          {isSidebarVisible && (
            <li className="divider" data-text="Main" id="dividerElement">
              Main
            </li>
          )}
          <li>
            <Link
              to="/users"
              className={`side-link ${
                location.pathname === "/users" ? "active" : ""
              }`}
            >
              <i className="bx bx-group icon"></i> Users
            </Link>
          </li>
          <li>
            <div
              className={`side-link ${isVisualizationOpen ? "active" : ""}`}
              onClick={() => setIsVisualizationOpen(!isVisualizationOpen)}
            >
              <i className="bx bx-bar-chart-alt-2 icon"></i> Visualization
              <i className="bx bx-chevron-right icon-right"></i>
            </div>
            {isVisualizationOpen && (
              <ul className="side-dropdown show">
                <li>
                  <Link
                    to="/visualization/building"
                    className={`side-link drop-link ${
                      location.pathname === "/visualization/building"
                        ? "active"
                        : ""
                    }`}
                  >
                    Building
                  </Link>
                </li>
                <li>
                  <Link
                    to="/visualization/weekly"
                    className={`side-link drop-link ${
                      location.pathname === "/visualization/weekly"
                        ? "active"
                        : ""
                    }`}
                  >
                    Weekly
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="#" className="side-link">
              <i className="bx bx-pulse icon"></i> Billing
            </Link>
          </li>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
