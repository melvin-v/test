import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, ButtonContainer } from './UsersPanel.styled';

const dummyUsers = [
    {
        id: 1,
        name: 'Juan gay',
        rfid: '123456789',
        balance: 15,
        status: 'Fuera del parqueo',
        lastEntry: 'Hoy',
        lastExit: 'Hoy',
        isAdmin: false,
        history: [
            { action: 'Entrada', date: 'Hoy' },
            { action: 'Salida', date: 'Ayer' },
        ],
    },
    {
        id: 2,
        name: 'Ana si',
        rfid: '987654321',
        balance: 20,
        status: 'Dentro del parqueo',
        lastEntry: 'Ayer',
        lastExit: 'Hoy',
        isAdmin: false,
        history: [
            { action: 'Entrada', date: 'Ayer' },
            { action: 'Salida', date: 'Hoy' },
        ],
    },
    {
        id: 3,
        name: 'Carlos sakhbd',
        rfid: '192837465',
        balance: 10,
        status: 'Fuera del parqueo',
        lastEntry: 'Hoy',
        lastExit: 'Hoy',
        isAdmin: true,
        history: [
            { action: 'Entrada', date: 'Hoy' },
            { action: 'Salida', date: 'Ayer' },
        ],
    },
];

const UsersPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [balanceChange, setBalanceChange] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        setUsers(dummyUsers);
    }, []);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setMessage('');
    };

    const handleSaveBalance = () => {
        if (!selectedUser) return;

        const changeAmount = parseInt(balanceChange, 10);
        const updatedBalance = selectedUser.balance + changeAmount;

        if (updatedBalance < 0) {
            setMessage('El saldo no puede ser negativo. Denegada la entrada.');
            return;
        }

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === selectedUser.id ? { ...user, balance: updatedBalance } : user
            )
        );

        setSelectedUser((prev) => ({ ...prev, balance: updatedBalance }));

        setMessage('Saldo actualizado con éxito.');
        setBalanceChange('');
    };

    return (
        <div>
            <h3>Panel de Usuarios</h3>
            <p>Listado de todos los usuarios registrados en el sistema:</p>

            <Table>
                <TableHeader>
                    <tr>
                        <th>Nombre</th>
                        <th>Saldo</th>
                        <th>Estado</th>
                        <th>Último ingreso</th>
                        <th>Último egreso</th>
                        <th>Tipo de usuario</th>
                        <th>Acciones</th>
                    </tr>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.balance}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.lastEntry}</TableCell>
                            <TableCell>{user.lastExit}</TableCell>
                            <TableCell>{user.isAdmin ? 'Administrador' : 'Usuario'}</TableCell>
                            <TableCell>
                                <button onClick={() => handleUserSelect(user)}>Ver Detalles</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {selectedUser && (
                <div>
                    <h4>Detalles del Usuario: {selectedUser.name}</h4>
                    <p>RFID: {selectedUser.rfid}</p>
                    <p>Saldo: {selectedUser.balance}</p>
                    <p>Estado: {selectedUser.status}</p>
                    <p>Último ingreso: {selectedUser.lastEntry}</p>
                    <p>Último egreso: {selectedUser.lastExit}</p>
                    <p>Tipo de usuario: {selectedUser.isAdmin ? 'Administrador' : 'Usuario'}</p>

                    <h5>Historial de Ingresos y Egresos:</h5>
                    <Table>
                        <TableHeader>
                            <tr>
                                <th>Acción</th>
                                <th>Fecha</th>
                            </tr>
                        </TableHeader>
                        <TableBody>
                            {selectedUser.history.map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>{entry.action}</TableCell>
                                    <TableCell>{entry.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <h5>Modificar Saldo</h5>
                    <input
                        type="number"
                        value={balanceChange}
                        onChange={(e) => setBalanceChange(e.target.value)}
                        placeholder="Cambiar saldo"
                    />
                    <ButtonContainer>
                        <button onClick={handleSaveBalance}>Guardar</button>
                    </ButtonContainer>
                </div>
            )}

            {message && <p style={{ color: 'red' }}>{message}</p>}
        </div>
    );
};

export default UsersPanel;
