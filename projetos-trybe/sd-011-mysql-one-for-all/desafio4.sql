CREATE VIEW top_3_artistas AS
SELECT art.nome_artista AS `artista`, (SELECT COUNT(fav.artista_id) FROM SpotifyClone.artistas_favoritos AS fav WHERE art.artista_id = fav.artista_id) AS `seguidores`
FROM SpotifyClone.artistas AS art
ORDER BY `seguidores` DESC, `artista`
LIMIT 3;
