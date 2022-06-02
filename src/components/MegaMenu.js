import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";
import { ArrowForward, ArrowRightAlt } from "@mui/icons-material";

// Styled Components

const MegaMenuMain = styled.div`
    display: flex;
    background: #fff;
    min-height: 392px;
`;

const MegaMenuItemsContainer = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
`;

const MegaMenuItem = styled.div`
    flex-grow: 1;
    text-transform: uppercase;
    text-align: left;
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

const MegaMenuContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 75%;
`;

const MegaMenuHeading = styled.div`
    background-color: #fafafa;
    text-align: center;
    font: bold 1.4rem/1.8rem 'Texgyreadventor';
    padding: 21px 21.5px 21.5px;
    z-index: 2;
    text-transform: uppercase;
`;

const MegaMenuMainContent = styled.div`
    display: flex;
    flex-grow: 1;
`;

const ProductCardsContainer = styled.div`
    display: grid;
    grid-auto-flow: column;
    flex-grow: 1;
`;

const ProductTilesContainer = styled.div`
    display: grid;
    flex-grow: 1;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 1.625rem;
    grid-row-gap: 1.25rem;
    padding: 1.25rem 0.75rem;
`;

const ProductTileTextContainer = styled.div`
    width: 60%;
    padding: 0.25rem 0.5rem;
`;

const DeckingSliderCardCont = styled.div`
    background-color: rgb(162, 204, 53);
    /* width: 150px; */
    padding: 1rem;
    text-align: center;
    color: #fff;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
`;

const SecWhiteButton = styled(Link)`
    border: 2px solid rgba(255,255,255,0.75);
    border-radius: 3px;
    padding: 0.5rem;
    text-decoration: none;
    color: #fff;
    font: bold 1rem/1.2rem 'Open Sans';
    text-align: center;
`;

const MegaMenuLinkContainer = styled.div`
    text-align: right;
    padding: 0 1.8rem;
`;

const MegaMenuLink = styled(Link)`
    text-decoration: none;
    color: #00a651;
    font: bold 1.19rem/1.3rem 'Texgyreadventor';
`;

const ProductCard = styled.div`
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    text-align: center;
    border-right: solid 1px lightgray;
    &:last-child {
        border-right: none;
    }
`;

const ProductTile = styled.div`
    display: flex !important;
    justify-content: space-between;
    box-shadow: 5px 5px 5px rgb(0 0 0 / 6%);
    max-height: 106px;
    position: relative;
`;

const ProductTileTitle = styled.h3`
    font: bold 1rem/1.06rem 'Texgyreadventor';
    margin: 0;
`;

const SmallText = styled.p`
    font: 0.75rem/0.85rem Texgyreadventor;
`;

const ProductTileArrow = styled(ArrowRightAlt)`
    position: absolute;
    right: .125rem;
    bottom: .125rem;
    color: #00a651;
`;

const ProductExploreArrow = styled(ArrowForward)`
    color: #00a651;
    margin-left: .2rem;
`;

const SecondaryBtnGreen = styled.a`
    border: 2px solid #00a651;
    border-radius: 5px;
    padding: 0.5rem;
    color: #00a651;
    text-decoration: none;
    /* width: 150px; */
    align-self: center;
    font: bold 1rem/1.2rem 'Open Sans';
