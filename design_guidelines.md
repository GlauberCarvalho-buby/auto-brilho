# Design Guidelines - Sistema de Lava Jato Brasileiro

## Design Approach

**Hybrid Approach**: This project combines institutional marketing pages with utility-focused dashboards, requiring both visual appeal and functional efficiency.

**Primary References**:
- Institutional pages (Home, Sobre, Serviços): Modern automotive service websites with premium feel
- Dashboard pages: Linear's clean interfaces + Notion's card-based organization
- Forms/Authentication: Stripe's clarity and trust-building approach

**Core Principle**: Professional Brazilian automotive service - trustworthy, modern, efficient, and distinctly Brazilian in context.

---

## Typography Hierarchy

**Font Selection**:
- Primary: Inter or Poppins (clean, modern, professional via Google Fonts)
- Headings: 600-700 weight for authority
- Body: 400 weight for readability
- UI Elements: 500 weight for clarity

**Hierarchy**:
- Page Titles: text-4xl md:text-5xl font-bold
- Section Headings: text-2xl md:text-3xl font-semibold
- Card Titles: text-xl font-semibold
- Body Text: text-base leading-relaxed
- Small Text/Labels: text-sm
- Button Text: text-base font-medium

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-6 or p-8
- Section spacing: py-16 md:py-24
- Card spacing: p-6
- Form field spacing: space-y-4
- Grid gaps: gap-6 or gap-8

**Container Strategy**:
- Marketing pages: max-w-7xl mx-auto px-4
- Dashboard content: max-w-6xl mx-auto px-4
- Forms: max-w-md mx-auto
- Data tables: w-full with horizontal scroll on mobile

---

## Component Library

### Institutional Pages (Home, Sobre, Serviços, Promoções, Contato)

**Hero Section (Home)**:
- Full-width hero with large Brazilian car wash image
- Overlaid headline + subtitle + dual CTAs ("Agendar Lavagem" + "Ver Serviços")
- Subtle gradient overlay for text readability
- Height: min-h-[600px] lg:min-h-[700px]
- CTAs with backdrop-blur-md for buttons on images

**Service Cards**:
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Each card: rounded-lg shadow-lg with hover lift effect
- Icon at top, title, description, pricing, "Agendar" button
- Consistent card heights with flex layout

**Promotion Cards**:
- Horizontal cards on desktop, stacked on mobile
- Badge/tag for discount percentage
- Validity dates clearly displayed
- Visual distinction from service cards

**Contact Form**:
- Single column layout max-w-xl
- Generous input spacing (space-y-6)
- Large submit button
- Contact info sidebar on desktop (two-column: grid-cols-1 lg:grid-cols-2)

### Dashboard Components

**Navigation**:
- Top navbar: Logo left, user menu right, role-specific links
- Mobile: Hamburger menu with slide-out navigation
- Height: h-16, fixed position

**Dashboard Cards (Stats)**:
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Each card: rounded-xl shadow with icon, number (large), label
- Distinct icons for each metric
- Padding: p-6

**Data Tables**:
- Striped rows for readability
- Sticky header on scroll
- Action buttons (icons) in last column
- Responsive: cards on mobile, table on desktop
- Status badges with rounded-full pills

**Forms (Agendamento, Cadastro)**:
- Grouped sections with clear labels
- Input groups: space-y-1.5 per field
- Form sections: space-y-6
- Full-width inputs with consistent height (h-11)
- Dropdown selectors for vehicle/service selection
- Date/time pickers with clear formatting

**Status Badges**:
- Rounded-full pills with px-3 py-1
- Different visual treatments for: Aguardando, Em Andamento, Finalizado
- Always displayed consistently across tables and cards

**Vehicle Cards (Cliente Dashboard)**:
- Grid layout: grid-cols-1 md:grid-cols-2 gap-6
- Shows: Placa, Modelo, Cor, Ano
- Action buttons for edit/delete
- Card-based, not table

**Appointment Cards/List**:
- Timeline-style layout for Funcionário view
- Card-based for Cliente view
- Shows: Vehicle info, service type, date/time, status
- Action buttons context-aware by role

### Shared Components

**Buttons**:
- Primary: Large, rounded-lg, px-6 py-3
- Secondary: Outlined variant
- Icon buttons: Square, consistent size (w-10 h-10)
- Disabled states clearly visible

**Toast Notifications**:
- Fixed position top-right
- Slide-in animation
- Success/error variants
- Auto-dismiss after 4 seconds
- Icons included

**Modal/Dialog**:
- Centered overlay with backdrop
- Max-width based on content (max-w-md to max-w-2xl)
- Rounded corners, generous padding
- Clear close button

---

## Images

**Hero Image (Home)**:
- High-quality Brazilian car wash photo showing professional service
- Modern facility, clean cars, Brazilian context (can include Portuguese signage)
- Bright, inviting, high-end aesthetic
- Placement: Full-width background with gradient overlay

**Service Section Images**:
- Each major service type gets representative image
- Grid of images showing: exterior wash, interior detailing, polishing, etc.
- Authentic Brazilian car wash context

**About Page Images**:
- Team photo showing friendly staff
- Facility photos highlighting modern equipment
- Before/after transformation images if applicable

**Dashboard Icons**:
- Use Heroicons for all UI icons
- Consistent sizing: w-5 h-5 for inline, w-6 h-6 for cards, w-8 h-8 for stats

---

## Responsive Behavior

**Breakpoints**:
- Mobile-first approach
- md: 768px (tablet)
- lg: 1024px (desktop)

**Key Adaptations**:
- Navigation: Hamburger on mobile, full navbar on desktop
- Grids: Single column mobile, 2-3 columns desktop
- Tables: Card view mobile, table desktop
- Hero text: Smaller on mobile (text-3xl vs text-5xl)
- Spacing: Reduce padding on mobile (py-8 vs py-16)

---

## Accessibility

- All form inputs with associated labels
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Sufficient contrast ratios throughout
- Semantic HTML structure
- Alt text for all images in Portuguese
- Keyboard navigation support
- ARIA labels for icon-only buttons

---

## Page-Specific Patterns

**Login/Cadastro Pages**:
- Centered card layout on neutral background
- max-w-md, minimal distractions
- Logo at top
- Clear error messages below each field
- Link to switch between login/cadastro

**404 Page**:
- Centered content with illustration or large icon
- Friendly message in Portuguese
- Button to return home
- Maintains header/footer for consistency

**Dashboard Landing (each role)**:
- Stats cards row at top
- Role-specific quick actions below
- Recent activity/appointments list
- Welcoming header with user name