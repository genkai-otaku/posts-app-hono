import { Hono } from 'hono';
import { renderer } from './renderer';
import { createPostSchema } from './validation_schema/validator';
import { zValidator } from '@hono/zod-validator';

const app = new Hono<{ Bindings: { DB: D1Database } }>();

app.use(renderer);

app.get('/', async (c) => {
  const posts = await c.env.DB.prepare('SELECT * FROM posts').all();
  return c.render(
    <>
      <h1>Hello!</h1>
      <ul>
        {posts.results.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
});

app.post('/posts', zValidator('form', createPostSchema), async (c) => {
  const { title, body } = c.req.valid('form');
  const sql = 'INSERT INTO posts (title, body) VALUES (?, ?)';
  await c.env.DB.prepare(sql).bind(title, body).run();
  return c.redirect('/posts');
});

export default app;
