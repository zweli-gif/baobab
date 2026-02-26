# Growth Farm Operating System - Detailed Change List

## GLOBAL CHANGES (Apply Everywhere)

### 1. Color Palette Update
**Current:** Dark browns, warm palette
**New:** Lighter version per LLM spec
- Primary: `#4A3425` (soil - dark brown)
- Accent: `#D4858D` (balloon - dusty pink)
- Background: `#F5F1EB` (canvas - light cream)
- Success: `#4A7C59` (green)
- Warning: `#C9A227` (yellow)
- Error: `#8B4049` (red)
- Text Primary: `#3D2817` (dark brown)
- Text Secondary: `#6B5444` (medium brown)
- Text Muted: `#8D7B6B` (light brown)

**Status:** ✅ DONE in index.css

### 2. Logo Integration
**Location:** Header (top-left)
**Design:** Growth Farm logo (balloon + "GROWTH FARM" text)
**Implementation:** 
- Add `<img src="/gf-logo.jpg" alt="Growth Farm" className="h-8" />` in header
- Logo should be clickable → navigate to home

**Status:** ✅ Logo copied to `/public/gf-logo.jpg`

### 3. Department Nomenclature Renaming
Replace all references throughout the app:

| Old Name | New Name | Icon | Context |
|----------|----------|------|---------|
| BD & Marketing | Community Growth | TrendingUp | Pipeline, navigation, labels |
| Client Projects | Impact Delivery | Briefcase | Pipeline, navigation, labels |
| Ventures | New Frontiers | Rocket | Pipeline, navigation, labels |
| Finance | Stewardship | Coins | Pipeline, navigation, labels |
| Admin & Ops | Purpose & Platform | ShieldCheck | Pipeline, navigation, labels |
| Team | The Family | Users | Navigation, labels |
| Dashboard | Executive Health | Activity | Navigation, labels |
| Home | The Farmstead | Home | Navigation, labels |

**Locations to Update:**
- Bottom navigation labels
- Sidebar navigation (desktop)
- Page titles
- Section headers
- Operations modal card titles
- Kanban view titles
- All references in database queries/procedures

**Status:** 🔨 IN PROGRESS

---

## PAGE 1: THE FARMSTEAD (Home Page)

### Current State
- Team health pulse with overall score
- Weekly priorities section
- Celebrations feed
- Quick snapshot with metric cards

### Changes Required

#### A. Header
**Current:**
```
GROWTH FARM | [Month Badge] | [Avatar]
```

**New:**
```
[GF Logo] | [Month Badge] | [Avatar]
```
- Add logo image on left
- Keep month badge and avatar on right
- Adjust spacing/sizing

#### B. Greeting Section
**Current:** Generic greeting
**New:** Per LLM spec
```
"Good [Morning/Afternoon/Evening], Growth Farm EXCO"
[Date: "Sunday, 1 February 2026"]
```
- Time-based greeting (before 12pm = Morning, 12-6pm = Afternoon, after 6pm = Evening)
- Include full date with day name

#### C. Team Mood Board (NEW SECTION)
**Position:** Below greeting, above current "Team Health Pulse"
**Design:** Horizontal scrollable card grid
**Per Card:**
- Avatar (initials, colored background)
- Name
- Mood emoji (😊, 😐, 😕)
- Mood text ("Energized", "Steady", "Stretched")
- "Edit" button (only visible for current user)

**Interaction:**
- Tap card → open modal to update mood
- Modal: Emoji picker + text input + save

**Data Source:** `teamMembers` with `mood` and `moodText` fields

#### D. Must Conquer Section (RENAME from "Quick Snapshot")
**Position:** Below Team Mood Board
**Design:** Numbered list (max 3 items)
**Per Item:**
- Number (1, 2, 3)
- Title
- Linked goal badge (e.g., "COMMUNITY_GROWTH: R320K pipeline")
- Rallied avatars (team members supporting this goal)
- "+" button to add more

**Interaction:**
- Tap item → expand to see details
- Tap "+" → modal to add new "Must Conquer"
  - Title input
  - Goal selector dropdown
  - Rally team members (multi-select)
