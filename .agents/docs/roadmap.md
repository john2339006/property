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

- [ ] **1.1** Project Scaffolding <!-- id: 1.1 -->
    - [ ] Initialize Next.js 15+ project with TypeScript.
    - [ ] Configure `tsconfig.json` paths for DDD layers (`@domain`, `@application`, `@infrastructure`, `@presentation`).
    - [ ] Setup ESLint and Prettier.
    - [ ] Initialize Git repository.
    - **Deps:** None

- [ ] **1.2** Shared Kernel & Domain Primitives <!-- id: 1.2 -->
    - [ ] Create `Shared` kernel for common value objects (e.g., `UUID`, `Money`, `Address`).
    - [ ] Define base interfaces for Aggregates, Entities, and Value Objects.
    - [ ] Define `Result` and `Error` handling classes for the domain layer.
    - **Deps:** 1.1

- [ ] **1.3** Database & Prisma Setup <!-- id: 1.3 -->
    - [ ] Install Prisma and initialize PostgreSQL connection.
    - [ ] Define initial `schema.prisma` (can be empty or minimal).
    - [ ] Configure `Docker` for local PostgreSQL (optional but recommended).
    - [ ] Create `PrismaService` or infrastructure database module.
    - **Deps:** 1.1

- [ ] **1.4** UI Design System Base <!-- id: 1.4 -->
    - [ ] Setup Styling solution (CSS Modules or Tailwind as per tech stack).
    - [ ] Create base layout component (Shell) with placeholder navigation.
    - [ ] Implement basic accessible UI components (Button, Input, Card, Table).
    - **Deps:** 1.1

---

## Phase 2: Core Domain - Management Company (Multi-Tenancy Root)

Implementing the tenant model which isolates data.

- [ ] **2.1** Company Domain Model <!-- id: 2.1 -->
    - [ ] Define `Company` Aggregate Root (`company_id`, `legal_name`, `settings`).
    - [ ] Define `BillingPeriod` value object.
    - [ ] Create `ICompanyRepository` interface.
    - **Deps:** 1.2

- [ ] **2.2** Company Persistence <!-- id: 2.2 -->
    - [ ] Update `schema.prisma` with `Company` model.
    - [ ] Implement `PrismaCompanyRepository`.
    - [ ] Create database migration.
    - **Deps:** 2.1, 1.3

- [ ] **2.3** Company Application Service <!-- id: 2.3 -->
    - [ ] Implement `CreateCompanyUseCase`.
    - [ ] Implement `GetCompanyProfileUseCase`.
    - [ ] Define DTOs for Company API.
    - **Deps:** 2.2

- [ ] **2.4** Company API & UI <!-- id: 2.4 -->
    - [ ] Create API routes for Company management.
    - [ ] Build "Company Settings" page.
    - **Deps:** 2.3, 1.4

---

## Phase 3: User Management & Authentication

Security layer and user access control.

- [ ] **3.1** User Identity Domain <!-- id: 3.1 -->
    - [ ] Define `User` Entity (`username`, `email`, `role`, `company_id`).
    - [ ] Define `Role` enum (`platform_admin`, `company_admin`, `finance`, `operator`, `read_only`).
    - [ ] Create `IUserRepository`.
    - **Deps:** 2.1

- [ ] **3.2** Authentication Infrastructure <!-- id: 3.2 -->
    - [ ] Install and configure NextAuth.js (or specified Auth provider).
    - [ ] Implement Login/Logout logic.
    - [ ] Update `schema.prisma` for Users.
    - **Deps:** 3.1, 1.3

