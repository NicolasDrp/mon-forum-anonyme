const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send", async (req, res) => {
  const { sender, content } = req.body;

  try {
    await fetch("http://api:3000/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender, content }),
    });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Erreur lors de l'envoi");
  }
});

app.listen(8080, () => console.log("Sender en écoute sur le port 8080"));
