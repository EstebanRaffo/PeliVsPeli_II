CREATE DATABASE competencias_ii;

USE competencias_ii;

CREATE TABLE `competencias_ii`.`competencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
PRIMARY KEY (`id`));

-- insert de Guia 2
insert competencia (nombre) values("¿Cuál es el mejor drama?");
insert competencia (nombre) values("¿Cuál es la comedia que más te hizo reir?");
insert competencia (nombre) values("¿Cuál es la mejor peli con Cameron Diaz?");
insert competencia (nombre) values("¿Cuál es tu favorita de Adam Sandler?");
insert competencia (nombre) values("¿Cuál es la mejor pelicula dirigida por Woody Allen?");
insert competencia (nombre) values("¿En qué pelicula merecia el Oscar Leonardo Di Caprio?");
insert competencia (nombre) values("¿Qué pelicula de terror te asustó más?");
insert competencia (nombre) values("¿Cuál documental te pareció más interesante?");

CREATE TABLE `competencias`.`votos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `competencia_id` INT NOT NULL,
  `pelicula_id` INT UNSIGNED NOT NULL,
  `cantidad` INT NOT NULL,
PRIMARY KEY (`id`));

ALTER TABLE votos ADD FOREIGN KEY (competencia_id) REFERENCES competencia(id);
ALTER TABLE votos ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);


ALTER TABLE competencia ADD COLUMN genero_id INT UNSIGNED;
ALTER TABLE competencia ADD COLUMN actor_id INT UNSIGNED;
ALTER TABLE competencia ADD COLUMN director_id INT UNSIGNED;

ALTER TABLE competencia ADD FOREIGN KEY (genero_id) references genero(id);
ALTER TABLE competencia ADD FOREIGN KEY (actor_id) references actor(id);
ALTER TABLE competencia ADD FOREIGN KEY (director_id) references director(id);

ALTER TABLE usuario ADD COLUMN rol_id INT;

CREATE TABLE `rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
PRIMARY KEY (`id`));

insert rol (nombre) values ('administrador');
insert rol (nombre) values ('participante');

ALTER TABLE usuario ADD FOREIGN KEY (rol_id) references rol(id);