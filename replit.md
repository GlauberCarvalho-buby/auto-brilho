# AutoBrilho Lava Jato - Sistema Web

## Overview

AutoBrilho is a comprehensive web application for a Brazilian car wash business (lava jato). The system combines institutional marketing pages with functional dashboards, supporting three user roles: clients, employees, and administrators. Built as a Single Page Application (SPA) using React with TypeScript, the system simulates a complete business management platform without requiring external databases - all data is stored in LocalStorage for demonstration purposes.

The application features a modern, clean design inspired by premium automotive services, with a professional Brazilian context throughout the interface. It includes user authentication, vehicle management, service scheduling, promotions management, and role-based access control.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (SPA navigation)

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting light/dark modes through CSS variables
- Design follows hybrid approach: institutional pages (marketing-focused) + utility dashboards (Linear/Notion-inspired)

**State Management**
- React Context API for global state (AuthContext, AgendamentosContext)
- LocalStorage as the persistence layer for all application data
- Custom hooks (useAuth, useAgendamentos) for clean context consumption
- No external state management libraries - uses React's built-in capabilities

**Form Handling & Validation**
- React Hook Form for performant form state management
- Zod schemas for runtime type validation and schema definition
- Shared validation schemas between frontend validation and type definitions
- Error handling with user-friendly Portuguese messages

**Data Flow Pattern**
- Context providers wrap the application at the root level
- Components consume context through custom hooks
- All CRUD operations flow through context methods
- LocalStorage utilities (save/load/remove) centralize persistence logic
- Mock data initialization on first load

### Authentication & Authorization

**Authentication System**
- Simulated authentication without backend API calls
- Three user roles: `cliente` (client), `funcionario` (employee), `administrador` (administrator)
- Session persistence through LocalStorage with mock token
- Protected routes using `ProtegeRota` wrapper component
- Role-based access control for dashboard pages

**User Flow**
- Login page validates credentials against LocalStorage user list
- New clients can self-register through signup page
- Employees and administrators are pre-seeded as mock data
- Logout clears session from LocalStorage
- Automatic redirection based on user role after login

### Data Models & Schema

**Core Entities** (defined in `shared/schema.ts` using Zod)
- **Usuario**: User accounts with role-based access (id, nome, email, senha, papel, telefone, dataCriacao)
- **Veiculo**: Client vehicles (id, clienteId, placa, modelo, marca, cor, ano)
- **Servico**: Available car wash services (id, nome, descricao, preco, duracao, categoria, icone, disponivel)
- **Agendamento**: Service bookings (id, clienteId, veiculoId, servicoId, data, horario, status, funcionarioId, observacoes, dataCriacao)
- **Promocao**: Active promotions (id, titulo, descricao, desconto, dataInicio, dataFim, ativo)

**Schema Pattern**
- Base schema with all fields using Zod validators
- Insert schemas omit auto-generated fields (id, dataCriacao)
- TypeScript types inferred from Zod schemas for type safety
- Enum types for status fields (StatusAgendamento) and role types (PapelUsuario)

### Page Structure & Routing

**Public Pages** (institutional/marketing)
- `/` - Home with hero section and service highlights
- `/sobre` - About page with company mission, vision, values
- `/servicos` - Service catalog with detailed descriptions
- `/promocoes` - Active promotions and special offers
- `/contato` - Contact form and business information
- `/login` - Authentication page for all user types
- `/cadastro` - Client self-registration

