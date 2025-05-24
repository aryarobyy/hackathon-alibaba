import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
} else {
  console.error("Failed to find the root element. The 'root' div is missing from your HTML.");
}