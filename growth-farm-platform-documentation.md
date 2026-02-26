# Growth Farm Operating System - Platform Documentation

**Version:** 16ed3fa2  
**Last Updated:** February 2, 2026  
**Author:** Manus AI  
**Purpose:** Comprehensive documentation of all platform functionality for LLM analysis

---

## Executive Summary

Growth Farm Operating System is a web-based goal management and team performance platform designed to help Growth Farm achieve its mission of becoming the largest African venture capital firm that ideates and incubates its own ideas. The platform integrates strategic planning, weekly activity tracking, monthly KPI monitoring, and team health management into a unified system accessible on desktop and mobile devices.

**Core Value Proposition:** Enable the Growth Farm team to achieve company goals through structured weekly planning, automated KPI tracking, and collaborative accountability mechanisms.

**Target Users:** Growth Farm leadership team (CEO, CFO, COO, CTO) and extended team members

---

## Platform Architecture

### Technology Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Wouter for client-side routing
- tRPC 11 for type-safe API calls
- shadcn/ui component library

**Backend:**
- Express 4 server
- tRPC for API layer
- Drizzle ORM for database operations
- MySQL/TiDB database

**Authentication:**
- Manus OAuth integration
- Session-based authentication with JWT
- Role-based access control (admin/user roles)

**Hosting:**
- Manus built-in hosting
- Custom domain support
- S3 storage for file uploads

---

## User Roles and Access Control

### Role Types

**Admin Role:**
- Full access to all features
- Can manage team members (invite, remove)
- Can configure strategic objectives and KPIs
- Can view all users' data

**User Role:**
- Access to personal dashboard and weekly planning
- Can view team health and celebrations
- Can update own activities and priorities
- Cannot modify strategic objectives or invite users

### Access Restrictions

The platform implements email-based access control. Only users whose email addresses have been added to the system by an administrator can log in. Unauthorized login attempts display an "Access Denied" page with instructions to contact the administrator.

---

## Core Features and Functionality

### 1. Home Page (Dashboard)

**Purpose:** Provide at-a-glance view of team health, individual priorities, and recent celebrations

**Key Components:**

**Team Health Pulse**
- Displays overall team health percentage (calculated from individual mood scores)
- Shows week-over-week change indicator
- Individual team member cards showing:
  - Name and avatar (initials in colored circle)
  - Current mood percentage (64%, 75%, etc.)
  - Mood status indicator (Steady, Struggling, etc.)
  - This week's priorities (top 3 activities)
  - Support needs (e.g., "CEO support scheduled")
  - Partner/Helper assignments (indicated by icons)

**Mood Calculation Logic:**
- Users check in weekly with mood score
- System calculates average across all team members
- Tracks trend from previous week
- Color-coded status: Green (Steady), Yellow (Needs Check-in), Red (Struggling)

**Celebrations Feed**
- Empty state by default (dummy data cleared)
- Designed to show team wins, deal closures, milestone achievements
- Builds team morale and tracks progress

**Navigation:**
- Top navigation bar with links to all major sections
- User profile indicator in top-right corner (avatar + first name)
- Dropdown menu with Profile Settings and Logout options

---

### 2. Weekly Planning Page

**Purpose:** Enable team members to plan and track weekly activities with accountability partners

**Key Features:**

**Activity Management**
- Create, edit, delete weekly activities
- Fields per activity:
  - Activity description (text)
  - Due day (Monday-Sunday dropdown)
  - Dependency (what this activity depends on)
  - Assigned partner (dropdown of team members)
  - Partner role (Partner or Helper)
  - Monthly goal linkage (optional KPI connection)
  - Status (Pending, Done, Delayed, Deprioritised)
  - Priority flag (mark top 3 priorities)

**Partner/Helper Assignment System**
- **Partner Role:** Activity appears in partner's weekly as "Encourage [Creator] to [activity description]"
- **Helper Role:** Activity appears in helper's weekly as "Call [Creator] to find out help needed with [activity description]"
- Assigned activities display in different highlight color (indigo)
- Assigned users can view but not edit activities (read-only)
- Only original creator can modify assigned activities

