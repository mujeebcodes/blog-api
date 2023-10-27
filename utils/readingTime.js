const calculateReadingTime = (content) => {
  // Assuming an average reading speed of 200 words per minute
  const averageReadingSpeed = 200;

  // Count the words in the content
  const wordCount = content.split(/\s+/).length;

  // Calculate the reading time in minutes
  const readingTime = Math.ceil(wordCount / averageReadingSpeed);

  return readingTime;
};

module.exports = calculateReadingTime;
