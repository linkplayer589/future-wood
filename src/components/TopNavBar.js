import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import MegaMenu from "../components/MegaMenu";
import { AnimatePresence, motion } from "framer-motion";
import { mediaQueries } from "../utils/mediaQueries";
import { Search } from "@mui/icons-material";


// Styled Components

const TopNavCont = styled.div`
    display: grid;
    justify-content: space-between;
    grid-template-rows: 4rem 4rem 4rem;
    grid-area: 1 / 1 / 2 / 2;
    padding: 0 20px;
`;

const LogoCont = styled.div`
    grid-area: 1 / 1 / 3 / 2;
    padding-top: 20px;
`;

const PrimNav = styled.nav`
    grid-area: 2 / 2 / 3 / 3;
    z-index: 10;
    justify-self: end;
`;

const SecNav = styled.nav`
    grid-area: 1 / 2 / 2 / 3;
    z-index: 10;
    justify-self: end;
`;

const Ulist = styled.ul`
    list-style: none;
    display: grid;
    column-gap: 1rem;
    grid-auto-flow: column;
`;

const PrimUlist = styled(Ulist)`
    column-gap: 1.5rem;
`;

const SecMenuLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font: 100 1rem/1rem 'TexGyReadVentor';
`;

const PrimMenuLink = styled(SecMenuLink)`
    font-weight: bold;

`;

const PrimMenuLinkExternal = styled.a`
    color: #fff;
    text-decoration: none;
    font: 100 1rem/1rem 'TexGyReadVentor';
    font-weight: bold;
`;


const MegaMenuWrapper = styled(motion.div)`
    z-index: 20;
    max-width: 1245px;
    width: 100%;
    box-shadow: 0 0 8px 4px rgb(0 0 0 50%);
    box-sizing: border-box;
    transform-origin: 100% 0 0;
    position: absolute;
    top: 120px;
    left: 0;
    ${mediaQueries("xxl")`
        padding: 10px 30px 30px;
        right: 0;
        left: unset;
  `};   
`;



// Data

const primLinks = [
    {
        text: "About",
        type: "internal",
        link: "/about",
        data: "about",
        hover: null
    },
    {
        text: "Products",
        type: "internal",
        link: "/products",
        data: "products",
    },
    {
        text: "Projects",
        type: "internal",
        link: "/projects",
        data: "projects",
        hover: null
    },
    {
        text: "Contact",
        type: "internal",
        link: "/enquiries",
        data: "enquiries",
        hover: null
    },
    {
        text: "1300 484 308",
        type: "external",
        link: "tel:1300484308",
        data: "tel",
        hover: null
    }
]

const secLinks = [
    {
        text: "Hot Deals",
        link: "/clearance",
        data: "hot-deals"
    },
    {
        text: "Blog",
        link: "/blog",
        data: "blog"
    },
    {
        text: "Tools & Resources",
        link: "/tools-resources",
        data: "tools-resources"
    },
    {
        text: "International",
        link: "/international",
        data: "international"
    },
    {
        text: "Gallery",
        link: "/gallery",
        data: "gallery"
    },
    {
        text: "FAQs",
        link: "/faqs",
        data: "faqs"
    },
    {
        text: "DIY Videos",
        link: "/videos",
        data: "videos"
    }
]

const TopNavBar = () => {


    const [megaMenuOpen, setMegaMenuOpen] = useState(false);

    const toggleMegaMenu = () => {
        megaMenuOpen ? setTimeout(() => { setMegaMenuOpen(!megaMenuOpen) }, 1000) : setMegaMenuOpen(!megaMenuOpen);
    }

    return (
        <TopNavCont>
            <LogoCont>
                <StaticImage
                    alt="Futurewood Logo"
                    src={"../images/fw-logo-light.png"}
                    formats={["auto", "avif", "webp"]}
                    objectFit={"cover"}
                />
            </LogoCont>
            <SecNav>
                <Ulist>
                    {secLinks.map(link => (
                        <li
                            key={link.text}
                        >
                            <SecMenuLink to={link.link} data-value={link.data}>{link.text}</SecMenuLink>
                        </li>
                    ))}
                </Ulist>
            </SecNav>

            <PrimNav>
                <PrimUlist>
                    {primLinks.map(link => (
                        <li
                            key={link.text}
                        >
                            {link.type === "internal" ?
                                <PrimMenuLink to={link.link} data-value={link.data} onMouseEnter={(link.data === "products") ? toggleMegaMenu : null}>{link.text}</PrimMenuLink>
                                :
                                <PrimMenuLinkExternal href={link.link} data-value={link.data} >{link.text}</PrimMenuLinkExternal>
                            }
                        </li>
                    ))}
                    <li>
                        <Search style={{ color: "#fff" }} />
                    </li>

                </PrimUlist>
            </PrimNav>
            <AnimatePresence>
                {megaMenuOpen &&
                    <MegaMenuWrapper
                        onMouseLeave={toggleMegaMenu}
                        initial={{ opacity: 0, scale: 0.75 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                    >
                        <MegaMenu megaMenuOpen={megaMenuOpen} toggleMegaMenu={toggleMegaMenu} />
                    </MegaMenuWrapper>
                }
            </AnimatePresence>
        </TopNavCont>
    );
}

export default TopNavBar;