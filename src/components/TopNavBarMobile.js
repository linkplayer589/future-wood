import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Helmet from 'react-helmet';
import { StaticImage } from "gatsby-plugin-image";
import { Search, Menu } from "@mui/icons-material";

// Styled Components

const TopNavCont = styled.div`
    padding: 5%;
    background-color: #006933;
    display: flex;
    justify-content: space-between;
    position : absolute;
    min-width: 90%;
    z-index: 10;
`;

const LogoCont = styled.div`
    align-self: center;
`;

const Hamburger = styled(Menu)`
    align-self: center;
    color: #fff;
`;

const PrimNav = styled.div`
    position: fixed;
    top: 8rem;
    right: 0;
    height: 100vh;
    width: 100%;
    background-color: #fff;
    z-index: 99;
`;

const Ulist = styled.ul`
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    overflow: scroll;
    height: calc(100vh - 104px);
    list-style: none;
`;

const PrimUlist = styled(Ulist)`
    padding-left: 1em
`;

const ListItem = styled.li`
    border-bottom: 1px solid rgb(0.0.0,0.5);
    width: 100%;
    height: 50px;
`;

const SecMenuLink = styled(Link)`
    color: #000;
    text-decoration: none;
    font-size: 1.5rem;
`;

const PrimMenuLink = styled(SecMenuLink)`
    font-weight: bold;
`;

const MobileMegaMenuMain = styled.div`
    display: flex;
    position: absolute;    
    background: #fff;
    box-shadow: 0 0 8px 4px rgb(0 0 0 / 50%);
    z-index: 20;
    max-width: 100%;
    width: 100%;
    left: 0; 
`;

const MobileMegaMenuItemsContainer = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
`;

const MobileMegaMenuItem = styled.div`
    text-transform: uppercase;
    color: ${props => props.dataSelected === "active" ? "#fff" : "#000"};
    background-color: ${props => props.dataSelected === "active" ? "#00a651" : "#eee"};
    padding: 10px 15px;
    cursor: pointer;
    border: ${props => props.dataSelected === "active" ? "none" : "0.5px solid #ddd;"};
    position: relative;
    &:after {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 100%;
        top: 50%;
        z-index: 5;
        margin-top: -10px;
        content: '';
        transform: rotate(45deg);
        margin-left: -10px;
        background: #00a651;
        display: ${props => props.dataSelected === "active" ? "default" : "none"}
    }
`;

const BackToMenu = styled.div`
    display: flex;
    align-items: center;
    background-color: #666;
    color: #fff;
    text-transform: uppercase;
    padding: 10px 15px;
    cursor: pointer;
    border: 0.5px solid #ddd; 
    position: relative;
    font-weight: 900;
    font-size: 1.2em;
`

const MobileMegaMenuContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 60%;
`;

const MobileMegaMenuHeading = styled.div`
    background-color: #fafafa;
    text-align: center;
    font-size: 1.4rem;
    padding: 21px 21.5px 21.5px;
    z-index: 2;
`;

const MobileProductCard = styled.div`    
    text-align: center;
    border: 1px solid #ddd;
    margin: 1rem;
    position: relative;
`;

const ProductButton = styled.button`    
    color: #000;
    background-color: none;
    -webkit-text-decoration: none;
    text-decoration: none;
    font-size: 1.5rem;
    border: none;
    background: no-repeat;
    padding: 0;
    font-weight: bold;
        &:after{
            content: '>';
            color: #000;
            margin-left: 5px;
        }
`;

// Data

