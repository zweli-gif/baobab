# Growth Farm Farmstead - Design Specification

## Low-Fi Wireframe

```
┌─────────────────────────────────────────────────────────────┐
│ [GF Logo] [Month: Feb 2026] [Avatar]                        │ HEADER
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Good Morning, Growth Farm EXCO                               │ GREETING
│ Sunday, 1 February 2026                                      │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ 👥 TEAM HEALTH PULSE                                         │ TEAM HEALTH
│ Overall: 78% ▲ 5% from last week                            │
│                                                               │
│ [Avatar] Thabo    [Avatar] Mpumi    [Avatar] Naledi         │
│   85% 😊 High       72% 😐 Med        68% 😕 Low            │
│                                                               │
│ How are you feeling? [😊] [😐] [😕]                         │ QUICK CHECK-IN
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ 🎯 THIS WEEK'S PRIORITIES (Week 5, 2026)            [+ Add]  │ PRIORITIES
│                                                               │
│ 1. Close Vodacom deal                                        │
│    Owner: [ZG] [TM]  Status: Negotiation → Contracting      │
│    Due: Friday, 31 Jan                                       │
│                                                               │
│ 2. Launch Community Growth campaign                          │
│    Owner: [MD]  Status: Creative review                      │
│    Due: Wednesday, 29 Jan  ⚠️ OVERDUE                        │
│                                                               │
│ 3. Venture due diligence - TechStart                         │
│    Owner: [NK]  Status: Document review                      │
│    Due: Thursday, 30 Jan                                     │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ 🎉 CELEBRATIONS & WINS                             [+ Add]   │ WINS FEED
│                                                               │
│ [🏆] Gates Foundation deal closed! (R1.2M)                   │
│      Congrats Zinhle & Thabo! 🎊                            │
│      2 hours ago                                             │
│      👏 12 claps  [Avatar] [Avatar] [Avatar]...             │
│                                                               │
│ [⭐] New venture pipeline hit R5M milestone!                 │
│      Amazing work team! 🚀                                   │
│      1 day ago                                               │
│      👏 8 claps   [Avatar] [Avatar]...                       │
│                                                               │
│ [🎂] Happy Birthday Naledi! 🎈                              │
│      Hope you have an amazing day!                           │
│      3 days ago                                              │
│      👏 24 claps  [Avatar] [Avatar] [Avatar]...             │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ 📊 QUICK SNAPSHOT                                            │ METRICS
│                                                               │
│ [Revenue]        [Pipeline]      [Ventures]                  │
│ R2.1M            R1.8M            R5.2M                       │
│ 85% YTD ✓        3 at risk        2 closing                  │
│                                                               │
│ [Clients]        [Cash Reserves]                             │
│ 12 active        R8.5M                                        │
│ 2 at risk        3 months runway                              │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│ [🏡] [❤️] [📊] [📈] [📋]                                    │ BOTTOM NAV
│ Farmstead Health Ops Monthly Weekly                          │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### 1. HEADER
**Purpose:** Brand identity, current context, user profile
**Layout:** Horizontal bar, sticky at top
**Elements:**
- Left: Growth Farm logo (clickable → home)
- Center: Month/Year badge (e.g., "Feb 2026")
- Right: User avatar (clickable → profile)

**Styling:**
- Background: White (#FFFFFF)
- Border-bottom: 1px solid canvas-dark (#E8E4DE)
- Height: 64px
- Padding: 12px 24px

---

### 2. GREETING SECTION
**Purpose:** Warm, personalized welcome
**Layout:** Vertical stack
**Elements:**
- Greeting: "Good [Morning/Afternoon/Evening], Growth Farm EXCO"
  - Font: Playfair Display, 32px, bold, soil (#4A3425)
  - Time logic: <12pm = Morning, 12-6pm = Afternoon, >6pm = Evening
- Date: "Sunday, 1 February 2026"
  - Font: Inter, 14px, regular, text-muted (#8D7B6B)

**Styling:**
- Padding: 24px 24px 0
- Margin-bottom: 32px

---

### 3. TEAM HEALTH PULSE
**Purpose:** At-a-glance team wellbeing snapshot
**Layout:** Vertical stack with horizontal scroll for team cards
**Elements:**

#### 3.1 Overall Score Card
- Metric: "Overall: 78% ▲ 5% from last week"
- Font: Inter, 18px, bold, soil (#4A3425)
- Trend: Green arrow (↑) if positive, red arrow (↓) if negative
- Card styling:
  - Background: Balloon (#D4858D) with 10% opacity
  - Border: 1px solid balloon (#D4858D)
  - Padding: 16px 20px
  - Border-radius: 12px

#### 3.2 Team Member Cards (Horizontal Scroll)
- Layout: Flex row, overflow-x-auto
- Per card:
  - Avatar: 40x40px, initials, colored background
  - Name: 12px, soil (#4A3425)
  - Score: 16px bold, soil (#4A3425)
  - Emoji: 24px (😊 for >80%, 😐 for 60-80%, 😕 for <60%)
  - Energy: 12px, text-muted (#8D7B6B)
  - Width: 100px per card
  - Padding: 12px
  - Border: 1px solid canvas-dark (#E8E4DE)
  - Border-radius: 8px
  - Cursor: pointer (tap to edit)

#### 3.3 Quick Check-in
- Prompt: "How are you feeling today?"
  - Font: Inter, 14px, text-secondary (#6B5444)
- Three emoji buttons: [😊] [😐] [😕]
  - Size: 44x44px (touch-friendly)
  - Font-size: 24px
  - Border: 2px solid canvas-dark (#E8E4DE)
  - Border-radius: 8px
  - Hover: Background canvas (#F5F1EB)
  - Active: Border soil (#4A3425)
  - Margin: 12px between buttons

**Styling:**
- Container padding: 24px
- Background: White (#FFFFFF)
- Border: 1px solid canvas-dark (#E8E4DE)
- Border-radius: 12px
- Margin-bottom: 24px

---

### 4. THIS WEEK'S PRIORITIES
**Purpose:** Focus and accountability for the week
**Layout:** Vertical list
**Header:**
- Icon + Text: "🎯 THIS WEEK'S PRIORITIES (Week 5, 2026)"
- Font: Playfair Display, 18px, bold, soil (#4A3425)
- Right: [+ Add] button

**Per Priority Item:**
- Number badge: 1, 2, 3 (12px, white text, soil background, 24x24px circle)
- Title: 14px bold, soil (#4A3425)
- Owner avatars: 3-4 avatars stacked, 28x28px each
- Status: 12px, text-secondary (#6B5444)
- Due date: 12px, text-muted (#8D7B6B)
  - If overdue: Red background (#8B4049), white text
  - If due today: Yellow background (#C9A227), white text
  - If due within 3 days: Orange (warning color)
- Linked goal badge: Small badge with goal name
  - Background: Success (#4A7C59) with 20% opacity
  - Text: 10px, success (#4A7C59)
  - Padding: 4px 8px
  - Border-radius: 4px

**Item Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [1] Close Vodacom deal                                  │
│     Owner: [ZG] [TM]  Status: Negotiation → Contracting │
│     Due: Friday, 31 Jan  [COMMUNITY_GROWTH: R320K]      │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Container padding: 24px
- Background: White (#FFFFFF)
- Border: 1px solid canvas-dark (#E8E4DE)
- Border-radius: 12px
- Margin-bottom: 24px
- Per item: Padding 16px, border-bottom 1px canvas-dark (except last)

**Interactions:**
- Tap [+ Add]: Modal form with title, owner, due date, goal selector
- Tap item: Expand to show full details
- Checkbox: Mark as complete (strikethrough, fade to 50% opacity)

---

### 5. CELEBRATIONS & WINS
**Purpose:** Culture building, recognition, morale
**Layout:** Vertical scrollable feed
**Header:**
- Icon + Text: "🎉 CELEBRATIONS & WINS"
- Font: Playfair Display, 18px, bold, soil (#4A3425)
- Right: [+ Add] button

**Per Celebration Card:**
- Icon/Emoji: 32px (🏆, ⭐, 🎂, 🎊, etc.)
- Title: 14px bold, soil (#4A3425)
- Attribution: 12px, text-secondary (#6B5444)
- Date: 12px, text-muted (#8D7B6B) - "X time ago" format
- Clap button: 👏 [count] with clapper avatars
  - Clap count: 12px, text-secondary (#6B5444)
  - Clapper avatars: 20x20px, stacked left
  - Tap clap: Increment count, add current user to clappers

**Card Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ 🏆 Gates Foundation deal closed! (R1.2M)               │
│    Congrats Zinhle & Thabo! 🎊                         │
│    2 hours ago                                          │
│    👏 12 claps  [Avatar] [Avatar] [Avatar]...          │
└─────────────────────────────────────────────────────────┘
```

