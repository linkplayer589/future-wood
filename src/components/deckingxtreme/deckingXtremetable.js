import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CheckCircle, Cancel } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
    createData('Fully wrapped in a protective shell', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Great scratch and abrasion resistance', <CheckCircle color="primary" />, "depends on the timber species"),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('BAL-29 rated', <CheckCircle color="primary" />, "depends on the timber species for timber"),
    createData('Fade resistant', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
    createData('Easy clean finish simply mop to clean off fats, oils and food stuffs', <CheckCircle color="primary" />, <Cancel color="error" />),
];

export default function DeckingXtremeTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell width="20%" align="left">Feature / Benefit</StyledTableCell>
                        <StyledTableCell width="20%" align="left">CleverDeck®</StyledTableCell>
                        <StyledTableCell width="20%" align="left">Timber Decking</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell width="20%" align="left">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell width="20%" align="left">{row.calories}</StyledTableCell>
                            <StyledTableCell width="20%" align="left">{row.fat}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
