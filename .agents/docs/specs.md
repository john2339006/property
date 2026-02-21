# Product Requirements Document (Engineering-Grade)
Property Management Platform (B2B, Multi-Tenant)

## 1. Overview

### 1.1 Purpose
Build a multi-tenant property management platform for property management companies to manage:
- Houses / properties
- Owners
- Management fee billing
- Invoicing
- Auditable financial records

The system prioritizes data correctness, auditability, configurability, and long-term data retention.

### 1.2 Goals
- Centralize owner and house information
- Provide configurable, company-defined billing rules
- Generate accurate, immutable invoices
- Support compliance and auditing requirements
- Scale to medium-sized management companies

### 1.3 Non-Goals (Explicit)
Out of scope for this phase:
- Tenant (renter) management
- Payment processing
- Notifications (email/SMS/in-app)
- Owner portals
- Mobile applications
- External accounting or ERP integrations
- Tax calculation

## 2. Stakeholders & Users

### 2.1 User Roles (Fixed)
| Role | Description |
| :--- | :--- |
| `platform_admin` | Global system administration |
| `company_admin` | Full control within company |
| `finance` | Billing configuration, overrides, invoices |
| `operator` | House and owner operations |
| `read_only` | Reporting and audit access |

### 2.2 Permission Matrix (Summary)
| Capability | Roles |
| :--- | :--- |
| Create/edit owners | `platform_admin`, `company_admin` |
| Create/edit houses | `platform_admin`, `company_admin`, `operator` |
| Configure billing types | `platform_admin`, `company_admin`, `finance` |
| Override fees | `platform_admin`, `company_admin`, `finance` |
| View invoices/reports | all roles |

## 3. Multi-Tenancy Model
- Each Management Company is a hard tenant
- Strict row-level isolation between companies
- No cross-company data visibility
- Platform admins bypass tenant isolation for support only

## 4. Core Domains & Bounded Contexts
- **Company Management**
- **Property Management**
- **Billing Configuration**
- **Billing & Invoicing** (Core Domain)
- **Reporting & Audit**

## 5. Functional Requirements

### 5.1 Management Company
#### 5.1.1 Data Fields
- `company_id` (UUID)
- `legal_name`
- `registration_license_id`
- `contact_information`
- `billing_information`
- `default_billing_period` (monthly | annual)
- `currency` (single, immutable)
- `created_at`, `updated_at`

#### 5.1.2 Rules
- One company manages multiple buildings, cities, regions
- All billing types are company-defined
- Company configuration changes do not require redeploy

### 5.2 User Management
#### 5.2.1 Authentication
- Username + password
- Email verification required
- No SSO in current phase

#### 5.2.2 Authorization
- Role-based access control (RBAC)
- Row-level security by `company_id`

### 5.3 Owner Management
#### 5.3.1 Owner Entity
**Owner (Aggregate Root)**
- `owner_id` (UUID)
- `entity_type` (individual | organization)
- `current_version_id`

#### 5.3.2 OwnerVersion (Versioned)
- `full_legal_name`
- `id_number`
- `tax_id`
- `invoicing_name`
- `phone`
- `email`
- `mailing_address`
- `preferred_contact_method`
- `effective_from`
- `effective_to`
- `is_latest`

#### 5.3.3 Rules
- Owners are versioned; historical data is immutable
- Owners may be associated with multiple houses
- Owner records are retained indefinitely

### 5.4 House / Property Management
#### 5.4.1 House Entity
**House (Aggregate Root)**
- `house_id` (UUID)
- `company_id`
- `status` (active | sold_not_active | not_sold)
- `management_start_date`
- `management_end_date`
- `current_version_id`

#### 5.4.2 HouseVersion
- `building_no`
- `unit_no`
- `level_no`
- `door_no`
- `area_sqm`
- `effective_from`
- `effective_to`
- `is_latest`

#### 5.4.3 Ownership
- A house may have multiple owners
- Ownership has no percentage split
- All owners appear on invoices

### 5.5 Billing Configuration
#### 5.5.1 BillingType (Company-Defined)
- `billing_type_id` (UUID)
- `company_id`
- `name`
- `current_version_id`

#### 5.5.2 BillingTypeVersion
- `fee_model` (AREA | TIERED)
- `price_per_sqm`
- `usage_type` (personal | business | public)
- `effective_from`
- `effective_to`
- `is_latest`

