  drop database csi_db;

  create database if not exists csi_db;

  use csi_db;

  create table if not exists rol(
    id int(5) not null auto_increment primary key,
    descripcion char(100) not null,
    fecha_creacion date not null,
    fecha_actualizacion date
  );

  insert into rol(descripcion) values ('ADMIN');
  insert into rol(descripcion) values ('USUARIO');

  create table if not exists usuario(
    id int(10) not null auto_increment primary key,
    password char(255) not null,
    nombre_completo char(200) not null,
    email char(200) not null unique,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    rol_id int(5) not null,
    constraint usuario_rol_llave foreign key (rol_id) references rol(id)
  );

  insert into usuario(password, nombre_completo, email, fecha_creacion, estado, rol_id) values ('$2b$10$SMsE7S2LNQQMssCrM7uZBu.GEWnUiZINcSRBWiAS3LzMScRipcAzu', 'Martin Medina', 'martinjesusmr@ufps.edu.co', '2024-09-24', 'A', 1);

  create table if not exists edificio(
    id int(50) not null auto_increment primary key,
    nombre char(200) not null,
    codigo char(10) not null,
    ubicacion_mapa char(100),
    ruta_imagen char(255),
    observacion char(255),
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  create table if not exists centro_cableado(
    id int(50) not null auto_increment primary key,
    numero int(5) not null,
    ubicacion char(200),
    ruta_imagen char(255),
    observacion char(255),
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_edificio int(50) not null,
    constraint centro_cableado_edificio_llave foreign key (id_edificio) references edificio(id)
  );

  create table if not exists gabinete(
    id int(50) not null auto_increment primary key,  
    numero int(5) not null,
    ubicacion char(200),
    ruta_imagen char(255),
    observacion char(255),
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_centro_cableado int(50) not null,
    constraint gabinete_centro_cableado_llave foreign key (id_centro_cableado) references centro_cableado(id)
  );

  create table if not exists proyecto(
    id int(100) not null auto_increment primary key,
    codigo char(100) not null,
    certificacion char(200),
    nombre_empresa char(200) not null,
    nit_empresa char(50) not null,
    fecha date,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  insert into proyecto(codigo, certificacion, nombre_empresa, nit_empresa, fecha, fecha_creacion, estado) values ('000-PRUEBA', 'CERT-PRUEBA', 'EMPRESA PRUEBA', '00000000', '2022-09-28', '2024-09-28', 'A');

  create table if not exists elemento(
    id int(20) not null auto_increment primary key,
    nombre char(200) not null,
    referencia char(200),
    serial char(1),
    tipo char(1) not null,
    observacion char(255),
    codigo_inventario char(100),
    ruta_imagen char(255),
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_gabinete int(100) not null,
    id_proyecto int(100) not null,
    usuario_id int(100) not null,
    constraint elemento_gabinete_llave foreign key (id_gabinete) references gabinete(id),
    constraint elemento_proyecto_llave foreign key (id_proyecto) references proyecto(id),
    constraint elemento_usuario_llave foreign key (usuario_id) references usuario(id)
  );

  create table if not exists switch(
    id int(100) not null auto_increment primary key,
    numero_puertos int(50) not null,
    id_elemento int(100) not null,
    constraint switch_elemento_llave foreign key (id_elemento) references elemento(id)
  );

  create table if not exists panel(
    id int(100) not null auto_increment primary key,
    puntos_datos char(255) not null,
    puntos_switch char(255) not null,
    id_elemento int(100) not null,
    constraint panel_elemento_llave foreign key (id_elemento) references elemento(id)
  );

  create table if not exists archivo(
    id int(100) not null auto_increment primary key,
    nombre char(200) not null,
    ruta char(200) not null,
    fecha_creacion date not null,
    fecha_actualizacion date
  );

  create table if not exists edificio_archivo(
    id int(100) not null auto_increment primary key,
    id_edificio int(100) not null,
    id_archivo int(100) not null,
    constraint edificio_archivo_edificio_llave foreign key (id_edificio) references edificio(id),
    constraint edificio_archivo_archivo_llave foreign key (id_archivo) references archivo(id)
  );

  create table if not exists centro_cableado_archivo(
    id int(100) not null auto_increment primary key,
    id_centro_cableado int(100) not null,
    id_archivo int(100) not null,
    constraint centro_cableado_archivo_centro_cableado_llave foreign key (id_centro_cableado) references centro_cableado(id),
    constraint centro_cableado_archivo_archivo_llave foreign key (id_archivo) references archivo(id)
  );

  create table if not exists gabinete_archivo(
    id int(100) not null auto_increment primary key,
    id_gabinete int(100) not null,
    id_archivo int(100) not null,
    constraint gabinete_archivo_gabinete_llave foreign key (id_gabinete) references gabinete(id),
    constraint gabinete_archivo_archivo_llave foreign key (id_archivo) references archivo(id)
  );

  create table if not exists elemento_archivo(
    id int(100) not null auto_increment primary key,
    id_elemento int(100) not null,
    id_archivo int(100) not null,
    constraint elemento_archivo_elemento_llave foreign key (id_elemento) references elemento(id),
    constraint elemento_archivo_archivo_llave foreign key (id_archivo) references archivo(id)
  );

  create table if not exists proyecto_archivo(
    id int(100) not null auto_increment primary key,
    id_proyecto int(100) not null,
    id_archivo int(100) not null,
    constraint proyecto_archivo_proyecto_llave foreign key (id_proyecto) references proyecto(id),
    constraint proyecto_archivo_archivo_llave foreign key (id_archivo) references archivo(id)
  );