**View Modes**
- **View Mode:** Clean table view of all activities for the week
- **Edit Mode:** Inline editing with dropdowns and text inputs
- Toggle between modes via pencil icon
- "Save All" button commits all changes at once

**Week Navigation**
- Previous/Next week buttons
- Current week indicator
- ISO week number tracking

**Activity Filtering**
- Filter by status (All, Pending, Done, Delayed, Deprioritised)
- Filter by assigned partner
- Filter by monthly goal

---

### 3. Mobile Quick-Add ("Shesha" Button)

**Purpose:** Enable rapid activity creation on mobile devices

**Key Features:**

**Floating Action Button**
- Pink circular button with "shesha" text
- Fixed position at bottom-right corner
- Only visible on mobile devices (hidden on desktop)
- Matches Growth Farm brand color (same pink as logo "F")

**Quick-Add Dialog**
- Popup form with minimal fields:
  - Activity name (text input)
  - Due day (dropdown: Monday-Sunday)
  - Assigned partner (optional dropdown)
  - Partner role (dropdown: Partner or Helper, only shown if partner selected)
- Auto-populates remaining fields with defaults:
  - Status: Pending
  - Current week
  - No monthly goal linkage (can be added later via full edit)

**User Flow:**
1. Tap "shesha" button
2. Enter activity name and due day
3. Optionally assign partner and role
4. Tap Save
5. Activity appears in user's Weekly page
6. If partner assigned, activity also appears in partner's Weekly page

---

### 4. Monthly KPI Tracking Page

**Purpose:** Monitor progress toward annual KPIs with monthly granularity and status indicators

**Key Features:**

**Spreadsheet Layout**
- Grouped by strategic objective (5 sections with color-coded backgrounds)
- Year indicator in top-left corner (2026)
- Compact design fits all KPIs on single laptop screen (1920x1080)

