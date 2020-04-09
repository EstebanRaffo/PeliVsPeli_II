SELECT * FROM competencia; 
-- WHERE nombre = '¿Cuál es el mejor drama?'; 
-- WHERE id = 8;

SELECT * FROM pelicula;
SELECT * FROM genero;
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


-- Opciones para Competencia id = 1 ¿Cuál es el mejor drama?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 8 AND C.id = 1 ;

-- Opciones para Competencia id = 2 ¿Cuál es la comedia que más te hizo reir?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 5 AND C.id = 2;

-- Opciones para Competencia id = 3 ¿Cuál es la mejor peli con Cameron Diaz?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 269 AND C.id = 3; 

-- Opciones para Competencia id = 4 ¿Cuál es tu favorita de Adam Sandler?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 13 AND C.id = 4;

-- Opciones para Competencia id = 5 ¿Cuál es la mejor pelicula dirigida por Woody Allen?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, director_pelicula DP WHERE DP.pelicula_id = P.id AND DP.director_id = 3279 AND C.id = 5;

-- Opciones para Competencia id = 6 ¿En qué pelicula merecia el Oscar Leonardo Di Caprio?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 1203 AND C.id = 6;

-- Opciones para Competencia id = 7 ¿Qué pelicula de terror te asustó más?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 10 AND C.id = 7;

-- Opciones para Competencia id = 8 ¿Cuál documental te pareció más interesante?
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 7 AND C.id = 8;

-- Agregar Votos
SELECT * FROM votos;
SELECT cantidad FROM votos WHERE competencia_id = 1 AND pelicula_id = 1;
INSERT votos (competencia_id, pelicula_id, cantidad) VALUES (1, 1, 4);
UPDATE votos SET cantidad = 1 WHERE competencia_id = 1 AND pelicula_id = 1;
SELECT C.nombre AS competencia, P.poster, P.titulo, V.cantidad AS votos FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id
INNER JOIN pelicula P ON V.pelicula_id = P.id  
WHERE V.competencia_id = 3 ORDER BY V.cantidad DESC;

-- Reiniciar Competencia
DELETE FROM votos WHERE competencia_id = 3; 
SELECT C.nombre as nombre, V.* FROM votos V INNER JOIN competencia C ON V.competencia_id = C.id WHERE C.id = 3


