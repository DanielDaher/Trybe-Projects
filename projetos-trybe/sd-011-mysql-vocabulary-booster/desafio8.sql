SELECT c.ContactName AS `Nome de contato`,  sh.ShipperName AS `Empresa que fez o envio`, o.OrderDate AS `Data do pedido`
FROM w3schools.orders AS o
INNER JOIN w3schools.customers AS c
ON c.CustomerID = o.CustomerID
INNER JOIN w3schools.shippers AS sh
ON sh.ShipperID = o.ShipperID AND sh.ShipperName <> 'Federal Shipping'
ORDER BY `Nome de contato`, `Empresa que fez o envio`, `Data do pedido`;
