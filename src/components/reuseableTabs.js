// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { Tabs, Tab, Typography, Box } from '@mui/material';
// import DeckingXtremeTable from '../../components/deckingxtreme/deckingXtremetable';

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box sx={{ p: 3 }}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }

// export default function BasicTabs() {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <Box sx={{ width: '100%' }}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                     <Tab label="Description" {...a11yProps(0)} />
//                     <Tab label="Features &apos; Benifits" {...a11yProps(1)} />
//                     <Tab label="Specifications" {...a11yProps(2)} />
//                     <Tab label="FAQ" {...a11yProps(2)} />
//                 </Tabs>
//             </Box>
//             <TabPanel value={value} index={0}>
//                 <h3>CleverDeck® Xtreme Composite Timber Decking</h3>
//                 <Typography variant="h6" component="p">CleverDeck Xtreme 138mm or 185mm wide solid WPC composite timber decking comes in 7 unique colours; Ash Grey, Rustic Merbau, Basalt, Desert Oak, Graphite, Limestone Grey and Riverstone Grey. Boards have a natural course texture pattern pressed in to the proprietary polymer skin. The back of the board has been specially scalloped to reduce weight and allow air flow between the bottom of the board and the joist helping to reduce heat build-up.</Typography>

//                 <Typography variant="p" component="p">
//                     All CleverDeck composite timber decking boards are available in long 5.4 metre lengths and come with the peace of mind that a "No fuss-unmatched warranty" provides and Futurewood is so sure of the quality and QA processes controlling the manufacturing of the CleverDeck Xtreme decking board that they also offer to cover all labour costs associated with replacing any decking for the first 3 years of the warranty.
//                 </Typography>

//                 <Typography variant="p" component="p">
//                     The key benefits of CleverDeck Xtreme composite timber decking include:
//                 </Typography>

//                 <ul>
//                     <li>Capped composite timber solid decking board</li>
//                     <li>Never needs oiling or painting</li>
//                     <li>The board is fully wrapped in a co-extruded protective shell</li>
//                     <li>The hard, outer shell offers greater scratch and abrasion resistance</li>
//                     <li>The board shell is made from a virgin polymer blend that is made in the USA</li>
//                     <li>The virtually waterproof decking surface is hard to stain and easy to clean</li>
//                     <li>Scalloped back reduces board weight and allows air flow over supporting joists to reduce heat build up</li>
//                     <li>Virtually no maintenance necessary just clean the deck as required</li>
//                     <li>Fade resistant and dynamic blended colour hues with continuous variation</li>
//                     <li>Unique colour variation means that no 2 boards look the same</li>
//                     <li>7 standard colours available</li>
//                     <li>Fully finished and ready to install</li>
//                     <li>"No fuss" domestic unmatched warranty</li>
//                     <li>BAL 29 rated</li>
//                     <li>Custom lengths and finishes including a P4/5 slip rating finish (coming soon)</li>
//                     <li>No sap runs or tannin leaching</li>
//                     <li>Not affected by termites or white ants</li>
//                     <li>Will not rot, cup, split or warp</li>
//                     <li>No knot holes or splinters</li>
//                     <li>Long 5.4 metre standard lengths</li>
//                     <li>Full clipping system for complete concealed fixing</li>
//                     <li>Quick and easy installation</li>
//                     <li>Suitable for a 450mm joist span</li>
//                     <li>Solid dense material</li>
//                 </ul>
//             </TabPanel>

//             <TabPanel value={value} index={1}>
//                 <Typography alignSelf="center" variant="h6" component="p">FEATURES & BENEFITS</Typography>
//                 <Typography variant="h4" component="h4">
//                     CleverDeck Xtreme® vs Timber
//                 </Typography>

//                 <Typography variant="h6" component="p">
//                     CleverDeck Xtreme composite timber decking has many benefits over traditional timber decking varieties. The table below lists a number of different features of CleverDeck Xtreme composite timber decking and compares these to the more common hardwood timber species.
//                 </Typography>

//                 <DeckingXtremeTable />
//             </TabPanel>
//             <TabPanel value={value} index={2}>
//                 Item Three
//             </TabPanel>
//         </Box>
//     );
// }


import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function BasicTabs({ tabs }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="reuseable tabs"
                >
                    {tabs.map(({ label }, i) => (
                        <Tab label={label} key={i} />
                    ))}
                </Tabs>
            </Box>
            {tabs.map(({ Component }, i) => (
                <TabPanel value={value} index={i} key={i}>
                    {Component}
                </TabPanel>
            ))}
        </Box>
    );
}
