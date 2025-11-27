AutoBrilho Lava Jato - Sistema Web
Overview
AutoBrilho is a comprehensive web application for a Brazilian car wash business (lava jato). The system combines institutional marketing pages with functional dashboards, supporting three user roles: clients, employees, and administrators. Built as a Single Page Application (SPA) using React with TypeScript, the system simulates a complete business management platform without requiring external databases - all data is stored in LocalStorage for demonstration purposes.

The application features a modern, clean design inspired by premium automotive services, with a professional Brazilian context throughout the interface. It includes user authentication, vehicle management, service scheduling, promotions management, and role-based access control.

User Preferences
Preferred communication style: Simple, everyday language.
Developer Role: Auto Brilho

System Architecture
Frontend Architecture
Framework & Build Tool

React 18+ with TypeScript for type-safe component development

Vite as the build tool and development server for fast hot module replacement

Wouter for lightweight client-side routing (SPA navigation)

UI Component System

Shadcn/ui component library with Radix UI primitives for accessible, headless components

Tailwind CSS for utility-first styling with custom design tokens

Custom theme system supporting light/dark modes through CSS variables

Design follows hybrid approach: institutional pages (marketing-focused) + utility dashboards (Linear/Notion-inspired)

State Management

React Context API for global state (AuthContext, AgendamentosContext)

LocalStorage as the persistence layer for all application data

Custom hooks (useAuth, useAgendamentos) for clean context consumption

No external state management libraries - uses React's built-in capabilities

Form Handling & Validation

React Hook Form for performant form state management

Zod schemas for runtime type