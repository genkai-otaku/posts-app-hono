export type Post = {
  id: number;
  title: string;
  body: string;
};

export const PostList = ({ posts }: { posts: Post[] }) => (
  <div>
    {posts.map((post) => (
      <div key={post.id}>
        <div>Title: {post.title}</div>
        <div>Body: {post.body}</div>
        <hr />
      </div>
    ))}
  </div>
);
