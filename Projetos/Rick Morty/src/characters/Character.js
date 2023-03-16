const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

CharacterSchema.set("versionKey", false); // retirando __v
const Character = mongoose.model("Character", CharacterSchema);

module.exports = Character;
