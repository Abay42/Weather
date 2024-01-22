const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, news: null, error: null });
});

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0533eafb2e2f7249f62e71f35c3303aa&units=metric`;

  let weather;
  let error = null;
  try {
    const response = await axios.get(weatherAPIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error fetching weather data. Please try again.";
  }
  res.render("index", { weather, error });
});

app.get("/news", async (req, res) => {
  const newsAPIUrl = "https://newsapi.org/v2/top-headlines?country=us&apiKey=5a24fadc362648188f6413575df11280";

  let news;
  try {
    const response = await axios.get(newsAPIUrl);
    news = response.data.articles;
  } catch (error) {
    news = null;
  }
  res.render("index", { news });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
