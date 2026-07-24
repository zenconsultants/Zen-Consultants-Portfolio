<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Zen Consultants - Recruitment & HR Advisory Platform

Welcome to **Zen Consultants**, a lightweight, fast, and modern single-page application (SPA) tailored for human resources operations, talent acquisition, and workforce management solutions in India.

This application acts as a digital hub for both **Employers** looking to build or scale their teams, and **Candidates** seeking their next career opportunities. It features highly responsive section navigation, custom contact inquiry submission, and a validation-heavy resume upload application page.

---

## 🚀 Live Application & Preview

- **AI Studio App**: [View in AI Studio](https://ai.studio/apps/a7cb961f-6473-408a-ac96-d0501c3c0b81)
- **Production URL**: [zenconsultants.in](https://zenconsultants.in)
- **Deployment Strategy**: Automated static build serving from the `docs/` directory via GitHub Pages.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) (Functional components with modern Hooks)
- **Build Tool**: [Vite 6](https://vite.dev/) (Ultra-fast Hot Module Replacement & production bundling)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing for robust static analysis)
- **Styling & CSS**: [Tailwind CSS v4](https://tailwindcss.com/) (State-of-the-art utility-first styling)
- **Icons**: [Lucide React](https://lucide.dev/) (Clean and consistent SVG iconography)
- **Animation**: [Motion](https://motion.dev/) (Smooth transitions and interactivity)

---

## ✨ Key Features

1. **Lightweight Custom SPA Routing**: Built without the overhead of heavy third-party routing libraries like `react-router`. Uses `window.location.pathname` and HTML5 `History API` coupled with reactive state management to deliver instant page transitions and native smooth-scrolling to section anchors.
2. **Employer Enquiry Form**: Integrated with a live backend API ([SheetDB](https://sheetdb.io)) to store incoming lead metadata in Google Sheets. It includes validation rules (such as minimum 10-digit phone checking).
3. **Candidate Application Form**: A rich form allowing job seekers to specify experience levels, preferred industries, notice periods, and submit their resumes.
   - **Upload Constraints**: Restricts uploads strictly to `.pdf`, `.doc`, and `.docx` file formats with a client-side limit of **5 MB**.
4. **Responsive Desktop & Mobile Design**: Fully fluid and adaptive navigation header, side drawer menu, and layout systems optimized for all screens.

---

## 💻 Local Development

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** (comes bundled with Node.js)

### Setup Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root of the repository:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be running locally at `http://localhost:3000`.

5. **Type-Checking & Linting**:
   ```bash
   npm run lint
   ```

---

## 🗺️ Sitemap & Navigation Model

Navigation transitions smoothly between sections on the home page and standalone views.

```text
/ (Home Page)
├─ #home (Hero & primary CTA)
├─ #services (Recruitment, HR Advisory, Payroll cards)
├─ #hiring (Campus, Leadership, Mid-level, Bulk, and Contract hiring solutions)
├─ #industries (Served sectors: IT, Pharma, ITeS, Manufacturing, Retail, Hospitality)
├─ #proof (Capabilities: Team setups, recruitment execution, operational support)
├─ #process (Our structured 4-step recruitment workflow)
├─ #candidate-cta (Call to action directing candidates to the apply route)
└─ #contact (Employer enquiry form)

/apply.html (Candidate Application Form)
└─ Job application fields with document upload validations
```

### Route Aliasing & SPA Routing Map

| Route | Rendered Component | Fallback Behavior |
|---|---|---|
| `/` | `HomePage` in `src/App.tsx` | Main Employer landing experience. |
| `/apply` | `ApplyPage` in `src/App.tsx` | Candidate portal (SPA internal path). |
| `/apply.html` | `ApplyPage` in `src/App.tsx` | Static candidate path (essential for GitHub Pages direct loads). |
| *Any other path* | `HomePage` in `src/App.tsx` | Graceful fallback redirect. |

---

## ✉️ Integrations & Form Flows

### 1. Employer Enquiry Form
- **Component File**: `ContactSection` in `src/App.tsx`
- **Fields**: Name (`name`), Company (`company`), Phone (`phone`), Service needed (`service`), Message (`message`).
- **Endpoint**: `https://sheetdb.io/api/v1/4cy25wq4abc58`
- **Error Handling**: Failures trigger a graceful error banner offering manual contact alternatives via WhatsApp or direct email.

### 2. Candidate Application Form
- **Component File**: `ApplyPage` in `src/App.tsx`
- **Fields**: Full Name, Email, Phone, Location, Preferred Industry, Experience, Job Type, Notice Period, Resume File, Short Summary, Consent.
- **Rules**:
  - Validates email regex structure.
  - Limits resume size to **5 MB**.
  - Limits file extensions to **PDF, DOC, and DOCX** formats.
  - Requires user to acknowledge the candidate data consent checkbox.

### 📞 Contact Details

| Service Channel | Address / Handle | Quick Link |
|---|---|---|
| **Primary Email** | `zenconsultants2025@gmail.com` | [Send Email](mailto:zenconsultants2025@gmail.com) |
| **Phone** | `+91 84315 02356` | [Call Phone](tel:+918431502356) |
| **WhatsApp Support** | Chat with Zen Consultants | [Chat on WhatsApp](https://wa.me/918431502356) |
| **Corporate Office** | Unit 101, Oxford Towers, No. 139/88 Old Airport Road, Bangalore 560008 | *Physical Location* |

---

## 🏗️ Build & Production Deployment

Since the platform is hosted on GitHub Pages, the project employs a post-build mirroring flow to handle SPA direct routes flawlessly.

```bash
# Clean, bundle assets, and trigger copy scripts
npm run build
```

### What happens behind the scenes?
1. **Bundling**: Vite compiles code, optimizations, and CSS to `dist/`.
2. **SPA Routing Fallbacks**: `scripts/copy-spa-fallback.mjs` runs automatically post-build:
   - Copies `dist/index.html` as `dist/404.html` (so deep links default gracefully to the React router shell).
   - Copies `dist/index.html` as `dist/apply.html` (for direct browser loads to the apply form).
   - Bundles the `CNAME` domain specification record.
   - Places `.nojekyll` to disable Jekyll processing on GitHub Pages servers.
   - Clears the existing `docs/` folder and copies the entire production build (`dist/*`) into it.
3. **Deployment Root**: GitHub Pages points to the `docs/` folder on the main branch.

---

## 🧹 Codebase Maintenance Note

The codebase contains some inactive legacy components in `src/pages/`, `src/sections/`, `src/components/`, and `src/data/` (such as `ServicePage.tsx` or `AboutSection.tsx`). These are preserved from earlier design iterations. If you plan to scale the application to multiple product pages, either refactor or clean these files to keep the workspace lightweight.
