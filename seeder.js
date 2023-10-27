const BlogModel = require("./models/blog");
const db = require("./db");
const calculateReadingTime = require("./utils/readingTime");
const { error } = require("winston");
db.connect()
  .then(async () => {
    const blogPosts = [
      {
        title: "Test 13",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 14",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 15",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 16",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 17",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 18",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 19",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 20",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 21",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 22",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
      {
        title: "Test 23",
        description: "Another test",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        state: "published",
        author: "653b9dab0b97a6ffc2f67a7d",
      },
    ];
    const seedData = blogPosts.map((post) => ({
      ...post,
      reading_time: calculateReadingTime(post.body),
    }));
    await BlogModel.insertMany(seedData);
    console.log("Data seeded successfully");
    process.exit(1);
  })
  .catch((error) => {
    console.log(error);
  });
