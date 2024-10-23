-- Pruebas realizadas con XAMPP 8.2.12 y MySQL Workbench 8.0.38

-- Creación de la base de datos
CREATE DATABASE parking_system;
USE parking_system;

-- Tabla para los usuarios
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único del usuario
    nombre VARCHAR(50) NOT NULL,              -- Nombre del usuario
    apellido VARCHAR(50) NOT NULL,            -- Apellido del usuario
    email VARCHAR(100) NOT NULL UNIQUE,       -- Correo electrónico único del usuario
    rol ENUM('Estudiante', 'Administrativo') NOT NULL -- Rol del usuario (solo puede ser Estudiante o Administrativo)
);

-- Tabla para las tarjetas RFID
CREATE TABLE TarjetaRFID (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único de la tarjeta
    codigoRFID VARCHAR(20) NOT NULL UNIQUE,   -- Código RFID único
    saldo DECIMAL(10,2) DEFAULT 0.00 NOT NULL, -- Saldo disponible, hasta 99999999.99
    activa BOOLEAN DEFAULT TRUE,              -- Indica si la tarjeta está activa o no
    usuario_id INT NOT NULL,                  -- Relación con la tabla Usuario
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) -- Clave foránea hacia Usuario
    ON DELETE CASCADE                         -- Si se elimina un usuario, también se elimina su tarjeta
);

-- Tabla para registrar los accesos al parqueo
CREATE TABLE AccesoParqueo (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único del registro de acceso
    fechaHoraEntrada DATETIME NOT NULL,       -- Fecha y hora de entrada
    fechaHoraSalida DATETIME,                 -- Fecha y hora de salida (puede ser NULL si no ha salido)
    saldoSuficiente BOOLEAN NOT NULL,         -- Indica si el saldo era suficiente en el momento del acceso
    accesoPermitido BOOLEAN NOT NULL,         -- Indica si el acceso fue permitido
    tarjeta_id INT NOT NULL,                  -- Relación con la tarjeta RFID
    FOREIGN KEY (tarjeta_id) REFERENCES TarjetaRFID(id) -- Clave foránea hacia TarjetaRFID
    ON DELETE CASCADE                         -- Si se elimina una tarjeta, se eliminan los accesos relacionados
);

-- Tabla para el estado del parqueo
CREATE TABLE Parqueo (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Identificador único del parqueo
    totalEspacios INT DEFAULT 100 NOT NULL,   -- Número total de espacios disponibles (valor predeterminado: 100)
    espaciosDisponibles INT NOT NULL          -- Espacios actualmente disponibles
);

-- Inserción de un registro inicial para el parqueo
INSERT INTO Parqueo (totalEspacios, espaciosDisponibles)
VALUES (100, 100);
