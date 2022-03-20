SELECT p.ProductName AS `Produto`, MIN(o_d.Quantity) AS `Mínima`, MAX(o_d.Quantity) AS `Máxima`, ROUND(AVG(o_d.Quantity), 2) AS `Média`
FROM w3schools.order_details AS o_d
INNER JOIN w3schools.products AS p
ON p.ProductID = o_d.ProductID
GROUP BY `Produto`
HAVING `Média` > 20
ORDER BY `Média`, `Produto`;
