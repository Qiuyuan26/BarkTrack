# Project structure

| Path | Responsibility |
|---|---|
| `.agents/` | Repository-specific assistant guidance. |
| `.github/` | Collaboration templates and future automation. |
| `.vscode/` | Shared editor recommendations; no personal settings. |
| `backend/` | Optional API and destination-management services if needed. |
| `data/maps/` | Map format notes and authorized map assets. Check usage rights and provenance. |
| `data/fixtures/` | Clearly fictional destination records for development. |
| `deployment/` | Kiosk or web deployment configuration after choices are recorded. |
| `docs/contracts/` | Proposed API and destination data contracts. |
| `docs/decision/` | Dated decision records with rationale and status. |
| `docs/handoffs/` | Status and next steps for transferring work. |
| `docs/prompts/` | Reusable project prompts, without private information. |
| `docs/reports/` | Research and evaluation notes. |
| `docs/tasks/` | Scoped tasks with acceptance criteria. |
| `frontend/` | Kiosk pages and reusable interface components, including the map renderer. |
| `map/` | Map coordinate conversions and geometry helpers; UI map renderer is in `frontend/src/components/`. |
| `routing/` | Indoor sample route helpers and future verified outdoor routing logic. |
| `tests/` | Verification plans and future automated tests. |

These are proposed ownership areas, not a mandate for a particular language or framework. Remove placeholders or add area-specific READMEs as implementation begins.