**Styling:**
- Container padding: 24px
- Background: White (#FFFFFF)
- Border: 1px solid canvas-dark (#E8E4DE)
- Border-radius: 12px
- Margin-bottom: 24px
- Max-height: 400px
- Overflow-y: auto
- Per card: Padding 16px, border-bottom 1px canvas-dark (except last)

**Interactions:**
- Tap [+ Add]: Modal form with title, description, tag team members
- Tap 👏: Increment count, add current user to clappers list

---

### 6. QUICK SNAPSHOT
**Purpose:** Quick access to key operational metrics
**Layout:** Grid (2x3 or responsive)
**Per Metric Cell:**
- Metric name: 12px, text-muted (#8D7B6B)
- Key figure: 20px bold, soil (#4A3425)
- Status indicator: 12px, color-coded
  - Green (#4A7C59): On track (>80%)
  - Yellow (#C9A227): At risk (50-80%)
  - Red (#8B4049): Critical (<50%)
- Status text: "85% ✓", "1 Risk", "2 Closing", etc.

**Cells:**
1. Revenue: "R2.1M" | "85% YTD ✓"
2. Pipeline: "R1.8M" | "3 at risk"
3. Ventures: "R5.2M" | "2 closing"
4. Clients: "12 active" | "2 at risk"
5. Cash Reserves: "R8.5M" | "3 months runway"

**Styling:**
- Container: Grid grid-cols-2 md:grid-cols-3 gap-4
- Per cell:
  - Padding: 16px
  - Background: Canvas (#F5F1EB)
  - Border: 1px solid canvas-dark (#E8E4DE)
  - Border-radius: 8px
  - Cursor: pointer
  - Hover: Shadow, slight scale

**Interactions:**
- Tap cell: Navigate to corresponding detailed view (Dashboard, Pipelines, etc.)

---

### 7. BOTTOM NAVIGATION
**Purpose:** Primary navigation for mobile
**Layout:** Fixed bottom, 5 tabs
**Tabs:**
1. 🏡 The Farmstead (current page, highlighted)
2. ❤️ Executive Health (dashboard)
3. 📊 Operations (modal)
4. 📈 Monthly (monthly progress)
5. 📋 Weekly (weekly planner)

**Styling:**
- Position: Fixed bottom
- Background: White (#FFFFFF)
- Border-top: 1px solid canvas-dark (#E8E4DE)
- Height: 64px
- Display: Flex, justify-content: space-around
- Per tab:
  - Icon: 24px
  - Label: 10px, text-muted (#8D7B6B)
  - Active: Icon + label soil (#4A3425)
  - Inactive: Icon + label text-muted (#8D7B6B)
  - Touch target: 44x44px minimum

---

## Responsive Behavior

### Desktop (>1024px)
- Single-column layout, non-scrolling
- All sections visible at once
- Bottom nav hidden

### Tablet (768-1024px)
- Single-column layout, scrollable
- All sections stacked
- Bottom nav visible

### Mobile (<768px)
- Single-column layout, scrollable
- All sections stacked
- Bottom nav visible (fixed)
- Padding reduced to 16px
- Font sizes reduced by 10%

---

## Color Palette Reference

| Name | Hex | Usage |
|------|-----|-------|
| Soil | #4A3425 | Primary text, headers, accents |
| Soil Light | #5D4037 | Hover states |
| Balloon | #D4858D | Accent, highlights |
| Balloon Light | #E5A5AD | Hover states |
| Canvas | #F5F1EB | Background |
| Canvas Dark | #E8E4DE | Borders |
| White | #FFFFFF | Cards, sections |
| Success | #4A7C59 | Positive status |
| Warning | #C9A227 | Caution status |
| Error | #8B4049 | Negative status |
| Text Primary | #3D2817 | Main text |
| Text Secondary | #6B5444 | Secondary text |
| Text Muted | #8D7B6B | Tertiary text |

---

## Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Page Title | Playfair Display | 32px | Bold | Soil |
| Section Header | Playfair Display | 18px | Bold | Soil |
| Card Title | Inter | 14px | Bold | Soil |
| Body Text | Inter | 14px | Regular | Text Primary |
| Small Text | Inter | 12px | Regular | Text Muted |
| Label | Inter | 10px | Regular | Text Muted |

---

## Implementation Checklist

- [ ] Create Farmstead.tsx component
- [ ] Build Header subcomponent
- [ ] Build Greeting subcomponent
- [ ] Build TeamHealthPulse subcomponent
- [ ] Build ThisWeeksPriorities subcomponent
- [ ] Build CelebrationsWins subcomponent
- [ ] Build QuickSnapshot subcomponent
- [ ] Build BottomNavigation subcomponent
- [ ] Implement all modals (Add Priority, Add Celebration, Edit Mood)
- [ ] Connect tRPC queries for data
- [ ] Add responsive breakpoints
- [ ] Test on mobile, tablet, desktop
- [ ] Accessibility review (WCAG 2.1 AA)
