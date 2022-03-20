CREATE VIEW perfil_artistas AS
SELECT art.nome_artista AS `artista`,
alb.nome_album AS `album`,
(SELECT COUNT(fav.artista_id) FROM SpotifyClone.artistas_favoritos AS fav
WHERE fav.artista_id = art.artista_id) AS `seguidores`
FROM SpotifyClone.artistas AS art
INNER JOIN SpotifyClone.albuns AS alb
ON art.artista_id = alb.artista_id
ORDER BY `seguidores` DESC, `artista`, `album`;
