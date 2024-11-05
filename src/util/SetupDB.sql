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
    constraint usuario_rol_llave foreign key (rol_id) references rol(id) on delete cascade
  );

  insert into usuario(password, nombre_completo, email, fecha_creacion, estado, rol_id) values ('$2b$10$SMsE7S2LNQQMssCrM7uZBu.GEWnUiZINcSRBWiAS3LzMScRipcAzu', 'Martin Medina', 'martinjesusmr@ufps.edu.co', '2024-09-24', 'A', 1);

  create table if not exists edificio(
    id int(50) not null auto_increment primary key,
    nombre char(200) not null,
    codigo char(10) not null unique,
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
    tipo char(100) not null,
    ubicacion char(200) not null,
    ruta_imagen char(255),
    observacion char(255),
    climatizado char(1) not null,
    camaras char(1) not null,
    acceso_llaves char(1) not null,
    acceso_biometrico char(1) not null,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_edificio int(50) not null,
    constraint centro_cableado_edificio_llave foreign key (id_edificio) references edificio(id) on delete cascade
  );

  create table if not exists tipo_gabinete(
    id int(5) not null auto_increment primary key,
    descripcion char(200) not null unique,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  insert into tipo_gabinete(descripcion, fecha_creacion, estado) 
  values 
  ('Gabinete para Servidores', '2024-10-04', 'A'),
  ('Gabinete para Equipos de Red (Networking)', '2024-10-04', 'A'),
  ('Gabinete Mural', '2024-10-04', 'A'),
  ('Gabinete Open Rack (Rack Abierto)', '2024-10-04', 'A'),
  ('Gabinete para Cableado Estructurado', '2024-10-04', 'A');

  create table if not exists gabinete(
    id int(50) not null auto_increment primary key,  
    numero int(5) not null,
    tamanio char(60) not null,
    ruta_imagen char(255),
    observacion char(255),
    aterrizado char(1) not null,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_centro_cableado int(50) not null,
    id_tipo_gabinete int(5) not null,
    constraint gabinete_centro_cableado_llave foreign key (id_centro_cableado) references centro_cableado(id) on delete cascade,
    constraint gabinete_tipo_gabinete_llave foreign key (id_tipo_gabinete) references tipo_gabinete(id) on delete cascade
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

  create table if not exists tipo_elemento(
    id int(2) not null auto_increment primary key,
    descripcion char(15) not null unique,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  insert into tipo_elemento(descripcion, fecha_creacion, estado) 
  values 
  ('ACTIVO', '2024-10-04', 'A'),
  ('PASIVO', '2024-10-04', 'A');

  create table if not exists tipo_modelo(
    id int(50) not null auto_increment primary key,
    descripcion char(15) not null unique,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  create table if not exists tipo_referencia(
    id int(50) not null auto_increment primary key,
    descripcion char(15) not null unique,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  create table if not exists tipo_marca(
    id int(50) not null auto_increment primary key,
    descripcion char(15) not null unique,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

-- Insertando en tipo_modelo
insert into tipo_modelo (descripcion, fecha_creacion, estado) 
values ('Catalyst 2960', '2024-10-25', 'A'),
       ('ISR 4000', '2024-10-25', 'A'),
       ('UniFi Switch', '2024-10-25', 'A'),
       ('FortiGate 100F', '2024-10-25', 'A');

-- Insertando en tipo_referencia
insert into tipo_referencia (descripcion, fecha_creacion, estado) 
values ('2960-X', '2024-10-25', 'A'),
       ('ISR4451-X', '2024-10-25', 'A'),
       ('US-24', '2024-10-25', 'A'),
       ('100F', '2024-10-25', 'A');

-- Insertando en tipo_marca
insert into tipo_marca (descripcion, fecha_creacion, estado) 
values ('Cisco', '2024-10-25', 'A'),
       ('Ubiquiti', '2024-10-25', 'A'),
       ('Fortinet', '2024-10-25', 'A'),
       ('HP Aruba', '2024-10-25', 'A');

  create table if not exists elemento_activo(
    id int(20) not null auto_increment primary key,
    descripcion char(200) not null,
    codigo char(100) not null,
    observacion char(255),
    codigo_inventario char(100),
    id_tipo_referencia int(50) not null,
    id_tipo_modelo int(50) not null,
    id_tipo_marca int(50) not null,
    serial char(100) not null,
    os char(50),
    version_os char(50),
    mac char(30),
    gateway char(30),
    ip_v4 char(15),
    ip_v6 char(40),
    cantidad_puertos_por_defecto int,
    puerto_logico_por_defecto int,
    puerto_fisico_por_defecto int,
    ruta_imagen char(255),
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_gabinete int(100) not null,
    id_usuario int(100) not null,
    constraint elemento_activo_gabinete_llave foreign key (id_gabinete) references gabinete(id) on delete cascade,
    constraint elemento_activo_usuario_llave foreign key (id_usuario) references usuario(id) on delete cascade,
    constraint elemento_activo_tipo_referencia_llave foreign key (id_tipo_referencia) references tipo_referencia(id) on delete cascade,
    constraint elemento_activo_tipo_modelo_llave foreign key (id_tipo_modelo) references tipo_modelo(id) on delete cascade,
    constraint elemento_activo_tipo_marca_llave foreign key (id_tipo_marca) references tipo_marca(id) on delete cascade
  );

  create table if not exists elemento_pasivo(
    id int(20) not null auto_increment primary key,
    descripcion char(200) not null,
    codigo char(100) not null,
    observacion char(255),
    codigo_inventario char(100),
    categoria char(100),
    numero_puertos int,
    tipo_conector char(50),
    ruta_imagen char(255),
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null,
    id_gabinete int(100) not null,
    id_usuario int(100) not null,
    constraint elemento_pasivo_gabinete_llave foreign key (id_gabinete) references gabinete(id) on delete cascade,
    constraint elemento_pasivo_usuario_llave foreign key (id_usuario) references usuario(id) on delete cascade
  );
  
  create table if not exists elemento_activo_proyecto(
    id int(100) not null auto_increment primary key,
    id_proyecto int(100) not null,
    id_elemento_activo int(100) not null,
    constraint elemento_activo_proyecto_proyecto_llave foreign key (id_proyecto) references proyecto(id) on delete cascade,
    constraint elemento_activo_proyecto_elemento_activo_llave foreign key (id_elemento_activo) references elemento_activo(id) on delete cascade
  );

  create table if not exists elemento_pasivo_proyecto(
    id int(100) not null auto_increment primary key,
    id_proyecto int(100) not null,
    id_elemento_pasivo int(100) not null,
    constraint elemento_pasivo_proyecto_proyecto_llave foreign key (id_proyecto) references proyecto(id) on delete cascade,
    constraint elemento_pasivo_proyecto_elemento_pasivo_llave foreign key (id_elemento_pasivo) references elemento_pasivo(id) on delete cascade
  );

  create table if not exists centro_cableado_proyecto(
    id int(100) not null auto_increment primary key,
    id_proyecto int(100) not null,
    id_centro_cableado int(100) not null,
    constraint centro_cableado_proyecto_proyecto_llave foreign key (id_proyecto) references proyecto(id) on delete cascade,
    constraint centro_cableado_proyecto_centro_cableado_llave foreign key (id_centro_cableado) references centro_cableado(id) on delete cascade
  );

  create table if not exists archivo(
    id int(100) not null auto_increment primary key,
    nombre char(200) not null,
    ruta char(200) not null,
    fecha_creacion date not null,
    fecha_actualizacion date
  );

  create table if not exists mantenimiento(
    id int(100) not null auto_increment primary key,
    codigo char(100) not null,
    observacion char(200) not null,
    realizado_por char(200) not null,
    fecha date not null,
    fecha_creacion date not null,
    fecha_actualizacion date,
    estado char(1) not null
  );

  create table if not exists mantenimiento_archivo(
    id int(100) not null auto_increment primary key,
    id_mantenimiento int(100) not null,
    id_archivo int(100) not null,
    constraint mantenimiento_archivo_mantenimiento_llave foreign key (id_mantenimiento) references mantenimiento(id) on delete cascade,
    constraint mantenimiento_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists edificio_archivo(
    id int(100) not null auto_increment primary key,
    id_edificio int(100) not null,
    id_archivo int(100) not null,
    constraint edificio_archivo_edificio_llave foreign key (id_edificio) references edificio(id) on delete cascade,
    constraint edificio_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists centro_cableado_archivo(
    id int(100) not null auto_increment primary key,
    id_centro_cableado int(100) not null,
    id_archivo int(100) not null,
    constraint centro_cableado_archivo_centro_cableado_llave foreign key (id_centro_cableado) references centro_cableado(id) on delete cascade,
    constraint centro_cableado_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists gabinete_archivo(
    id int(100) not null auto_increment primary key,
    id_gabinete int(100) not null,
    id_archivo int(100) not null,
    constraint gabinete_archivo_gabinete_llave foreign key (id_gabinete) references gabinete(id) on delete cascade,
    constraint gabinete_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists elemento_activo_archivo(
    id int(100) not null auto_increment primary key,
    id_elemento_activo int(100) not null,
    id_archivo int(100) not null,
    constraint elemento_activo_archivo_elemento_llave foreign key (id_elemento_activo) references elemento_activo(id) on delete cascade,
    constraint elemento_activo_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists elemento_pasivo_archivo(
    id int(100) not null auto_increment primary key,
    id_elemento_pasivo int(100) not null,
    id_archivo int(100) not null,
    constraint elemento_pasivo_archivo_elemento_llave foreign key (id_elemento_pasivo) references elemento_pasivo(id) on delete cascade,
    constraint elemento_pasivo_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists proyecto_archivo(
    id int(100) not null auto_increment primary key,
    id_proyecto int(100) not null,
    id_archivo int(100) not null,
    constraint proyecto_archivo_proyecto_llave foreign key (id_proyecto) references proyecto(id) on delete cascade,
    constraint proyecto_archivo_archivo_llave foreign key (id_archivo) references archivo(id) on delete cascade
  );

  create table if not exists elemento_activo_mantenimiento(
    id int(100) not null auto_increment primary key,
    id_elemento_activo int(100) not null,
    id_mantenimiento int(100) not null,
    constraint elemento_activo_mantenimiento_elemento_activo_llave foreign key (id_elemento_activo) references elemento_activo(id) on delete cascade,
    constraint elemento_activo_mantenimiento_mantenimiento_llave foreign key (id_mantenimiento) references mantenimiento(id) on delete cascade
  );

  create table if not exists elemento_pasivo_mantenimiento(
    id int(100) not null auto_increment primary key,
    id_elemento_pasivo int(100) not null,
    id_mantenimiento int(100) not null,
    constraint elemento_pasivo_mantenimiento_elemento_pasivo_llave foreign key (id_elemento_pasivo) references elemento_pasivo(id) on delete cascade,
    constraint elemento_pasivo_mantenimiento_mantenimiento_llave foreign key (id_mantenimiento) references mantenimiento(id) on delete cascade
  );