
# ERP Central

ERP Central is a comprehensive, web-based Enterprise Resource Planning (ERP) system designed to streamline and manage various business operations. It's built with a modern technology stack to provide a responsive, intuitive, and AI-enhanced user experience.

## Core Features

-   **Dashboard Overview**: Displays key ERP metrics such as sales, inventory, and receivables.
-   **Sales Management**: Module for managing customer data, orders, and sales reports across various sub-functions like Quotations, Sales Orders, Sales Invoices, and Customer Receivables.
    -   **Interactive Sales Order Creation**: Users can navigate to "Sales Order" under "Sales Cycle", view a mock list of orders, and click "Add New Order" to access a form. The form allows input for customer name, order date, product details, quantity, and price. A **mock save** functionality is implemented using Next.js Server Actions, which validates input and logs data to the console, simulating a successful save without database persistence.
-   **Procurement Tracking (Purchasing Cycle)**: Module for managing suppliers, purchase orders, and receiving, including Purchase Requests, Purchase Orders, Receiving Slips, Goods Receipt Notes, and Vendor Payments.
    -   **Interactive Purchase Request Creation**: Users can navigate to "Purchase Request" under "Purchasing Cycle", view a mock list of requests, and click "Add New Purchase Request" to access a form. The form allows input for requester name, department, request date, item details, quantity, unit, reason, and an optional suggested supplier. A **mock save** functionality is implemented using Next.js Server Actions, validating input and logging data to the console.
    -   **Interactive Purchase Order Creation**: Users can navigate to "Purchase Order" under "Purchasing Cycle", view a mock list of orders, and click "Add New Purchase Order" to access a form. The form allows input for supplier name, order date, item details, quantity, unit price, shipping address, and payment terms. A **mock save** functionality is implemented using Next.js Server Actions, validating input and logging data to the console.
-   **Production Cycle**: Manages Bill of Materials (BOM), Work Orders, and Production Receipts.
-   **General Ledger Cycle**: Handles Vouchers, Journals, Main Ledger, and Trial Balances.
-   **Costing Cycle**: For Cost Calculation and Cost Analysis.
-   **Payroll Cycle**: Manages Employee Salary Calculation and Salary Disbursement.
-   **Fixed Assets Cycle**: Tracks Asset Management and Depreciation Calculation.
-   **Cash Flow Cycle**: Monitors Bank Transactions and Cash Flow Statements.
-   **Smart Data Discovery**: A smart search feature leveraging generative AI to suggest appropriate reports or data based on user queries, acting as an assistant for ERP usage.
-   **User Authentication**: Secure login system (`admin`/`123456`) to protect application data.
-   **Administrator Document Management**: View `README.md`, `spec.md`, `todolist.md` within the app. (Editing functionality is planned).
-   **Administrator User Management**: View mock user accounts and access a form to (simulate) adding new users. Permission settings page is a placeholder.

## Tech Stack

