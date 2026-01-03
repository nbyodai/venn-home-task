# Onboarding Form Application

A robust, fully accessible React application that implements a complex onboarding flow. This project demonstrates advanced form handling techniques, including "layered" validation (synchronous + asynchronous), real-time formatting, and race-condition management without relying on heavy external form libraries.

## 🚀 Features

* **Real-time Phone Formatting:** Automatically applies NANP formatting (`+1 (XXX) XXX-XXXX`) as the user types while maintaining a clean 10-digit payload for the backend.
* **Async Corporation Verification:** Validates corporation numbers against a mock API using **Debouncing** (500ms) and **AbortController** to cancel stale requests and prevent race conditions.
* **Layered Validation:** Combines instant client-side checks (Required, Regex, Length) with server-side existence checks.
* **Infinite Loop Prevention:** Uses the **Latest Ref Pattern** in custom hooks to handle callback dependencies safely without forcing parent components to memoize every handler.
* **Zero-Dependency Logic:** All form logic and validation are custom-written (no Zod, Yup, or Formik) to demonstrate core React mastery and reduce bundle size.

## 🛠 Tech Stack

* **Core:** React (Vite), TypeScript
* **Styling:** Tailwind CSS
* **Testing:** Vitest, React Testing Library
* **Mocking:** MSW (Mock Service Worker) for integration testing

## 📦 Project Structure

The project follows a **feature-based architecture** to ensure scalability and separation of concerns.

```text
├── src
│   ├── api/                  # API endpoints definition
│   ├── components            # Generic/Shared UI (Buttons, Layouts)
│   │   └── ui
│   ├── features/
│   │   └── onboarding/       # Domain-specific logic
│   │       ├── components/   # Sub-components (PhoneInput, CorpInput)
│   │       ├── hooks/        # Custom logic (Validation, Form Validity)
│   │       ├── OnboardingForm.tsx
│   │       └── OnboardingForm.test.tsx
│   ├── mocks/                # MSW Handlers for API simulation
│   └── utils.ts              # Global utilities (Formatters, Regex)

```

## 🏁 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nbyodai/venn-home-task

```


2. Install dependencies:
```bash
npm install

```



### Running the App

Start the development server:

```bash
npm run dev

```

### Running Tests

This project uses **Vitest** for unit and integration testing.

Run all tests:

```bash
npm test

```

## 🧪 Testing Strategy

### Integration Tests

The primary test suite (`OnboardingForm.test.tsx`) uses **MSW** to intercept network requests. This allows us to test:

* **Happy Path (200 OK):** Verifies the correct payload is sent (e.g., stripping phone formatting).
* **Error Path (400 Bad Request):** Verifies the UI displays the specific error message returned by the API.

### Custom Hooks

Hooks like `useCorporationValidation`, `useDebounce` and `useFormValidity` are extracted from the implementation logic to keep components simple

## 🧠 Key Design Decisions

### 1. Handling `useEffect` Infinite Loops with Refs

Instead of requiring the parent component to wrap every callback function in `useCallback`, the custom hooks use `useRef` to store the latest version of the callback. This keeps the dependency array clean and prevents infinite re-render loops caused by unstable function identities.

### 2. Manual Validation vs. Libraries

I chose to implement validation manually rather than using libraries like Zod or Yup. This allows for fine-grained control over **when** validation occurs (e.g., `onBlur` for format checks vs. `debounce` for API checks) and demonstrates how to merge multiple error sources into a single state object.

### 3. Native Event Handling

Tests use `fireEvent` to trigger user interactions. While `user-event` provides a higher-level abstraction, `fireEvent` kept the testing setup lightweight and minimal for this specific scope.
