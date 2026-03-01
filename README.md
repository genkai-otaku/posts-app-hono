```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```

## Lint / Format

```txt
npm run lint
```

```txt
npm run lint:fix
```

```txt
npm run format
```

```txt
npm run format:check
```

## データベース設定

```zsh
npx wrangler d1 create posts-app
```

```zsh
npx wrangler d1 execute posts-app --local --file=./schema.sql
```

```zsh
npx wrangler d1 execute posts-app --remote --file=./schema.sql
```

#### DB型ジェネレート

```zsh
npm run cf-typegen
```
