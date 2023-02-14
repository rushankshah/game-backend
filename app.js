const admin = require("firebase-admin");
const serviceAccount = require("./gamedev-backend-firebase-adminsdk-t9rqe-89e88ede55.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 2000;

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
  try {
    const { score, time, causeOfDeath } = req.body;
    db.collection("players-data")
      .doc(getDateAndTime())
      .set({ score, time, causeOfDeath })
      .then(() => {
        console.log("Document successfully written!");
      });
    res.send("Successfully written to database!");
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.get("/", async (req, res) => {
  try {
    var snapshot = await db.collection("players-data").get();
    var arr = [];
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      arr.push(doc.data());
    });
    const jsonObject = {
      data: arr,
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
