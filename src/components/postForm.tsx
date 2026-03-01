export const PostForm = () => (
  <form method="post" action="/posts">
    <input name="title" placeholder="title" />
    <input name="body" placeholder="body" />
    <button>Post</button>
  </form>
);
