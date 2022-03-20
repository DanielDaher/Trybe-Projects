CREATE VIEW faturamento_atual AS
SELECT
FORMAT(MIN(pl.valor_plano), 2) AS `faturamento_minimo`,

FORMAT(MAX(pl.valor_plano), 2) AS `faturamento_maximo`,

FORMAT(ROUND(AVG(pl.valor_plano), 2), 2) AS `faturamento_medio`,

FORMAT(SUM(pl.valor_plano), 2) AS `faturamento_total`

FROM SpotifyClone.planos AS pl

INNER JOIN SpotifyClone.usuarios AS us

ON pl.plano_id = us.plano_id;
