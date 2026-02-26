# Growth Farm KPI Automation Blueprint

**Document Purpose:** Strategic roadmap for automating KPI calculations from weekly activities and operations

**Author:** Manus AI  
**Date:** February 2, 2026  
**Status:** Draft for Discussion

---

## Executive Summary

This document maps out how Growth Farm's seventeen KPIs across five strategic objectives can transition from manual monthly entry to automated calculation based on weekly activity completion and operational events. The blueprint defines the data capture requirements, calculation formulas, and trigger points needed to create a self-updating dashboard where team members simply manage their weekly plans and KPIs auto-populate.

**Key Principle:** *People fill in weekly plans → System auto-updates KPIs and dashboard*

---

## Automation Strategy Overview

### Three-Phase Approach

**Phase 1: Activity Completion Data Capture (Interim)**
- When marking activities complete, capture structured data through smart popups
- Data types: Numbers (for counts/currency), Achieved/Not Achieved (for percentages), Dates (for time-based KPIs)
- Store completion metadata that feeds into KPI calculations

**Phase 2: Activity-to-KPI Mapping**
- Define which activity keywords/patterns contribute to which KPIs
- Implement automatic detection and contribution calculation
- Weekly batch processing to update monthly actuals

**Phase 3: Real-Time Operations Integration (Final)**
- Operational events (invoices sent, payments received, contracts updated) trigger KPI updates
- Full automation with zero manual entry

---

## KPI Automation Matrix

### Strategic Objective 1: Community Growth (30% weight)

#### KPI 1.1: 3 IBM Sized Clients (New)
- **Owner:** Zweli
- **Target:** R15,000,000 annually
- **Unit:** ZAR (currency)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = SUM(Deal Values where Deal Closed in Month AND Client Type = "IBM-Sized" AND Status = "New")
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Close [Client Name] deal", "Sign contract with [Client]", "[Client] goes live"
- **Data Capture Popup:**
  - Deal Value (ZAR): [Number input]
  - Client Type: [Dropdown: IBM-Sized / Mid-Market / SME]
  - New or Existing: [Dropdown: New / Existing]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (adds to running monthly total)

**Interim Manual Fallback:** If activity doesn't match pattern, monthly manual entry remains available

---

#### KPI 1.2: Client Proposal Presentations / Meetings
- **Owner:** Brian
- **Target:** 40 annually
- **Unit:** # (count)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = COUNT(Activities where Activity Name contains "proposal" OR "presentation" OR "pitch" AND Marked Complete in Month)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Send [Client] proposal", "[Client] presentation", "Pitch to [Client]", "Present to [Client]"
- **Data Capture Popup:**
  - Proposal Sent/Presented: [Button: Yes]
  - Client Name: [Auto-filled from activity name or manual entry]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time increment (+1 per qualifying activity)

**Smart Detection:** System scans activity name for keywords: "proposal", "presentation", "pitch", "present", "send proposal"

---

#### KPI 1.3: Reach and Relevance (Conferences, Articles, Newsletters)
- **Owner:** Brian
- **Target:** 20 annually (3 conferences + 5 articles + 12 newsletters)
- **Unit:** # (count)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = COUNT(Activities where Type IN ["Conference", "Article", "Newsletter"] AND Marked Complete in Month)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Attend [Conference]", "Publish article on [Topic]", "Send newsletter"
- **Data Capture Popup:**
  - Type: [Dropdown: Conference Attendance / Placed Article/Interview / Newsletter Sent]
  - Title/Event Name: [Text input]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time increment

**Sub-Tracking:** System tracks each type separately to ensure 3+5+12 distribution is met

---

#### KPI 1.4: Client Reference Letters
- **Owner:** Zweli
- **Target:** 5 annually
- **Unit:** # (count)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = COUNT(Activities where Activity Name contains "reference letter" AND Marked Complete in Month)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Request reference letter from [Client]", "Receive reference from [Client]"
- **Data Capture Popup:**
  - Reference Letter Received: [Button: Yes]
  - Client Name: [Auto-filled or manual]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time increment

---

### Strategic Objective 2: Impact Delivery (30% weight)

#### KPI 2.1: Project Margin
- **Owner:** Albert
- **Target:** 20% annually
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = ((Total Project Revenue - Total Project Costs) / Total Project Revenue) × 100
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Invoice [Client] for [Project]", "Pay [Supplier] for [Project]"
- **Data Capture Popup (Revenue):**
  - Invoice Amount (ZAR): [Number input]
  - Project Name: [Dropdown from active projects]
