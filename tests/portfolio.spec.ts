import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { assetPath, portfolio, projects } from "../data/portfolio";

for (const width of [360, 768, 1280, 1920]) {
  test(`responsive layout and accessible content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(portfolio.hero.lines.join(""));
    await expect(page.getByRole("button", { name: "Explore Imagify", exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `reports/screenshots/dark-${width}.png`, fullPage: true });
  });
}

test("theme is accessible and persists after reload", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: "reports/screenshots/light-1280.png", fullPage: true });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("category filtering, project modal keyboard flow, and skill filtering", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const filters = page.getByRole("group", { name: "Filter projects" });
  await filters.getByRole("button", { name: "ML", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(projects.slice(1).filter((project) => project.categories.includes("ML")).length);
  await expect(page.locator(".flagship")).toHaveCount(0);
  const opener = page.getByRole("button", { name: "Explore Heart Disease Prediction", exact: true });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Heart Disease Prediction", level: 2 })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  await filters.getByRole("button", { name: "Cloud", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(projects.slice(1).filter((project) => project.categories.includes("Cloud")).length);
  await expect(page.getByRole("button", { name: "Explore Imagify", exact: true })).toBeVisible();
  await filters.getByRole("button", { name: "All", exact: false }).click();
  await expect(page.locator(".project-card")).toHaveCount(projects.length - 1);
  await expect(page.locator(".filter-count")).toHaveText(`${projects.length} projects`);
  await expect(page.locator(".flagship-number")).toHaveText(`01 — ${String(projects.length).padStart(2, "0")}`);
  await expect(page.locator(".stats-row .stat").filter({ has: page.getByRole("heading", { name: "Projects to explore" }) }).locator(".stat-number")).toHaveText(String(projects.length));
  await expect(page.locator(".flagship")).toHaveCount(1);
  await page.getByRole("group", { name: "Filter skills" }).getByRole("button", { name: "Languages", exact: true }).click();
  await expect(page.locator(".skill-card")).toHaveCount(1);
  await expect(page.locator(".skill-card")).toContainText("Kotlin");
});

test("mobile navigation closes with Escape and follows anchors", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute("aria-expanded", "false");
});

test("copy email and configured résumé state work", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  if (portfolio.resume) {
    const resumeLink = page.getByRole("link", { name: "Download résumé" });
    await expect(resumeLink).toHaveAttribute("href", assetPath(portfolio.resume));
    await expect(resumeLink).toHaveAttribute("download", "");
    const response = await page.request.get(assetPath(portfolio.resume));
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  } else {
    await page.getByRole("button", { name: "Download résumé" }).click();
    await expect(page.locator(".toast")).toContainText("Résumé coming soon");
  }
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.locator(".toast")).toContainText("Email copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(portfolio.email);
});

test("pointer-driven hero, magnetic buttons, and active navigation work with motion enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  const scene = page.locator(".hero-scene");
  const bounds = await scene.boundingBox();
  expect(bounds).not.toBeNull();
  await page.mouse.move(bounds!.x + bounds!.width * 0.8, bounds!.y + bounds!.height * 0.3);
  await expect(scene).toHaveAttribute("style", /--orbit-x/);
  await expect(page.locator(".custom-cursor")).toHaveClass(/visible/);
  const workButton = page.getByRole("link", { name: "Explore my work" });
  const buttonBounds = await workButton.boundingBox();
  await page.mouse.move(buttonBounds!.x + buttonBounds!.width * 0.8, buttonBounds!.y + buttonBounds!.height * 0.5);
  await expect(workButton).toHaveAttribute("style", /translate/);
  await page.getByRole("navigation").getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Work", exact: true })).toHaveAttribute("aria-current", "location");
  expect(errors).toEqual([]);
});

test("contact rejects empty fields and malformed email before submission", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  await page.locator(".form-submit").click();
  await expect(page.locator("#contact-name:invalid")).toBeVisible();
  await page.getByLabel("Your name").fill("Alex Chen");
  await page.getByRole("textbox", { name: /Email address/ }).fill("not-an-email");
  await page.getByLabel("What are you thinking?").fill("Hello Prem");
  await page.locator(".form-submit").click();
  await expect(page.locator("#contact-email:invalid")).toBeVisible();
  await expect(page.locator(".form-status")).toBeEmpty();
});

test("contact prepares an email draft without claiming it was sent", async ({ page }) => {
  test.skip(!!process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT, "This build uses Formspree; run the endpoint tests instead.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByLabel("Your name").fill("Alex Chen");
  await page.getByRole("textbox", { name: /Email address/ }).fill("alex@example.com");
  await page.getByLabel("What are you thinking?").fill("Let’s discuss a graduate engineering opportunity.");
  await page.getByRole("button", { name: "Compose email" }).click();
  await expect(page.locator(".form-status")).toContainText("Review it and press Send there");
  await expect(page.getByLabel("What are you thinking?")).toHaveValue("Let’s discuss a graduate engineering opportunity.");
});

test("Formspree failure preserves the message and success clears it", async ({ page }) => {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  test.skip(!endpoint, "Set the endpoint before build to verify Formspree with mocked responses.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.route(endpoint!, (route) => route.fulfill({ status: 503, contentType: "application/json", body: "{}" }));
  await page.getByLabel("Your name").fill("Alex Chen");
  await page.getByRole("textbox", { name: /Email address/ }).fill("alex@example.com");
  await page.getByLabel("What are you thinking?").fill("Hello Prem");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".form-status")).toContainText("could not be sent");
  await expect(page.getByLabel("What are you thinking?")).toHaveValue("Hello Prem");
  await page.unroute(endpoint!);
  await page.route(endpoint!, (route) => route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator(".form-status")).toContainText("Message sent");
  await expect(page.getByLabel("What are you thinking?")).toHaveValue("");
});
