# GitHub Copilot Instructions — DatingApp

## Project Overview
Full-stack dating application with an **ASP.NET Core 8 Web API** backend and **Angular 19** frontend.

## Architecture
- **API/** — .NET 8 REST API, SQLite via EF Core, ASP.NET Identity, JWT auth, Cloudinary for photos
- **client/** — Angular 19 SPA with Bootstrap/Bootswatch, ngx-bootstrap, ngx-toastr
- **Docker** — multi-container via `docker-compose.yml`; Nginx reverse-proxies `/api/` to the .NET container

## Coding Conventions

### Backend (C#)
- Repository pattern: all data access goes through interfaces in `Interfaces/` implemented in `Data/`
- DTOs live in `DTOs/`; map with AutoMapper profiles in `Helpers/AutoMapperProfiles.cs`
- All controllers inherit `BaseApiController` (sets `[ApiController]` + `[Route("api/[controller]")]`)
- Pagination via `PagedList<T>` and `PaginationHeader`; add `UserParams`/`LikesParams`/`MessageParams` for filtered queries
- Extension methods for configuration go in `Extensions/`
- Never expose entity classes directly — always return DTOs
- Use `async`/`await` throughout; no `.Result` or `.Wait()`

### Frontend (Angular/TypeScript)
- Production API base URL is `api/` (relative, proxied by Nginx)
- Development API base URL is `https://localhost:5001/api/`
- Use Angular services for all HTTP calls; components only call service methods
- Use ngx-toastr for user-facing feedback
- Follow Angular style guide: `kebab-case` filenames, `PascalCase` classes

## Environment & Secrets
- Secrets are injected via environment variables at runtime (never hard-coded)
- See `.env.example` for required variables
- For local dev without Docker, secrets live in `API/appsettings.Development.json` (gitignored pattern: no plain `appsettings.json` secret commit)

## Docker
- Build everything: `docker compose build`
- Run: `docker compose up -d`
- SQLite database is persisted in the `sqlite-data` Docker volume
- Nginx (client container) proxies `/api/` → `http://api:8080/api/`
