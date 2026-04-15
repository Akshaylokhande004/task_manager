import app from "./app";
const PORT = parseInt(process.env.PORT || '5000', 10);
console.log(process.env.WEBHOOK_URL);
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});