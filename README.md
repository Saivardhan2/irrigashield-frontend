# IrrigaShield Frontend

An enterprise feature-driven (vertical-slice) monolithic **Angular 21** frontend for **IrrigaShield** â€” a smart parametric irrigation and crop protection insurance platform.

IrrigaShield automates parametric drought insurance for farmers using real-time IoT soil-moisture and water-deficit telemetry, automated underwriting risk scoring, and smart parametric claim settlements.

---

## Table of Contents
1. [Architectural Principles & Tech Stack](#architectural-principles--tech-stack)
2. [Microservices & Gateway Integration](#microservices--gateway-integration)
3. [Authentication & Security](#authentication--security)
4. [Design System & UI Theme](#design-system--ui-theme)
5. [Feature Modules & Components](#feature-modules--components)
6. [State Management (NgRx)](#state-management-ngrx)
7. [End-to-End Execution Matrix (Steps 0â€“27)](#end-to-end-execution-matrix-steps-027)
8. [Directory Structure](#directory-structure)
9. [Getting Started & Developer Commands](#getting-started--developer-commands)

---

## Architectural Principles & Tech Stack

### Core Technologies
* **Framework**: Angular 21 (Standalone Components, `inject()`-based dependency injection, signal-ready architecture)
* **State Management**: `@ngrx/store`, `@ngrx/effects`, `@ngrx/store-devtools`
* **Reactive Programming**: RxJS 7+
* **Routing**: Angular Router with lazy-loaded functional routes and functional guards (`authGuard`, `roleGuard`)
* **Forms**: Angular Reactive Forms with custom domain validators
* **Styling**: **Pure SCSS** design system (No Tailwind, No Bootstrap, No Angular Material, No React/Vue components)
* **Unit Testing**: Vitest runner (`@angular/build:unit-test`), `@ngrx/effects/testing`, `provideMockStore`

### Architectural Rules
1. **Vertical-Slice Feature Architecture**: Each business domain (`auth`, `farmer`, `underwriter`, `claims`, `admin`) encapsulates its own models, services, state, and components.
2. **4-File Component Structure**: Every single component contains strictly 4 files:
   - `[name].component.ts`: Logic and bindings
   - `[name].component.html`: Pure semantic HTML template
   - `[name].component.scss`: Component-scoped styles
   - `[name].component.spec.ts`: Unit test specifications
3. **HTTP-Only Cookie Authentication**:
   - Zero token storage in `localStorage` or `sessionStorage` (preventing XSS token extraction).
   - Global HTTP interceptor attaches `withCredentials: true` to all requests.
   - Session authenticated via `IRRIGASHIELD_TOKEN` cookie.

---

## Microservices & Gateway Integration

All frontend HTTP calls communicate with the **Spring Cloud API Gateway** at `http://localhost:8080/api`. The Gateway dynamically routes requests to the 5 underlying microservices:

```
+-------------------------------------------------------------------------------+
|                       IrrigaShield Angular 21 Frontend                       |
+---------------------------------------+---------------------------------------+
                                        |
                 (HTTP + withCredentials: true + Cookie)
                                        v
+-------------------------------------------------------------------------------+
|               Spring Cloud API Gateway (http://localhost:8080)                |
+-------+--------------------+-------------------+---------------+--------------+
        |                    |                   |               |
        v                    v                   v               v
+---------------+    +---------------+   +---------------+ +------------------+
|  AUTH SERVICE |    |  FARM SERVICE |   | POLICY SERVICE| |  EVENT & CLAIMS  |
|  (Port: 8081) |    |  (Port: 8082) |   |  (Port: 8083) | |   (Port: 8084)   |
| /api/auth/**  |    | /api/farmers  |   | /api/plans    | | /api/readings    |
| /api/admin/** |    | /api/farms/** |   | /api/policies | | /api/claims/**   |
+---------------+    +---------------+   +---------------+ +------------------+
        ^                    ^                   ^               ^
        +--------------------+---------+---------+---------------+
                                       |
                       +---------------+---------------+
                       |  Eureka Discovery (Port 8761) |
                       +-------------------------------+
```

---

## Authentication & Security

### Role-Based Access Control (RBAC)
The application enforces strict functional guards for 5 distinct roles:
* `FARMER`: Land parcel registration, crop cycles, insurance application wizards, quote acceptance, active policies, and claim tracking.
* `UNDERWRITER`: Reviewing pending applications, risk scorecard evaluation, premium loading calibration, approval/rejection.
* `DATA_PROVIDER`: Simulating IoT soil moisture & irrigation deficit readings.
* `CLAIMS_OFFICER`: Reviewing and manually settling triggered parametric claims.
* `ADMIN`: User account provisioning, parametric insurance plan builder, trigger rule builder, payout slab calibrator.

### Interceptors
* **`CredentialsInterceptor`**: Automatically injects `{ withCredentials: true }` into every HTTP request to ensure browser cookie transmission.
* **`ErrorInterceptor`**: Catches `401 Unauthorized` responses, clears local store credentials, displays error banners, and redirects to `/auth/login`.

---

## Design System & UI Theme

The custom SCSS theme (`src/styles.scss`) implements an agricultural color palette and utility system:

* **Primary Palette**:
  - Forest Green (Primary Brand): `#15803d`
  - Emerald Green (Accent / Success): `#22c55e`
  - Deep Navy (Header / Trust): `#0f172a`
  - Accent Gold (Pending / Alert): `#d97706`
  - Sky Blue (Info / Directives): `#1d4ed8`
* **Custom Directives**:
  - `[appStatusBadge]`: Automatic color-coded badges for statuses (`ACTIVE`, `SUBMITTED`, `APPROVED`, `UNDER_REVIEW`, `SETTLED`, `REJECTED`).
  - `[appRiskLevel]`: Visual risk gauge for risk classifications (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`).
  - `*appHasRole`: Structural directive conditionally displaying UI elements according to the authenticated user's role.
* **Custom Form Validators**:
  - `indianPhoneValidator`: Enforces standard 10-digit Indian mobile numbers (`^[6-9]\d{9}$`).
  - `pinCodeValidator`: Enforces 6-digit Indian postal PIN codes (`^[1-9][0-9]{5}$`).
  - `dateSequenceValidator`: Enforces `proposedStartDate < proposedEndDate`.
  - `coverageBoundsValidator`: Ensures requested coverage is within plan `[minimumCoverage, maximumCoverage]`.

---

## Feature Modules & Components

Every component adheres to the 4-file structure:

### 1. Shared Module (`src/app/shared/`)
* **Components**:
  - `NavbarComponent`: Responsive header, authenticated navigation links per role, and user status badge.
  - `LoadingSpinnerComponent`: Reusable loading indicator.
  - `ErrorBannerComponent`: Dismissible global alert banner.
* **Services**:
  - `NotificationService`: Reactive subject-based notification broker for toasts and alerts.

### 2. Authentication Feature (`src/app/features/auth/`)
* `LoginComponent`: Email and password login form.
* `RegisterComponent`: Farmer self-registration form.
* `AuthApiService`: Communicates with `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`.

### 3. Farmer Feature (`src/app/features/farmer/`)
* `FarmerDashboardComponent`: Central landing dashboard with metric cards, shortcuts, and active policy widgets.
* `ProfileFormComponent`: KYC profile completion (full name, phone, address, village, district, state, PIN code, bank account last 4 digits).
* `FarmListComponent` & `FarmFormComponent`: Land parcel creation and listing (total area, soil type, survey numbers).
* `CropManagerComponent`: Managing crop cycles per farm (crop type, sowing date, estimated harvest date, growth stage).
* `IrrigationFormComponent`: Irrigation infrastructure profile (source type, flow rate L/min, historical shortage days).
* `PlanCatalogComponent`: Browsing active parametric insurance plans with coverage ranges and base premiums.
* `ApplicationWizardComponent`: Multi-step policy application draft and submission.
* `QuoteAcceptanceComponent`: Reviewing underwriter-approved quotes, risk scores, loaded premium, and accepting to issue policy.
* `MyPoliciesComponent`: Listing active and issued insurance policies.

### 4. Underwriter Feature (`src/app/features/underwriter/`)
* `PendingQueueComponent`: Queue of farmer applications in `SUBMITTED` or `UNDER_REVIEW` status.
* `RiskAssessmentScorecardComponent`: Multi-factor risk engine displaying:
  - Soil risk score (0â€“30)
  - Water availability risk (0â€“40)
  - Crop sensitivity risk (0â€“30)
  - Overall risk score (0â€“100)
  - Calibrated risk loading and recommended premium
* `DecisionModalComponent`: Modal enabling the underwriter to approve with loaded premium or reject with mandatory rationale.
* `CaseHistoryComponent`: Historical log of processed underwriting decisions.

### 5. Claims & Telemetry Feature (`src/app/features/claims/`)
* `SensorSimulatorComponent`: Interactive IoT gateway telemetry simulator for `DATA_PROVIDER`:
  - Quick-scenario presets (`DROUGHT`, `SEVERE`, `NORMAL`)
  - Adjustable continuous deficit hours, soil moisture %, water deficit %
  - Transmits to `POST /api/readings`
* `ClaimAlertDialogComponent`: Instant popup dialog celebrating automatic parametric smart-contract claim triggers.
* `FarmerClaimsHistoryComponent`: Table of all claims, trigger events, deficit hours, payout percentages, and settlement dates.

### 6. Admin Feature (`src/app/features/admin/`)
* `UserManagerComponent`: Provisioning `UNDERWRITER`, `DATA_PROVIDER`, `CLAIMS_OFFICER`, and `ADMIN` accounts.
* `PlanBuilderComponent`: Form to publish new parametric plans (minimum/maximum coverage, base premium, maximum policy days).
* `TriggerRuleBuilderComponent`: Configuring agro-climatic deficit thresholds for crop types and growth stages.
* `PayoutSlabBuilderComponent`: Calibrating stepped deficit-duration brackets mapped to payout percentages.

---

## State Management (NgRx)

The application maintains 5 primary state slices:

```
+-----------------------------------------------------------+
|                        NgRx Store                         |
+-------------+-------------+---------------+---------------+
|    auth     |   farmer    |  underwriting | claims/admin  |
+-------------+-------------+---------------+---------------+
       |             |              |               |
       v             v              v               v
  AuthEffects  FarmerEffects UnderwriteEffects Claims/AdminEffects
       |             |              |               |
       +-------------+--------------+---------------+
                             |
                   Angular HttpClient
                             |
                             v
                 Spring Cloud Gateway API
```

1. **`auth`**: `user`, `isAuthenticated`, `role`, `loading`, `error`
2. **`farmer`**: `profile`, `farms`, `crops`, `irrigation`, `plans`, `applications`, `policies`, `loading`, `error`
3. **`underwriting`**: `pendingApplications`, `activeCase`, `caseHistory`, `loading`, `error`
4. **`claims`**: `claims`, `lastReading`, `alertClaim`, `loading`, `error`
5. **`admin`**: `users`, `plans`, `rules`, `slabs`, `loading`, `error`

---

## End-to-End Execution Matrix (Steps 0â€“27)

Every single step in the platform's execution and testing lifecycle is wired to a concrete frontend service and UI component:

| Step | Operation Description | Gateway Endpoint | Frontend Service Method | Frontend UI Component |
| :---: | :--- | :--- | :--- | :--- |
| **0** | Discovery Health Check | `GET :8761/eureka/apps` | Infrastructure check | Connected via Gateway (`:8080/api`) |
| **1** | Admin Login | `POST /api/auth/login` | `AuthApiService.login()` | `LoginComponent` |
| **2** | Create Underwriter User | `POST /api/admin/users` | `AdminApiService.createUser()` | `UserManagerComponent` |
| **3** | Create Data Provider User | `POST /api/admin/users` | `AdminApiService.createUser()` | `UserManagerComponent` |
| **4** | Create Insurance Plan | `POST /api/admin/plans` | `AdminApiService.createPlan()` | `PlanBuilderComponent` |
| **5** | Create Trigger Rule | `POST /api/admin/plans/{id}/trigger-rules` | `AdminApiService.createTriggerRule()` | `TriggerRuleBuilderComponent` |
| **6** | Create Payout Slab | `POST /api/admin/trigger-rules/{id}/payout-slabs` | `AdminApiService.createPayoutSlab()` | `PayoutSlabBuilderComponent` |
| **7** | Farmer Self-Registration | `POST /api/auth/register` | `AuthApiService.register()` | `RegisterComponent` |
| **8** | Farmer Login | `POST /api/auth/login` | `AuthApiService.login()` | `LoginComponent` |
| **9** | Farmer KYC Profile | `POST /api/farmers/profile` | `FarmerProfileApiService.createProfile()` | `ProfileFormComponent` |
| **10** | Register Farm Plot | `POST /api/farms` | `FarmApiService.createFarm()` | `FarmFormComponent` / `FarmListComponent` |
| **11** | Add Crop Cycle | `POST /api/farms/{id}/crops` | `FarmApiService.addCrop()` | `CropManagerComponent` |
| **12** | Add Irrigation Profile | `POST /api/farms/{id}/irrigation` | `FarmApiService.createOrUpdateIrrigation()` | `IrrigationFormComponent` |
| **13** | Browse Active Plans | `GET /api/plans/active` | `FarmerPolicyApiService.getActivePlans()` | `PlanCatalogComponent` |
| **14** | Create Application Draft | `POST /api/applications` | `FarmerPolicyApiService.createApplication()` | `ApplicationWizardComponent` |
| **15** | Submit for Underwriting | `POST /api/applications/{id}/submit` | `FarmerPolicyApiService.submitApplication()` | `ApplicationWizardComponent` |
| **16** | Underwriter Login | `POST /api/auth/login` | `AuthApiService.login()` | `LoginComponent` |
| **17** | View Pending Queue | `GET /api/underwriting/applications/pending` | `UnderwritingApiService.getPendingApplications()` | `PendingQueueComponent` |
| **18** | Start Underwriting Review | `POST /api/underwriting/applications/{id}/start-review` | `UnderwritingApiService.startReview()` | `PendingQueueComponent` |
| **19** | Run Risk Assessment | `POST /api/underwriting/applications/{id}/assess` | `UnderwritingApiService.assessRisk()` | `RiskAssessmentScorecardComponent` |
| **20** | Approve Application | `PUT /api/underwriting/applications/{id}/approve` | `UnderwritingApiService.approveApplication()` | `DecisionModalComponent` |
| **21** | View Approved Quote | `GET /api/policies/approved-quote/{id}` | `FarmerPolicyApiService.getApprovedQuote()` | `QuoteAcceptanceComponent` |
| **22** | Accept Quote & Issue Policy | `POST /api/policies/approved-quote/{id}/accept` | `FarmerPolicyApiService.acceptApprovedQuote()` | `QuoteAcceptanceComponent` |
| **23** | Verify Active Policies | `GET /api/policies/my-policies` | `FarmerPolicyApiService.getMyPolicies()` | `MyPoliciesComponent` |
| **24** | Data Provider Login | `POST /api/auth/login` | `AuthApiService.login()` | `LoginComponent` |
| **25** | Normal Telemetry Reading | `POST /api/readings` | `ClaimsApiService.submitReading()` | `SensorSimulatorComponent` |
| **26** | Severe Deficit Telemetry | `POST /api/readings` | `ClaimsApiService.submitReading()` | `SensorSimulatorComponent` |
| **27** | View Settled Claims | `GET /api/claims/my-claims` | `ClaimsApiService.getMyClaims()` | `FarmerClaimsHistoryComponent` & `ClaimAlertDialogComponent` |

---

## Directory Structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ app.component.{ts,html,scss,spec.ts}
â”‚   â”œâ”€â”€ app.config.ts
â”‚   â”œâ”€â”€ app.routes.ts
â”‚   â”œâ”€â”€ features/
â”‚   â”‚   â”œâ”€â”€ admin/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ payout-slab-builder/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ plan-builder/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ trigger-rule-builder/
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ user-manager/
â”‚   â”‚   â”‚   â”œâ”€â”€ model/
â”‚   â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â””â”€â”€ state/
â”‚   â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ login/
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ register/
â”‚   â”‚   â”‚   â”œâ”€â”€ guards/
â”‚   â”‚   â”‚   â”œâ”€â”€ interceptors/
â”‚   â”‚   â”‚   â”œâ”€â”€ model/
â”‚   â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â””â”€â”€ state/
â”‚   â”‚   â”œâ”€â”€ claims/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ claim-alert-dialog/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ farmer-claims-history/
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ sensor-simulator/
â”‚   â”‚   â”‚   â”œâ”€â”€ model/
â”‚   â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â””â”€â”€ state/
â”‚   â”‚   â”œâ”€â”€ farmer/
â”‚   â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ application-wizard/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ crop-manager/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ farm-form/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ farm-list/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ farmer-dashboard/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ irrigation-form/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ my-policies/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ plan-catalog/
â”‚   â”‚   â”‚   â”‚   â”œâ”€â”€ profile-form/
â”‚   â”‚   â”‚   â”‚   â””â”€â”€ quote-acceptance/
â”‚   â”‚   â”‚   â”œâ”€â”€ model/
â”‚   â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”‚   â””â”€â”€ state/
â”‚   â”‚   â””â”€â”€ underwriter/
â”‚   â”‚       â”œâ”€â”€ components/
â”‚   â”‚       â”‚   â”œâ”€â”€ case-history/
â”‚   â”‚       â”‚   â”œâ”€â”€ decision-modal/
â”‚   â”‚       â”‚   â”œâ”€â”€ pending-queue/
â”‚   â”‚       â”‚   â””â”€â”€ risk-assessment-scorecard/
â”‚   â”‚       â”œâ”€â”€ model/
â”‚   â”‚       â”‚   â””â”€â”€ underwriting.models.ts
â”‚   â”‚       â”œâ”€â”€ services/
â”‚   â”‚       â”‚   â””â”€â”€ underwriting-api.service.{ts,spec.ts}
â”‚   â”‚       â””â”€â”€ state/
â”‚   â”‚           â”œâ”€â”€ underwriting.actions.ts
â”‚   â”‚           â”œâ”€â”€ underwriting.effects.{ts,spec.ts}
â”‚   â”‚           â”œâ”€â”€ underwriting.reducer.{ts,spec.ts}
â”‚   â”‚           â””â”€â”€ underwriting.selectors.ts
â”‚   â””â”€â”€ shared/
â”‚       â”œâ”€â”€ components/
â”‚       â”‚   â”œâ”€â”€ error-banner/
â”‚       â”‚   â”œâ”€â”€ loading-spinner/
â”‚       â”‚   â””â”€â”€ navbar/
â”‚       â”œâ”€â”€ directives/
â”‚       â”‚   â”œâ”€â”€ has-role.directive.{ts,spec.ts}
â”‚       â”‚   â”œâ”€â”€ risk-level-gauge.directive.{ts,spec.ts}
â”‚       â”‚   â””â”€â”€ status-badge.directive.{ts,spec.ts}
â”‚       â”œâ”€â”€ services/
â”‚       â”‚   â””â”€â”€ notification.service.{ts,spec.ts}
â”‚       â””â”€â”€ validators/
â”‚           â”œâ”€â”€ coverage-bounds.validator.{ts,spec.ts}
â”‚           â”œâ”€â”€ date-sequence.validator.{ts,spec.ts}
â”‚           â”œâ”€â”€ phone.validator.{ts,spec.ts}
â”‚           â””â”€â”€ pin-code.validator.{ts,spec.ts}
â”œâ”€â”€ styles.scss
â””â”€â”€ main.ts
```

---

## Getting Started & Developer Commands

### Prerequisites
* **Node.js**: v20 or higher
* **npm**: v10 or higher
* **Backend Gateway**: Spring Cloud Gateway running at `http://localhost:8080`

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start Local Development Server
```powershell
npm start
```
Navigate your browser to `http://localhost:4200/`.

### 3. Run Unit Test Suite
Unit tests run using Vitest. To run all unit tests:
```powershell
npm test -- --watch=false
```

### 4. Build for Production
```powershell
npm run build
```
Production build bundles will be emitted to `dist/irrigashield-frontend`.