- **Data Capture Popup (Costs):**
  - Cost Amount (ZAR): [Number input]
  - Project Name: [Dropdown from active projects]
  - Cost Type: [Dropdown: Labor / Materials / Subcontractor / Other]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** End of month (batch calculation across all projects)

**Operations Integration:** Link to accounting system where invoices/expenses are recorded

---

#### KPI 2.2: On-Time Project Delivery
- **Owner:** Albert
- **Target:** 100% annually
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = (COUNT(Projects Delivered On-Time in Month) / COUNT(Total Projects Delivered in Month)) × 100
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Deliver [Project] to [Client]", "[Project] goes live", "Complete [Project]"
- **Data Capture Popup:**
  - Project Name: [Dropdown]
  - Planned Delivery Date: [Auto-filled from project plan]
  - Actual Delivery Date: [Auto-filled as today or manual]
  - On-Time: [Auto-calculated: Yes if Actual ≤ Planned]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running percentage updated)

---

#### KPI 2.3: Project Documentation
- **Owner:** Albert
- **Target:** 100% annually
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = (COUNT(Projects with Complete Documentation) / COUNT(Total Active Projects)) × 100
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Complete [Project] documentation", "Upload [Project] docs", "Finalize [Project] handover"
- **Data Capture Popup:**
  - Project Name: [Dropdown]
  - Documentation Complete: [Checkbox: Yes]
  - Documentation URL/Location: [Text input]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** End of month (batch calculation)

**Validation:** System checks if required docs exist (scope, design, code, testing, handover)

---

### Strategic Objective 3: New Frontiers (15% weight)

#### KPI 3.1: Ventures Generating Revenue
- **Owner:** Albert
- **Target:** 2 annually
- **Unit:** # (count)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = COUNT(DISTINCT Ventures where First Revenue Date ≤ End of Month)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "[Venture Name] first sale", "Receive payment from [Venture] customer"
- **Data Capture Popup:**
  - Venture Name: [Dropdown from ventures list]
  - First Revenue: [Checkbox: Yes]
  - Revenue Amount (ZAR): [Number input]
  - Revenue Date: [Date picker]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (cumulative count)

**Operations Integration:** Link to venture accounting/CRM where first sale is recorded

---

#### KPI 3.2: Burn Rate to First Revenue
- **Owner:** Albert
- **Target:** R400,000 annually (R200k per venture × 2 ventures)
- **Unit:** ZAR (currency)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = SUM(Venture Expenses from Launch Date to First Revenue Date)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Pay [Expense] for [Venture]", "[Venture] expense: [Description]"
- **Data Capture Popup:**
  - Venture Name: [Dropdown]
  - Expense Amount (ZAR): [Number input]
  - Expense Category: [Dropdown: Development / Marketing / Operations / Other]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running total until first revenue)

**Stop Condition:** Once venture generates first revenue, burn rate is locked for that venture

---

### Strategic Objective 4: Purpose & Platform (15% weight)

#### KPI 4.1: Admin Set-Up and Compliance
- **Owner:** Boitumelo
- **Target:** 100% annually
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = (COUNT(Completed Admin Tasks) / COUNT(Total Admin Tasks in Checklist)) × 100
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Register [Entity]", "File [Compliance Document]", "Update [Admin System]"
- **Data Capture Popup:**
  - Task Name: [Auto-filled from predefined checklist]
  - Completed: [Checkbox: Yes]
  - Completion Date: [Auto-filled as today]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running percentage)

**Checklist Approach:** Maintain master list of admin tasks (company registration, tax registration, CIPC filings, etc.) and track completion

---

#### KPI 4.2: IT Build, Run & Operations
- **Owner:** Albert
- **Target:** 100% annually
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = (COUNT(Completed IT Milestones) / COUNT(Total IT Milestones in Roll-Out Plan)) × 100
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Deploy [System]", "Complete [IT Milestone]", "Launch [Platform Feature]"
- **Data Capture Popup:**
  - Milestone Name: [Dropdown from IT roll-out plan]
  - Completed: [Checkbox: Yes]
  - Deployment Date: [Auto-filled as today]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running percentage)

