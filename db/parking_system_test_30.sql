-- Inserción de más valores de prueba para la tabla Usuario
INSERT INTO Usuario (nombre, apellido, email, rol)
VALUES
('Juan', 'Hernandez', 'juan.hernandez@example.com', 'Estudiante'),
('Sofia', 'Rodriguez', 'sofia.rodriguez@example.com', 'Estudiante'),
('Pedro', 'Garcia', 'pedro.garcia@example.com', 'Estudiante'),
('Claudia', 'Ramirez', 'claudia.ramirez@example.com', 'Administrativo'),
('Jorge', 'Ruiz', 'jorge.ruiz@example.com', 'Estudiante'),
('Paola', 'Santos', 'paola.santos@example.com', 'Administrativo'),
('Luis', 'Ortega', 'luis.ortega@example.com', 'Estudiante'),
('Ana', 'Castillo', 'ana.castillo@example.com', 'Estudiante'),
('David', 'Lopez', 'david.lopez@example.com', 'Estudiante'),
('Carmen', 'Diaz', 'carmen.diaz@example.com', 'Administrativo'),
('Fernando', 'Jimenez', 'fernando.jimenez@example.com', 'Estudiante'),
('Isabel', 'Gonzalez', 'isabel.gonzalez@example.com', 'Estudiante'),
('Miguel', 'Mendoza', 'miguel.mendoza@example.com', 'Estudiante'),
('Daniela', 'Vargas', 'daniela.vargas@example.com', 'Estudiante'),
('Andres', 'Morales', 'andres.morales@example.com', 'Administrativo'),
('Karla', 'Romero', 'karla.romero@example.com', 'Estudiante'),
('Eduardo', 'Paredes', 'eduardo.paredes@example.com', 'Estudiante'),
('Patricia', 'Cabrera', 'patricia.cabrera@example.com', 'Estudiante'),
('Jose', 'Gomez', 'jose.gomez@example.com', 'Estudiante'),
('Esteban', 'Fernandez', 'esteban.fernandez@example.com', 'Estudiante'),
('Lucia', 'Flores', 'lucia.flores@example.com', 'Administrativo'),
('Sergio', 'Gutierrez', 'sergio.gutierrez@example.com', 'Estudiante'),
('Monica', 'Rivas', 'monica.rivas@example.com', 'Estudiante'),
('Carlos', 'Torres', 'carlos.torres@example.com', 'Estudiante'),
('Susana', 'Figueroa', 'susana.figueroa@example.com', 'Estudiante'),
('Alberto', 'Dominguez', 'alberto.dominguez@example.com', 'Administrativo'),
('Silvia', 'Vega', 'silvia.vega@example.com', 'Estudiante'),
('Marcos', 'Navarro', 'marcos.navarro@example.com', 'Estudiante'),
('Cristina', 'Paz', 'cristina.paz@example.com', 'Estudiante'),
('Rodrigo', 'Sanchez', 'rodrigo.sanchez@example.com', 'Administrativo');

-- Inserción de más valores de prueba para la tabla TarjetaRFID
INSERT INTO TarjetaRFID (codigoRFID, saldo, activa, usuario_id)
VALUES
('555577778888', 30.00, TRUE, 5),
('999900001111', 15.00, TRUE, 6),
('222233334444', 50.00, TRUE, 7),
('777788889999', 10.00, TRUE, 8),
('101112131415', 25.00, TRUE, 9),
('121314151617', 0.00, TRUE, 10), -- Administrativa
('181920212223', 35.00, TRUE, 11),
('242526272829', 45.00, TRUE, 12),
('303132333435', 0.00, TRUE, 13), -- Estudiante con saldo 0
('363738394041', 20.00, TRUE, 14),
('414243444546', 5.00, TRUE, 15),
('474849505152', 40.00, TRUE, 16),
('535455565758', 60.00, TRUE, 17),
('596061626364', 70.00, TRUE, 18),
('656667686970', 15.00, TRUE, 19),
('717273747576', 30.00, TRUE, 20),
('777879808182', 90.00, TRUE, 21),
('838485868788', 0.00, TRUE, 22), -- Administrativa
('899091929394', 12.00, TRUE, 23),
('959697989910', 50.00, TRUE, 24),
('101101102103', 20.00, TRUE, 25),
('104105106107', 33.00, TRUE, 26),
('108109110111', 45.00, TRUE, 27),
('112113114115', 50.00, TRUE, 28),
('116117118119', 10.00, TRUE, 29),
('120121122123', 80.00, TRUE, 30),
('124125126127', 0.00, TRUE, 31), -- Administrativa
('128129130131', 60.00, TRUE, 32),
('132133134135', 40.00, TRUE, 33),
('136137138139', 25.00, TRUE, 34);

