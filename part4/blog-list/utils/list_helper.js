const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  }
  return 0;
};

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((accumulator, currVal) => {
    return (accumulator += currVal.likes);
  }, 0);

  return sumOfLikes;
};

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((accumulator, currVal) => {
    return accumulator.likes > currVal.likes ? accumulator : currVal;
  });
  return { author: favBlog.author, title: favBlog.title, likes: favBlog.likes };
};

const mostBlogs = (blogs) => {
  const tempObj = blogs.reduce((acc, currVal) => {
    Object.hasOwn(acc, currVal.author)
      ? (acc[currVal.author] += 1)
      : (acc[currVal.author] = 1);
    return acc;
  }, {});
  const maxBlog = Math.max(...Object.values(tempObj));
  const maxBlogAuthor = Object.keys(tempObj).find(
    (key) => tempObj[key] === maxBlog
  );
  return { author: maxBlogAuthor, blogs: maxBlog };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
