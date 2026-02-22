# Project Roadmap & Implementation Plan

This document outlines the step-by-step implementation plan for the Property Management Platform (Haineng), based on the Engineering-Grade PRD and Tech Stack.

**Legend:**
- `[ ]` To Do
- `[ ]` In Progress
- `[ ]` Done
- **ID**: Unique identifier for the task.
- **Deps**: Dependencies that must be completed before this task.

---

## Phase 1: Project Initialization & Infrastructure

Foundational setup for the Next.js application, DDD structure, and database connectivity.

- [x] **1.1** Project Scaffolding <!-- id: 1.1 -->
    - [x] Initialize Next.js 15+ project with TypeScript.
    - [x] Configure `tsconfig.json` paths for DDD layers (`@domain`, `@application`, `@infrastructure`, `@presentation`).
    - [x] Setup ESLint and Prettier.
    - [x] Initialize Git repository.
    - **Deps:** None

- [x] **1.2** Shared Kernel & Domain Primitives <!-- id: 1.2 -->
    - [x] Create `Shared` kernel for common value objects (e.g., `UUID`, `Money`, `Address`).
    - [x] Define base interfaces for Aggregates, Entities, and Value Objects.
    - [x] Define `Result` and `Error` handling classes for the domain layer.
    - **Deps:** 1.1

- [x] **1.3** Database & Prisma Setup <!-- id: 1.3 -->
    - [x] Install Prisma and initialize PostgreSQL connection.
    - [x] Define initial `schema.prisma` (can be empty or minimal).
    - [x] Configure `Docker` for local PostgreSQL (optional but recommended).
    - [x] Create `PrismaService` or infrastructure database module.
    - **Deps:** 1.1

- [x] **1.4** UI Design System Base <!-- id: 1.4 -->
    - [x] Setup Styling solution (CSS Modules or Tailwind as per tech stack).
    - [x] Create base layout component (Shell) with placeholder navigation.
    - [x] Implement basic accessible UI components (Button, Input, Card, Table).
    - **Deps:** 1.1

---

## Phase 2: Core Domain - Management Company (Multi-Tenancy Root)

Implementing the tenant model which isolates data.

- [x] **2.1** Company Domain Model <!-- id: 2.1 -->
    - [x] Define `Company` Aggregate Root (`company_id`, `legal_name`, `settings`).
    - [x] Define `BillingPeriod` value object.
    - [x] Create `ICompanyRepository` interface.
    - **Deps:** 1.2

- [x] **2.2** Company Persistence <!-- id: 2.2 -->
    - [x] Update `schema.prisma` with `Company` model.
    - [x] Implement `PrismaCompanyRepository`.
    - [x] Create database migration.
    - **Deps:** 2.1, 1.3

- [x] **2.3** Company Application Service <!-- id: 2.3 -->
    - [x] Implement `CreateCompanyUseCase`.
    - [x] Implement `GetCompanyProfileUseCase`.
    - [x] Define DTOs for Company API.
    - **Deps:** 2.2

- [x] **2.4** Company API & UI <!-- id: 2.4 -->
    - [x] Create API routes for Company management.
    - [x] Build "Company Settings" page.
    - **Deps:** 2.3, 1.4

---

## Phase 3: User Management & Authentication

Security layer and user access control.

- [x] **3.1** User Identity Domain <!-- id: 3.1 -->
    - [x] Define `User` Entity (`username`, `email`, `role`, `company_id`).
    - [x] Define `Role` enum (`platform_admin`, `company_admin`, `finance`, `operator`, `read_only`).
    - [x] Create `IUserRepository`.
    - **Deps:** 2.1

- [x] **3.2** Authentication Infrastructure <!-- id: 3.2 -->
    - [x] Install and configure NextAuth.js (or specified Auth provider).
    - [x] Implement Login/Logout logic.
    - [x] Update `schema.prisma` for Users.
    - **Deps:** 3.1, 1.3

