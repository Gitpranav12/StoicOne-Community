import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

export default function AchievementsDropdown() {
    const [achievements, setAchievements] = useState([
        { id: 1, text: "You’ve earned the <b>React</b> tag badge.", date: "2025-09-15", points: null, read: false },
        { id: 2, text: "Working with Git stash with different branches.", date: "2025-09-14", points: "+10", read: false },
        { id: 3, text: "Postgres LIMIT/OFFSET strange behaviour.", date: "2025-09-14", points: "+10", read: false },
        { id: 4, text: "SELECT list is not in GROUP BY clause…", date: "2025-09-13", points: "+10", read: false },
    ]);

    // Utility: format dates into Today / Yesterday / YYYY-MM-DD
    const formatDateLabel = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";

        // fallback: show as YYYY-MM-DD
        return date.toLocaleDateString("en-CA");
    };


    // Group by date
    const grouped = achievements.reduce((acc, ach) => {
        if (!ach.read) {
            acc[ach.date] = acc[ach.date] || [];
            acc[ach.date].push(ach);
        }
        return acc;
    }, {});

    // Mark all as read
    const markAllAsRead = () => {
        setAchievements((prev) => prev.map((a) => ({ ...a, read: true })));
    };

    // Unread count for trophy badge
    const unreadCount = achievements.filter((a) => !a.read).length;

    return (
        <Dropdown align="end">
            {/* Trophy Icon */}
            <Dropdown.Toggle
                as="div"
                id="dropdown-achievements"
                className="border-0 bg-transparent position-relative dropdown-toggle"
                style={{ cursor: "pointer" }}
            >
                <i className="bi bi-trophy fs-5"></i>
                {unreadCount > 0 && (
                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                        style={{
                            fontSize: "12px",
                            minWidth: "20px",
                            height: "20px",
                            lineHeight: "14px",
                            textAlign: "center",
                        }}
                    >
                        {unreadCount}
                    </span>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu
                // style={{
                //     width: "420px",
                //     border: "1px solid #ddd",
                //     borderRadius: "4px",
                //     padding: 0,
                // }}
                style={{
                    width: "420px",
                    borderRadius: "8px",       // smoother corners
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.15)", // ⭐ Added elevation
                    border: "none",            // remove thin border
                    padding: 0,
                }}
            >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light small">
                    {/* Left: Title */}
                    <span className="fw-bold">ACHIEVEMENTS</span>

                    {/* Right: Links + Button */}
                    <div className="d-flex align-items-center gap-3">
                        <a href="/profile/achievements" className="text-primary">badges</a>

                        {unreadCount > 0 && (
                            <button
                                className="btn btn-sm btn-outline-primary"
                                style={{ fontSize: "12px", padding: "2px 8px" }}
                                onClick={markAllAsRead}
                            >
                                Mark as Read
                            </button>
                        )}
                    </div>
                </div>


                {/* Achievements List */}
                <div style={{ maxHeight: "320px", overflowY: "auto" }}>
                    {Object.keys(grouped).map((day) => (
                        <div key={day}>


                            {/* Day label */}
                            <div className="px-3 py-2 fw-bold small bg-white">
                                {formatDateLabel(day)}
                                {grouped[day].some((a) => a.points) && (
                                    <span className="text-success ms-2">
                                        +
                                        {grouped[day].reduce(
                                            (sum, a) => sum + (parseInt(a.points) || 0),
                                            0
                                        )}
                                    </span>
                                )}
                            </div>


                            {/* Achievements */}
                            {grouped[day].map((a) => (
                                <div
                                    key={a.id}
                                    className="px-3 py-2 d-flex align-items-start"
                                    style={{ fontSize: "14px" }}
                                >
                                    <i
                                        className="bi bi-award text-warning me-2"
                                        style={{ fontSize: "16px" }}
                                    ></i>
                                    <div className="flex-grow-1">
                                        {a.points && (
                                            <span className="text-success fw-bold me-2">
                                                {a.points}
                                            </span>
                                        )}
                                        <span
                                            dangerouslySetInnerHTML={{ __html: a.text }}
                                            className="text-dark"
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {unreadCount === 0 && (
                    <div className="px-3 py-4 text-center text-muted small">
                        You have no new achievements.
                    </div>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}
