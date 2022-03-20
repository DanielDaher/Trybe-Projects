const validateRate = (req, res, next) => {
  const { talk } = req.body;

  const watchedAtFormat = /^[\d]{2}\/[\d]{2}\/[\d]{4}$/;

  if (talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!watchedAtFormat.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || talk.rate === undefined || talk.watchedAt === undefined) {
    return res.status(400).json({ 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

module.exports = { validateTalk, validateRate };