import styled from 'styled-components';

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
`;

export const TableHeader = styled.thead`
    background-color: #007bff;
    color: white;

    th {
        padding: 12px;
        text-align: left;
    }
`;

export const TableBody = styled.tbody`
    tr {
        &:nth-child(even) {
            background-color: #f2f2f2;
        }

        &:hover {
            background-color: #d1e7dd; /* Color de fondo al pasar el mouse */
        }
    }
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
`;

export const ButtonContainer = styled.div`
    margin-top: 10px;
    button {
        padding: 10px;
        background-color: #007bff; /* Color para el botón */
        border: none;
        color: white;
        cursor: pointer;

        &:hover {
            background-color: #0056b3; /* Color más oscuro al pasar el mouse */
        }
    }
`;
