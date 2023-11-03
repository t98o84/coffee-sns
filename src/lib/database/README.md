# Database

## Migration

### Reflect to DB without generating migration files

Also generates prisma client and seed data

```bash
docker compose exec app npm run migration:push
```

### Create migration file

1. Edit schema.prisma
2. Create migration file

  ```bash
  docker compose exec app npm run migration:dev -- --name <migration_name>
  ```

### Run migration

Also generates prisma client

```bash
docker compose exec app npm run migration:deploy
```

### Generate prisma client

```bash
  docker compose exec app npm run migration:generate
```

### Seed data

```bash
docker compose exec app npm run seed
```
