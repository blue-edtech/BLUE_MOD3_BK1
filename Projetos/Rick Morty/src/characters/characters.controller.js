const characterService = require("./characters.service");

const createCharacterController = async (req, res) => {
  try {
    const { name, status, image, gender, species } = req.body;

    if (!name || !status || !image || !gender || !species) {
      return res.status(400).json({
        message: "Nome, status, gender, species e imagem são obrigatórios",
      });
    }

    const { id } = await characterService.createCharacterService(
      name,
      status,
      image,
      gender,
      species,
      req.userId
    );

    return res.send({
      message: "Personagem criado com sucesso",
      character: { id, name, status, image, gender, species },
    });
  } catch (err) {
     res.status(500).send({
      message: "Erro ao criar personagem",
      error: err,
    });
  }
};

const findAllCharactersController = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 6;
    }

    if (!offset) {
      offset = 0;
    }

    const characters = await characterService.findAllCharactersService(
      offset,
      limit
    );
    const total = await characterService.countCharactersService();

    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (characters.length === 0) {
      return res.status(404).send({
        message: "Nenhum personagem encontrado",
      });
    }

    return res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: characters.map((characters) => ({
        id: characters._id,
        name: characters.name,
        status: characters.status,
        image: characters.image,
        gender: characters.gender,
        species: characters.species,
      })),

    });

  } catch (err) {
    return res.status(500).send({
      message: "Erro ao buscar personagens",
      error: err,
    });
  }
};

const searchCharacterController = async (req, res) => {
  const { name } = req.query;

  const character = await characterService.searchCharacterService(name);

  if (character.length === 0) {
    return res
      .status(400)
      .send({ message: "Não existem Personagem com esse nome!" });
  }

  return res.send({
    characters: character.map((character) => ({
      id: character._id,
      name: character.name,
      status: character.status,
      image: character.image,
      gender: character.gender,
      species: character.species,
    })),
  });
};

module.exports = {
  createCharacterController,
  findAllCharactersController,
  searchCharacterController,
};
