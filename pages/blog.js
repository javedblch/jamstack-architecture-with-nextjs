import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Home = ({ posts }) => {
  return (
    <main>
      <h1>Welcome to the Blog!</h1>
      <div>
        {posts.map((post) => (
          <Link href={`/post/${post.id}`} key={post.id}>
            <a>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc',
    },
  });

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
};