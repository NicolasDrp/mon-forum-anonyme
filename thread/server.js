/* eslint-disable no-undef */
const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 80;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Function to read HTML template
const getHtmlTemplate = () => {
  return fs.readFileSync(
    path.join(__dirname, "public", "template.html"),
    "utf8"
  );
};

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("http://api:3000/message");
    const messages = response.data;

    const messagesHtml = messages
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map(
        (m) => `<li class="message">
          <div class="message-header">
            <span class="sender">${m.sender.pseudo}</span>
            <span class="date" data-date=${m.date}></span>
          </div>
          <div class="message-content">${m.content}</div>
        </li>`
      )
      .join("");

    console.log(messages);

    // Replace the placeholder in the template with the actual messages
    const template = getHtmlTemplate();
    const html = template.replace("{{MESSAGES}}", messagesHtml);

    res.send(html);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des messages." + err);
  }
});

app.listen(PORT, () => {
  console.log(`Thread en écoute sur le port ${PORT}`);
});
