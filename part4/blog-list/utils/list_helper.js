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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
