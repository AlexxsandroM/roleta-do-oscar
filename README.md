# Cine Fortuna

Uma roleta interativa com os 98 vencedores do Oscar de Melhor Filme, de 1929 a 2026. Escolha uma época, gire a roleta e descubra o filme da próxima sessão.

## Acesse o projeto

**[roleta-do-oscar.vercel.app](https://roleta-do-oscar.vercel.app/)**

## Rodar com Docker

```bash
docker compose up --build -d
```

Acesse [http://localhost:3000](http://localhost:3000).

```bash
docker compose logs -f  # acompanhar logs
docker compose down     # encerrar
```

## Desenvolvimento local

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

## Tecnologias

- React 19
- TypeScript
- Next.js 16
- Tailwind CSS
- Docker e Docker Compose

## Licença

Distribuído sob a licença MIT.
