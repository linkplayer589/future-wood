import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { mediaQueries } from "../utils/mediaQueries";
import { useWindowSize } from "../utils/useWindowSize";
import { ArrowDropDown, Facebook, Instagram, YouTube } from "@mui/icons-material";


const FooterCta = styled.div`
    background-color: #004D26;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem;
`;

const FooterCtaHeading = styled.p`
    font: bold 1.6rem/2rem 'TexGyReadVentor';
    color: #ffffff;
    margin-right: 1rem;
    align-self: center;
    text-align: center;
`;

const CtaButton = styled(Link)`
  background: linear-gradient(to bottom, #d1ff55 0%, #a6ce39 100%);
  padding: .81rem 1.12rem;
  border-radius: 3px;
  color: #343434;
  font: bold 1.12rem/1.4rem 'Texgyreadventor';
  text-align: center;
  text-decoration: none;
  display: inline-block;
  align-self: center;
`;

const FooterNavCont = styled.div`
    display: grid;
    grid-template-areas:
        "products"
        "resources"
        "inspiration"
        "more"
        "company";
    column-gap: 1rem;
    background-color: #222;
    padding: 2rem;
    color: #fff;
    ${mediaQueries("md")`
        grid-template-areas: "company products resources inspiration more";
        grid-template-columns: 1fr .8fr .8fr .8fr .8fr;
        padding: 2rem 5rem;
    `}
`;

const CompanyInfoCont = styled.div`
    padding: 1rem;
    text-align: center;
`;

const FooterLinksCol = styled.div`
    color: #bbb;
    font-family: 'TexGyReadVentor';
    span {
        font-size: 1.1rem;
    }
    ${mediaQueries("md")`
        padding-top: 1rem;
        border-top: 1px solid #bbb;
  `};
`

const FooterMenuHeading = styled.span`
    display: flex;
    justify-content: space-between;
`

const AccordionArrow = styled(ArrowDropDown)`
    pointer-events: none;
    transition: .5s;
`

const FooterLinksGroup = styled.ul`
    list-style: none;
    padding-left: 0;
    padding-top: 1rem;
    border-top: 1px solid #bbb;
    transition: .5s;
    ${mediaQueries("md")`
        padding-top: 0;
        border-top: none;
  `};
`

const FooterLink = styled(Link)`
    text-decoration: none;
    color: #bbb;
    font-size: .9rem;
    &:hover {
        color: #00a651;
    }
`;

const Small = styled.small`
font: .7rem/.8rem 'TexGyReadVentor';
color: #bbb;
display: block;
`

const SocialContainer = styled.div`
    display: grid;
    column-gap: 1rem;
    grid-template-columns: 2rem 2rem 2rem;
    justify-content: center;
    padding: 1rem;
    font-size: 2rem;
    a {
        color: #bbb;
    }
    a:hover {
        color: #00a651;
    }
`

// data

const footerLinks = [
    {
        text: "Hot Deals",
        link: "/clearance",
        data: "hot-deals"
    },
    {
        text: "Fixing Guidelines",
        link: "/fixing-guidelines",
        data: "fixing-guidelines"
    },
    {
        text: "Decking Calculator",
        link: "/decking-calculator",
        data: "decking-calculator"
    },
    {
        text: "Tools & Resources",
        link: "/tools-resources",
        data: "tools-resources"
    },
    {
        text: "Warranty",
        link: "/warranty",
        data: "warranty"
    },
    {
        text: "Privacy Statement",
        link: "/privacy",
        data: "privacy"
    },
    {
        text: "Contact Us",
        link: "/enquiries",
        data: "enquiries"
    },

    {
        text: "Customer Areas Serviced",
        link: "/customer-areas-serviced",
        data: "customer-areas-serviced"
    }
]



