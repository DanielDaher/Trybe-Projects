CREATE VIEW historico_reproducao_usuarios AS
SELECT us.nome_usuario AS `usuario`,
(SELECT msc.nome_musica FROM SpotifyClone.musicas AS msc 
WHERE msc.musica_id = hrep.musica_id) AS `nome`
FROM SpotifyClone.usuarios AS us
INNER JOIN SpotifyClone.historico_reproducoes AS hrep
ON us.usuario_id = hrep.usuario_id
ORDER BY `usuario`, `nome`;