`;

// Data

const megaMenuItems = {
    decking: {
        brand: "CleverDeck",
        category: "Decking",
        products: [
            {
                key: "decking-x",
                name: "Xtreme CO-EX",
                info: ["7 Colours Available", "Scratch & Water Resistant", "BAL 29 Rated"]
            },
            {
                key: "decking-o",
                name: "Eco-Pro and Original",
                info: ["Up to 7 Colours Available", "More Durable Than Timber", "Low Maintenance"]

            },
            {
                key: "decking-c",
                name: "Custom Decking",
                info: ["Custom Colour Options", "Multiple Sizes Available", "Custom Made For Your Project"]
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
                info: ["../images/decorative-cladding-and-screen-fencing.jpeg"]

            },
            {
                key: "deco-c",
                name: "Custom Decorative Cladding & Screen Fencing",
                info: ["../images/custom-fencing.jpeg"]
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
                info: ["../images/weatherproof-cladding.jpeg"]

            },
            {
                key: "deco-c",
                name: "Custom Weatherproof Cladding",
                info: ["../images/custom-weatherproof-cladding.jpeg"]
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
                info: ["../images/custom-decking.jpeg"]
            },
            {
                key: "deco-ci",
                name: "Custom Decorative Cladding & Screen Fencing",
                info: ["../images/custom-fencing.jpeg"]

            },
            {
                key: "cladding-ci",
                name: "Custom Weatherproof Cladding",
                info: ["../images/custom-weatherproof-cladding.jpeg"]

            },
            {
                key: "fencing-c",
                name: "Custom Fencing",
                info: ["../images/custom-fencing.jpeg"]
            },
            {
                key: "facades-c",
                name: "Custom Facades",
                info: ["../images/custom-facades.jpeg"]
            },
            {
                key: "furniture-c",
                name: "Custom Street Furniture",
                info: ["../images/custom-street-furniture.jpeg"]
            }
        ],
        link: "#"
    },

};


const MegaMenu = ({ megaMenuOpen, toggleMegaMenu, styleCode }) => {

    const [selectedCategory, setSelectedCategory] = useState("decking");

    const filterStatus = (key) => {
        let status = (key === selectedCategory) ? "active" : "inactive";
        return status;
    }

    // Possible need of a useEffect hook to use updated state (product cat.) on re render.

    return (
        <AnimatePresence>
            {megaMenuOpen &&
                <MegaMenuMain id="mega-menu">
                    <MegaMenuItemsContainer>
                        {Object.entries(megaMenuItems).map(([key, value]) => (
                            <MegaMenuItem key={key} onClick={() => { setSelectedCategory(key) }} dataSelected={filterStatus(key)} >
                                <div style={{ fontSize: 0.8 + "rem" }}>{value.brand}<sup>&reg;</sup></div>
                                <div style={{ fontSize: 1.1 + "rem", fontWeight: "bold" }}>{value.category}</div>
                            </MegaMenuItem>
                        ))}
                    </MegaMenuItemsContainer>

                    <MegaMenuContent className="megamenu-content">
                        <MegaMenuHeading>
                            {
                                megaMenuItems[selectedCategory].brand}<sup>&reg;</sup> AVAILABLE IN 3 CATEGORIES
                        </MegaMenuHeading>
                        <MegaMenuMainContent>
                            {selectedCategory === "decking" ?
                                <DeckingSliderCardCont className="deckingslider-card">
                                    <StaticImage
                                        alt="Decking Range"
                                        src={"../images/img-products-cleverdeck.jpeg"}
                                        formats={["auto", "avif", "webp"]}
                                    />
                                    <div>DECKING</div>
                                    <SecWhiteButton to={"/decking"}>KNOW MORE</SecWhiteButton>
                                </DeckingSliderCardCont>
                                :
                                null
                            }
                            {selectedCategory !== "custom" ?
                                <ProductCardsContainer>

                                    {megaMenuItems[selectedCategory].products.map(product => (
                                        <ProductCard key={product.key}>
                                            {(product.key !== "decking-x" && product.key !== "decking-o" && product.key !== "decking-c") ?
                                                <div>
                                                    <StaticImage
                                                        alt={product.name}
                                                        src="https://cdn1.futurewood.com.au/resources/uploads/2019/06/decorative-cladding-and-screen-fencing.jpg"
                                                        formats={["auto", "avif", "webp"]}
                                                        objectFit={"cover"}
                                                        style={{ maxHeight: "150px" }}
                                                    />
                                                    <h3>{product.name}</h3>
                                                </div>
                                                :
                                                <React.Fragment>
                                                    <h3>{product.name}</h3>
                                                    <ul style={{ textAlign: "left" }}>
                                                        <li>{product.info[0]}</li>
                                                        <li>{product.info[1]}</li>
                                                        <li>{product.info[2]}</li>
                                                    </ul>
                                                </React.Fragment>
                                            }
                                            <SecondaryBtnGreen href="#">VIEW PRODUCTS</SecondaryBtnGreen>
                                        </ProductCard>
                                    ))}
                                </ProductCardsContainer>
                                :
                                <div>
                                    <ProductTilesContainer>
                                        {megaMenuItems[selectedCategory].products.map(product => (
                                            <ProductTile>
                                                <StaticImage
                                                    alt={product.name}
                                                    src="https://cdn1.futurewood.com.au/resources/uploads/2019/06/decorative-cladding-and-screen-fencing.jpg"
                                                    formats={["auto", "avif", "webp"]}
                                                    aspectRatio={1 / 1}
                                                    style={{ maxHeight: 106, maxWidth: 106, width: "40%" }}
                                                />
                                                <ProductTileTextContainer>
                                                    <ProductTileTitle>{product.name}</ProductTileTitle>
                                                    <SmallText>Lorem ipsum dolor sit amet</SmallText>
                                                </ProductTileTextContainer>
                                                <ProductTileArrow />
                                            </ProductTile>


                                        ))}
                                    </ProductTilesContainer>
                                    <MegaMenuLinkContainer>
                                        <MegaMenuLink to="/custom-products">EXPLORE ALL <ProductExploreArrow /></MegaMenuLink>
                                    </MegaMenuLinkContainer>
                                </div>

                            }
                        </MegaMenuMainContent>
                    </MegaMenuContent>
                </MegaMenuMain>
            }
        </AnimatePresence>
    )
}

export default MegaMenu;