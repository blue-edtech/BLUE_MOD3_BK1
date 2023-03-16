const Character = require("./Character");

const createCharacterService = (name, status, image, gender, species, userId) =>
  Character.create({
    name,
    status,
    image,
    gender,
    species,
    user: userId,
  });

const findAllCharactersService = (offset, limit) =>
  Character.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countCharactersService = () => Character.countDocuments();

const searchCharacterService = (name) =>
  Character.find({
    name: { $regex: `${name || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");

module.exports = {
  createCharacterService,
  findAllCharactersService,
  countCharactersService,
  searchCharacterService,
};