**Roll-Out Plan Integration:** Link to IT roadmap/Gantt chart where milestones are defined

---

#### KPI 4.3: Compelling Non-Remuneration Staff Value Proposition
- **Owner:** Boitumelo
- **Target:** 80% annually (quarterly survey score)
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Quarterly Actual = AVG(Survey Scores from all staff in quarter)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Send Q[X] staff survey", "Collect Q[X] survey results"
- **Data Capture Popup:**
  - Survey Sent: [Checkbox: Yes]
  - Survey Results: [Upload CSV or manual entry of average score]
  
**Trigger Point:** Quarterly (not weekly activity-driven)  
**Computation Frequency:** End of quarter

**Survey Integration:** Automated email survey sent quarterly, results auto-imported

---

#### KPI 4.4: Robust Contract Management
- **Owner:** Boitumelo
- **Target:** 100% annually
- **Unit:** % (percentage)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = (COUNT(Contracts Up-to-Date) / COUNT(Total Active Contracts)) × 100
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Update [Contract Type] for [Entity]", "Renew contract with [Supplier/Customer]"
- **Data Capture Popup:**
  - Contract Type: [Dropdown: Customer / Supplier / Employee / Other]
  - Entity Name: [Text input]
  - Contract Up-to-Date: [Checkbox: Yes]
  - Expiry Date: [Date picker]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running percentage)

**Contract Register:** Maintain master list of all contracts with expiry dates, auto-flag those needing renewal

---

### Strategic Objective 5: Stewardship (10% weight)

#### KPI 5.1: Payment Turn Around Time From Timesheet
- **Owner:** Kervin
- **Target:** 15 days annually (average)
- **Unit:** # (days)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = AVG(Payment Date - Timesheet Submission Date) for all payments in month
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Submit timesheet for [Employee]", "Pay [Employee] for [Period]"
- **Data Capture Popup (Timesheet Submission):**
  - Employee Name: [Dropdown]
  - Timesheet Period: [Date range]
  - Submission Date: [Auto-filled as today]
- **Data Capture Popup (Payment):**
  - Employee Name: [Dropdown]
  - Payment Date: [Auto-filled as today]
  - Timesheet Period: [Auto-matched to submission]
  
**Trigger Point:** Two-step: (1) Timesheet submission, (2) Payment confirmation  
**Computation Frequency:** Real-time (running average)

**Operations Integration:** Link to payroll system where timesheet submissions and payments are logged

---

#### KPI 5.2: Grant Funding (Cash and Kind)
- **Owner:** Kervin
- **Target:** R2,000,000 annually
- **Unit:** ZAR (currency)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = SUM(Grant Amounts Received in Month)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Receive grant from [Funder]", "[Funder] grant approved", "Grant payment received"
- **Data Capture Popup:**
  - Funder Name: [Text input]
  - Grant Amount (ZAR): [Number input]
  - Grant Type: [Dropdown: Cash / In-Kind]
  - Receipt Date: [Auto-filled as today]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running total)

---

#### KPI 5.3: Cash and Cash Equivalents
- **Owner:** Kervin
- **Target:** R1,000,000 annually (year-end balance)
- **Unit:** ZAR (currency)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = Bank Balance + Cash on Hand + Short-Term Investments (as of month-end)
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** Not activity-driven; balance snapshot
- **Data Capture Method:**
  - **Option 1:** Manual monthly entry (current approach)
  - **Option 2:** Bank integration API (auto-fetch balance)
  - **Option 3:** Weekly activity: "Update cash position" with popup for current balance
  
**Trigger Point:** End of month  
**Computation Frequency:** Monthly snapshot

**Operations Integration:** Integrate with accounting system (Xero, QuickBooks) or bank API for real-time balance

---

#### KPI 5.4: Overdue Tax Liability Reduction
- **Owner:** Kervin
- **Target:** R0 annually (reduce to zero)
- **Unit:** ZAR (currency)
- **Current Calculation:** Manual monthly entry

**Automated Approach:**

**Formula:**  
```
Monthly Actual = Opening Overdue Tax Liability - Tax Payments Made in Month
```

**Evidence Needed at Activity Completion:**
- **Activity Pattern:** "Pay SARS [Tax Type]", "Settle [Tax] liability"
- **Data Capture Popup:**
  - Tax Type: [Dropdown: VAT / PAYE / Corporate Tax / Other]
  - Payment Amount (ZAR): [Number input]
  - Payment Date: [Auto-filled as today]
  
