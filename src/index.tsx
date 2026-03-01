import { Hono } from 'hono';
import { renderer } from './renderer';

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

export default app;
