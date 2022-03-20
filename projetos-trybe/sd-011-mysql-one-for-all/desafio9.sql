USE SpotifyClone;
DELIMITER $$

CREATE PROCEDURE albuns_do_artista (IN nome_do_artista VARCHAR(100))
BEGIN
  SELECT 
    art.nome_artista AS `artista`, alb.nome_album AS `album`
    FROM artistas AS art
    INNER JOIN albuns AS alb
    ON alb.artista_id = art.artista_id AND art.nome_artista = nome_do_artista
    ORDER BY `album`;
END $$

DELIMITER ;
