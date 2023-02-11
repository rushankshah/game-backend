const admin = require("firebase-admin");
const serviceAccount = require("./cs-526-team-undecided-firebase-adminsdk-9dgr5-3b2075b0ef.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

function getDateAndTime() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
}

app.post("/", (req, res) => {
  const { score, time } = req.body;
  db.collection("players-data")
    .doc(getDateAndTime())
    .set({ score, time })
    .then(() => {
      console.log("Document successfully written!");
    });
  res.send("Successfully written to database!");
});

app.get("/", (req, res) => {
  db.collection("players-data")
    .get()
    .then((snapshot) => {
      var arr = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        arr.push(doc.data());
      });
      const jsonObject = {
        data: arr,
      };
      res.send(JSON.stringify(jsonObject));
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// db.collection("users")
//   .doc("test")
//   .set({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815,
//   })
//   .then(() => {
//     console.log("Document successfully written!");
//   });
