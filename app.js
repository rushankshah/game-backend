const admin = require("firebase-admin");
const serviceAccount = require("./gamedev-backend-firebase-adminsdk-t9rqe-89e88ede55.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
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

app.post("/endless", (req, res) => {
  try {
    const { score, time, causeOfDeath } = req.body;
    db.collection("endless")
      .doc(getDateAndTime())
      .set({ score, time, causeOfDeath })
      .then(() => {
        console.log("Document successfully written!");
      });
    const op = { success: "Successfully written to database!" };
    res.status(200).json(op);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level2", (req, res) => {
  try {
    const { score, time, causeOfDeath, bulletsFired, bulletHit } = req.body;
    db.collection("level2")
      .doc(getDateAndTime())
      .set({ score, time, causeOfDeath, bulletsFired, bulletHit })
      .then(() => {
        console.log("Document successfully written!");
      });
    const op = { success: "Successfully written to database!" };
    res.status(200).json(op);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level1", (req, res) => {
  try {
    const { score, time, causeOfDeath, isGettingSmall } = req.body;
    db.collection("level1")
      .doc(getDateAndTime())
      .set({ score, time, causeOfDeath, isGettingSmall })
      .then(() => {
        console.log("Document successfully written!");
      });
    const op = { success: "Successfully written to database!" };
    res.status(200).json(op);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.get("/endless", async (req, res) => {
  try {
    var snapshot = await db.collection("endless").get();
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
app.get("/level1", async (req, res) => {
  try {
    var snapshot = await db.collection("level1").get();
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

app.get("/level2", async (req, res) => {
  try {
    var snapshot = await db.collection("level2").get();
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

app.get("/", async (req, res) => {
  try {
    var jsonObject = {
      message: "Welcome to the backend of the game!",
    };
    console.log("Welcome to the backend of the game! (Base URL hit)");
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
