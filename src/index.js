import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

import models, { connectDb } from "./models";
import routes from "./routes";

const app = express();

// Application-Level Middleware

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("Lsimpson")
  };
  next();
});

// Routes

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/business", routes.business);

// Start

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({}),
        models.Business.deleteMany({})
    ]);

    createUsersWithMessages();
  }

  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});

const createUsersWithMessages = async () => {
  const user1 = new models.User({
    username: "Lsimpson"
  });

  const user2 = new models.User({
    username: "ddavids"
  });
  const business1 = new models.Business({
    name: "Coffe House",
    wifi: true
  });

  const business2 = new models.Business({
    name: "Amy's Diner",
    wifi: true
  });

  const business3 = new models.Business({
    name: "Insomnia Cafe",
    wifi: true
  });
  const message1 = new models.Message({
    text: "Great Wifi & Coffee Here",
    user: user1.id,
    business: business1.id
  });

  const message2 = new models.Message({
    text: "Accessibility is tough but good wifi",
    user: user2.id,
    business: business2.id
  });

  const message3 = new models.Message({
    text: "Too loud and busy to stay long",
    user: user2.id,
    business: business3.id
  });

  await message1.save();
  await message2.save();
  await message3.save();

  await user1.save();
  await user2.save();

  await business1.save();
  await business2.save();
  await business3.save();
};
