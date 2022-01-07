
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `speaker` varchar(255) NOT NULL,
  `event_date` DATE NOT NULL,
  `event_time` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `asistencia` (
  `id` int(11) NOT NULL,
  `participanteId` int(11) NOT NULL,
  `eventoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `participantes` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `dni` varchar(15) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO `eventos` (`name`, `speaker`, `event_date`, `event_time`) VALUES
('PYTHON BASICO','JUAN DEL AGUILA','2020-01-21','12:30PM'),
('PYTHON BASICO','JUAN DEL AGUILA','2020-01-21','12:30PM'),
('PYTHON BASICO','JUAN DEL AGUILA','2020-01-21','12:30PM'),
('PYTHON BASICO','JUAN DEL AGUILA','2020-01-21','12:30PM');

INSERT INTO `asistencia` (`id`, `participanteId`, `eventoId`) VALUES
(1, 1, 1);

INSERT INTO `participantes` (`first_name`, `last_name`, `dni`) VALUES
('Max Houston', 'Ramirez Martel', '90900909'),
('Wings Houston', 'Ramirez Martel', '90900908'),
('Excel Houston', 'Ramirez Martel', '90900907');