**Trigger Point:** Activity marked complete  
**Computation Frequency:** Real-time (running balance)

**Operations Integration:** Link to accounting system where tax payments are recorded

---

## Implementation Roadmap

### Phase 1: Smart Activity Completion (Weeks 1-4)

**Goal:** Capture structured data when activities are marked complete

**Technical Requirements:**
1. **Activity Pattern Detection**
   - Scan activity names for KPI-related keywords
   - Suggest relevant KPI linkage when creating activities
   
2. **Completion Popup System**
   - Dynamic popup based on activity type
   - Three popup templates:
     - **Number Input:** For counts, currency, days (e.g., deal value, expense amount)
     - **Achieved/Not Achieved:** For binary outcomes (e.g., on-time delivery, documentation complete)
     - **Date Input:** For time-based calculations (e.g., payment date, delivery date)
   
3. **Data Storage**
   - Extend `weeklyActivities` table with completion metadata:
     - `completionData` (JSON field): Stores popup responses
     - `linkedKPIId` (integer): Links activity to specific KPI
     - `kpiContribution` (decimal): Calculated contribution to KPI

**User Experience:**
- When marking activity complete, popup appears if KPI-relevant
- User fills in 1-3 fields (minimal friction)
- System auto-calculates contribution and updates monthly actual

---

### Phase 2: Automated KPI Calculation (Weeks 5-8)

**Goal:** Auto-update monthly actuals based on completed activities

**Technical Requirements:**
1. **Calculation Engine**
   - Weekly batch job runs every Monday at 6am
   - Scans all activities completed in past week
   - Applies formulas from automation matrix
   - Updates `monthlyTargets.actualValue` for current month
   
2. **Real-Time Updates (Priority KPIs)**
   - Count-based KPIs update immediately on activity completion
   - Currency-based KPIs update immediately
   - Percentage-based KPIs recalculate end-of-week
   
3. **Manual Override**
   - Keep inline editing as fallback
   - Flag auto-calculated vs manually-entered values
   - Manual entry overrides auto-calculation (with audit trail)

---

### Phase 3: Operations Integration (Weeks 9-12)

**Goal:** Pull data from operational systems (accounting, payroll, CRM)

**Technical Requirements:**
1. **Accounting System Integration**
   - Connect to Xero/QuickBooks API
   - Auto-import: Invoices, expenses, bank balances, tax payments
   - Map transactions to KPIs (e.g., project invoices → Project Margin)
   
2. **Payroll Integration**
   - Connect to payroll system
   - Auto-calculate: Payment turnaround time
   
3. **CRM/Pipeline Integration**
   - Connect to CRM (if exists)
   - Auto-track: Deals closed, proposals sent, client meetings

---

## Data Capture Design Patterns

### Pattern 1: Count-Based KPIs (Simple Increment)

**Examples:** Proposals, Conferences, Reference Letters

**Popup Design:**
```
┌─────────────────────────────────────┐
│  Activity Completed ✓               │
├─────────────────────────────────────┤
│  This activity contributes to:      │
│  📊 Client Proposals (Brian)        │
│                                     │
│  Confirm proposal sent?             │
│  [✓ Yes, count this]  [Skip]       │
│                                     │
│  Client Name (optional):            │
│  [_____________________________]    │
│                                     │
│         [Cancel]  [Save]            │
└─────────────────────────────────────┘
```

---

### Pattern 2: Currency-Based KPIs (Number Input)

**Examples:** Deal Value, Grant Funding, Expenses

**Popup Design:**
```
┌─────────────────────────────────────┐
│  Activity Completed ✓               │
├─────────────────────────────────────┤
│  This activity contributes to:      │
│  💰 IBM-Sized Clients (Zweli)       │
│                                     │
│  Deal Value (ZAR):                  │
│  [_____________________________]    │
│                                     │
│  Client Type:                       │
│  [▼ IBM-Sized / Mid-Market / SME]  │
│                                     │
│  New or Existing Client:            │
│  [▼ New / Existing]                │
│                                     │
│         [Cancel]  [Save]            │
└─────────────────────────────────────┘
```

---

### Pattern 3: Percentage-Based KPIs (Achieved/Not Achieved)

**Examples:** On-Time Delivery, Documentation Complete

