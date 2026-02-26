# Growth Farm Homepage: Detailed Design & UX

This document provides a detailed breakdown of the design, user experience (UX), and functionality for the new Growth Farm homepage, which is centered on team health, strategic priorities, and celebrations.

---

## 1. Core Philosophy: Team First

The homepage is intentionally designed to shift the primary focus from purely operational metrics to the wellbeing and alignment of the executive team. The underlying principle is that a healthy, motivated, and aligned team is the single most critical driver of company success. By placing these elements front and center, the application reinforces a culture that values its people as much as its performance.

---

## 2. Layout & Components

The homepage will be a single, non-scrolling view on desktop, composed of four main quadrants designed for at-a-glance comprehension.

### **2.1. Header**

- **Greeting:** A dynamic, time-sensitive greeting (e.g., "Good Morning," "Good Afternoon"). It will address the team collectively: "GOOD MORNING, GROWTH FARM EXCO."
- **Date:** The current date will be displayed prominently (e.g., "Wednesday, 29 January 2026").

### **2.2. Team Health Pulse**

This component provides a real-time snapshot of the team's morale and capacity.

- **Overall Score:** A large, prominent display of the average team health score, including a trend indicator showing the change from the previous week (e.g., "Overall: 78% ▲ 5% from last week"). This provides an immediate, high-level summary.

- **Individual Breakdowns:** A horizontally scrollable list of team members. Each member's card will display:
    - **Name:** The team member's first name.
    - **Health Score:** Their latest self-reported score (e.g., 85%).
    - **Emoji Indicator:** A visual representation of their score (e.g., 😊 for >80%, 😐 for 60-80%, 😕 for <60%).
    - **Energy Level:** A self-reported status of "High," "Med," or "Low."

- **Quick Check-in:** A simple, low-friction input for the logged-in user to update their own status. The interaction will be designed for speed:
    - **UX:** A prompt "How are you feeling today?" followed by three emoji buttons (😊, 😐, 😕). Clicking an emoji instantly submits the user's health score for the day. This removes the need for forms or sliders, encouraging daily participation.

### **2.3. This Week's Priorities**

This component drives focus and accountability by highlighting the most critical tasks for the current week.

- **Header:** Clearly states the context, such as "🎯 THIS WEEK'S PRIORITIES (Week 5, 2026)."

- **Priority List:** A list of the top 3-5 most important priorities. Each list item will be structured for clarity:
    - **Description:** A concise summary of the task (e.g., "Close Vodacom deal").
    - **Ownership:** The initials or avatar of the team member(s) responsible.
    - **Status/Context:** A brief note on the current state (e.g., "Status: Negotiation → Contracting").
    - **Due Date:** The target completion date, with overdue items automatically highlighted in red (e.g., "Due: Friday, 31 Jan").

- **Interaction:**
    - **Add Priority:** A `[+ Add Priority]` button will open a modal form. The form will require a description, owner, and due date. It will also allow linking the priority to a specific Annual Goal to ensure alignment.
    - **Mark as Complete:** A checkbox or similar control will allow the owner to mark a priority as done, which will visually strike through the item and move it to a "Completed" section or fade it out.

### **2.4. Celebrations & Wins**

This component is dedicated to building a positive and appreciative culture by creating a space to acknowledge successes.

- **Feed:** A chronological, scrollable feed of recent positive events.
- **Celebration Cards:** Each card in the feed will contain:
    - **Icon/Emoji:** A relevant icon to denote the type of celebration (e.g., 🏆 for a deal, 🎂 for a birthday, ⭐ for a project milestone).
    - **Title:** A clear and celebratory message (e.g., "Gates Foundation deal closed! (R1.2M)").
    - **Attribution:** Acknowledgment of the people involved (e.g., "Congrats Zinhle & Thabo! 🎊").
    - **Date:** The date of the event.

- **Interaction:**
    - **Add Celebration:** A `[+ Add Celebration]` button will open a simple modal where any team member can add a new win. The form will include fields for a title, a short description, and the ability to tag team members.

### **2.5. Quick Snapshot**

This component provides a condensed summary of the main operational dashboard, offering a quick link to more detailed views.

- **Layout:** A compact, grid-based layout with 4-5 key metrics.
- **Metric Cells:** Each cell will represent a core business area (e.g., Revenue, Pipeline, Ventures, Clients) and display:
    - **Metric Name:** The title of the business area.
    - **Key Figure:** The single most important number (e.g., "R1.8M," "R2.1M").
    - **Status Indicator:** A color-coded status and/or percentage to provide immediate context (e.g., "90% ✓," "1 Risk").

- **Interaction:** Clicking on any cell will navigate the user directly to the corresponding detailed view within the main Dashboard or Pipelines section of the application.

---

## 3. Mobile Responsiveness

For mobile devices, the layout will adapt from a multi-column grid to a single-column, scrollable feed to ensure optimal usability on smaller screens.

- **Order of Appearance:** The components will be stacked vertically in order of importance: 
    1. Team Health Pulse
    2. This Week's Priorities
    3. Celebrations & Wins
    4. Quick Snapshot
- **Navigation:** The primary navigation will be a bottom tab bar, as outlined in the main architecture document.
- **Touch Optimization:** All interactive elements, such as buttons and list items, will have a minimum touch target size of 44x44 pixels to prevent mis-taps.

---

## 4. Next Steps

With this detailed design, the next step is to move into the implementation phase. I will begin by initializing the web project and scaffolding the basic structure, then proceed to build out these homepage components with the specified functionality and user experience.
