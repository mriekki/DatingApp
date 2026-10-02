# DatingApp — Project Context for AI Agents

## Stack
- **Backend**: ASP.NET Core 8 Web API, SQLite via EF Core, ASP.NET Identity, JWT, Cloudinary
- **Frontend**: Angular 19 SPA, Bootstrap/Bootswatch, ngx-bootstrap, ngx-toastr
- **Deployment**: Docker Compose — Nginx (client) reverse-proxies `/api/` → .NET container (port 8080)

## Project Structure
```
API/          .NET 8 REST API
client/       Angular 19 SPA
docker-compose.yml
.env.example  (copy to .env — never commit .env)
```

## Backend Conventions (C#)
- **Repository pattern**: interfaces in `Interfaces/`, implementations in `Data/`
- **DTOs only**: never expose entity classes; map with AutoMapper (`Helpers/AutoMapperProfiles.cs`)
- **Controllers**: all inherit `BaseApiController` (`[ApiController]` + `[Route("api/[controller]")]`)
- **Pagination**: `PagedList<T>`, `PaginationHeader`, `UserParams`/`LikesParams`/`MessageParams`
- **Config extensions**: `Extensions/ApplicationServiceExtensions.cs`, `Extensions/IdentityServiceExtensions.cs`
- **Async everywhere**: no `.Result` or `.Wait()`

## Frontend Conventions (Angular/TypeScript)
- Production API URL: `api/` (relative, proxied by Nginx)
- Dev API URL: `https://localhost:5001/api/`
- HTTP calls go in services only; components call service methods
- File naming: `kebab-case`; class naming: `PascalCase`
- User feedback via ngx-toastr

## Secrets & Environment
- Runtime secrets injected via env vars (see `.env.example`)
- Local dev: `API/appsettings.Development.json` (gitignored)
- Required vars: `TOKEN_KEY`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## Common Commands
```bash
# Docker
docker compose build
docker compose up -d
docker compose logs -f
docker compose down

# .NET (local dev)
cd API && dotnet run

# Angular (local dev)
cd client && npm start

# EF Core migrations
cd API && dotnet ef migrations add <Name>
cd API && dotnet ef database update
```
