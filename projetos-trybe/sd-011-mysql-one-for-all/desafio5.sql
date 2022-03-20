CREATE VIEW top_2_hits_do_momento AS
SELECT msc.nome_musica AS `cancao`,
COUNT(hrep.musica_id) AS `reproducoes`
FROM SpotifyClone.musicas AS msc
INNER JOIN SpotifyClone.historico_reproducoes AS hrep
ON hrep.musica_id = msc.musica_id
GROUP BY `cancao`
ORDER BY `reproducoes` DESC, `cancao`
LIMIT 2;
