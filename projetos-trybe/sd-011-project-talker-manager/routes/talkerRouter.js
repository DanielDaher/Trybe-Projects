const router = require('express').Router();

const { readTalkerFile, writeTalkerFile } = require('../helper/fs');
const validateToken = require('../helper/validations/validateToken');
const validateName = require('../helper/validations/validateName');
const validateAge = require('../helper/validations/validateAge');
const { validateTalk, validateRate } = require('../helper/validations/validateTalk');

router.get('/', async (req, res) => {
  const data = await readTalkerFile();

  res.status(200).json(data);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const data = await readTalkerFile();

  const theTalker = data.filter((talker) => talker.name.includes(q));

  if (!q || q === '') return res.status(200).json({ data });

  res.status(200).json(theTalker);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readTalkerFile();

  const findTalker = data.find((talker) => Number(talker.id) === Number(id));

  if (!findTalker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

router.use(validateToken);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readTalkerFile();

  const newData = data.filter((talker) => Number(talker.id) !== Number(id));

  await writeTalkerFile(newData);

  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

router.use(validateName);
router.use(validateAge);
router.use(validateTalk);
router.use(validateRate);

router
  .post('/',
  async (req, res) => {
  const { name, age, talk } = req.body;

  const data = await readTalkerFile();
  const id = data[data.length - 1].id + 1;

  await writeTalkerFile([...data, { id, name, age, talk }]);

  res.status(201).json({ id, name, age, talk });
});

router
  .put('/:id',
  async (req, res) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;

  const data = await readTalkerFile();

  const indexProduct = data.findIndex((p) => p.id === Number(id));

  data[indexProduct] = { ...data[indexProduct], name, age, talk };

  await writeTalkerFile(data);

  res.status(200).json(data[indexProduct]);
});

module.exports = router;