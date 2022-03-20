const dateTime = 1000 * 60 * 60;
const casasDecimais = 2;

db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaomedia: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, dateTime] } },
    },
  },
  { $sort: { duracaomedia: 1 } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaomedia", casasDecimais] },
    },
  },
]);