const mobilemegaMenuItems = {
    decking: {
        brand: "CleverDeck",
        category: "Decking",
        products: [
            {
                key: "decking-x",
                name: "Xtreme CO-EX",
                info: ["7 Colours Available", "Scratch & Water Resistant", "BAL 29 Rated"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/xtreme-decking.png",
                link: "https://www.futurewood.com.au/decking/xtreme/"
            },
            {
                key: "decking-o",
                name: "Eco-Pro and Original",
                info: ["Up to 7 Colours Available", "More Durable Than Timber", "Low Maintenance"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/original-decking.jpg",
                link: "https://www.futurewood.com.au/decking/original/"
            },
            {
                key: "decking-c",
                name: "Custom Decking",
                info: ["Custom Colour Options", "Multiple Sizes Available", "Custom Made For Your Project"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-decking.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=decking"
            }
        ],
        link: "#"
    },
    screening: {
        brand: "EnviroSlat",
        category: "Decorative Cladding & Screen Fencing",
        products: [
            {
                key: "deco-o",
                name: "Decroative Cladding & Screen Fencing",
                info: ["../images/decorative-cladding-and-screen-fencing.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/decorative-cladding-and-screen-fencing.jpg",
                link: "https://www.futurewood.com.au/screen-fencing/"
            },
            {
                key: "deco-c",
                name: "Custom Decorative Cladding & Screen Fencing",
                info: ["../images/custom-fencing.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-fencing.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=deco"
            }
        ],
        link: "#"
    },
    cladding: {
        brand: "EnviroSlat",
        category: "WeatherProof Cladding",
        products: [
            {
                key: "cladding-o",
                name: "Weatherproof Cladding",
                info: ["../images/weatherproof-cladding.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/weatherproof-cladding.jpg",
                link: "https://www.futurewood.com.au/cladding/"
            },
            {
                key: "deco-c",
                name: "Custom Weatherproof Cladding",
                info: ["../images/custom-weatherproof-cladding.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-weatherproof-cladding.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=wtc"
            }
        ],
        link: "#"
    },
    custom: {
        brand: "Futurewood",
        category: "Custom Product Range",
        products: [
            {
                key: "decking-ci",
                name: "Custom Decking",
                info: ["../images/custom-decking.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-decking.jpg",
                link: "https://www.futurewood.com.au/custom-made-products/?menu_product=decking"
            },
            {
                key: "deco-ci",
                name: "Custom Decorative Cladding & Screen Fencing",
                info: ["../images/custom-fencing.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/decorative-cladding-and-screen-fencing.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=deco"

            },
            {
                key: "cladding-ci",
                name: "Custom Weatherproof Cladding",
                info: ["../images/custom-weatherproof-cladding.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-weatherproof-cladding.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=wtc"
            },
            {
                key: "fencing-c",
                name: "Custom Fencing",
                info: ["../images/custom-fencing.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-fencing.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=fencing"
            },
            {
                key: "facades-c",
                name: "Custom Facades",
                info: ["../images/custom-facades.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-facades.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=facades"
            },
            {
                key: "furniture-c",
                name: "Custom Street Furniture",
                info: ["../images/custom-street-furniture.jpeg"],
                image: "https://www.futurewood.com.au/resources/uploads/2019/06/custom-street-furniture.jpg",
                link: "https://www.futurewood.com.au/custom-made-products?menu_product=street"
            }
        ],
        link: "#"
    },

};

// Data

const primLinks = [
    {
        text: "Home",
        link: "/",
        data: "home",
        hover: null
    },
    {
        text: "Products",
        data: "products",
    },
    {
        text: "Tools & Resources",
        link: "/tools-resources",
        data: "tools-resources",
        hover: null
    },
    {
        text: "Hot Deals",
        link: "/clearance",
        data: "clearance",
        hover: null
    },
    {
        text: "Blog",
        link: "/blog",
        data: "blog",
        hover: null
    },
    {
        text: "FAQs",
        link: "/faqs",
        data: "faqs",
        hover: null
    },
    {
        text: "Contact",
        link: "/enquiries",
        data: "enquiries",
        hover: null
    },
    {
        text: "Inspiration",
        link: "/inspiration",
        data: "inspiration",
        hover: null
    },
    {
        text: "Projects",
        link: "/projects",
        data: "projects",
        hover: null
    },
    {
        text: "About",
        link: "/about",
        data: "about",
        hover: null
    },
    {
        text: "International",
        link: "/international",
        data: "international",
        hover: null
    },
    {
        text: "1300 484 308",
        link: "tel:1300484308",
        data: "tel",
        hover: null
    }
]

const TopNavBarMobile = () => {

    const [mobilemegaMenuOpen, setMobileMegaMenuOpen] = useState(false);
    const [mobileselectedCategory, setMobileSelectedCategory] = useState("decking");
    const [prodMenuOpen, setProdMenuOpen] = useState(false);

    const toggleMobileMegaMenu = () => {
        setMobileMegaMenuOpen(!mobilemegaMenuOpen)
    }

    const mobilefilterStatus = (key) => {
        let status = (key === mobileselectedCategory) ? "active" : "inactive";
        return status;
    }

    const toggleProdMenu = () => {
        setProdMenuOpen(!prodMenuOpen)
    }

    return (
        <TopNavCont>
            <LogoCont>
                <StaticImage
                    alt="Futurewood Logo"
                    src={"../images/fw-logo-light.png"}
                    objectFit={"cover"}
                    width={130}
                    aspectRatio={43 / 18}
                    layout="fixed"
                    loading="eager"

                />
            </LogoCont>
            <Hamburger onClick={toggleMobileMegaMenu} />

            {mobilemegaMenuOpen &&
                <Helmet
                    bodyAttributes={{ class: 'hidden-overflow' }}
                    htmlAttributes={{ class: 'hidden-overflow' }}
                />
            }
            {mobilemegaMenuOpen &&
                !prodMenuOpen &&
                <PrimNav>
                    <PrimUlist>
                        {primLinks.map(link => (
                            <ListItem
                                key={link.text}
                            >
                                {link.data !== "products" &&
                                    <PrimMenuLink to={link.link} data-value={link.data}>{link.text}</PrimMenuLink>
                                }
                                {link.data === "products" &&
                                    <ProductButton onClick={toggleProdMenu}>{link.text}</ProductButton>
                                }
                            </ListItem>
                        ))}
                        <ListItem>
                            <Search style={{ color: "#fff" }} />
                        </ListItem>
                    </PrimUlist>
                </PrimNav>
            }
            {prodMenuOpen &&
                <MobileMegaMenuMain id="mega-menu"
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <MobileMegaMenuItemsContainer>
                        <BackToMenu>
                            <button onClick={toggleProdMenu} onKeyDown={toggleProdMenu} style={{ background: "none", border: "none" }}><img src="https://cdn1.futurewood.com.au/resources/uploads/2019/06/left-arrow-angle-in-circular-button.png" alt="back arrow" loading="lazy" className="lazy" style={{ float: "left", marginRight: "0.5rem" }} /></button>
                            Products
                        </BackToMenu>
                        {Object.entries(mobilemegaMenuItems).map(([key, value]) => (
                            <MobileMegaMenuItem key={key} onClick={() => { setMobileSelectedCategory(key) }} dataSelected={mobilefilterStatus(key)} >
                                <div style={{ fontSize: 0.8 + "rem" }}>{value.brand}<sup>&reg;</sup></div>
                                <div style={{ fontSize: 1.1 + "rem", fontWeight: "bold" }}>{value.category}</div>
                            </MobileMegaMenuItem>
                        ))}
                    </MobileMegaMenuItemsContainer>
                    <MobileMegaMenuContent>
                        <MobileMegaMenuHeading>
                            {mobilemegaMenuItems[mobileselectedCategory].brand}<sup>&reg;</sup> AVAILABLE IN 3 CATEGORIES
                        </MobileMegaMenuHeading>
                        {mobilemegaMenuItems[mobileselectedCategory].products.map(product => (
                            <MobileProductCard key={product.key}>
                                <a href={product.link}>
                                    <div><img src={product.image} alt={product.name} loading="lazy" className="lazy" style={{ width: "100%" }} /></div>
                                    <h3>{product.name}</h3>
                                </a>
                            </MobileProductCard>
                        ))}
                    </MobileMegaMenuContent>
                </MobileMegaMenuMain>
            }
        </TopNavCont>
    );
}
export default TopNavBarMobile;