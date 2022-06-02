import React from 'react';
import { Typography } from '@mui/material';
import DeckingXtremeTable from './deckingXtremetable';

function FeaturesBenifits() {
    return (
        <>
            <Typography alignSelf="center" variant="h6" component="p">FEATURES & BENEFITS</Typography>
            <Typography variant="h4" component="h4">
                CleverDeck Xtreme® vs Timber
            </Typography>

            <Typography variant="h6" component="p">
                CleverDeck Xtreme composite timber decking has many benefits over traditional timber decking varieties. The table below lists a number of different features of CleverDeck Xtreme composite timber decking and compares these to the more common hardwood timber species.
            </Typography>

            <DeckingXtremeTable />
        </>
    )
}

export default FeaturesBenifits