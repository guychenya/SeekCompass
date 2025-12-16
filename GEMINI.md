# SeekCompass - Project Context

## Project Overview
SeekCompass is a modern, interactive web platform designed to help users discover, explore, and compare AI tools. It features a directory of tools with categorization, filtering, and a "Chat with AI" feature integrated via a sidebar.

## Tech Stack
- **Framework:** React 19 (managed via Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (loaded via CDN in `index.html`)
- **Routing:** React Router DOM (`HashRouter`)
- **Icons:** Lucide React
- **AI Integration:** Google Generative AI SDK (`@google/generative-ai`) and OpenAI SDK (`openai`).

## Setup & Running
1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Configuration:**
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```
3.  **Start Development Server:**
    ```bash
    npm run dev
    ```
4.  **Build for Production:**
    ```bash
    npm run build
    ```

## Key Files & Structure
-   **`index.html`**: The entry point. **Crucial:** Tailwind CSS is loaded and configured here via CDN script, not a local config file. It also contains an `importmap`.
-   **`App.tsx`**: Main application component containing the `HashRouter`, Global Layout (Header/Footer), and the Chat Sidebar integration.
-   **`types.ts`**: Defines core domain interfaces:
    -   `Tool`: Represents an AI tool (id, name, description, pricing, etc.).
    -   `Category`: Tool categories.
    -   `PricingModel`: Enum for pricing types (Free, Freemium, Paid, etc.).
-   **`services/toolService.ts`**: Handles logic for fetching, filtering, and managing tool data.
-   **`components/`**:
    -   `ChatSidebar.tsx`: The AI chat interface. Handles messaging, model configuration, and rendering (Mermaid, Charts).
    -   `ToolCard.tsx`: Display component for individual tools.
    -   `FilterSidebar.tsx`: Sidebar for filtering tools on the homepage.
-   **`pages/`**: Contains top-level page components (`HomePage`, `ToolDetailPage`, `SubmitToolPage`, etc.).

## Development Conventions
-   **Styling:** Use Tailwind utility classes directly in JSX (`className="..."`).
-   **Routing:** Uses `HashRouter`, meaning URLs will appear as `/#/tool/123`.
-   **State Management:** Local React state (`useState`, `useEffect`) is used for UI logic (e.g., chat sidebar toggle).
-   **Environment:** The project is set up to potentially run in environments that rely on `importmap` for dependency resolution (like AI Studio), but strictly follows standard npm patterns for local development.

## Known Issues & Future Plans

### Quota Exceeded (429) Errors
Users may encounter `[429] Quota exceeded` errors, particularly with experimental models like `gemini-2.0-flash-exp`.
**Plan for Resolution:**
1.  **Auto-Fallback:** Implement logic in `ChatSidebar.tsx` to automatically switch to a stable model (e.g., `gemini-1.5-flash`) if an experimental model returns a 429 error.
2.  **Retry Logic:** Utilize the `retryDelay` field in the error response to implement a countdown or auto-retry mechanism.
3.  **User Guidance:** Provide clear UI feedback advising users to switch models or check their billing quota if persistent errors occur.