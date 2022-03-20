SELECT UCASE(CONCAT(E.FIRST_NAME, ' ', E.LAST_NAME)) AS `Nome completo`,
H.START_DATE AS `Data de início`,
E.SALARY AS `Salário`
FROM hr.job_history AS H
INNER JOIN hr.employees AS E
ON E.EMPLOYEE_ID = H.EMPLOYEE_ID
AND MONTH(H.START_DATE) IN (1, 2, 3)
ORDER BY `Nome completo`, `Data de início`;
