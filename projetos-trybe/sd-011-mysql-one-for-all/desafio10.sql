USE SpotifyClone;
DELIMITER $$

CREATE FUNCTION quantidade_musicas_no_historico(id_do_usuario INT)
RETURNS INT READS SQL DATA
BEGIN
  DECLARE music_total INT;
  SELECT COUNT(usuario_id) FROM historico_reproducoes
  WHERE usuario_id = id_do_usuario
  INTO music_total;
  RETURN music_total;
END $$
DELIMITER ;
