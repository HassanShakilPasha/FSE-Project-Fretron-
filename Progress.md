# Sprint Progress Map (SB-01 to SB-22)

Legend:
- [x] Completed
- [~] Partially completed
- [ ] Remaining / not evidenced in repo

## Backlog Status

- [ ] SB-01 Finalize Sprint 1 module scope (General)
  Not explicitly documented as a scope artifact in current repository files.

- [x] SB-02 Design registration page interface (US-01)
  Implemented in login/signup UI.

- [x] SB-03 Implement registration form fields (US-01)
  Name, email, and password fields are implemented.

- [x] SB-04 Add role selection in signup form (US-01)
  Role dropdown is present in signup mode.

- [~] SB-05 Implement validation for registration form (US-01)
  Basic required field validation exists. Stronger checks (password policy, stricter email format rules) can still be added.

- [x] SB-06 Save user account in database (US-01)
  Signup is persisted through Supabase auth.

- [x] SB-07 Prevent duplicate email registration (US-01)
  Duplicate email handling is done through Supabase response validation.

- [x] SB-08 Design login page interface (US-02)
  Login page and layout are implemented.

- [x] SB-09 Implement login form functionality (US-02)
  Login flow is implemented end to end.

- [x] SB-10 Verify login credentials from database (US-02)
  Credentials are verified against Supabase auth (plus static admin demo branch).

- [~] SB-11 Implement role-based redirection after login (US-02)
  Access control by role exists, but post-login destination is mostly dashboard rather than role-specific landing pages.

- [x] SB-12 Design Add Route page interface (US-03)
  Add Route page UI and styling are implemented.

- [x] SB-13 Implement Add Route form fields (US-03)
  Route fields are implemented (origin, destination, dates, vehicle, capacity, price, description).

- [~] SB-14 Validate route form inputs (US-03)
  Good frontend checks exist (required fields, city mismatch, positive numeric values). Backend validation can be tightened further for date and numeric constraints.

- [x] SB-15 Save route data against transporter account (US-03)
  Route records are saved with transporterId from authenticated user.

- [x] SB-16 Design My Routes page (US-04)
  My Routes page UI is implemented.

- [x] SB-17 Fetch only logged-in transporter routes (US-04)
  Authenticated filtered endpoint is implemented for transporter-scoped route retrieval.

- [x] SB-18 Display route details in list form (US-04)
  Route cards/list rendering is implemented.

- [x] SB-19 Add empty-state message for no routes (US-04)
  Empty-state prompt is implemented when no routes are found.

- [ ] SB-20 Perform testing of registration, login, add route, and my routes flow (General)
  No complete test suite evidence currently present for these full flows.

- [ ] SB-21 Prepare screenshots for implementation evidence (General)
  Screenshot evidence package is not yet organized in repository.

- [ ] SB-22 Update Trello sprint tasks (General)
  External process item; not verifiable from codebase.

## Core Remaining Items (Priority)

1. SB-20: Execute and document full flow testing.
2. SB-21: Capture and organize screenshots as implementation proof.
3. SB-22: Update Trello board statuses and sprint tracking.
4. SB-11: Add explicit role-based post-login redirect logic if required by your rubric.
5. SB-05 and SB-14: Strengthen validation rules, especially backend-side checks.

## Overall Progress

- Completed: 15
- Partial: 4
- Remaining: 3

## Submission Evidence Checklist (SB-20 and SB-21)

Use this checklist so your final submission is clear and easy to grade.

### A) Test Flow Evidence (SB-20)

- [ ] Test Case T01: User Registration (Transporter)
  - Input valid new user details
  - Select role as transporter
  - Confirm account is created and user can log in

- [ ] Test Case T02: User Registration (Business)
  - Input valid new user details
  - Select role as business
  - Confirm account is created and user can log in

- [ ] Test Case T03: Duplicate Email Registration
  - Try registering with an already used email
  - Confirm proper error message is shown

- [ ] Test Case T04: Login with Valid Credentials
  - Use existing user credentials
  - Confirm successful login and dashboard entry

- [ ] Test Case T05: Login with Invalid Credentials
  - Use invalid email/password
  - Confirm login failure message

- [ ] Test Case T06: Add Route as Transporter
  - Login as transporter
  - Submit Add Route form with valid values
  - Confirm success message

- [ ] Test Case T07: My Routes Shows Newly Added Route
  - Open My Routes after creating route
  - Confirm route appears with correct details

- [ ] Test Case T08: Empty State on My Routes
  - Use transporter account with no routes
  - Confirm empty-state text appears

- [ ] Test Case T09: Role Restriction Check
  - Switch to business role and try opening Add Route
  - Confirm restricted access behavior

### B) Screenshot Evidence Pack (SB-21)

Create a folder named docs/screenshots and include these files:

1. screenshot-01-signup-form.png
   - Signup form visible with role dropdown

2. screenshot-02-signup-success-or-duplicate-check.png
   - Successful signup or duplicate-email validation message

3. screenshot-03-login-page.png
   - Login interface before submission

4. screenshot-04-login-success-dashboard.png
   - Dashboard after successful login

5. screenshot-05-add-route-form.png
   - Add Route form with fields visible

6. screenshot-06-route-created-success.png
   - Route creation success message

7. screenshot-07-my-routes-list.png
   - My Routes showing at least one created route

8. screenshot-08-my-routes-empty-state.png
   - My Routes empty-state view

9. screenshot-09-role-restriction-proof.png
   - Business mode blocked from Create Route (if applicable)

### C) Trello Update Checklist (SB-22)

- [ ] Move SB-01 to SB-22 cards to correct statuses (Done / In Progress / Remaining)
- [ ] Attach implementation screenshots to relevant cards
- [ ] Add short comments on each card with evidence notes
- [ ] Confirm sprint board reflects actual project state

## Useful Evidence Notes

- Keep timestamps visible in screenshots where possible.
- Use one account with routes and one account without routes to show both list and empty states.
- If presenting admin demo, label it clearly as static demo credential behavior.
