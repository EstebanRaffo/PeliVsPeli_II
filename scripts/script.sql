CREATE TABLE `competencias`.`competencia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
PRIMARY KEY (`id`));

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

ALTER TABLE votos add FOREIGN KEY (competencia_id) REFERENCES competencia(id);
ALTER TABLE votos add FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);

