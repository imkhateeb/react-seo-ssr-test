import express from "express";
import fs from "node:fs/promises";
import { getHeader } from "./src/utils/html-template.js";

// Constants
const isProduction = false;
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    // Check for a specific route
    if (url === "/about") {
      console.log("Server is rendering the About page");
    } else if (url === "/contact") {
      console.log("Server is rendering the Contact page");
    }

    // Continue with SSR logic
    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const rendered = await render(url, ssrManifest);

    // Dynamic meta information based on the route
    let seoTitle = "Buy and Sell Used Bikes Online | DriveX";
    let seoDescription =
      "Choose from a variety of Quality Used Bikes. DriveX Certified evaluated at 100+ checkpoints.";
    let seoImage = "https://picsum.photos/200/300";

    console.log(url);

    if (url === "about") {
      seoTitle = "About Us | DriveX";
      seoDescription = "Learn more about DriveX, our mission, and values.";
    } else if (url === "contact") {
      seoTitle = "Contact Us | DriveX";
      seoDescription = "Get in touch with DriveX for support or inquiries.";
    }

    console.log(seoTitle);
    console.log(seoDescription);

    const metaTags = getHeader({
      seoTitle,
      seoDescription,
      seoImage,
    });

    const html = template
      .replace(`<!--meta-tags-->`, metaTags)
      .replace(`<!--app-html-->`, rendered.html ?? "")
      .replace(`<!--app-head-->`, rendered.head ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
