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

ALTER TABLE votos ADD FOREIGN KEY (competencia_id) REFERENCES competencia(id);
ALTER TABLE votos ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);

CREATE TABLE `competencias`.`competencia_genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `competencia_id` INT NOT NULL,
  `genero_id` INT UNSIGNED NOT NULL,
PRIMARY KEY (`id`));

ALTER TABLE competencia_genero ADD FOREIGN KEY (competencia_id) REFERENCES competencia(id);
ALTER TABLE competencia_genero ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

CREATE TABLE `competencias`.`competencia_actor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `competencia_id` INT NOT NULL,
  `actor_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE competencia_actor ADD FOREIGN KEY (competencia_id) REFERENCES competencia(id);
ALTER TABLE competencia_actor ADD FOREIGN KEY (actor_id) REFERENCES actor(id);

CREATE TABLE `competencias`.`competencia_director` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `competencia_id` INT NOT NULL,
  `director_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE competencia_director ADD FOREIGN KEY (competencia_id) REFERENCES competencia(id);
ALTER TABLE competencia_director ADD FOREIGN KEY (director_id) REFERENCES director(id);