#### 5.5.3 Rules
- One billing type per house per billing period
- Billing type changes apply only to future periods
- Historical billing uses configuration snapshots

### 5.6 Discounts
#### 5.6.1 Discount Entity
- `discount_id` (UUID)
- `company_id`
- `percentage`
- `one_time`
- `created_at`

#### 5.6.2 Rules
- Discounts are house-level
- Percentage only
- One-time use
- Can be edited or deleted unless already applied

### 5.7 Billing & Fee Calculation (Core Domain)
#### 5.7.1 Bill
**Bill (Aggregate Root)**
- `bill_id` (UUID)
- `house_id`
- `billing_period`
- `current_version_id`

#### 5.7.2 BillVersion
- `calculated_amount`
- `discount_applied`
- `overridden_amount` (optional)
- `created_by`
- `created_at`
- `reason`
- `is_latest`

#### 5.7.3 Rules
- Bills are immutable once issued
- Overrides create new versions
- Latest version flagged for performance
- All historical versions retained

### 5.8 Invoicing
#### 5.8.1 Invoice
**Invoice (Aggregate Root)**
- `invoice_id` (UUID)
- `bill_version_id`
- `house_id`
- `billing_period`
- `status` (draft | issued | paid | voided)
- `created_at`

#### 5.8.2 InvoiceLineItem
- `house_identifier` (building-unit-door)
- `owner_name`
- `amount`

#### 5.8.3 Rules
- One or more invoices per house per period
- Invoices are immutable once issued
- Regeneration allowed without mutating history
- Downloadable and printable (PDF)

## 6. Search & Query Requirements

### 6.1 Searchable Entities
- Owners
- Houses
- Invoices
- Billing types
- Payment history
- Current bills

### 6.2 Filters
- Paid / unpaid invoices
- Billing period
- House status

### 6.3 Pagination
- Page size options: 50, 100

## 7. Reporting & Analytics

### 7.1 Financial Reports
- Total fees per period
- Outstanding invoices
- Discount usage

### 7.2 Property Reports
- Active vs inactive houses
- Houses by building/unit/city
- Owner count per house

### 7.3 Audit Reports
- Fee overrides by user
- Billing adjustments

### 7.4 Trends
- Fees over time

## 8. Data Import & Export

### 8.1 Import
- CSV / Excel
- Houses, owners, billing types
- Validation enforced

### 8.2 Export
- Excel format
- Owners, houses, invoices, reports

## 9. Security & Compliance

### 9.1 Encryption
- At rest (database)
- In transit (HTTPS)

### 9.2 Audit Logging
All CRUD operations on:
- Owners
- Houses
- Billing types
- Bills
- Invoices
- Discounts

Retention: 3 years

### 9.3 Compliance
- Personal data protection
- Financial record retention

## 10. Performance & Scale

### 10.1 Scale Targets
- 5,000 houses per company
- 10,000 owners per company
- ~60,000 invoices per company per year

### 10.2 Performance Targets
- View operations: near-instant
- Search/filter: ≤ 3 seconds
- Invoice generation: medium latency acceptable

### 10.3 Concurrency
- ~5 users per company
- ~200 concurrent users platform-wide

## 11. Availability & Disaster Recovery
| Metric | Target |
| :--- | :--- |
| Uptime | 99% |
| Backup | Daily incremental |
| RTO | 1 hour |
| RPO | 1 day |
| Restore | Time-window based |

## 12. Deployment & Operations

### 12.1 Deployment Model
- Hybrid
- Cloud provider: Alibaba Cloud

### 12.2 Environments
- `dev`
- `test`
- `production`

### 12.3 Release Strategy
- Ad-hoc releases
- Zero-downtime deployments

## 13. Technical Constraints

### 13.1 Architectural Principles
- Domain-Driven Design (DDD)
- Clear bounded contexts
- Immutable financial records

### 13.2 Required Technologies
- Validation: Zod
- Authentication: NextAuth.js or custom JWT
- Date handling: date-fns or dayjs
- API client: native fetch + TypeScript

## 14. Success Criteria

### Functional
- Correct billing calculations
- Accurate invoices
- Complete audit trails

### Operational
- Stable under expected load
- Backup and recovery objectives met

### Failure Conditions
- Incorrect billing
- Lost audit data
- Tenant data leakage

## 15. Open for Next Phase
- Payments
- Notifications
- Owner portals
- Accounting integrations
- Tax handling
