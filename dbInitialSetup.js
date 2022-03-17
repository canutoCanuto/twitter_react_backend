const mongoose = require("mongoose");
const User = require("./models/User");
const _ = require("lodash");
const { bulkSave } = require("./models/User");

module.exports = async () => {
  // Crear tablas:
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  // console.log("[Database] ¡Las tablas fueron creadas!");

  // Ejecutar seeders (datos de prueba):
  //await require("./seeders/userSeeder")();
  // await require("./seeders/tweetSeeder")();
  //Funcion para agregar seguidos
  /*   async function setFollowings() {
    try {
      const users = await User.find({});
      for (const user of users) {
        const followings = _.sampleSize(users, 3).filter((value) => {
          if (value.id !== user.id) {
            return value.id;
          }
        });
        for (const followingUser of followings) {
          await User.findByIdAndUpdate(
            { _id: followingUser.id },
            { $push: { followers: user.id } },
          );
        }

        await User.findByIdAndUpdate({ _id: user.id }, { $push: { following: followings } });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  setFollowings();

  console.log("[Database] ¡Los datos de prueba fueron insertados!"); */
};