**Protected Dashboards** (role-based)
- `/dashboard/cliente` - Client dashboard (vehicle management, booking history, new appointments)
- `/dashboard/funcionario` - Employee dashboard (today's appointments, status updates, search)
- `/dashboard/administrador` - Admin dashboard (statistics, user management, promotion controls)
- `/agendamentos` - Appointment management (accessible by all logged-in users, filtered by role)

**Route Protection Strategy**
- `ProtegeRota` component wraps protected routes
- Checks authentication status from AuthContext
- Validates user role against `papeisPermitidos` prop
- Redirects unauthenticated users to `/login`
- Redirects unauthorized users to home page
- Shows loading state during authentication check

### Component Architecture

**Component Categories**
1. **Layout Components**: Cabecalho (header with navigation), Rodape (footer)
2. **Page Components**: Full-page views for each route
3. **Feature Components**: CardAgendamento, CardServico, CardVeiculo, CardPromocao
4. **UI Components**: Shadcn/ui library components in `components/ui/`
5. **Utility Components**: ProtegeRota, BadgeStatus

**Component Patterns**
- Functional components with TypeScript interfaces for props
- Custom hooks for accessing contexts
- Compound components for complex UI (Card with Header/Content/Footer)
- Conditional rendering based on user role and application state
- Data-testid attributes for testing

### Styling System

**Tailwind Configuration**
- Custom color palette using CSS variables for theming
- Extended border radius values (lg: 9px, md: 6px, sm: 3px)
- Custom shadows and elevation utilities (hover-elevate, active-elevate)
- Responsive breakpoints following mobile-first approach
- Font families: Inter (primary), Poppins (headings), with Google Fonts integration

**Design Tokens**
- HSL color space for all theme colors with alpha channel support
- Semantic color naming (primary, secondary, muted, accent, destructive)
- Card-specific colors (card-border for subtle borders)
- Dark mode support through CSS variable overrides

**Typography Scale**
- Page titles: text-4xl/5xl font-bold
- Section headings: text-2xl/3xl font-semibold
- Card titles: text-xl font-semibold
- Body text: text-base with relaxed leading
- Consistent spacing using Tailwind's spacing scale

### Business Logic Layer

**Service Management**
- Predefined service catalog in `dadosMock.ts`
- Services categorized by type (lavagem, polimento, higienização)
- Each service has price, duration, icon, and availability flag
- Services can be filtered and searched in UI

**Appointment Workflow**
1. Client selects vehicle (or adds new one)
2. Chooses service from available catalog
3. Picks date and time slot (predefined hourly slots)
4. Submits appointment with optional notes
5. Status starts as "aguardando" (waiting)
6. Employee can update to "em_andamento" or "finalizado"
7. Client or admin can cancel appointments

**Vehicle Management**
- Clients can register multiple vehicles
- Brazilian license plate format validation (7-8 characters)
- Vehicle details: plate, model, brand, color, year
- Vehicles linked to client account
- Used for appointment creation

**Promotion System**
- Admins can toggle promotion active/inactive status
- Promotions have validity periods (start/end dates)
- Display discount percentage and description
- Filtered to show only active promotions on public pages

## External Dependencies

### UI & Styling
- **@radix-ui/react-*** (multiple packages): Headless UI primitives for accessible components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx** & **tailwind-merge**: Utility for merging Tailwind classes
- **lucide-react**: Icon library with consistent design system

### Forms & Validation
- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Zod integration for react-hook-form
- **zod**: Schema validation and TypeScript type inference
- **drizzle-zod**: Integration between Drizzle ORM and Zod (configured but not actively used)

### Data & State
- **@tanstack/react-query**: Server state management (configured but minimal usage due to LocalStorage approach)
- **date-fns**: Date manipulation and formatting with pt-BR locale support

### Development & Build
- **vite**: Fast build tool and dev server
- **@vitejs/plugin-react**: React support for Vite
- **typescript**: Type-safe development
- **tsx**: TypeScript execution for build scripts

### Backend (Server-side - minimal usage)
- **express**: Web server framework (serves built SPA)
- **drizzle-orm**: Database ORM (configured for future PostgreSQL integration)
- **@neondatabase/serverless**: Neon Postgres adapter for Drizzle
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used)

### Routing & Navigation
- **wouter**: Lightweight React router (< 2KB)

### Carousel & Rich Components
- **embla-carousel-react**: Carousel/slider functionality
- **cmdk**: Command palette component

**Note on Database**: The application is currently configured with Drizzle and PostgreSQL dependencies, but all data operations use LocalStorage. The database configuration in `drizzle.config.ts` and schema definitions in `shared/schema.ts` are prepared for future migration to PostgreSQL, but the code agent may add actual database integration if needed.