**Table Columns:**
- KPI Name
- Owner
- Unit (pink text with short forms: ZAR, #, %)
- Status indicator (OK/Check/Save)
- 12 monthly progress circles (Jan-Dec)
- YTD (Year-to-Date) circle (larger than monthly)

**Progress Circles**
- **Monthly Circles:** 32px diameter, gray background
  - Display target value inside (formatted: 1.5M, 33.3K, 100%)
  - Dark fill indicates progress percentage
  - Clickable for current month and previous month only
- **YTD Circle:** 44px diameter
  - Shows cumulative progress toward annual target
  - Not editable (auto-calculated from monthly actuals)

**Status Indicators**
- **Green (OK):** KPI has linked weekly activities in past 2 weeks
- **Amber (Check):** KPI has linked activities in past 4 weeks but not in last 2 weeks
- **Red (Save):** No linked activities for 4+ weeks
- Auto-calculated based on weekly activity linkage

**Inline Editing**
- Click on current or previous month circle to edit actual value
- Popup dialog shows:
  - KPI name and month
  - Number input field
  - Unit of measure (pre-filled from KPI)
  - Save button
- Future months are locked (not editable)
- System updates progress circle and YTD immediately after save

**Excel Export**
- "Export to Excel" button in top-right corner
- Downloads CSV file with all KPI data
- Includes: Objective, KPI, Owner, Unit, Target, Jan-Dec actuals, YTD
- Useful for offline analysis and reporting

**Value Formatting**
- Large numbers display with M (millions) or K (thousands) suffix
- Currency values show ZAR prefix
- Percentages show % suffix
- Counts show # symbol

---

### 5. Annual Goals (Settings Page)

**Purpose:** Configure strategic objectives, KPIs, and monthly targets

**Key Features:**

**Strategic Objectives Management**
- Add, edit, delete strategic objectives
- Fields per objective:
  - Name (e.g., "Community Growth")
  - Weight (percentage, must total 100%)
  - Icon (default: Target)
  - Color scheme (text and background colors)
  - Display order
- Total weight indicator shows warning if not 100%

**KPI Configuration**
- Add, edit, delete KPIs under each objective
- Fields per KPI:
  - Goal name
  - Owner (dropdown of team members)
  - Target value (annual)
  - Target unit (ZAR, #, %, days, etc.)
  - Strategic objective (parent objective)

**Monthly Targets**
- Set monthly target values for each KPI
- Inline editing of targets per month
- Auto-populate feature (distribute annual target evenly across 12 months)
- Manual override for seasonal variations

**Team Member Management**
- Invite new team members by email
- Assign job titles
- Remove team members
- View list of all active users

**Current Strategic Objectives (5 total):**

1. **Community Growth (30% weight)**
   - 3 IBM Sized Clients (New) - R15M target
   - Client Proposal Presentations/Meetings - 40 target
   - Reach and Relevance (Conferences, Articles, Newsletters) - 20 target
   - Client Reference Letters - 5 target

2. **Impact Delivery (30% weight)**
   - On-Time Project Delivery - 100% target
   - Project Documentation - 100% target
   - Project Margin - 20% target

3. **New Frontiers (15% weight)**
   - Ventures Generating Revenue - 2 target
   - Burn Rate to First Revenue - R400K target

4. **Purpose & Platform (15% weight)**
   - Admin Set-Up and Compliance - 100% target
   - Compelling Non-Remuneration Staff Value Proposition - 80% target
   - IT Build, Run & Operations - 100% target
   - Robust Contract Management - 100% target

5. **Stewardship (10% weight)**
   - Cash and Cash Equivalents - R1M target
   - Grant Funding (Cash and Kind) - R2M target
   - Overdue Tax Liability Reduction - R0 target
   - Payment Turn Around Time From Timesheet - 15 days target

---

### 6. User Authentication and Onboarding

**Authentication Flow:**

1. **Login:** User clicks login button, redirected to Manus OAuth portal
2. **Email Verification:** System checks if user's email exists in invited users list
3. **Access Control:**
   - If email found: Proceed to onboarding (first-time) or home page (returning user)
   - If email not found: Show "Access Denied" page
4. **Account Linking:** If invited user logs in for first time, system links their OAuth account to invited user record (prevents duplicates)

**Onboarding Flow (First-Time Users):**

1. **Welcome Screen:** Brief introduction to Growth Farm
2. **Onboarding Form:**
   - Job title input
   - Initial mood check-in (percentage slider)
   - Weekly priorities input (top 3 activities)
3. **Completion:** "Let's Go" button redirects to home page
4. **Data Persistence:** Onboarding data saves to user profile and weekly priorities table

**Session Management:**
- Session cookie stored in browser
- Persistent login (remains logged in across sessions)
- Logout via user profile dropdown

---

### 7. Team Member Cards (Home Page)

**Purpose:** Display individual team member status and priorities

**Card Components:**

**Header:**
- Avatar (initials in colored circle, unique color per user)
- Name
- Current mood percentage
- Mood status text (Steady, Struggling, Needs Check-in)

**This Week Section:**
- Top 3 priority activities for current week
- Icon indicators:
  - 🎯 Target icon for strategic priorities
  - 👥 People icon for partner assignments
  - 📞 Phone icon for helper assignments

**Support Needs:**
- Displays if user flagged need for support
- Example: "CEO support scheduled"

**Check-In Button:**
- Allows user to update mood score
- Opens dialog with percentage slider
- Saves to user profile and updates team health calculation

---

### 8. Header and Navigation

**Global Header Components:**

**Left Side:**
- Growth Farm logo (pink "F" + black text)
- Clickable, returns to home page

**Center:**
- Navigation menu:
  - 🏠 Home
  - 📊 Dashboard (placeholder, not yet implemented)
  - ⚙️ Engine (placeholder, not yet implemented)
  - 📅 Monthly
  - 📋 Weekly
  - ⚙️ Settings

**Right Side:**
- User profile indicator:
  - Avatar (initials in colored circle)
  - First name
  - Dropdown menu on click:
    - Profile Settings (placeholder)
    - Logout

**Mobile Navigation:**
- Responsive hamburger menu
- Collapsible navigation drawer
- Same menu items as desktop

---

## Data Model and Relationships

### Core Database Tables

**users**
- Stores team member information
- Fields: id, openId, email, name, jobTitle, role (admin/user), createdAt
- Unique constraint on email (prevents duplicates)

**weeklyActivities**
- Stores weekly activities for all users
- Fields: id, userId, activity, dueDay, dependency, accountabilityPartnerId, partnerRole, monthlyGoalId, status, isPriority, weekNumber, year, createdAt, updatedAt
- Foreign keys: userId → users, accountabilityPartnerId → users, monthlyGoalId → monthlyTargets

**strategicObjectives**
- Stores configurable strategic objectives
- Fields: id, name, weight, icon, color, bgColor, displayOrder
- Weight must total 100% across all objectives

**annualGoals**
- Stores KPIs linked to strategic objectives
- Fields: id, goalName, ownerName, targetValue, targetUnit, strategicObjective
- Foreign key: strategicObjective → strategicObjectives.name

**monthlyTargets**
- Stores monthly target and actual values for each KPI
- Fields: id, goalId, month, year, targetValue, actualValue, autoCalculatedValue
- Foreign key: goalId → annualGoals.id
- Unique constraint on (goalId, month, year)

**weeklyPriorities**
- Stores user's top 3 priorities per week
- Fields: id, userId, description, weekNumber, year, createdAt
- Foreign key: userId → users

**celebrations**
- Stores team wins and milestones
- Fields: id, title, description, date, createdBy, createdAt
- Currently empty (dummy data cleared)

---

## User Flows

### Flow 1: New User Onboarding

1. User receives email invitation with link to platform
2. User clicks link, redirected to Manus OAuth login
3. User authenticates with Manus account
4. System checks email against invited users list
5. If match found, system links OAuth account to invited user record
6. User sees onboarding form (job title, mood, priorities)
7. User fills form and clicks "Let's Go"
8. System saves onboarding data
9. User redirected to home page

### Flow 2: Weekly Activity Planning

1. User navigates to Weekly page
2. User clicks pencil icon to enter edit mode
3. User adds new activity:
   - Enters activity description
   - Selects due day
   - Optionally adds dependency
   - Optionally assigns partner and selects role (Partner/Helper)
   - Optionally links to monthly goal (KPI)
   - Sets status (default: Pending)
   - Marks as priority if top 3
4. User clicks "Save All"
5. System saves activities to database
6. If partner assigned, system creates mirrored activity in partner's weekly view
7. User returns to view mode

### Flow 3: Mobile Quick-Add Activity

1. User opens platform on mobile device
2. User taps pink "shesha" button at bottom-right
3. Quick-add dialog appears
4. User enters activity name and due day
5. User optionally assigns partner and role
6. User taps Save
7. System creates activity with defaults (current week, pending status)
8. Dialog closes, activity appears in Weekly page
9. If partner assigned, activity appears in partner's Weekly page

### Flow 4: Monthly KPI Update

1. User navigates to Monthly page
2. User clicks on current or previous month progress circle for a KPI
3. Edit dialog appears showing:
   - KPI name and month
   - Number input field
   - Unit of measure
4. User enters actual value (e.g., 2500000 for R2.5M)
5. User clicks Save
6. System updates monthlyTargets.actualValue
7. Progress circle updates to show new percentage
8. YTD circle recalculates and updates
9. Dialog closes

### Flow 5: Strategic Objective Configuration

1. Admin navigates to Settings page
2. Admin clicks "Annual Goals" tab
3. Admin clicks "Add Objective" button
4. Dialog appears with fields:
   - Objective name
   - Weight (percentage)
5. Admin fills form and saves
6. System creates new strategicObjectives record
7. New objective appears in list
8. Admin can now add KPIs under this objective

### Flow 6: Partner/Helper Assignment

1. User creates or edits activity in Weekly page
2. User selects team member from "Assigned To" dropdown
3. "Role" dropdown appears
4. User selects "Partner" or "Helper"
5. User saves activity
6. System creates two records:
   - Original activity in creator's weekly view
   - Mirrored activity in partner's weekly view with modified name:
     - Partner: "Encourage [Creator] to [activity]"
     - Helper: "Call [Creator] to find out help needed with [activity]"
7. Partner sees activity in indigo highlight (read-only)
8. Creator can edit, partner cannot

---

## Automation and Calculation Logic

### Team Health Calculation

**Formula:**
```
Team Health % = AVG(All Active Users' Mood Scores)
```

**Week-over-Week Change:**
```
Change = Current Week Team Health - Previous Week Team Health
```

**Status Determination:**
- Steady: Change within ±5%
- Improving: Change > +5%
- Declining: Change < -5%

### KPI Status Calculation (OK/Check/Save)

**Logic:**
1. System scans all weeklyActivities where monthlyGoalId matches KPI
2. Checks completion dates of linked activities
3. Determines status:
   - **Green (OK):** At least 1 activity completed in past 14 days
   - **Amber (Check):** At least 1 activity completed in past 28 days, but not in last 14 days
   - **Red (Save):** No activities completed in past 28 days

**Purpose:** Alert team when KPIs are being neglected (no weekly activities linked)

### YTD (Year-to-Date) Calculation

**Formula:**
```
YTD Actual = SUM(Monthly Actuals from Jan to Current Month)
YTD Progress % = (YTD Actual / Annual Target) × 100
```

**Example:**
- Annual Target: R15M
- Jan Actual: R1M
- Feb Actual: R2.5M
- YTD Actual: R3.5M
- YTD Progress: 23.3%

### Monthly Progress Circle Fill Calculation

**Formula:**
```
Progress % = (Monthly Actual / Monthly Target) × 100
Fill Angle = (Progress % / 100) × 360 degrees
```

**Visual Representation:**
- 0%: Empty gray circle
- 50%: Half-filled dark circle
- 100%: Fully filled dark circle
- >100%: Fully filled with "over-target" indicator

---

## Future Automation Roadmap

### Phase 1: Smart Activity Completion (Planned)

**Goal:** Capture structured data when activities are marked complete

**Implementation:**
- Activity pattern detection (scan activity names for KPI-related keywords)
- Dynamic completion popups based on activity type:
  - **Count-based KPIs:** "Confirm proposal sent?" → Yes/No
  - **Currency-based KPIs:** "Deal value (ZAR):" → Number input
  - **Percentage-based KPIs:** "Delivered on-time?" → Achieved/Not Achieved
- Store completion metadata in weeklyActivities.completionData (JSON field)
- Auto-link activities to relevant KPIs

### Phase 2: Automated KPI Calculation (Planned)

**Goal:** Auto-update monthly actuals based on completed activities

**Implementation:**
- Weekly batch job runs every Monday at 6am
- Scans all activities completed in past week
- Applies formulas from KPI Automation Blueprint
- Updates monthlyTargets.actualValue for current month
- Flags auto-calculated vs manually-entered values

**Example Formulas:**

**Client Proposals (Count-based):**
```
Monthly Actual = COUNT(Activities where activity LIKE '%proposal%' AND status = 'done' AND month = current_month)
```

**IBM-Sized Clients (Currency-based):**
```
Monthly Actual = SUM(completionData.dealValue where completionData.clientType = 'IBM-Sized' AND completionData.newOrExisting = 'New')
```

**On-Time Delivery (Percentage-based):**
```
Monthly Actual = (COUNT(Projects where actualDeliveryDate <= plannedDeliveryDate) / COUNT(Total Projects Delivered)) × 100
```

### Phase 3: Operations Integration (Planned)

**Goal:** Pull data from operational systems (accounting, payroll, CRM)

**Implementation:**
- Connect to Xero/QuickBooks API for financial data
- Auto-import invoices, expenses, bank balances, tax payments
- Map transactions to KPIs (e.g., project invoices → Project Margin)
- Connect to payroll system for Payment Turnaround Time calculation
- Connect to CRM for deal pipeline tracking

**Benefits:**
- Zero manual entry for financial KPIs
- Real-time cash position updates
- Automatic project margin calculation

---

## Mobile Responsiveness

### Design Principles

**Mobile-First Approach:**
- All pages designed to work on iPhone/Android screens
- Touch-friendly buttons and inputs (minimum 44px tap targets)
- Responsive breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)

**Mobile-Specific Features:**

**Shesha Quick-Add Button:**
- Only visible on mobile devices (hidden on desktop via media query)
- Fixed position at bottom-right corner
- Z-index ensures it floats above all content
- Pink color matches brand identity

**Responsive Tables:**
- Weekly page table scrolls horizontally on mobile
- Monthly page uses smaller font sizes on mobile
- Progress circles scale down to fit mobile screens

**Navigation:**
- Hamburger menu on mobile
- Full navigation bar on desktop
- Touch-friendly menu items

**Forms:**
- Large input fields for easy typing on mobile
- Dropdowns use native mobile selectors
- Save buttons positioned within thumb reach

### Progressive Web App (PWA) Capability

**Installation:**
- Users can add Growth Farm to iPhone/Android home screen
- Icon appears like native app
- Opens in standalone mode (no browser chrome)

**Offline Support (Planned):**
- Service worker caching for offline access
- Sync data when connection restored

---

## Security and Privacy

### Authentication Security

**OAuth Integration:**
- Manus OAuth handles authentication (no password storage)
- Session cookies use httpOnly and secure flags
- JWT tokens signed with secret key
- Token expiration after 30 days of inactivity

**Access Control:**
- Email whitelist prevents unauthorized access
- Role-based permissions (admin vs user)
- Admin-only routes protected by middleware

### Data Privacy

**User Data:**
- All user data stored in private database
- No data sharing with third parties
- Users can only view their own activities (except admins)

**Audit Trail:**
- All database changes logged with timestamps
- createdAt and updatedAt fields on all tables
- Tracks who created/modified records

### Input Validation

**Frontend Validation:**
- Required fields enforced
- Number inputs validated for correct format
- Email format validation
- Dropdown selections constrained to valid options

**Backend Validation:**
- tRPC input schemas using Zod
- SQL injection prevention via parameterized queries (Drizzle ORM)
- XSS prevention via React's automatic escaping

---

## Performance Optimization

### Frontend Performance

**Code Splitting:**
- React lazy loading for pages
- Dynamic imports for heavy components
- Reduces initial bundle size

**Caching:**
- tRPC query caching (React Query under the hood)
- Stale-while-revalidate strategy
- Optimistic updates for instant UI feedback

**Image Optimization:**
- Avatars generated as SVG (lightweight)
- No heavy images on home page
- S3 CDN for uploaded files

### Backend Performance

**Database Optimization:**
- Indexed columns: userId, weekNumber, year, goalId, month
- Efficient queries using Drizzle ORM
- Connection pooling for MySQL

**API Efficiency:**
- tRPC batching (multiple queries in single HTTP request)
- Superjson for efficient serialization
- Gzip compression on responses

---

## Known Limitations and Future Enhancements

### Current Limitations

1. **Manual KPI Entry:** Monthly actuals must be entered manually (automation planned)
2. **No Notifications:** No email/push notifications when assigned as partner/helper
3. **No File Attachments:** Cannot attach files to activities or KPIs
4. **No Comments:** No commenting system for activities or KPIs
5. **No Historical Trends:** No charts showing KPI trends over time
6. **No Bulk Import:** Cannot import activities or KPIs from CSV/Excel
7. **No Calendar View:** Weekly activities only shown in table format
8. **No Search:** No search functionality for activities or KPIs

### Planned Enhancements

**Short-Term (Next 4 weeks):**
1. Implement Phase 1 of KPI automation (smart activity completion popups)
2. Add email notifications for partner/helper assignments
3. Add trend arrows to YTD circles (↑↓→ indicators)
4. Add comments/notes to monthly KPI updates
5. Add activity search and filtering

**Medium-Term (Next 3 months):**
1. Implement Phase 2 of KPI automation (auto-calculation from activities)
2. Add file attachments to activities
3. Add calendar view for weekly activities
4. Add bulk import/export for activities
5. Add historical trend charts for KPIs

**Long-Term (Next 6 months):**
1. Implement Phase 3 of KPI automation (operations integration)
2. Add mobile app (React Native)
3. Add AI-powered insights and recommendations
4. Add custom reporting and dashboards
5. Add integration with external tools (Slack, Teams, etc.)

---

## Technical Implementation Details

### tRPC API Structure

**Router Organization:**
- `auth`: Login, logout, user session management
- `weeklyActivities`: CRUD operations for weekly activities
- `goals`: CRUD operations for annual goals and monthly targets
- `strategicObjectives`: CRUD operations for strategic objectives
- `users`: User management (invite, remove, list)
- `celebrations`: CRUD operations for celebrations feed
- `system`: System-level operations (notifications, health checks)

**Example Procedure:**
```typescript
weeklyActivities: {
  create: protectedProcedure
    .input(z.object({
      activity: z.string(),
      dueDay: z.enum(["Monday", "Tuesday", ...]),
      accountabilityPartnerId: z.number().optional(),
      partnerRole: z.enum(["partner", "helper"]).optional(),
      // ... other fields
    }))
    .mutation(async ({ ctx, input }) => {
      // Create activity for user
      const activity = await db.createWeeklyActivity(input);
      
      // If partner assigned, create mirrored activity
      if (input.accountabilityPartnerId) {
        await db.createMirroredActivity(activity, input.partnerRole);
      }
      
      return activity;
    }),
}
```

### Database Schema Highlights

**Key Relationships:**
- users ← weeklyActivities (one-to-many)
- users ← weeklyActivities (accountability partner, one-to-many)
- annualGoals ← monthlyTargets (one-to-many)
- strategicObjectives ← annualGoals (one-to-many via name)
- weeklyActivities → monthlyTargets (many-to-one, optional)

**Enum Fields:**
- dueDay: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
- status: pending, done, delayed, deprioritised
- partnerRole: partner, helper
- role: admin, user

**Timestamp Fields:**
- All tables have createdAt (default: now)
- Most tables have updatedAt (auto-update on change)

### Frontend State Management

**tRPC Query Hooks:**
- `trpc.weeklyActivities.getByWeek.useQuery()` - Fetch activities for specific week
- `trpc.goals.getWithStatus.useQuery()` - Fetch KPIs with status indicators
- `trpc.auth.me.useQuery()` - Get current user session

**tRPC Mutation Hooks:**
- `trpc.weeklyActivities.create.useMutation()` - Create new activity
- `trpc.goals.updateMonthlyActualByGoalMonth.useMutation()` - Update monthly actual
- `trpc.strategicObjectives.update.useMutation()` - Update strategic objective

**Optimistic Updates:**
- Weekly activities use optimistic updates for instant UI feedback
- On mutation, cache updated immediately
- On error, cache rolled back
- On success, cache revalidated from server

### Component Architecture

**Reusable Components:**
- `AppHeader`: Global navigation header
- `QuickAddActivity`: Mobile quick-add dialog
- `ProgressWheel`: Circular progress indicator (used in Monthly page)
- `Button`, `Input`, `Select`, `Dialog`: shadcn/ui components

**Page Components:**
- `Home.tsx`: Team health dashboard
- `Weekly.tsx`: Weekly activity planning
- `Monthly.tsx`: Monthly KPI tracking
- `Settings.tsx`: Configuration and admin panel

**Layout Pattern:**
- All pages wrapped in consistent layout with AppHeader
- Responsive container with max-width and padding
- Consistent spacing and typography

---

## Deployment and Operations

### Hosting Infrastructure

**Manus Built-In Hosting:**
- Automatic deployment on checkpoint publish
- Custom domain support (growthfarm-jzcmsgtk.manus.space)
- SSL/TLS certificates auto-managed
- CDN for static assets

**Database:**
- MySQL/TiDB managed database
- Automatic backups
- Connection pooling
- SSL encryption

**File Storage:**
- S3-compatible object storage
- Public bucket for uploaded files
- CDN for fast delivery

### Deployment Process

1. Developer creates checkpoint via Manus UI
2. System runs build process (TypeScript compilation, Vite build)
3. System uploads built assets to CDN
4. System deploys server code to hosting environment
5. System runs database migrations (if schema changed)
6. System updates DNS to point to new deployment
7. System performs health checks
8. Deployment complete (typically 1-2 minutes)

### Monitoring and Maintenance

**Health Checks:**
- Server uptime monitoring
- Database connection monitoring
- TypeScript compilation checks
- Dependency vulnerability scanning

**Logging:**
- Server logs: `.manus-logs/devserver.log`
- Browser console logs: `.manus-logs/browserConsole.log`
- Network requests: `.manus-logs/networkRequests.log`
- User interactions: `.manus-logs/sessionReplay.log`

**Error Handling:**
- tRPC error boundaries catch API errors
- React error boundaries catch UI errors
- User-friendly error messages displayed
- Errors logged for debugging

---

## User Support and Documentation

### In-App Guidance

**Empty States:**
- Celebrations feed shows "No celebrations yet" with prompt to add
- Weekly page shows "No activities yet" with prompt to create
- Monthly page shows "No data yet" with prompt to set targets

**Tooltips and Help Text:**
- Status indicators explained on hover
- Partner/Helper roles explained in dropdown
- KPI units explained in Monthly page

**Onboarding:**
- First-time users see onboarding flow
- Explains key concepts (mood check-in, priorities, etc.)
- Guides users to create first activities

### External Documentation

**KPI Automation Blueprint:**
- Comprehensive document explaining future automation
- Defines formulas, data capture requirements, trigger points
- Available as separate markdown file

**Platform Documentation (This Document):**
- Complete reference for all features and functionality
- Technical implementation details
- User flows and use cases

---

## Glossary

**Activity:** A task or action item in the weekly planner, assigned to a specific day and optionally linked to a KPI

**Accountability Partner:** A team member assigned to support or help with an activity (Partner or Helper role)

**Annual Goal:** Same as KPI (Key Performance Indicator)

**Checkpoint:** A saved snapshot of the platform code and database state, used for deployment and rollback

**Helper:** A partner role where the assignee is expected to provide assistance with the activity

**KPI:** Key Performance Indicator, a measurable goal linked to a strategic objective

**Monthly Target:** The target value for a KPI in a specific month

**Mood Score:** A percentage representing a team member's current well-being or morale

**Partner:** A partner role where the assignee is expected to encourage and support the activity creator

**Priority:** A flag indicating one of the top 3 most important activities for a user in a given week

**Shesha:** Zulu word meaning "hurry" or "quickly", used as the name for the mobile quick-add button

**Strategic Objective:** A high-level goal category (e.g., Community Growth, Impact Delivery) with a weight percentage

**Team Health:** The average mood score across all team members

**YTD:** Year-to-Date, the cumulative progress from January to the current month

---

## Conclusion

Growth Farm Operating System is a comprehensive goal management platform designed to help the Growth Farm team achieve ambitious targets through structured planning, collaborative accountability, and data-driven tracking. The platform balances simplicity (easy weekly planning) with sophistication (automated KPI tracking) to create a system that team members actually want to use.

**Key Strengths:**
- Unified view of strategic goals, monthly KPIs, and weekly activities
- Collaborative features (Partner/Helper assignments) foster team accountability
- Mobile-first design enables on-the-go planning
- Automated status indicators alert team to neglected KPIs
- Flexible architecture supports future automation and integrations

**Next Steps:**
- Implement Phase 1 of KPI automation (smart activity completion)
- Add notifications for partner/helper assignments
- Expand historical trend analysis and reporting
- Integrate with external systems (accounting, CRM, payroll)

---

**Document Version:** 1.0  
**Last Updated:** February 2, 2026  
**For Questions or Feedback:** Contact Zweli Gwebu (CEO, Growth Farm)
