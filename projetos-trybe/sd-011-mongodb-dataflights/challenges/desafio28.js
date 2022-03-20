const latamBRASIL = "LATAM AIRLINES BRASIL";

db.resumoVoos.insertOne(
  {
    empresa: latamBRASIL,
    totalVoosDomesticos: db.voos.count(
      {
        "empresa.nome": "LATAM AIRLINES BRASIL",
        natureza: "Doméstica",
      },
      ),
  },
);

db.resumoVoos.findOne({ empresa: latamBRASIL }, { empresa: 1, totalVoosDomesticos: 1, _id: 0 });