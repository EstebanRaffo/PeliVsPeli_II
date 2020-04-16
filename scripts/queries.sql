SELECT * FROM pelicula;
SELECT * FROM actor; 
-- WHERE nombre LIKE '%Caprio%';
SELECT * FROM director;
SELECT * FROM actor_pelicula AP INNER JOIN actor A ON AP.actor_id = A.id ORDER BY AP.actor_id;
SELECT * FROM director_pelicula DP INNER JOIN director D ON DP.director_id = D.id WHERE DP.director_id = 3279;
SELECT DP.director_id, COUNT(*) AS peliculas FROM director_pelicula DP INNER JOIN director D ON DP.director_id = D.id GROUP BY DP.director_id 
HAVING COUNT(*) > 3 ORDER BY DP.director_id;

-- Peliculas de un actor
SELECT A.nombre, P.* FROM pelicula P INNER JOIN actor_pelicula AP ON AP.pelicula_id = P.id INNER JOIN actor A ON AP.actor_id = A.id 
WHERE AP.actor_id = 1203;

-- Peliculas de un director 
SELECT D.nombre, P.* FROM pelicula P INNER JOIN director_pelicula DP ON DP.pelicula_id = P.id INNER JOIN director D ON DP.director_id = D.id 
WHERE DP.director_id = 3445;


-- OBTENER OPCIONES

SELECT * FROM competencia; 
SELECT * FROM genero;
-- INSERT competencia_genero (competencia_id, genero_id) VALUES ();

-- OPCIONES COMPETENCIA + GENERO 
SELECT * FROM competencia_genero;
-- Opciones para Competencia id = 1 ¿Cuál es el mejor drama? con genero_id = 8
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN pelicula P ON CG.genero_id = P.genero_id WHERE C.id = 1 ORDER BY RAND() LIMIT 2;

-- Opciones para Competencia id = 2 ¿Cuál es la comedia que más te hizo reir? con genero_id = 5
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN pelicula P ON CG.genero_id = P.genero_id WHERE C.id = 2 ORDER BY RAND() LIMIT 2;

-- Opciones para Competencia id = 7 ¿Qué pelicula de terror te asustó más?
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN pelicula P ON CG.genero_id = P.genero_id WHERE C.id = 7 ORDER BY RAND() LIMIT 2;

-- Opciones para Competencia id = 8 ¿Cuál documental te pareció más interesante?
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN pelicula P ON CG.genero_id = P.genero_id WHERE C.id = 8 ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + ACTOR
SELECT * FROM competencia_actor;
-- Opciones para Competencia id = 3 ¿Cuál es la mejor peli con Cameron Diaz? con actor_id = 269
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN actor_pelicula AP ON CA.actor_id = AP.actor_id
INNER JOIN pelicula P ON AP.pelicula_id = P.id WHERE C.id = 3 ORDER BY RAND() LIMIT 2;

-- Opciones para Competencia id = 4 ¿Cuál es tu favorita de Adam Sandler?
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN actor_pelicula AP ON CA.actor_id = AP.actor_id
INNER JOIN pelicula P ON AP.pelicula_id = P.id WHERE C.id = 4 ORDER BY RAND() LIMIT 2;

-- Opciones para Competencia id = 6 ¿En qué pelicula merecia el Oscar Leonardo Di Caprio?
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN actor_pelicula AP ON CA.actor_id = AP.actor_id
INNER JOIN pelicula P ON AP.pelicula_id = P.id WHERE C.id = 6 ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + DIRECTOR
SELECT * FROM competencia_director;
-- Opciones para Competencia id = 5 ¿Cuál es la mejor pelicula dirigida por Woody Allen?
SELECT C.nombre AS competencia, P.* FROM competencia C INNER JOIN director_pelicula DP ON CD.director_id = DP.director_id
INNER JOIN pelicula P ON DP.pelicula_id = P.id WHERE C.id = 5 ORDER BY RAND() LIMIT 2;

-- OPCIONES COMPETENCIA + GENERO + ACTOR
SELECT AP.actor_id AS actor_id, C.nombre AS competencia, P.* FROM competencia C 
INNER JOIN actor_pelicula AP ON CA.actor_id = AP.actor_id
INNER JOIN pelicula P ON AP.pelicula_id = P.id AND C.genero_id = P.genero_id WHERE C.id = 8;-- ORDER BY RAND() LIMIT 2; -- actor_id = 1203;

SELECT C.nombre AS competencia, AP.actor_id AS actor_id, P.genero_id, P.* FROM pelicula P, competencia C, actor_pelicula AP
WHERE C.id = 8 AND P.id = AP.pelicula_id AND AP.actor_id = C.actor_id;


-- Actor que participo en varias peliculas del mismo genero (actor_id = 2,7,13) (genero_id = 5,5,5)
SELECT AP.actor_id, P.genero_id, P.* FROM pelicula P 
INNER JOIN actor_pelicula AP ON AP.pelicula_id = P.id
INNER JOIN genero G ON P.genero_id = G.id
ORDER BY AP.actor_id, P.genero_id;

-- DATOS COMPETENCIA + GENERO + ACTOR + DIRECTOR
SELECT C.nombre AS nombre, G.nombre AS genero_nombre, A.nombre AS actor_nombre, D.nombre AS director_nombre 
FROM competencia C, genero G, actor A, director D
WHERE C.genero_id = G.id AND C.actor_id = A.id AND C.director_id = D.id AND C.id = 13; 







 


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
SELECT C.nombre AS nombre, V.* FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id WHERE C.id = 3


