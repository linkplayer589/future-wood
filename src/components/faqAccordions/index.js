import React from 'react';
import { makeStyles } from '@mui/styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accWrapper: {
        '&:hover': {
            color: '#00a651'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

export default function FAQAccordions() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <Accordion className={classes.accWrapper} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel1' ? <RemoveCircleOutlined /> : <AddCircleOutline />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>What is WPC or Wood Plastic Composite Timber?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        WPC or composite timber is an extruded timber replacement product made from a mix of plastic (virgin and recycled) and cellulose fibre (wood/bamboo/rice husk). It was invented in the USA in the late 1980’s/early 1990’s and has been evolving ever since. Primarily designed as a substitute for certain types of timber (i.e. decking) it is currently produced and sold all over the world.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel2' ? <RemoveCircleOutlined /> : <AddCircleOutline />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Users</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                        diam eros in elit. Pellentesque convallis laoreet laoreet.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel3' ? <RemoveCircleOutlined /> : <AddCircleOutline />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Advanced settings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                        vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={expanded === 'panel4' ? <RemoveCircleOutlined /> : <AddCircleOutline />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Personal data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                        vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
