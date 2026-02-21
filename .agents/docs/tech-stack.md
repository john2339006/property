# Technology Stack

## Property Management Platform - Haineng

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **UI Library:** React 19+
- **Styling:** CSS Modules (or Tailwind CSS - to be decided)
- **State Management:** React Context API / Zustand (for complex state)

### Backend
- **Runtime:** Node.js (via Next.js API Routes)
- **Language:** TypeScript
- **API Architecture:** RESTful API (via Next.js App Router API routes)

### Database
- **Database:** PostgreSQL 17
- **ORM:** Prisma
- **Migration Tool:** Prisma Migrate

### Architecture Pattern
- **Pattern:** Domain-Driven Design (DDD)
- **Layer Organization:**
  - Domain Layer: Entities, Value Objects, Aggregates, Repository Interfaces, Domain Services
  - Application Layer: Use Cases, DTOs, Application Services, Ports
  - Infrastructure Layer: Database, Repository Implementations, External Services
  - Presentation Layer: API Routes, UI Components, Pages

### Cloud & Infrastructure
- **Cloud Provider:** Alibaba Cloud
- **Hosting:** Alibaba Cloud ECS / Function Compute (to be decided)
- **Storage:** Alibaba Cloud OSS (Object Storage Service)
- **CDN:** Alibaba Cloud CDN

### Development Tools
- **Package Manager:** npm
- **Code Quality:** ESLint
- **Version Control:** Git
- **IDE:** Visual Studio Code

### Key Libraries
- **Validation:** Zod (runtime validation)
- **Authentication:** NextAuth.js (or custom JWT implementation)
- **Date Handling:** date-fns or dayjs
- **API Client:** Native fetch with TypeScript

### Domain Organization
The project is organized into the following domain contexts:

1. **House** - Residential property management
2. **CarPark** - Parking slot management and leasing
3. **Electric** - Utility management (electricity)
4. **Common** - Shared entities (Owner, etc.)
5. **Other** - Miscellaneous domain objects

Each domain contains:
- Entities
- Value Objects
- Repositories
- Services
- Use Cases
- DTOs
- Domain Events
