const express = require("express");
const app = express();
const port = 3000;
const twilio = require("twilio");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Status: UP");
});

app.post("/", (req, res) => {
  const accountSid = "AC42b65ab435e83293497b32905131d751";
  const authToken = "5d329e2fb2757a1f4e46ffdfa21b5a22";
  const client = twilio(accountSid, authToken);
  const { mobileNumber, code } = req.body;
  client.messages
    .create({
      body: `Bienvenido a Cirkula! Ingresa este código ${code} para validar tu número.`,
      from: "+16506995960",
      to: mobileNumber,
    })
    .then((message) => console.log(message.sid));
  res.json({
    status: "ok",
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