- Tap rallied avatars → add/remove people

**Data Source:** New table `mustConquerItems` with fields: title, goalId, rallyTeamMembers[]

#### E. Top of Mind Section (RENAME from "This Week's Priorities")
**Position:** Below Must Conquer
**Design:** Single rich text card
**Content:**
- Text area (what's on your mind)
- "Edit" button (only for current user)
- Timestamp of last update

**Interaction:**
- Tap "Edit" → modal with text editor
- Auto-save on close

**Data Source:** New table `topOfMind` with fields: userId, content, updatedAt

#### F. Wins from Last Week (RENAME from "Celebrations & Wins")
**Position:** Below Top of Mind
**Design:** Reverse chronological list
**Per Win:**
- Avatar + name
- "X time ago" (e.g., "2 hours ago")
- Win content/description
- 👏 Clap button with count
- Clapper avatars (who clapped)

**Interaction:**
- Tap 👏 → increment count and add current user to clappers
- Tap "+" → modal to add new win
  - Text area for description
  - Auto-timestamp

**Data Source:** `celebrations` table (already exists, rename from "celebrations" to "wins")

#### G. Remove "Quick Snapshot" Section
**Current:** Revenue, Pipeline, Ventures, Clients cards with links
**Action:** DELETE this entire section
**Reason:** Not in LLM spec; users navigate via Operations modal instead

#### H. Bottom Navigation
**Current:** 5 items (Home, Dashboard, Pipelines, Trends, Settings)
**New:** 5 items with new names
1. **The Farmstead** (Home icon) - Current page
2. **Executive Health** (Activity icon) - Dashboard
3. **Operations** (Menu icon) - Opens modal
4. **Monthly** (Calendar icon) - Monthly progress
5. **Weekly** (CheckSquare icon) - Weekly planner

---

## PAGE 2: EXECUTIVE HEALTH (Dashboard Page)

### Current State
- Team health score + individual cards
- BD pipeline summary
- Ventures, Studio, Clients, Finance summary cards
- Alerts section

### Changes Required

#### A. Header
**Current:** "DASHBOARD" title
**New:** "EXECUTIVE HEALTH" title
- Add logo to header (same as Farmstead)
- Update bottom nav to show "Executive Health" as active

#### B. Company Health Score Ring (NEW SECTION)
**Position:** Top of page
**Design:** Circular progress ring with segments
**Center:** Large percentage (e.g., "78%")
**Ring:** 5 segments representing:
1. COMMUNITY_GROWTH (25% weight) - Color: soil
2. IMPACT_DELIVERY (20% weight) - Color: balloon
3. NEW_FRONTIERS (15% weight) - Color: info
4. STEWARDSHIP (30% weight) - Color: success
5. PURPOSE_PLATFORM (10% weight) - Color: warning

**Interaction:**
- Tap segment → show breakdown (e.g., "Community Growth: 82%")
- Show calculation: Weighted average of all goals in that area

**Data Source:** Calculate from `annualGoals` grouped by `area`

#### C. Rename All Pipeline Sections
**Current Names → New Names:**
- "BD Pipeline" → "Community Growth Pipeline"
- "Ventures" → "New Frontiers"
- "Studio" → "Impact Delivery"
- "Clients" → "Client Health"
- "Finance" → "Stewardship"
- "Admin" → "Purpose & Platform"

#### D. BD Pipeline Mini-View (Now "Community Growth Pipeline")
**Current:** Compact stage breakdown
**Changes:**
- Rename title to "Community Growth Pipeline"
- Keep horizontal bar showing count per stage
- Keep total weighted pipeline value
- Link text: "View Full Community Growth Pipeline"

#### E. Ventures Tracker (Now "New Frontiers")
**Current:** List of active ventures
**Changes:**
- Rename title to "New Frontiers"
- Keep stage badges
- Keep days in stage indicator (green <30, yellow 30-60, red >60)
- Link text: "View All New Frontiers"

#### F. Client Health Buckets (Now "Client Health")
**Current:** 4 columns (FIRM, ATTENTION, AT_RISK, DORMANT)
**Changes:**
- Rename title to "Client Health"
- Keep 4 bucket columns
- Keep count badges with color coding
- Link text: "View Client Health"

#### G. Finance Bars (Now "Stewardship")
**Current:** YTD Revenue, Cash Reserves, Tax Repayment
**Changes:**
- Rename title to "Stewardship"
- Keep all 3 progress bars
- Keep target line markers
- Add labels: "YTD Revenue", "Cash Reserves", "Tax Repayment"

#### H. Admin Alerts (Now "Purpose & Platform")
**Current:** OVERDUE and due-within-7-days items
**Changes:**
- Rename title to "Purpose & Platform"
- Show only OVERDUE or due-within-7-days items
- Red/yellow badges
- Link text: "View Purpose & Platform"

#### I. Bottom Navigation
**Same as Farmstead page**

---

## PAGE 3: OPERATIONS MODAL (NEW)

### Current State
**Does not exist yet** - Currently shows placeholder

### New Implementation

#### A. Full-Screen Overlay
**Trigger:** User taps "Operations" in bottom nav
**Design:** Full-screen modal overlay
**Header:**
- Title: "Where are you working today?"
- Close (X) button (top-right)

#### B. 6 Area Cards Grid
**Layout:** 2x3 grid on desktop, vertical stack on mobile
**Per Card:**
- Icon (from Phosphor Icons)
- Nomenclature name (large, bold)
- Traditional name (small, muted, in parentheses)
- Count badge (number of active items)
- Arrow indicator (→)

**Cards:**

| Nomenclature | Traditional | Icon | Count Source |
|--------------|-------------|------|--------------|
| Community Growth | (BD & Marketing) | TrendingUp | BD_PIPELINE where stage != WON, LOST |
| Impact Delivery | (Client Projects) | Briefcase | STUDIO_PROJECTS where stage != CLOSED |
| New Frontiers | (Ventures) | Rocket | VENTURES_PIPELINE where stage != SCALING |
| Stewardship | (Finance) | Coins | Always show (1) |
| Purpose & Platform | (Admin & Ops) | ShieldCheck | ADMIN_COMPLIANCE where status != DONE |
| The Family | (Team) | Users | TEAM count |

#### C. Interaction
- Tap any card → navigate to full pipeline view for that area
- Close button → close modal and return to previous page

#### D. Styling
- Background: Light cream (canvas color)
- Cards: White with subtle shadow
- Hover: Slight scale up, shadow increase
- Colors: Use nomenclature-specific colors where appropriate

---

## SUMMARY OF CHANGES BY PRIORITY

### PRIORITY 1 (Must Have)
1. ✅ Color palette updated
2. ✅ Logo added to assets
3. 🔨 Add logo to header (Farmstead + Executive Health)
4. 🔨 Rename all departments globally
5. 🔨 Rename page titles (Farmstead, Executive Health)
6. 🔨 Update bottom navigation labels
7. 🔨 Add Team Mood Board to Farmstead
8. 🔨 Add Must Conquer section to Farmstead
9. 🔨 Add Top of Mind section to Farmstead
10. 🔨 Rename Wins section on Farmstead
11. 🔨 Remove Quick Snapshot section from Farmstead
12. 🔨 Add Company Health Score Ring to Executive Health
13. 🔨 Rename all sections on Executive Health
14. 🔨 Build Operations modal with 6 area cards

### PRIORITY 2 (Nice to Have, for Later)
- Kanban pipeline views for all 6 areas
- Monthly progress view
- Weekly planner
- Full Operations modal navigation
- Email notifications
- Google Calendar sync

---

## QUESTIONS FOR CONFIRMATION

1. **Team Mood Board:** Should mood emoji be selectable from a predefined set, or free text?
2. **Must Conquer:** Should these be linked to specific annual goals, or can they be standalone?
3. **Top of Mind:** Should this be per-user (each team member has their own), or company-wide?
4. **Wins:** Should clapping be anonymous or show who clapped?
5. **Company Health Ring:** Should clicking a segment show a detailed breakdown modal?
6. **Operations Modal:** Should the count badges update in real-time as cards move between stages?

