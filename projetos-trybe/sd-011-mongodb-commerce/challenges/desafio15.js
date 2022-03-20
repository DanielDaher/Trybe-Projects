db.produtos.count(
  { nome: { $regex: /Mc/i } },
);