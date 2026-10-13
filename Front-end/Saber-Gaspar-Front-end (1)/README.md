# Saber: Gaspar — Front-end

React + Vite + Tailwind, ligado ao back-end Spring Boot.

## Como rodar
1. Suba o back-end (porta 8080).
2. Aqui: `npm install` e `npm run dev` → http://localhost:5173
   O Vite repassa `/api` para `http://localhost:8080` (ver `vite.config.ts`), sem precisar de CORS.
   Outro endereço de API: crie `.env` com `VITE_API_URL=...` (e configure CORS no back).

## Back-end: o que precisa estar assim
- Sem `spring-boot-starter-security` no `build.gradle` (senão toda rota responde 401).
- `EventoResposta` pode manter `idevento`; o front aceita as duas grafias.

## Rotas usadas
| Tela | Rota |
|---|---|
| Eventos (início, lista, detalhe) | GET /api/eventos |
| Cadastro | POST /api/usuarios |
| Login | GET /api/usuarios (confere e-mail e senha no front) |
| Editar dados / excluir conta | PATCH / DELETE /api/usuarios/{id} |

Coleta, serviços e o mapa de cotas não dependem do back.
