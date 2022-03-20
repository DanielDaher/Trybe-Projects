db.trips.aggregate([
  {
    $group: {
      _id: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeEstacao: "$startStationName" },
      total: { $sum: 1 },
    },
  },
]);