**Popup Design:**
```
┌─────────────────────────────────────┐
│  Activity Completed ✓               │
├─────────────────────────────────────┤
│  This activity contributes to:      │
│  📅 On-Time Project Delivery        │
│                                     │
│  Project: Growth Farm App           │
│  Planned Delivery: Jan 31, 2026     │
│  Actual Delivery: Feb 2, 2026       │
│                                     │
│  ⚠️ Delivered 2 days late           │
│                                     │
│  [Mark as On-Time]  [Confirm Late]  │
│                                     │
│         [Cancel]  [Save]            │
└─────────────────────────────────────┘
```

---

## Transition Strategy: Manual to Automated

### Hybrid Approach (Months 1-3)

**Principle:** Run both systems in parallel

1. **Auto-calculation runs in background**
   - System calculates monthly actuals from activities
   - Stores in shadow field: `monthlyTargets.autoCalculatedValue`
   
2. **Manual entry remains available**
   - Users can still edit via inline editing
   - Stores in existing field: `monthlyTargets.actualValue`
   
3. **Reconciliation Dashboard**
   - Show side-by-side comparison: Auto vs Manual
   - Highlight discrepancies for review
   - Build trust in auto-calculation accuracy

### Full Automation (Month 4+)

**Principle:** Auto-calculation becomes primary, manual becomes override

1. **Default to auto-calculated values**
   - `actualValue` = `autoCalculatedValue` by default
   
2. **Manual override with justification**
   - User can override with reason (e.g., "Included offline deal")
   - System flags overridden values in dashboard
   
3. **Audit trail**
   - Track all changes: Who, when, why
   - Monthly review of overrides to improve automation

---

## Key Success Factors

### 1. Activity Naming Conventions

**Challenge:** System needs to detect KPI-relevant activities

**Solution:** Encourage consistent naming patterns
- "Send [Client] proposal" (not "Follow up with client")
- "Close [Client] deal - R[Amount]" (not "Great meeting today")
- "Attend [Conference Name]" (not "Travel to event")

**Implementation:** Provide activity name templates/suggestions when creating activities

---

### 2. Minimal Data Entry Friction

**Challenge:** Users resist popups that slow them down

**Solution:** Smart defaults and progressive disclosure
- Pre-fill fields from activity name (e.g., extract client name, amount)
- Show only relevant fields (e.g., don't ask for "Client Type" if activity name says "IBM")
- Allow "Skip" option with reminder to fill later

---

### 3. Trust in Automation

**Challenge:** Users may distrust auto-calculated numbers

**Solution:** Transparency and explainability
- Show breakdown: "40 proposals = 15 (Zweli) + 25 (Brian)"
- Click on KPI to see contributing activities
- Monthly reconciliation report: Auto vs Manual comparison

---

### 4. Handling Edge Cases

**Challenge:** Not all KPI contributions come from weekly activities

**Solution:** Multiple data sources
- **Primary:** Weekly activities (80% of KPIs)
- **Secondary:** Operations systems (accounting, payroll, CRM)
- **Fallback:** Manual entry for exceptions

---

## Discussion Questions for Zweli

1. **Activity Naming:** Are you comfortable enforcing naming conventions, or should we use AI to extract data from free-form activity names?

2. **Popup Frequency:** How many popups per week is acceptable? (e.g., 5-10 popups vs 20+ popups)

3. **Operations Integration:** Which systems do you currently use?
   - Accounting: Xero / QuickBooks / Other?
   - Payroll: In-house / Outsourced?
   - CRM: Salesforce / HubSpot / None?

4. **Interim Timeline:** How long do you want to run hybrid (manual + auto) before full automation?
   - 1 month / 3 months / 6 months?

5. **Priority KPIs:** Which 5 KPIs should we automate first for quick wins?

---

## Next Steps

1. **Review this blueprint** and provide feedback on formulas, data capture designs, and transition strategy

2. **Prioritize KPIs** for Phase 1 implementation (suggest starting with count-based KPIs: proposals, conferences, reference letters)

3. **Define activity naming conventions** or decide on AI-powered data extraction approach

4. **Identify operations systems** for Phase 3 integration and assess API availability

5. **Schedule weekly check-ins** during implementation to review auto-calculation accuracy and adjust formulas

---

**Document Status:** Ready for discussion and refinement based on Zweli's feedback
