import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import prerender from "prerender-node";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PRERENDER_TOKEN = process.env.PRERENDER_TOKEN || "eOOqn3X9hd5OlVpvqn2G";

if (PRERENDER_TOKEN) {
  prerender.set("prerenderToken", PRERENDER_TOKEN);
  
  // Enable debug mode to see what's happening
  prerender.set("forwardHeaders", true);
  
  // (Optional) whitelist routes you want to be prerendered
  // prerender.whitelisted(["^/blog", "^/product", "^/home"]);
  
  // Add logging middleware to see if prerender is being called
  app.use((req, res, next) => {
    const userAgent = req.get('user-agent') || '';
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    
    if (isBot) {
      console.log(`🤖 Bot detected: ${userAgent.substring(0, 50)} - Route: ${req.path}`);
    }
    next();
  });
  
  // Prerender middleware - skip for localhost (prerender.io doesn't support localhost)
  app.use((req, res, next) => {
    const host = req.get('host') || '';
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1') || host.includes('::1');
    
    // Only use prerender for bot requests AND non-localhost
    const userAgent = req.get('user-agent') || '';
    const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
    
    if (isBot && !isLocalhost) {
      // Use prerender for production (public URLs)
      prerender(req, res, next);
    } else {
      // Skip prerender for localhost or non-bot requests
      // For localhost testing, we'll still log that prerender would be used
      if (isBot && isLocalhost) {
        console.log(`⚠️  Prerender skipped for localhost (bot detected but localhost not supported by Prerender.io)`);
        // Add a header to indicate prerender would be used in production
        res.set('X-Prerender-Would-Use', 'true (skipped for localhost)');
      }
      next();
    }
  });
  
  console.log("✅ Prerender.io enabled for SSR (bot/crawler requests only)");
} else {
  console.log("⚠️  Prerender.io token not set. Skipping SSR.");
}

// 👇 Serve your React build from dist folder (Vite's output)
app.use(express.static(path.join(__dirname, "dist")));

// 👇 Handle all routes (React Router fallback)
// This ensures that all routes are handled by the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// 👇 Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).send("Internal Server Error");
});

// 👇 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving React app from dist folder`);
  console.log(`✅ Prerender.io: ${PRERENDER_TOKEN ? "Enabled" : "Disabled"}`);
  console.log(`🌐 Ready to serve requests!\n`);
});
