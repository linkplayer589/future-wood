import React from 'react';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, Paper, useMediaQuery, useTheme, Divider, TableRow } from '@mui/material';
import { StarRateRounded } from '@mui/icons-material';
import CustomTableRow from './customTableRow';


const useStyles = makeStyles({
    table: {
        minWidth: '100%',
    },
});


function createData(price, profile, durability, colors) {
    return { price, profile, durability, colors };
}

const rows = [
    createData('Price', '$$$', '$$$', '$$$'),
    createData('PROFILE', 9.0, 37, 4.3),
    createData('DURABILITY',
        // stars for rating
        <>
            <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
        </>
        , <>
            <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
        </>
        ,
        <>
            <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
        </>,
        <>
            <StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} /><StarRateRounded style={{ width: 35, height: 35, color: '#00a651' }} />
        </>),
    createData('COLORS', 5, 5, 5),
];

export default function BasicTable() {
    const classes = useStyles();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    if (matches) {
        return (
            <div component={Paper}>
                <div className={classes.table} aria-label="simple table">
                    <div style={{ flex: 1 }}>
                        <CustomTableRow />
                        <Divider />

                        <CustomTableRow />
                        <Divider />

                        <CustomTableRow />
                        <Divider />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>

                        <TableCell>
                            <h4>CLEVERDECK<span>&reg;</span></h4>
                            <div>NEW EXTREME CO-EX</div>
                            <div>SUPER TOUGH</div>
                        </TableCell>
                        <TableCell>
                            <h4>CLEVERDECK<span>&reg;</span></h4>
                            <div>ECO PRO</div>
                            <div>LOREM IPSUM</div>
                        </TableCell>
                        <TableCell>
                            <h4>CLEVERDECK<span>&reg;</span></h4>
                            <div>ORIGINAL</div>
                            <div>SINGLE EXTRUSION</div>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.price}>
                            <TableCell>
                                {row.price}
                            </TableCell>
                            <TableCell>{row.profile}</TableCell>
                            <TableCell>{row.durability}</TableCell>
                            <TableCell>{row.colors}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
