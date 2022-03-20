db.trips.aggregate([
  {
    $group: {
      _id: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeEstacao: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $project: { nomeEstacao: "$_id.nomeEstacao", total: "$total", _id: 0 } },
]);
