import { Hono } from 'hono';
import { renderer } from './renderer';
import { createPostSchema } from './validation_schema/validator';
import { zValidator } from '@hono/zod-validator';
import { PostForm } from './components/postForm';
import { PostList, type Post } from './components/postList';

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
  const { id, title, body } = c.req.valid('form');
  const sql = 'INSERT INTO posts (id, title, body) VALUES (?, ?, ?)';
  await c.env.DB.prepare(sql).bind(id, title, body).run();
  return c.redirect('/posts');
});

app.get('/posts', async (c) => {
  const posts = await c.env.DB.prepare('SELECT * FROM posts').all();
  return c.render(
    <div>
      <PostForm />
      <PostList posts={posts.results as Post[]} />
    </div>
  );
});

export default app;
