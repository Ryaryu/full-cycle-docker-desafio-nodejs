use mysql;

create table if not exists `pessoa` (
  `id` int auto_increment primary key ,
  `nome` varchar(255)
);
