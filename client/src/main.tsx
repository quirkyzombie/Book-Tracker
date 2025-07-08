import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerSW, showInstallPrompt } from "./registerSW";

// Register service worker and install prompt
registerSW();
showInstallPrompt();

createRoot(document.getElementById("root")!).render(<App />);