const Footer = () => {

    const [menuOpen, setMenuOpen] = useState("");

    // Utilities
    const size = useWindowSize();

    const openMenu = (e) => {
        (menuOpen !== e.target.dataset.heading) ? setMenuOpen(e.target.dataset.heading) : setMenuOpen("");
    }

    return (

        <React.Fragment>
            <FooterCta>
                <FooterCtaHeading>Order Futurewood for your next project</FooterCtaHeading>

                <CtaButton to="/enquiries">Enquire Now</CtaButton>
            </FooterCta>



            <FooterNavCont>
                <CompanyInfoCont style={{ gridArea: "company" }}>
                    <Link to="/"><StaticImage
                        alt="Futurewood Logo"
                        src={"../images/fw-logo-light.png"}
                        formats={["auto", "avif", "webp"]}
                        objectFit={"contain"}
                        imgStyle={{ width: `${150}px`, margin: `auto` }}
                    />
                    </Link>
                    <SocialContainer>
                        <a href="https://facebook.com/futurewood" target="_blank" rel="noreferrer"><Facebook aria-label="facebook" /></a>
                        <a href="https://www.instagram.com/futurewood.au" target="_blank" rel="noreferrer"><Instagram aria-label="instagram" /></a>
                        <a href="https://www.youtube.com/channel/UC2A3nKhvOMTerRdCmmnblXg" target="_blank" rel="noreferrer"><YouTube aria-label="youtube" /></a>
                    </SocialContainer>
                    <Small>Copyright © Futurewood Pty Ltd 2007 – {new Date().getFullYear()}. <br></br><br></br>All Rights Reserved.</Small>
                </CompanyInfoCont>

                <FooterLinksCol style={{ gridArea: "products" }}>
                    <FooterMenuHeading onClick={openMenu} data-heading="products">Products
                        {size.width < 769 && <AccordionArrow style={(menuOpen === "products") && { transform: "rotate(180deg)" }} />}
                    </FooterMenuHeading>

                    {
                        <FooterLinksGroup>
                            {(size.width > 768 || menuOpen === "products") && footerLinks.map(link => (
                                <li key={link.data}><FooterLink to={link.link}>{link.text}</FooterLink></li>
                            ))}
                        </FooterLinksGroup>
                    }
                </FooterLinksCol>

                <FooterLinksCol style={{ gridArea: "resources" }}>
                    <FooterMenuHeading onClick={openMenu} data-heading="resources">Resources
                        {size.width < 769 && <AccordionArrow style={(menuOpen === "resources") && { transform: "rotate(180deg)" }} />}
                    </FooterMenuHeading>

                    <FooterLinksGroup>
                        {(size.width > 768 || menuOpen === "resources") && footerLinks.map(link => (
                            <li key={link.data}><FooterLink to={link.link}>{link.text}</FooterLink></li>
                        ))}
                    </FooterLinksGroup>
                </FooterLinksCol>

                <FooterLinksCol style={{ gridArea: "inspiration" }}>
                    <FooterMenuHeading onClick={openMenu} data-heading="inspiration">Inspiration
                        {size.width < 769 && <AccordionArrow style={(menuOpen === "inspiration") && { transform: "rotate(180deg)" }} />}
                    </FooterMenuHeading>

                    <FooterLinksGroup>
                        {(size.width > 768 || menuOpen === "inspiration") && footerLinks.map(link => (
                            <li key={link.data}><FooterLink to={link.link}>{link.text}</FooterLink></li>
                        ))}
                    </FooterLinksGroup>
                </FooterLinksCol>

                <FooterLinksCol style={{ gridArea: "more" }}>
                    <FooterMenuHeading onClick={openMenu} data-heading="more">More
                        {size.width < 769 && <AccordionArrow style={(menuOpen === "more") && { transform: "rotate(180deg)" }} />}
                    </FooterMenuHeading>

                    <FooterLinksGroup>
                        {(size.width > 768 || menuOpen === "more") && footerLinks.map(link => (
                            <li key={link.data}><FooterLink to={link.link}>{link.text}</FooterLink></li>
                        ))}
                    </FooterLinksGroup>
                </FooterLinksCol>
            </FooterNavCont>
        </React.Fragment>

    )
}

export default Footer;