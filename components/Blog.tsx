import React from 'react';
import SectionTitle from './SectionTitle';
import BookOpenIcon from './icons/BookOpenIcon';

const blogPosts = [
  {
    image: 'https://picsum.photos/seed/blog1/400/200',
    title: 'Become a Frontend Developer and Get hired',
    description: 'Learn to build beautiful, modern applications! This Frontend Developer...',
    author: 'Asfakur',
    readTime: '5 min read',
    comments: 12,
  },
  {
    image: 'https://picsum.photos/seed/blog2/400/200',
    title: 'Web Development',
    description: 'Learn how to build powerful, scalable web apps with Next.js and modern...',
    author: 'Asfakur',
    readTime: '7 min read',
    comments: 20,
  },
  {
    image: 'https://picsum.photos/seed/blog3/400/200',
    title: 'Adding Smooth Animations to...',
    description: 'Discover how to use Framer Motion to create stunning animations and interactive...',
    author: 'Asfakur',
    readTime: '6 min read',
    comments: 18,
  },
];

const BlogCard: React.FC<typeof blogPosts[0]> = ({ image, title, description, author, readTime, comments }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:bg-white/10 transition-colors">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>By {author}</span>
        <span>{readTime} &middot; {comments} Comments</span>
      </div>
    </div>
  </div>
);


const Blog: React.FC = () => {
  return (
    <section id="blog" className="w-full max-w-6xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <SectionTitle title="The Code Journal" icon={<BookOpenIcon />} />
        <p className="text-gray-400 max-w-2xl mx-auto">
          Where I share deep dives into coding, technology trends, and personal development in software engineering. Explore tutorials, case studies, designs, and creative projects designed to inspire and inform.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </section>
  );
};

export default Blog;
