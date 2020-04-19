SELECT * FROM pelicula;
SELECT * FROM actor WHERE nombre LIKE '%Cook%';
SELECT * FROM director WHERE nombre LIKE '%Blaise%';

SELECT * FROM actor_pelicula AP INNER JOIN actor A ON AP.actor_id = A.id ORDER BY AP.actor_id;
SELECT * FROM director_pelicula DP INNER JOIN director D ON DP.director_id = D.id WHERE DP.director_id = 3279;
SELECT DP.director_id, COUNT(*) AS peliculas FROM director_pelicula DP INNER JOIN director D ON DP.director_id = D.id GROUP BY DP.director_id 
HAVING COUNT(*) > 3 ORDER BY DP.director_id;

-- Peliculas de un actor
SELECT A.nombre, P.* FROM pelicula P INNER JOIN actor_pelicula AP ON AP.pelicula_id = P.id INNER JOIN actor A ON AP.actor_id = A.id 
WHERE AP.actor_id = 1;

-- Peliculas de un director 
SELECT D.nombre, P.* FROM pelicula P INNER JOIN director_pelicula DP ON DP.pelicula_id = P.id INNER JOIN director D ON DP.director_id = D.id 
WHERE DP.director_id = 3311;

SELECT * FROM competencia; 
SELECT * FROM genero;

-- DATOS COMPETENCIA + GENERO + ACTOR + DIRECTOR
SELECT C.nombre AS nombre, G.nombre AS genero_nombre, A.nombre AS actor_nombre, D.nombre AS director_nombre 
FROM competencia C, genero G, actor A, director D
WHERE C.id = 25 and C.genero_id = G.id AND C.actor_id = A.id AND C.director_id = D.id; 

-- AGREGAR VOTOS
SELECT * FROM votos;
SELECT cantidad FROM votos WHERE competencia_id = 1 AND pelicula_id = 1;
INSERT votos (competencia_id, pelicula_id, cantidad) VALUES (1, 1, 4);
UPDATE votos SET cantidad = 1 WHERE competencia_id = 1 AND pelicula_id = 1;
SELECT C.nombre AS competencia, P.poster, P.titulo, V.cantidad AS votos FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id
INNER JOIN pelicula P ON V.pelicula_id = P.id  
WHERE V.competencia_id = 3 ORDER BY V.cantidad DESC;

-- Reiniciar Competencia
DELETE FROM votos WHERE competencia_id = 3; 
SELECT C.nombre AS nombre, V.* FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id WHERE C.id = 3;

-- Ver actores y directores que participan con peliculas en común
SELECT DP.director_id, D.nombre as director, AP.actor_id, A.nombre as actor, P.titulo, P.genero_id FROM pelicula P 
INNER JOIN director_pelicula DP ON P.id = DP.pelicula_id
INNER JOIN director D ON DP.director_id = D.id
INNER JOIN actor_pelicula AP ON P.id = AP.pelicula_id
INNER JOIN actor A ON AP.actor_id = A.id
ORDER BY DP.director_id, AP.actor_id;

-- Ver directores y actores que participan en una pelicula del mismo genero (actor_id = 2,7,13) (genero_id = 5,5,5)
SELECT DP.director_id, D.nombre as director, AP.actor_id, A.nombre as actor, P.genero_id, G.nombre as genero, P.titulo as pelicula, P.genero_id FROM pelicula P 
INNER JOIN genero G ON P.genero_id = G.id
INNER JOIN director_pelicula DP ON P.id = DP.pelicula_id
INNER JOIN director D ON DP.director_id = D.id
INNER JOIN actor_pelicula AP ON P.id = AP.pelicula_id
INNER JOIN actor A ON AP.actor_id = A.id
ORDER BY P.genero_id, DP.director_id, AP.actor_id;

-- Actualizar competencia
UPDATE competencia SET nombre = 'nuevo nombre' WHERE id = 7;

-- OBTENER OPCIONES

-- OPCIONES COMPETENCIA + GENERO 
SELECT C.nombre AS competencia, P.* 
FROM competencia C, pelicula P 
WHERE C.id = 37 AND C.genero_id = P.genero_id 
ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + ACTOR
SELECT C.nombre AS competencia, P.* 
FROM competencia C, pelicula P, actor_pelicula AP 
WHERE C.id = 39 AND C.actor_id = AP.actor_id AND AP.pelicula_id = P.id 
ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + DIRECTOR
SELECT C.nombre AS competencia, P.* 
FROM competencia C, pelicula P, director_pelicula DP 
WHERE C.id = 38 AND C.director_id = DP.director_id AND DP.pelicula_id = P.id 
ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + GENERO + ACTOR
SELECT C.nombre AS competencia, P.* 
FROM pelicula P, competencia C, actor_pelicula AP
WHERE C.id = 33 AND C.genero_id = P.genero_id AND C.actor_id = AP.actor_id AND AP.pelicula_id = P.id 
ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + GENERO + DIRECTOR
SELECT C.nombre AS competencia, P.* 
FROM pelicula P, competencia C, director_pelicula DP
WHERE C.id = 34 AND C.genero_id = P.genero_id AND C.director_id = DP.director_id AND DP.pelicula_id = P.id 
ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + ACTOR + DIRECTOR
SELECT C.nombre AS competencia, P.* 
FROM pelicula P, competencia C, actor_pelicula AP, director_pelicula DP
WHERE C.id = 40 AND C.actor_id = AP.actor_id AND AP.pelicula_id = P.id AND C.director_id = DP.director_id AND DP.pelicula_id = P.id
ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + GENERO + ACTOR + DIRECTOR
SELECT C.nombre AS competencia, P.* 
FROM pelicula P, competencia C, actor_pelicula AP, director_pelicula DP
WHERE C.id = 41 AND C.genero_id = P.genero_id AND C.actor_id = AP.actor_id AND AP.pelicula_id = P.id AND C.director_id = DP.director_id AND DP.pelicula_id = P.id
ORDER BY RAND() LIMIT 2;

-- OPCIONES DISPONIBLES CON GENERO + ACTOR + DIRECTOR 
SELECT P.* 
FROM pelicula P, actor_pelicula AP, director_pelicula DP
WHERE P.genero_id = 1 AND AP.actor_id = 1555 AND AP.pelicula_id = P.id AND DP.director_id = 3309 AND DP.pelicula_id = P.id; 

SELECT P.* 
FROM pelicula P, actor_pelicula AP, director_pelicula DP
WHERE AP.actor_id = 1719 AND AP.pelicula_id = P.id AND DP.director_id = 3282 AND DP.pelicula_id = P.id;