- [x] **3.3** Security Middleware (RBAC) <!-- id: 3.3 -->
    - [x] Implement customized Middleware to check `company_id` and `Role`.
    - [x] Ensure tenant isolation (users can only access their company's data).
    - **Deps:** 3.2

- [x] **3.4** User Management Features <!-- id: 3.4 -->
    - [x] Implement `InviteUserUseCase` or `CreateUserUseCase`.
    - [x] Build User List and User Detail pages.
    - **Deps:** 3.3, 2.4

---

## Phase 4: Core Domain - Common (Owner)

The Owner aggregate implementation, focusing on versioning and immutability.

- [x] **4.1** Owner Domain Modeling <!-- id: 4.1 -->
    - [x] Define `Owner` Aggregate Root.
    - [x] Define `OwnerVersion` entity (`full_legal_name`, `contact_info`, `effective_range`).
    - [x] Create `IOwnerRepository`.
    - **Deps:** 1.2

- [x] **4.2** Owner Persistence & Migration <!-- id: 4.2 -->
    - [x] Update `schema.prisma` with `Owner` and `OwnerVersion`.
    - [x] Implement `PrismaOwnerRepository` carrying out the versioning logic (create new version on update).
    - **Deps:** 4.1, 1.3

- [x] **4.3** Owner Application Services <!-- id: 4.3 -->
    - [x] Implement `CreateOwnerUseCase`.
    - [x] Implement `UpdateOwnerUseCase` (creates new version).
    - [x] Implement `GetOwnerHistoryUseCase`.
    - **Deps:** 4.2

- [x] **4.4** Owner UI <!-- id: 4.4 -->
    - [x] Build Owner List with search/filter.
    - [x] Build Owner Detail/Edit form.
    - **Deps:** 4.3, 1.4

---

## Phase 5: Core Domain - Property Management (House)

The inventory system (Houses) that links to Companies and Owners.

- [x] **5.1** House Domain Modeling <!-- id: 5.1 -->
    - [x] Define `House` Aggregate Root.
    - [x] Define `HouseVersion` entity (`building`, `unit`, `area_sqm`).
    - [x] Define `Ownership` value object/entity (Relation between House and Owner).
    - **Deps:** 4.1

- [x] **5.2** House Persistence <!-- id: 5.2 -->
    - [x] Update `schema.prisma` for `House`, `HouseVersion`.
    - [x] Implement repository logic for House versioning.
    - **Deps:** 5.1, 4.2

- [x] **5.3** House Operation Services <!-- id: 5.3 -->
    - [x] Implement `RegisterHouseUseCase`.
    - [x] Implement `UpdateHouseSpecsUseCase`.
    - [x] Implement `AssignOwnerToHouseUseCase`.
    - **Deps:** 5.2, 4.3

- [x] **5.4** Property UI <!-- id: 5.4 -->
    - [x] Build House List text view.
    - [x] Build House creation wizard (Building -> Unit -> Owner).
    - **Deps:** 5.3

---

## Phase 6: Core Domain - Billing Configuration

Configuring how fees are calculated.

- [x] **6.1** Billing Type Domain <!-- id: 6.1 -->
    - [x] Define `BillingType` Aggregate and `BillingTypeVersion`.
    - [x] Define `FeeModel` (Area-based vs Tiered).
    - [x] Define `Discount` entity.
    - **Deps:** 2.1

- [x] **6.2** Billing Persistence <!-- id: 6.2 -->
    - [x] Update `schema.prisma`.
    - [x] Migration for Billing Types.
    - **Deps:** 6.1

- [x] **6.3** Billing Configuration UI <!-- id: 6.3 -->
    - [x] Interface for defining Billing Types (Price per sqm, etc.).
    - [x] Interface for managing Discounts.
    - **Deps:** 6.2

---

## Phase 7: Core Domain - Billing & Fee Calculation

The engine that generates bills.

- [x] **7.1** Bill Domain Logic <!-- id: 7.1 -->
    - [x] Define `Bill` Aggregate Root and `BillVersion`.
    - [x] Implement Domain Service: `FeeCalculationService`.
        - Logic: `Area * Price` or specialized tiers.
        - Logic: Apply active discounts.
    - **Deps:** 6.1, 5.1

- [x] **7.2** Bill Generation Service <!-- id: 7.2 -->
    - [x] Implement `GenerateBillsForPeriodUseCase` (Batch job).
    - [x] Implement `CalculateSingleBillUseCase` (Preview).
    - **Deps:** 7.1, 6.3, 5.3

- [x] **7.3** Bill Review UI <!-- id: 7.3 -->
    - [x] Dashboard to view generated bills for a period.
    - [x] Feature to "Override" a bill (creating a new BillVersion).
    - **Deps:** 7.2

---

## Phase 8: Core Domain - Invoicing

Finalizing bills into immutable legal documents.

- [x] **8.1** Invoice Domain <!-- id: 8.1 -->
    - [x] Define `Invoice` Aggregate.
    - [x] Define `InvoiceStatus` state machine.
    - **Deps:** 7.1

- [x] **8.2** Invoice Generation <!-- id: 8.2 -->
    - [x] Implement `IssueInvoiceUseCase` (Locks the Bill).
    - [x] PDF Generation Service (using a library like `react-pdf` or server-side generator).
    - **Deps:** 8.1, 7.2

- [x] **8.3** Invoice Management UI <!-- id: 8.3 -->
    - [x] List of issued invoices.
    - [x] Actions: View PDF, Void, Mark Paid.
    - **Deps:** 8.2

---

## Phase 9: Reporting & Audit

- [x] **9.1** Audit Logging System <!-- id: 9.1 -->
    - [x] Create `AuditLog` entity/table.
    - [x] Implement an Interceptor or Repository enhancement to auto-log changes to core aggregates.
    - **Deps:** 1.2

- [x] **9.2** Reporting Service <!-- id: 9.2 -->
    - [x] Implement SQL queries for Financial Reports (Total fees, collected vs pending).
    - [x] Implement Operational Reports (Occupancy, etc.).
    - **Deps:** 8.2

- [x] **9.3** Dashboard UI <!-- id: 9.3 -->
    - [x] Admin Dashboard with charts/metrics.
    - **Deps:** 9.2

---

## Phase 10: Import/Export Operations

- [x] **10.1** Data Import <!-- id: 10.1 -->
    - [x] Implement CSV parser for Bulk Import of Owners/Houses.
    - [x] Validation logic for bulk data.
    - **Deps:** 5.3

- [x] **10.2** Data Export <!-- id: 10.2 -->
    - [x] Implement generic Excel export for grids (Ag-Grid or similar).
    - **Deps:** 9.2

