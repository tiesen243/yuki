# DB

Database of the project.

## Seed data

### Install

```bash
pip install -r prisma Faker
```

or using `uv`

```bash
uv sync
```

### Run

```bash
source ./.venv/bin/activate
prisma generate --schema ./prisma/schema.py.prisma
python src/seed.py
```

or using `uv`

```bash
uv run prisma generate --schema ./prisma/schema.py.prisma
uv run src/seed.py
```

### Data

- `users`: 10
- `categories`: 10
- `products`: 100