- [ ] **3.3** Security Middleware (RBAC) <!-- id: 3.3 -->
    - [ ] Implement customized Middleware to check `company_id` and `Role`.
    - [ ] Ensure tenant isolation (users can only access their company's data).
    - **Deps:** 3.2

- [ ] **3.4** User Management Features <!-- id: 3.4 -->
    - [ ] Implement `InviteUserUseCase` or `CreateUserUseCase`.
    - [ ] Build User List and User Detail pages.
    - **Deps:** 3.3, 2.4

---

## Phase 4: Core Domain - Common (Owner)

The Owner aggregate implementation, focusing on versioning and immutability.

- [ ] **4.1** Owner Domain Modeling <!-- id: 4.1 -->
    - [ ] Define `Owner` Aggregate Root.
    - [ ] Define `OwnerVersion` entity (`full_legal_name`, `contact_info`, `effective_range`).
    - [ ] Create `IOwnerRepository`.
    - **Deps:** 1.2

- [ ] **4.2** Owner Persistence & Migration <!-- id: 4.2 -->
    - [ ] Update `schema.prisma` with `Owner` and `OwnerVersion`.
    - [ ] Implement `PrismaOwnerRepository` carrying out the versioning logic (create new version on update).
    - **Deps:** 4.1, 1.3

- [ ] **4.3** Owner Application Services <!-- id: 4.3 -->
    - [ ] Implement `CreateOwnerUseCase`.
    - [ ] Implement `UpdateOwnerUseCase` (creates new version).
    - [ ] Implement `GetOwnerHistoryUseCase`.
    - **Deps:** 4.2

- [ ] **4.4** Owner UI <!-- id: 4.4 -->
    - [ ] Build Owner List with search/filter.
    - [ ] Build Owner Detail/Edit form.
    - **Deps:** 4.3, 1.4

---

## Phase 5: Core Domain - Property Management (House)

The inventory system (Houses) that links to Companies and Owners.

- [ ] **5.1** House Domain Modeling <!-- id: 5.1 -->
    - [ ] Define `House` Aggregate Root.
    - [ ] Define `HouseVersion` entity (`building`, `unit`, `area_sqm`).
    - [ ] Define `Ownership` value object/entity (Relation between House and Owner).
    - **Deps:** 4.1

- [ ] **5.2** House Persistence <!-- id: 5.2 -->
    - [ ] Update `schema.prisma` for `House`, `HouseVersion`.
    - [ ] Implement repository logic for House versioning.
    - **Deps:** 5.1, 4.2

- [ ] **5.3** House Operation Services <!-- id: 5.3 -->
    - [ ] Implement `RegisterHouseUseCase`.
    - [ ] Implement `UpdateHouseSpecsUseCase`.
    - [ ] Implement `AssignOwnerToHouseUseCase`.
    - **Deps:** 5.2, 4.3

- [ ] **5.4** Property UI <!-- id: 5.4 -->
    - [ ] Build House List text view.
    - [ ] Build House creation wizard (Building -> Unit -> Owner).
    - **Deps:** 5.3

---

## Phase 6: Core Domain - Billing Configuration

Configuring how fees are calculated.

- [ ] **6.1** Billing Type Domain <!-- id: 6.1 -->
    - [ ] Define `BillingType` Aggregate and `BillingTypeVersion`.
    - [ ] Define `FeeModel` (Area-based vs Tiered).
    - [ ] Define `Discount` entity.
    - **Deps:** 2.1

- [ ] **6.2** Billing Persistence <!-- id: 6.2 -->
    - [ ] Update `schema.prisma`.
    - [ ] Migration for Billing Types.
    - **Deps:** 6.1

- [ ] **6.3** Billing Configuration UI <!-- id: 6.3 -->
    - [ ] Interface for defining Billing Types (Price per sqm, etc.).
    - [ ] Interface for managing Discounts.
    - **Deps:** 6.2

---

## Phase 7: Core Domain - Billing & Fee Calculation

The engine that generates bills.

- [ ] **7.1** Bill Domain Logic <!-- id: 7.1 -->
    - [ ] Define `Bill` Aggregate Root and `BillVersion`.
    - [ ] Implement Domain Service: `FeeCalculationService`.
        - Logic: `Area * Price` or specialized tiers.
        - Logic: Apply active discounts.
    - **Deps:** 6.1, 5.1

- [ ] **7.2** Bill Generation Service <!-- id: 7.2 -->
    - [ ] Implement `GenerateBillsForPeriodUseCase` (Batch job).
    - [ ] Implement `CalculateSingleBillUseCase` (Preview).
    - **Deps:** 7.1, 6.3, 5.3

- [ ] **7.3** Bill Review UI <!-- id: 7.3 -->
    - [ ] Dashboard to view generated bills for a period.
    - [ ] Feature to "Override" a bill (creating a new BillVersion).
    - **Deps:** 7.2

---

## Phase 8: Core Domain - Invoicing

Finalizing bills into immutable legal documents.

- [ ] **8.1** Invoice Domain <! id: 8.1 -->
    - [ ] Define `Invoice` Aggregate.
    - [ ] Define `InvoiceStatus` state machine.
    - **Deps:** 7.1

- [ ] **8.2** Invoice Generation <!-- id: 8.2 -->
    - [ ] Implement `IssueInvoiceUseCase` (Locks the Bill).
    - [ ] PDF Generation Service (using a library like `react-pdf` or server-side generator).
    - **Deps:** 8.1, 7.2

- [ ] **8.3** Invoice Management UI <!-- id: 8.3 -->
    - [ ] List of issued invoices.
    - [ ] Actions: View PDF, Void, Mark Paid.
    - **Deps:** 8.2

---

## Phase 9: Reporting & Audit

- [ ] **9.1** Audit Logging System <!-- id: 9.1 -->
    - [ ] Create `AuditLog` entity/table.
    - [ ] Implement an Interceptor or Repository enhancement to auto-log changes to core aggregates.
    - **Deps:** 1.2

- [ ] **9.2** Reporting Service <!-- id: 9.2 -->
    - [ ] Implement SQL queries for Financial Reports (Total fees, collected vs pending).
    - [ ] Implement Operational Reports (Occupancy, etc.).
    - **Deps:** 8.2

- [ ] **9.3** Dashboard UI <!-- id: 9.3 -->
    - [ ] Admin Dashboard with charts/metrics.
    - **Deps:** 9.2

---

## Phase 10: Import/Export Operations

- [ ] **10.1** Data Import <!-- id: 10.1 -->
    - [ ] Implement CSV parser for Bulk Import of Owners/Houses.
    - [ ] Validation logic for bulk data.
    - **Deps:** 5.3

- [ ] **10.2** Data Export <!-- id: 10.2 -->
    - [ ] Implement generic Excel export for grids (Ag-Grid or similar).
    - **Deps:** 9.2