-- Inserción de registros de acceso en la tabla AccesoParqueo
INSERT INTO AccesoParqueo (fechaHoraEntrada, fechaHoraSalida, saldoSuficiente, accesoPermitido, tarjeta_id)
VALUES
('2024-09-01 08:10:00', '2024-09-01 11:45:00', TRUE, TRUE, 5),
('2024-09-01 09:20:00', NULL, TRUE, TRUE, 6),
('2024-09-01 07:55:00', '2024-09-01 12:15:00', TRUE, TRUE, 7),
('2024-09-01 10:00:00', NULL, TRUE, TRUE, 8),
('2024-09-01 09:30:00', '2024-09-01 13:30:00', TRUE, TRUE, 9),
('2024-09-01 09:00:00', '2024-09-01 10:00:00', TRUE, TRUE, 10), -- Administrativa
('2024-09-01 08:30:00', '2024-09-01 12:30:00', TRUE, TRUE, 11),
('2024-09-01 11:00:00', '2024-09-01 15:00:00', TRUE, TRUE, 12),
('2024-09-01 07:50:00', NULL, FALSE, FALSE, 13), -- Intento fallido por saldo insuficiente
('2024-09-01 09:15:00', '2024-09-01 12:00:00', TRUE, TRUE, 14),
('2024-09-01 11:20:00', '2024-09-01 13:30:00', TRUE, TRUE, 15),
('2024-09-01 08:45:00', '2024-09-01 11:45:00', TRUE, TRUE, 16),
('2024-09-01 07:35:00', '2024-09-01 12:45:00', TRUE, TRUE, 17),
('2024-09-01 09:55:00', '2024-09-01 11:55:00', TRUE, TRUE, 18),
('2024-09-01 08:50:00', '2024-09-01 12:50:00', TRUE, TRUE, 19),
('2024-09-01 10:25:00', NULL, TRUE, TRUE, 20),
('2024-09-01 07:45:00', '2024-09-01 09:45:00', TRUE, TRUE, 21),
('2024-09-01 11:05:00', '2024-09-01 13:05:00', TRUE, TRUE, 22), -- Administrativa
('2024-09-01 08:15:00', '2024-09-01 11:15:00', TRUE, TRUE, 23),
('2024-09-01 09:50:00', '2024-09-01 11:50:00', TRUE, TRUE, 24),
('2024-09-01 09:00:00', '2024-09-01 12:00:00', TRUE, TRUE, 25),
('2024-09-01 08:40:00', NULL, TRUE, TRUE, 26),
('2024-09-01 10:10:00', '2024-09-01 13:10:00', TRUE, TRUE, 27),
('2024-09-01 08:25:00', '2024-09-01 11:25:00', TRUE, TRUE, 28),
('2024-09-01 09:45:00', '2024-09-01 11:45:00', TRUE, TRUE, 29),
('2024-09-01 07:55:00', NULL, TRUE, TRUE, 30),
('2024-09-01 09:30:00', '2024-09-01 12:30:00', TRUE, TRUE, 31), -- Administrativa
('2024-09-01 10:20:00', '2024-09-01 12:30:00', TRUE, TRUE, 32),
('2024-09-01 08:50:00', '2024-09-01 11:00:00', TRUE, TRUE, 33),
('2024-09-01 09:10:00', '2024-09-01 11:10:00', TRUE, TRUE, 34);

-- Actualización del estado del parqueo después de las inserciones
UPDATE Parqueo SET espaciosDisponibles = 70 WHERE id = 1;
