import React, { useState, useEffect } from "react";
import styled from "styled-components"; 
import { AnimatePresence } from "framer-motion";

// Styled Components

const MobileMegaMenuMain = styled.div `
    background: #fff;
    box-shadow: 0 0 8px 4px rgb(0 0 0 / 50%);
    z-index: 20;
    max-width: 100%;
    width: 100%;
    padding-bottom: 1em;
`;

const MobileMegaMenuItem = styled.div `
    text-transform: uppercase;
    color: #fff;
    background-color: #00a651;;
    padding: 10px 15px;
    cursor: pointer;
    align-items: center;
`;

const Link = styled.a`
    left: 0.8rem;
    top: 5px;
    transform: translateY(-5px);
    max-height: 32px;
    position: relative;
`;

const MobileMegaMenuHeading = styled.div `
    background-color: #fafafa;
    text-align: center;
    font-size: 1.4rem;
    padding: 21px 21.5px 21.5px;
    z-index: 2;
`;

const MobileProductCard = styled.div `    
    display: flex;
    text-align: center;
    border: 1px solid #ddd;
    margin: 1rem;
    position: relative;
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


const MobileMegaMenu = ({ mobilemegaMenuOpen, prodcategory }) => {

    const [mobileselectedCategory, setMobileSelectedCategory] = useState( prodcategory );
    const [mobileMenu, setMobileMenu] = useState(mobilemegaMenuOpen);

    useEffect(() => {
        setTimeout(() => {
            setMobileSelectedCategory(prodcategory);
            setMobileMenu(mobilemegaMenuOpen);
        }, 0);
    });

    const toggleMobileMenu = () =>{
        setMobileMenu(!mobileMenu);
        console.log(mobileMenu);
    }

    // Possible need of a useEffect hook to use updated state (product cat.) on re render.

    return (
    <AnimatePresence>
        { mobileMenu  &&
            <MobileMegaMenuMain id="mega-menu"
                animate={{ opacity: 1, scale: 1 }}
            >                        
                <MobileMegaMenuItem key={ prodcategory } onClick={ () => { setMobileSelectedCategory( prodcategory ) }} >
                    <Link href="#" onClick={toggleMobileMenu} onKeyDown={toggleMobileMenu}><img src="https://cdn1.futurewood.com.au/resources/uploads/2019/06/left-arrow-angle-in-circular-button.png" alt="back arrow" loading="lazy" className="lazy" style={{float:"left",marginRight:"0.5rem"}} /></Link>
                    <div style={{fontSize: 0.8+"rem"}}>{ mobilemegaMenuItems[mobileselectedCategory].brand }<sup>&reg;</sup></div>
                    <div style={{fontSize: 1.1+"rem", fontWeight: "bold"}}>{ mobilemegaMenuItems[mobileselectedCategory].category }</div>
                </MobileMegaMenuItem>
                <MobileMegaMenuHeading>
                    {mobilemegaMenuItems[mobileselectedCategory].brand}<sup>&reg;</sup> AVAILABLE IN 3 CATEGORIES
                </MobileMegaMenuHeading>
                {mobilemegaMenuItems[mobileselectedCategory].products.map( product => (
                    <MobileProductCard key={product.prodcategory}>
                        <img src={product.image} alt={product.name} loading="lazy" className="lazy" style={{width:"40%"}} />
                        <div style={{padding:"1em"}}>
                            <h3 style={{margin:"0"}}>{product.name}</h3>
                            <ul style={{textAlign: "left"}}>
                                <li>{product.info[0]}</li>
                                <li>{product.info[1]}</li>
                                <li>{product.info[2]}</li>
                            </ul>
                            <SecondaryBtnGreen href="#">VIEW PRODUCTS</SecondaryBtnGreen>                     
                        </div>
                    </MobileProductCard>
                ) ) }
            </MobileMegaMenuMain>
        }
    </AnimatePresence>
    )
}

export default MobileMegaMenu;