CREATE TABLE `blogposts` (
  `Id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `body` text NOT NULL,
  `craateTime` timestamp NOT NULL DEFAULT current_timestamp()