-   **Frontend**:
    -   [Next.js](https://nextjs.org/) (App Router)
    -   [React](https://reactjs.org/)
    -   [TypeScript](https://www.typescriptlang.org/)
-   **UI Components**:
    -   [ShadCN UI](https://ui.shadcn.com/)
    -   [Lucide React](https://lucide.dev/) (Icons)
-   **Styling**:
    -   [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**:
    -   [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit)
-   **State Management**:
    -   React Context API (for Authentication)
    -   React Hook Form (for form handling)
-   **Markdown Rendering**:
    -   `react-markdown` with `remark-gfm`

## File Structure Overview

```
/
├── src/
│   ├── app/                     # Next.js App Router: Pages and layouts
│   │   ├── admin/               # Administrator specific pages
│   │   │   ├── accounts/        # View user accounts
│   │   │   ├── add-account/     # Add new user account form
│   │   │   ├── permissions/     # Permissions management (placeholder)
│   │   │   └── view-document/[documentName]/ # View markdown documents
│   │   ├── cash-flow/           # Cash Flow Cycle pages
│   │   ├── costing/             # Costing Cycle pages
│   │   ├── fixed-assets/        # Fixed Assets Cycle pages
│   │   ├── general-ledger/      # General Ledger Cycle pages
│   │   ├── login/               # Login page
│   │   ├── payroll/             # Payroll Cycle pages
│   │   ├── production/          # Production Cycle pages
│   │   ├── purchasing/          # Purchasing Cycle pages
│   │   │   ├── purchase-request/
│   │   │   │   ├── new/         # New Purchase Request form page
│   │   │   │   └── page.tsx     # Purchase Request list page
│   │   │   ├── purchase-order/
│   │   │   │   ├── new/         # New Purchase Order form page
│   │   │   │   └── page.tsx     # Purchase Order list page
│   │   ├── sales/               # Sales Cycle pages
│   │   │   ├── sales-order/
│   │   │   │   ├── new/         # New Sales Order form page
│   │   │   │   └── page.tsx     # Sales Order list page
│   │   ├── smart-search/        # Smart Search page
│   │   ├── globals.css          # Global styles and ShadCN theme
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Dashboard/Homepage
│   ├── components/              # Reusable UI components
│   │   ├── layout/              # Layout specific components (Header, MainNav, AppLayout)
│   │   ├── ui/                  # ShadCN UI primitive components
│   │   └── smart-search-form.tsx # Smart search UI
│   ├── context/                 # React Context providers (e.g., AuthContext)
│   ├── hooks/                   # Custom React hooks (e.g., useAuth, useMobile, useToast)
│   ├── lib/                     # Utility functions and server actions (e.g., actions.ts for form handling)
│   ├── ai/                      # Genkit AI integration
│   │   ├── flows/               # AI flow definitions (e.g., smart-data-discovery.ts)
│   │   ├── dev.ts               # Genkit development server entry point
│   │   └── genkit.ts            # Genkit core initialization
│   └── middleware.ts            # Next.js middleware (currently minimal)
├── public/                      # Static assets (e.g., images, fonts if not from CDN)
├── .env                         # Environment variables (currently empty)
├── components.json              # ShadCN UI configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # This file
├── spec.md                      # Project specification document
└── todolist.md                  # Project task list
```

## Getting Started

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd erp-central
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

If any API keys or specific configurations are needed (e.g., for Genkit Google AI), create a `.env` file in the root of the project and add them there. Refer to `src/ai/genkit.ts` if specific API keys for Google AI are required.

Example `.env` (if Google AI API key is needed):
```
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
```

### Running the Development Server

To start the Next.js development server:
```bash
npm run dev
```
The application will typically be available at `http://localhost:9002`.

### Running Genkit (for AI Features)

If you intend to use or develop the AI features (like Smart Search), you need to run the Genkit development server in a separate terminal:
```bash
npm run genkit:dev
# or for watching changes
npm run genkit:watch
```
This will start the Genkit server, usually on port 4000, which the Next.js app will communicate with for AI functionalities.

### Login Credentials

The application has a built-in mock login system for demonstration:
-   **Username**: `admin`
-   **Password**: `123456`

## Building for Production

To create an optimized production build:
```bash
npm run build
```

To start the application in production mode after building:
```bash
npm run start
```

## Styling Guidelines

The application follows specific style guidelines for a consistent and professional look:

-   **Primary Color**: Blue (`#4681C4`) - HSL: `205 65% 50%`
-   **Background Color**: Light gray (`#F0F4F8`) - HSL: `220 25% 97%`
-   **Accent Color**: Teal (`#3E8A8A`) - HSL: `175 50% 45%`
-   **Headline Font**: 'Poppins', sans-serif
-   **Body Font**: 'PT Sans', sans-serif

These are configured in `src/app/globals.css` using HSL CSS variables for ShadCN UI theming.

## Contributing

Details on contributing to the project will be added here.
