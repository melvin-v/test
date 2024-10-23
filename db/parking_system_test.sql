-- Inserción de valores de prueba para la tabla Usuario
INSERT INTO Usuario (nombre, apellido, email, rol)
VALUES 
('Luis', 'Gomez', 'luis.gomez@example.com', 'Estudiante'),
('Ana', 'Martinez', 'ana.martinez@example.com', 'Administrativo'),
('Carlos', 'Perez', 'carlos.perez@example.com', 'Estudiante'),
('Maria', 'Lopez', 'maria.lopez@example.com', 'Administrativo');

-- Inserción de valores de prueba para la tabla TarjetaRFID
INSERT INTO TarjetaRFID (codigoRFID, saldo, activa, usuario_id)
VALUES
('1234567890', 50.00, TRUE, 1),   -- Luis Gomez
('0987654321', 0.00, TRUE, 2),    -- Ana Martinez (saldo ilimitado como Administrativo)
('111122223333', 10.00, TRUE, 3), -- Carlos Perez
('444455556666', 20.00, TRUE, 4); -- Maria Lopez

-- Inserción de registros de acceso de prueba en la tabla AccesoParqueo
INSERT INTO AccesoParqueo (fechaHoraEntrada, fechaHoraSalida, saldoSuficiente, accesoPermitido, tarjeta_id)
VALUES
('2024-09-01 08:00:00', '2024-09-01 12:00:00', TRUE, TRUE, 1), -- Luis Gomez ingresó y salió
('2024-09-01 09:30:00', NULL, TRUE, TRUE, 2),                 -- Ana Martinez ingresó y no ha salido
('2024-09-01 10:00:00', NULL, FALSE, FALSE, 3),               -- Carlos Perez intento fallido por falta de saldo
('2024-09-01 08:15:00', '2024-09-01 11:00:00', TRUE, TRUE, 4); -- Maria Lopez ingresó y salió

-- Actualización del estado del parqueo
UPDATE Parqueo SET espaciosDisponibles = 98 WHERE id = 1;

SELECT * FROM Usuario;
SELECT * FROM TarjetaRFID;
SELECT * FROM AccesoParqueo;
SELECT * FROM Parqueo;