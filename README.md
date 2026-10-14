# NITA Workspace

Local UI/UX prototype with 16 portal screens, Barlow fonts, NITA branding, photographs, and SVG icons. Assets are included; no package installation or build step is required.

## Launch on Windows

1. Extract the entire ZIP first.
2. Open the extracted NITA-Workspace folder.
3. Double-click Start Preview.cmd. It uses an installed Python or Node.js runtime, or the bundled Codex Python runtime if available.
4. Leave the command window open and visit http://127.0.0.1:8000/.

If no runtime is found, install Python or Node.js and rerun the launcher.
If port 8000 is occupied, use one of the commands below with a different port.

## Run from your IDE terminal

Open this folder in your IDE, then run either:

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1
```

or:

```powershell
node server.cjs
```

For another port using Node.js in PowerShell:

```powershell
$env:PORT = '8080'
node server.cjs
```

Then open http://127.0.0.1:8080/.

## Files and scope

- index.html: application shell
- styles.css: styling and responsive layouts
- app.js: screens and demonstration interactions
- workspace-updates.js: calendar interactions, detailed icons, and weather UI
- workspace-updates.css: updated slogan, weather, and calendar styling
- workspace-motion.js and workspace-motion.css: shared Anime.js transitions, sidebar movement, and reduced-motion support
- workspace-mobile.css: phone navigation, full-width search, compact calendar, request cards, and mobile dialogs
- workspace-help.css: help topic cards, guide steps, and service-desk contact styling
- workspace-panels.css: feedback, account menu, profile, and assistant presentation
- public/assets: local images, logo, and fonts
- public/vendor: bundled Anime.js 4.5.0 (MIT; license included), with no CDN or package installation needed
- server.cjs: optional static server using Node.js built-in modules

Screens: Home, My Work, Tasks, Calendar, Documents, Teams & Collaboration, Service Requests, Approvals, Policies & Guidelines, Knowledge Hub, Performance, Reports & Analytics, Dashboards, IT Support, Facilities, Help & Feedback.

The Calendar includes month, week, and agenda views, date navigation, category filters, event details, and event creation and editing. Its refined layout adds schedule summaries, scheduled-time totals, next-event information, quick event creation from each date, day navigation, month selection, and side-by-side placement for overlapping events in Week view. Calendar events save in this browser using local storage.

The corrected “Empowered People. Efficient Government.” panel remains on Home. Weather is now in the header between search and notifications: click it to choose Accra, Kumasi, or Tamale and switch between today’s forecast and a three-day forecast. Weather values are sample forecasts. The former weather areas contain quotes from [NITA’s official vision and values](https://www.nita.gov.gh/about).

This is a UI prototype with sample data. Some actions display demonstration messages. AI responses are simulated. It has no production backend, authentication, or live integrations.

Tab transitions follow their content: task and request rows stagger in, document and people cards reveal, calendar dates move with navigation, and analytics charts draw or grow into place. Long pages reveal content as you scroll. Reduced-motion preferences apply final states immediately. Phones include quick navigation for Home, Tasks, Calendar, and Documents, plus a More menu for all sections.

The account menu opens the staff profile, workspace preferences, and workspace information. Reduced-motion preferences save in this browser. Feedback entries stay in the current preview session. The assistant uses sample responses and supports task shortcuts, multiline messages, and a new-conversation action.

## Asset sources

- NITA logo: supplied project PDF.
- Staff and meeting images: https://www.nita.gov.gh/
- Headquarters photo: https://www.graphic.com.gh/news/general-news/nita-assures-swift-restoration-after-disruption-to-state-email-service.html
- Barlow fonts: https://fonts.google.com/specimen/Barlow
