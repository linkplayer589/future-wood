import React from "react";
import Tabs from "../../components/reuseableTabs";
import Description from "../../components/deckingxtreme/description";
import FeaturesBenifits from "../../components/deckingxtreme/featuresBenifits";
import { Typography } from "@mui/material";
import FAQAccordions from "../../components/faqAccordions";

const tabs = [
    {
        label: "Description",
        Component: <Description />
    },
    {
        label: "Features & Benifits",
        Component: <FeaturesBenifits />
    },
    {
        label: "Specifications",
        Component: (
            <>
                <Typography variant="h6" component="p">
                    CLEVERDECK®
                </Typography>
                <Typography variant="h5" component="h5">
                    Specifications
                </Typography>
            </>
        )
    },
    {
        label: "FAQ",
        Component: (
            <div style={{ width: '40%' }}>
                <FAQAccordions />
            </div>
        )
    }
];

export default function Xtreme() {
    return (
        <div>
            <Tabs tabs={tabs} />
        </div>
    );
}
