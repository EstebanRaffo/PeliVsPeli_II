SELECT * FROM competencia;
SELECT * FROM pelicula;
SELECT * FROM genero;
SELECT * FROM actor where nombre like '%Caprio%';
select * from director;
SELECT * FROM actor_pelicula AP inner join actor A on AP.actor_id = A.id ORDER BY AP.actor_id;

-- Peliculas de un actor
SELECT A.nombre, P.* from pelicula P inner join actor_pelicula AP on AP.pelicula_id = P.id INNER JOIN actor A on AP.actor_id = A.id 
where AP.actor_id = 1203;

-- Peliculas de un director 
SELECT D.nombre, P.* from pelicula P inner join director_pelicula DP on DP.pelicula_id = P.id INNER JOIN director D on DP.director_id = D.id 
WHERE DP.director_id = 3364;


-- Opciones para Competencia id = 1
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 8 AND C.id = 1 ;

-- Opciones para Competencia id = 2
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 5 AND C.id = 2;

-- Opciones para Competencia id = 3
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 269 AND C.id = 3; 

-- Opciones para Competencia id = 4
SELECT C.nombre AS competencia, P.* from pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 13 AND C.id = 4;

-- Opciones para Competencia id = 5
SELECT C.nombre AS competencia, P.* from pelicula P, competencia C, director_pelicula DP WHERE DP.pelicula_id = P.id and DP.director_id = 3364 AND C.id = 5;

-- Opciones para Competencia id = 6
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C, actor_pelicula AP WHERE AP.pelicula_id = P.id AND AP.actor_id = 1203 AND C.id = 6;

-- Opciones para Competencia id = 7
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 10 AND C.id = 7;

-- Opciones para Competencia id = 8
SELECT C.nombre AS competencia, P.* FROM pelicula P, competencia C WHERE P.genero_id = 7 AND C.id = 8;