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

// app.post("/endless", (req, res) => {
//   try {
//     const { score, time, causeOfDeath } = req.body;
//     db.collection("endless")
//       .doc(getDateAndTime())
//       .set({ score, time, causeOfDeath })
//       .then(() => {
//         console.log("Document successfully written!");
//       });
//     const op = { success: "Successfully written to database!" };
//     res.status(200).json(op);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

app.post("/mainmenu", async (req, res) => {
  try {
    const { level } = req.body;
    var count = 0;
    var snapshot = await db.collection("mainmenu").get();
    snapshot.forEach((doc) => {
      if (doc.id == level) {
        count = doc.data();
      }
    });
    count += 1;
    db.collection("mainmenu")
      .doc(level)
      .set({ count })
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

app.get("/mainmenu", async (req, res) => {
  try {
    var snapshot = await db.collection("mainmenu").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push({ level: doc.id, count: doc.data().count });
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.get("/retries", async (req, res) => {
  try {
    var snapshot = await db.collection("retries").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push({ level: doc.id, count: doc.data().count });
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/retries", async (req, res) => {
  try {
    const { level } = req.body;
    var count = 0;
    var snapshot = await db.collection("retries").get();
    snapshot.forEach((doc) => {
      if (doc.id == level) {
        count = doc.data();
      }
    });
    count += 1;
    db.collection("retries")
      .doc(level)
      .set({ count })
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

app.post("/level1lost", (req, res) => {
  try {
    const { time, causeOfDeath } = req.body;
    db.collection("level1lost")
      .doc(getDateAndTime())
      .set({ time, causeOfDeath })
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

app.get("/level1lost", async (req, res) => {
  try {
    var snapshot = await db.collection("level1lost").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level1won", (req, res) => {
  try {
    const { time, causeOfWin } = req.body;
    db.collection("level1won")
      .doc(getDateAndTime())
      .set({ time, causeOfWin })
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

app.get("/level1won", async (req, res) => {
  try {
    var snapshot = await db.collection("level1won").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level2lost", (req, res) => {
  try {
    const { time, causeOfDeath } = req.body;
    db.collection("level2lost")
      .doc(getDateAndTime())
      .set({ time, causeOfDeath })
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

app.get("/level2lost", async (req, res) => {
  try {
    var snapshot = await db.collection("level2lost").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level2won", (req, res) => {
  try {
    const { time, causeOfWin, killedEnemy } = req.body;
    db.collection("level2won")
      .doc(getDateAndTime())
      .set({ time, causeOfWin, killedEnemy })
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

app.get("/level2won", async (req, res) => {
  try {
    var snapshot = await db.collection("level2won").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level3lost", (req, res) => {
  try {
    const { time, causeOfDeath, numberOfSpikes } = req.body;
    db.collection("level3lost")
      .doc(getDateAndTime())
      .set({ time, causeOfDeath, numberOfSpikes })
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

app.get("/level3lost", async (req, res) => {
  try {
    var snapshot = await db.collection("level3lost").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level3won", (req, res) => {
  try {
    const { time, causeOfWin, killedEnemy } = req.body;
    db.collection("level3won")
      .doc(getDateAndTime())
      .set({ time, causeOfWin, killedEnemy })
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

app.get("/level3won", async (req, res) => {
  try {
    var snapshot = await db.collection("level3won").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level4lost", (req, res) => {
  try {
    const { time, causeOfDeath, numberOfSpikes } = req.body;
    db.collection("level4lost")
      .doc(getDateAndTime())
      .set({ time, causeOfDeath, numberOfSpikes })
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

app.get("/level4lost", async (req, res) => {
  try {
    var snapshot = await db.collection("level4lost").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level4won", (req, res) => {
  try {
    const { time, causeOfWin, killedEnemy } = req.body;
    db.collection("level4won")
      .doc(getDateAndTime())
      .set({ time, causeOfWin, killedEnemy })
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

app.get("/level4won", async (req, res) => {
  try {
    var snapshot = await db.collection("level4won").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level5lost", (req, res) => {
  try {
    const { time, causeOfDeath, numberOfSpikes } = req.body;
    db.collection("level5lost")
      .doc(getDateAndTime())
      .set({ time, causeOfDeath, numberOfSpikes })
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

app.get("/level5lost", async (req, res) => {
  try {
    var snapshot = await db.collection("level5lost").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.post("/level5won", (req, res) => {
  try {
    const { time, causeOfWin, killedEnemy } = req.body;
    db.collection("level5won")
      .doc(getDateAndTime())
      .set({ time, causeOfWin, killedEnemy })
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

app.get("/level5won", async (req, res) => {
  try {
    var snapshot = await db.collection("level5won").get();
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// app.post("/tutorial", (req, res) => {
//   try {
//     const { score, time, causeOfDeath } = req.body;
//     db.collection("tutorial")
//       .doc(getDateAndTime())
//       .set({ score, time, causeOfDeath })
//       .then(() => {
//         console.log("Document successfully written!");
//       });
//     const op = { success: "Successfully written to database!" };
//     res.status(200).json(op);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// app.post("/level2", (req, res) => {
//   try {
//     const {
//       score,
//       time,
//       causeOfDeath,
//       bulletsFired,
//       bulletHit,
//       isGettingSmall,
//     } = req.body;
//     db.collection("level2")
//       .doc(getDateAndTime())
//       .set({
//         score,
//         time,
//         causeOfDeath,
//         bulletsFired,
//         bulletHit,
//         isGettingSmall,
//       })
//       .then(() => {
//         console.log("Document successfully written!");
//       });
//     const op = { success: "Successfully written to database!" };
//     res.status(200).json(op);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// app.post("/level1", (req, res) => {
//   try {
//     const { score, time, causeOfDeath, isGettingSmall } = req.body;
//     db.collection("level1")
//       .doc(getDateAndTime())
//       .set({ score, time, causeOfDeath, isGettingSmall })
//       .then(() => {
//         console.log("Document successfully written!");
//       });
//     const op = { success: "Successfully written to database!" };
//     res.status(200).json(op);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// app.get("/endless", async (req, res) => {
//   try {
//     var snapshot = await db.collection("endless").get();
//     var arr = [];
//     snapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//       arr.push(doc.data());
//     });
//     const jsonObject = {
//       data: arr,
//     };
//     res.status(200).json(jsonObject);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// app.get("/tutorial", async (req, res) => {
//   try {
//     var snapshot = await db.collection("tutorial").get();
//     var arr = [];
//     snapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//       arr.push(doc.data());
//     });
//     const jsonObject = {
//       data: arr,
//     };
//     res.status(200).json(jsonObject);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// app.get("/level1", async (req, res) => {
//   try {
//     var snapshot = await db.collection("level1").get();
//     var arr = [];
//     snapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//       arr.push(doc.data());
//     });
//     const jsonObject = {
//       data: arr,
//     };
//     res.status(200).json(jsonObject);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// app.get("/level2", async (req, res) => {
//   try {
//     var snapshot = await db.collection("level2").get();
//     var arr = [];
//     snapshot.forEach((doc) => {
//       console.log(doc.id, "=>", doc.data());
//       arr.push(doc.data());
//     });
//     const jsonObject = {
//       data: arr,
//     };
//     res.status(200).json(jsonObject);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

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
