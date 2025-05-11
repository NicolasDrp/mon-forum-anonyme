const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 80;

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://api:3000/message");
    const messages = response.data;

    const html = `
      <h1>Messages :</h1>
      <ul>
        ${messages
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(
            (m) => `<li><strong>${m.sender.pseudo}</strong> : ${m.content}</li>`
          )
          .join("")}
      </ul>
    `;

    res.send(html);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des messages.");
  }
});

app.listen(PORT, () => {
  console.log(`Thread en écoute sur le port ${PORT}`);
});
