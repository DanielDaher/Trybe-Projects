DROP DATABASE IF EXISTS SpotifyClone;

CREATE DATABASE SpotifyClone;

USE SpotifyClone;

CREATE TABLE planos(
  plano_id INT PRIMARY KEY AUTO_INCREMENT,
  nome_plano VARCHAR(100) NOT NULL,
  valor_plano DOUBLE NOT NULL
) engine = InnoDB;

INSERT INTO planos (nome_plano, valor_plano)
VALUES
('gratuito', 0.00),
('familiar', 7.99),
('universitário', 5.99);

CREATE TABLE usuarios(
usuario_id INT PRIMARY KEY AUTO_INCREMENT,
nome_usuario VARCHAR(100) NOT NULL,
idade INT NOT NULL,
plano_id INT NOT NULL,
FOREIGN KEY (plano_id) REFERENCES planos(plano_id)
) engine = InnoDB;

INSERT INTO usuarios (nome_usuario, idade, plano_id)
VALUES
('Thati', 23, 1),
('Cintia', 35, 2),
('Bill', 20, 3),
('Roger', 45, 1);

CREATE TABLE artistas(
artista_id INT PRIMARY KEY AUTO_INCREMENT,
nome_artista VARCHAR(100) NOT NULL
) engine = InnoDB;

INSERT INTO artistas (nome_artista)
VALUES
('Walter Phoenix'),
('Peter Strong'),
('Lance Day'),
('Freedie Shannon');

CREATE TABLE albuns(
album_id INT PRIMARY KEY AUTO_INCREMENT,
nome_album VARCHAR(100) NOT NULL,
artista_id INT NOT NULL,
FOREIGN KEY (artista_id) REFERENCES artistas(artista_id)
) engine = InnoDB;

INSERT INTO albuns (nome_album, artista_id)
VALUES
('Envious', 1), ('Exuberant', 1),
('Hallowed Steam', 2),
('Incandescent', 3),
('Temporary Culture', 4);

CREATE TABLE musicas(
musica_id INT PRIMARY KEY AUTO_INCREMENT,
nome_musica VARCHAR(100) NOT NULL,
album_id INT NOT NULL,
FOREIGN KEY (album_id) REFERENCES albuns(album_id)
) engine = InnoDB;

INSERT INTO musicas (nome_musica, album_id)
VALUES
('Soul For Us', 1), ('Reflections Of Magic', 1), ('Dance With Her Own', 1), 
('Troubles Of My Inner Fire', 2), ('Time Fireworks', 2),
('Magic Circus', 3), ('Honey, So Do I', 3), ("Sweetie, Let's Go Wild", 3), ('She Knows', 3),
('Fantasy For Me', 4), ('Celebration Of More', 4), ('Rock His Everything', 4), ('Home Forever', 4), ('Diamond Power', 4), ("Honey, Let's Be Silly", 4),
('Thang Of Thunder', 5), ('Words Of Her Life', 5), ('Without My Streets', 5);

CREATE TABLE historico_reproducoes(
usuario_id INT NOT NULL,
musica_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (usuario_id, musica_id),
FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
FOREIGN KEY (musica_id) REFERENCES musicas(musica_id)
) engine = InnoDB;

INSERT INTO historico_reproducoes (usuario_id, musica_id)
VALUES
(1, 1), (1, 6), (1, 14), (1, 16),
(2, 13), (2, 17), (2, 2), (2, 15),
(3, 4), (3, 16), (3, 6),
(4, 3), (4, 18), (4, 11);

CREATE TABLE artistas_favoritos(
usuario_id INT NOT NULL,
artista_id INT NOT NULL,
CONSTRAINT PRIMARY KEY (usuario_id, artista_id),
FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
FOREIGN KEY (artista_id) REFERENCES artistas(artista_id)
) engine = InnoDB;

INSERT INTO artistas_favoritos (usuario_id, artista_id)
VALUES
(1, 1), (1, 4), (1, 3),
(2, 1), (2, 3),
(3, 2), (3, 1),
(4, 4);
