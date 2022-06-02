import React from 'react';
import { makeStyles } from '@mui/styles';
import { Modal, Backdrop, Fade, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import DeckingComparisonModalTable from './modalTable';
import noOilingIcon from "../../images/no-oiling-icon.png"
import noRotIcon from "../../images/no-rot-icon.png"
import noWorriesIcon from "../../images/no-worries-icon.png"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        position: 'relative',
        [theme.breakpoints.between('xs', 'sm')]: {
            overflow: 'scroll',
        },
        height: '85%',
    },
    modalHeaderWrapper: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalHeaderContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerImg: {
        width: 30,
        height: 30
    },
    headerText: {
        color: 'black',
        marginLeft: '1em'
    },
}));

export default function DeckingComparisonModal({ deckingComparisonModalOpen, setDeckingComparisonModalOpen }) {
    const classes = useStyles();

    const handleClose = () => {
        setDeckingComparisonModalOpen(false);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={deckingComparisonModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={deckingComparisonModalOpen}>
                    <div className={classes.paper}>
                        <IconButton aria-label="delete-button" onClick={handleClose} style={{ position: 'absolute', right: '0.5em', top: '1em' }}>
                            <CloseRounded />
                        </IconButton>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <div className={classes.modalHeaderWrapper}>

                                <div className={classes.modalHeaderContainer}>
                                    <img className={classes.headerImg} src={noOilingIcon} alt="No Oiling Icon" />
                                    <h4 className={classes.headerText}>No Oiling</h4>
                                </div>

                                <div className={classes.modalHeaderContainer}>
                                    <img className={classes.headerImg} src={noRotIcon} alt="No Rot Icon" />
                                    <h4 className={classes.headerText}>No Rot</h4>
                                </div>

                                <div className={classes.modalHeaderContainer}>
                                    <img className={classes.headerImg} src={noWorriesIcon} alt="No Worries Icon" />
                                    <h4 className={classes.headerText}>No Worries</h4>
                                </div>

                            </div>
                        </div>
                        <DeckingComparisonModalTable />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}