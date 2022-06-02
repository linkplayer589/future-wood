import * as React from "react";
import { useState, useEffect } from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import TopNavBar from "../components/TopNavBar";
import TopNavBarMobile from "../components/TopNavBarMobile"
import Footer from "../components/Footer";
import { mediaQueries } from "../utils/mediaQueries";
import { useWindowSize } from "../utils/useWindowSize";

// import "../styles/global.css";
// import "../styles/typography.css";

import MegaMenu from "../components/MegaMenu";
import MobileMegaMenu from "../components/MobileMegaMenu";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import ReactTooltip from 'react-tooltip';
import { AnimatePresence } from "framer-motion";
import { Button } from "@mui/material";
import ReqFormModal from "../components/reqFormModal";
import DeckingComparisonModal from "../components/deckingComparisonModal";
import { Mail, KeyboardArrowDown, Phone, Info } from "@mui/icons-material";

// styles

const GridDiv = styled.div`
  display: grid;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const HeaderCont = styled(GridDiv)`
  background-color: #00a651;
  height: 100vh;
  grid-template-rows: 1fr 6fr;
  
  ${mediaQueries("md")`
    height: 640px;
    grid-template-rows: auto;
  `};

`;


const HeaderContGrid = styled(GridDiv)`
grid-area: 2 / 1 / 3 / 2;
grid-template-rows: auto 1fr 1fr 1fr;
position: relative;
place-items: center start;
padding: 0 20px;
  
  ${mediaQueries("md")`
    padding: 0 90px;
    max-width: 1425px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-area: 1 / 1;
    margin: 0;
  `};

`;

const HeaderBtnCont = styled(FlexDiv)`
  grid-area: 4 / 1 / 5 / 2;
  align-self: center;
  justify-self: center;
  ${mediaQueries("md")`
    justify-self: start;
    grid-area: 3 / 1 / 4 / 2;
    align-self: center;
  `};
  
`;

const HeaderIconsCont = styled(FlexDiv)`
  justify-content: space-between;
  grid-area: 4 / 1 / 5 / 2;
  color: #fff;
  width: 100%;
  grid-row-start: 3;
  align-self: center;
`;

const MobileHeaderIconsCont = styled(GridDiv)`
  grid-area: 3 / 1 / 4 / 2;
  grid-template: 1fr 1fr 1fr / 1fr 1fr; 
  color: #fff;
  gap: 2rem 0;

`;

const IconContainer = styled(FlexDiv)`
  align-self: center;
`;

const H1 = styled.h1`
  color: #fff;
  font: bold 2.5rem/60px 'Texgyreadventor';
  grid-area: 2 / 1 / 3 / 2;

  ${mediaQueries("md")`
    grid-area: 2 / 1 / 3 / 2;
    align-self: end;
  `};
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
`;

const SecButton = styled.a`
  border: 2px solid rgba(255,255,255,0.75);
  border-radius: 3px;
  padding: .81rem 1.12rem;
  color: #fff;
  font: bold 1.12rem/1.4rem 'Texgyreadventor';
  text-align: center;
  margin-left: 1rem;
`;

const MainContent = styled.main`
  color: #232129;
  padding: 0px 10px 10px;
  margin-top: 2rem;
  

  ${mediaQueries("md")`
    margin: -15vh auto 0;
    padding-top: 0;
  `};
`;

const ProductCard = styled.div`
  justify-content: space-between;
  text-align: center;
  z-index: 2;

  ${mediaQueries("md")`
    margin-right: 15px;
  `};
`;

const ProductCardHeading = styled.div`
  background-color: #00a651;
  padding: 1rem;
  color: #fff;
  font: bold 1.2rem/1.5rem TexGyReadVentor;
  text-align: left;
`;

const ProductCardDescription = styled.div`
  padding: .5rem;
  border: solid 1px lightgray;
`;

const SecondaryBtnGreen = styled.button`
    border: 2px solid #00a651;
    border-radius: 3px;
    padding: 10px;
    color: #00a651;
    text-decoration: none;
    font-weight: 800;
    margin: 1rem auto;
    background: transparent;
    cursor: pointer;
`;

const SecondaryLinkBtn = styled(Link)`
    border: 2px solid #00a651;
    border-radius: 3px;
    padding: 10px;
    color: #00a651;
    text-decoration: none;
    font-weight: 800;
    margin: 1rem auto;
    background: #fff;
    cursor: pointer;
    display: inline-block;
`;

const XtremeBanner = styled(FlexDiv)`
  background-color: #014c26;
  justify-content: space-between;
  color: #fff;
  flex-wrap: wrap;
  margin-top: 5rem;
`;

const XtremeBannerCol = styled.div`
  padding: 2rem;

  text-align: left;
`;

const XtremeBannerImgCol = styled(GridDiv)`
  flex-grow: 1;
`;

const XtremeBannerBtnCont = styled(FlexDiv)`

`;

const CenterAlignSection = styled.div`
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
  text-align: center;
  ${mediaQueries("md")`
    padding-left: 96px;
    padding-right: 96px;
  `};
`;

const SectionContentContainer = styled.div`
    ${mediaQueries("md")`
      max-width: 1425px;
      margin: 2.5rem auto;
  `};


`

const SectionPreHeading = styled.h3`
  color: #000;
  font-size: 1.5rem;
`;

const SectionHeading = styled.h2`
  font-size: 3rem;
  line-height: 3.5rem;
`;

const SectionSubHeading = styled.h3`
font-weight: normal;
font-size: 1.5rem;
color: #000;
`;

const BodyText = styled.p`
  color: #676767;
  margin-bottom: 2rem;
`;

const BigProductCardWrapper = styled(FlexDiv)`
  flex-wrap: wrap;
  ${mediaQueries("lg")`
    flex-wrap: nowrap;
  `};
`;

const BigProductCardCont = styled.div`
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
  background-color: #fff;
  margin-bottom: 2rem;
  ${mediaQueries("md")`
    &:first-child {
        margin-right: 2rem;
      }
  `};
`;

const BigProductCardSubCol = styled.div`
  width: 50%;
  padding: .5rem;
  text-align: left;
  &:first-child {
        border-right: 1px solid #dee2e6;
      }
`;

const SwatchColor = styled.div`
  width: 38px;
  height: 38px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 100%;
  box-shadow: inset 0 5px 5px 2px rgb(0 0 0 / 30%);
`;

const DeckingComparisonTable = styled(GridDiv)`
  grid-template:
      [headerRow-start] "xtremeHeader originalHeader" [headerRow-end]
      [coloursRow-start] "xtremeColours originalColours" [coloursRow-end]
      [sizeRow-start] "xtremeSizes originalSizes" [sizeRow-end]
      [warrantyRow-start] "xtremeWarranty originalWarranty" [warrantyRow-end]
      [moreFeaturesRow-start] "xtremeMore originalMore" [moreFeaturesRow-end]
      [bestFitRow-start] "xtremeBest originalBest" [bestFitRow-end]
      / 1fr 1fr;
  
      ${mediaQueries("lg")`
      grid-template:
        [headerRow-start] "descHeader xtremeHeader originalHeader" [headerRow-end]
        [coloursRow-start] "colours xtremeColours originalColours" [coloursRow-end]
        [sizeRow-start] "size xtremeSizes originalSizes" [sizeRow-end]
        [warrantyRow-start] "warranty xtremeWarranty originalWarranty" [warrantyRow-end]
        [moreFeaturesRow-start] "moreFeatures xtremeMore originalMore" [moreFeaturesRow-end]
        [bestFitRow-start] "bestFit xtremeBest originalBest" [bestFitRow-end]
        / 1fr 1fr 1fr;
      `};
      background-color: #f5f5f5;
      font: 1.2rem / 1.6rem 'TexGyReadVentor';
`;

const ComparisonTableHeader = styled.div`
  padding: 1rem;
  color: #fff;
  border: 2px solid #fff;
  font: bold 1.5rem / 2rem 'TexGyReadVentor';
  
`;

const ComparisonTableLabelCont = styled.div`
  padding: 1rem;
  background-image: linear-gradient(to top,#f4f4f4,#fff);
  text-align: left;
  display: none;

  ${mediaQueries("lg")` {
    display: block;

  `};
`;

const ComparisonTableXtremeCont = styled.div`
  padding: 1rem;
  background-color: #e1e1e1;
  box-shadow: inset 0 0 3px 2px rgb(0 0 0 / 10%);
  list-style: none;
`;

const ComparisonTableOrigCont = styled.div`
  padding: 1rem;
  border: 1px solid #fff;
  list-style: none !important;
`;

const MobileProductCardsNav = styled.div`
  color: ${props => props.dataSelected === "active" ? "#fff" : "#000"};
  background-color: ${props => props.dataSelected === "active" ? "#00a651" : "#eee"};
  cursor: pointer;
  padding: 10px 15px;
  position: relative;
        &:after {
            position: absolute;
            width: 20px;
            height: 20px;
            left: 50%;
            bottom: -10px;
            z-index: 5;
            margin-top: -10px;
            content: '';
            transform: rotate(45deg);
            margin-left: -10px;
            background: #00a651;
            display: ${props => props.dataSelected === "active" ? "default" : "none"}
        }
`;

const WWFSupport = styled(GridDiv)`
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin: auto;
  ${mediaQueries("lg")`
      max-width: 55%;
  `};
`;

const WWFTextCont = styled.div`
  text-align: left;
  ${mediaQueries("md")`
      margin-left: 1.5rem;
  `};
`;

const ToolsResourcesCont = styled(FlexDiv)`
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  background: #fff;
  flex-wrap: wrap;

  ${mediaQueries("lg")`
    flex-wrap: nowrap;
  `};
`;

const ToolsResourcesCol1 = styled.div`
  padding: 1rem;
  align-self: center;
  width: 66.66%;
  flex-grow: 1;

`;

const ToolsResourcesCol2 = styled(GridDiv)`
  grid-template-rows: 142px 142px 142px;
  padding: .5rem;
  width: 33.33%;
  gap: .5rem;
  flex-grow: 1;
`;

const ToolsButton = styled(GridDiv)`
  box-shadow: 2px 2px 2px rgb(0 0 0 / 50%);
  cursor: pointer;
`;

const ToolsButtonLabel = styled.span`
  grid-area: 1 / 1;
  color: #fff;
  z-index: 1;
  align-self: center;
`;

const BlogExcerpt = styled(Link)`
  padding: 1rem;
  width: 100%;
  text-decoration: none;
  color: #000;
  text-align: left;
  flex-grow: 1;

  ${mediaQueries("md")`
    width: 42%;
  `};

  ${mediaQueries("lg")`
    width: 31%;
  `};
`;

const BlogHeading = styled.div`
  color: #000;
  font: 700 1.2rem/1.5rem 'TexGyReadVentor';
  margin-top: .5rem;
  margin-bottom: 1rem;
`;

const BlogCategories = styled.div`
  color: #00a651;
  text-transform: uppercase;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const UnordListNone = styled.ul`
      list-style: none;
`;

const HoverButton = styled.div`
  position: fixed;
  width: 170px;
  height: 60px;
  line-height: 0;
  top: 50%;
  right: 0;
  padding: 15px;
  background-color: #00a651;
  color: #fff;
  text-align: center;
  font-size: 22px!important;
  font-weight: 600!important;
  z-index: 1000;
  -webkit-animation: bot-to-top 2s ease-out;
  animation: bot-to-top 2s ease-out;
  transform: rotate(90deg);
  transform-origin: right top 0;
`

const EnquireButton = styled.button`
  background-color: #00a651;
  color: #fff;
  text-align: center;
  animation: bot-to-top 2s ease-out;
  transform-origin: right top 0;
  border: none;
  font-size: inherit;
  cursor: pointer;
`;

// data


const blogPosts = {
  blog1: {
    image: "../images/composite-timber-decking-5-768x512.jpeg",
    heading: "An effective low-height deck installation solution",
    categories: ["DECKING", "PROJECTS"],
    excerpt: "An effective low-height deck installation solution At long last — a simple and cost-effective way to turn your ugly concrete outdoor living space or dated paved patio into a modern...",
    date: "26 November 2021"
  },
  blog2: {
    image: "../images/composite-timber-decking-5-768x512.jpeg",
    heading: "Real timber without the ongoing maintenance",
    categories: ["DECKING", "PROJECTS"],
    excerpt: "Real timber without the ongoing maintenance Now with two distinctly different composite timber decking ranges and four types of board to choose from, Futurewood has a product to suit every...",
    date: "19 November 2021"
  },
  blog3: {
    image: "../images/composite-timber-decking-5-768x512.jpeg",
    heading: "Futurewood’s eco-friendly composite timber decking choices",
    categories: ["DECKING", "PROJECTS"],
    excerpt: "Creating alternatives to the popular timber, Futurewood has been developing composite timber decking that possesses the benefits of the material without the high maintenance Futurewood supplies a quality range of...",
    date: "14 September 2021"
  }
}

// markup
const IndexPage = () => {

  <StaticQuery query={graphql`
  {
      allWpPage {
              nodes {
                  title
              }
      }
  }`
  } />


  const [isProductSliderOpen, setIsProductSliderOpen] = useState(false);
  const [selectedDeckingProductSlider, setSelectedDeckingProductSlider] = useState("xtreme");
  const [selectedCladdingProductSlider, setSelectedCladdingProductSlider] = useState("screening");
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const [bigDeckingProductSwiper, setBigDeckingProductSwiper] = useState(null);
  const [bigCladdingProductSwiper, setBigCladdingProductSwiper] = useState(null);
  const [prodCategory, setProdcategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deckingComparisonModalOpen, setDeckingComparisonModalOpen] = useState(false);

  const slideDeckingTo = (index) => bigDeckingProductSwiper.slideTo(index);
  const slideCladdingTo = (index) => bigCladdingProductSwiper.slideTo(index);

  const click_ref = React.useRef(null);

  useEffect(() => {
    function GetCategory(e) {
      setProdcategory(e.target.value);
    }
    click_ref.current = GetCategory;
  });

  const expandProductSlider = () => {
    setIsProductSliderOpen(true);
  }

  const toggleDetailedView = () => {
    setIsDetailedViewOpen(!isDetailedViewOpen);

  }

  const setActiveDeckingProductCard = (event) => {
    setSelectedDeckingProductSlider(event.target.dataset.name);
    slideDeckingTo((event.target.dataset.name === "xtreme") ? 0 : 1);
  }

  const setActiveCladdingProductCard = (event) => {
    setSelectedCladdingProductSlider(event.target.dataset.name);
    slideCladdingTo((event.target.dataset.name === "screening") ? 0 : 1);
  }

  const size = useWindowSize();

  SwiperCore.use([Autoplay]);

  return (
    <React.Fragment>

      {/* Wordpress request forom Modal */}
      <ReqFormModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />

      <HeaderCont>
        {/* You can use a GatsbyImage component if the image is dynamic */}
        <HoverButton>
          <Mail style={{ color: "#fff" }} />
          <EnquireButton variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>ENQUIRE</EnquireButton>
        </HoverButton>

        {size.width > 768 ?
          <React.Fragment>
            <StaticImage
              style={{
                gridArea: "1/1",
                // You can set a maximum height for the image, if you wish.
                // maxHeight: 600,
              }}
              layout="fullWidth"
              // You can optionally force an aspect ratio for the generated image
              aspectRatio={3 / 1}
              // This is a presentational image, so the alt should be an empty string
              alt="Futurewood Low Maintenance Decking"
              src={"../images/home-header-desktop.jpeg"}
              formats={["auto", "avif", "webp"]}
            />

            <TopNavBar />

            <HeaderContGrid>
              {/* Any content here will be centered in the component */}
              <H1>A low maintenance timber alternative</H1>

              <HeaderBtnCont>
                <CtaButton
                  onClick={() => console.log("hi")}
                  to="/contact"
                >ENQUIRE TODAY</CtaButton>

                <SecButton>Call us on 1300 484 308</SecButton>
              </HeaderBtnCont>

              <HeaderIconsCont>
                <IconContainer>
                  <StaticImage
                    src={"../images/nooiling_icon.png"}
                    alt="No Oiling"
                    formats={["auto", "avif", "webp"]}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No - Oiling</span>
                </IconContainer>
                <IconContainer>
                  <StaticImage
                    src={"../images/norot_icon.png"}
                    alt="No Rot"
                    formats={["auto", "avif", "webp"]}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No Rot</span>
                </IconContainer>
                <IconContainer>
                  <StaticImage
                    src={"../images/noworries_icon.png"}
                    alt="No Worries"
                    formats={["auto", "avif", "webp"]}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No Worries</span>
                </IconContainer>
                <IconContainer>
                  <StaticImage
                    src={"../images/warranty_icon.png"}
                    alt="Warranty"
                    formats={["auto", "avif", "webp"]}

                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No fuss-unmatched warranty</span>
                </IconContainer>
                <IconContainer>
                  <StaticImage
                    src={"../images/bal-logo-w-o-rated-white.png"}
                    alt="Bal Rating"
                    formats={["auto", "avif", "webp"]}

                  />
                  <span style={{ marginLeft: .5 + "rem", alignSelf: "center" }}>BAL 29 Decking</span>
                </IconContainer>
              </HeaderIconsCont>
            </HeaderContGrid>
          </React.Fragment>
          :
          <React.Fragment>
            <TopNavBarMobile />

            <HeaderContGrid>

              {/* Any content here will be centered in the component */}
              <H1>Low maintenance timber alternative</H1>

              <MobileHeaderIconsCont>
                <IconContainer style={{ gridArea: 1 / 1 / 2 / 2 }}>
                  <StaticImage
                    src={"../images/nooiling_icon.png"}
                    alt="No Oiling"
                    formats={["auto", "avif", "webp"]}
                    style={{ minHeight: 24 + "px", alignSelf: "center" }}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No Oiling</span>
                </IconContainer>
                <IconContainer style={{ gridArea: 1 / 2 / 2 / 3 }}>
                  <StaticImage
                    src={"../images/norot_icon.png"}
                    alt="No Rot"
                    formats={["auto", "avif", "webp"]}
                    style={{ minHeight: 24 + "px", alignSelf: "center" }}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No Rot</span>
                </IconContainer>
                <IconContainer style={{ gridArea: 2 / 1 / 3 / 2 }}>
                  <StaticImage
                    src={"../images/noworries_icon.png"}
                    alt="No Worries"
                    formats={["auto", "avif", "webp"]}
                    style={{ minHeight: 24 + "px", alignSelf: "center" }}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>No Worries</span>
                </IconContainer>
                <IconContainer style={{ gridArea: 2 / 2 / 3 / 3 }}>
                  <StaticImage
                    src={"../images/warranty_icon.png"}
                    alt="Warranty"
                    formats={["auto", "avif", "webp"]}
                    style={{ minHeight: 24 + "px", alignSelf: "center" }}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>Unmatched warranty</span>
                </IconContainer>
                <IconContainer style={{ gridArea: 3 / 1 / 4 / 2 }}>
                  <StaticImage
                    src={"../images/warranty_icon.png"}
                    alt="Warranty"
                    formats={["auto", "avif", "webp"]}
                    style={{ minHeight: 24 + "px", alignSelf: "center" }}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>Unmatched warranty</span>
                </IconContainer>
                <IconContainer style={{ gridArea: 3 / 2 / 4 / 3 }}>
                  <StaticImage
                    src={"../images/warranty_icon.png"}
                    alt="Warranty"
                    formats={["auto", "avif", "webp"]}
                    style={{ minHeight: 24 + "px", alignSelf: "center" }}
                  />
                  <span style={{ marginLeft: .5 + "rem" }}>Unmatched warranty</span>
                </IconContainer>
              </MobileHeaderIconsCont>

              <HeaderBtnCont>
                <CtaButton to="/samples">REQUEST SAMPLES</CtaButton>
              </HeaderBtnCont>
            </HeaderContGrid>
          </React.Fragment>
        }
      </HeaderCont>

      {/* Start of main content second fold onwards */}
      <MainContent>

        {/* Second fold Product cards and slider */}

        <div>
          {size.width > 768 ?
            !isProductSliderOpen &&
            <CenterAlignSection>
              <SectionContentContainer>
                <FlexDiv>
                  <ProductCard>
                    <ProductCardHeading>
                      <div style={{ fontSize: 70 + "%" }}>COMPOSITE DECKING</div>
                      <span>Decking Products <br></br>(CleverDeck<sup>&reg;</sup>)</span>
                    </ProductCardHeading>

                    <StaticImage src="../images/decking_01-600X403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                    <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                      <br></br>
                      <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="decking">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>
                    </ProductCardDescription>

                  </ProductCard>

                  <ProductCard>
                    <ProductCardHeading>
                      <div style={{ fontSize: 70 + "%" }}>ENVIROSLAT <sup>&reg;</sup></div>
                      <span>Decorative Cladding & Screen Fencing</span>
                    </ProductCardHeading>

                    <StaticImage src="../images/cladding_01-600X403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                    <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                      <br></br>
                      <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="screening">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>
                    </ProductCardDescription>
                  </ProductCard>


                  <ProductCard>
                    <ProductCardHeading>
                      <div style={{ fontSize: 70 + "%" }}>ENVIROSLAT <sup>&reg;</sup></div>
                      <span>Weatherproof <br></br>Cladding</span>
                    </ProductCardHeading>

                    <StaticImage src="../images/Weatherproof_600X403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                    <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                      <br></br>
                      <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="cladding">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>
                    </ProductCardDescription>
                  </ProductCard>

                  <ProductCard>
                    <ProductCardHeading>
                      <div style={{ fontSize: 70 + "%" }}>FUTUREWOOD<sup>&reg;</sup></div>
                      <span>Custom Product <br></br>Range</span>
                    </ProductCardHeading>

                    <StaticImage src="../images/img-products-custom-made-products-600x403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                    <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                      <br></br>
                      <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="custom">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>

                    </ProductCardDescription>
                  </ProductCard>
                </FlexDiv>
              </SectionContentContainer>
            </CenterAlignSection>
            :
            !isProductSliderOpen &&
            <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              spaceBetween={20}
              style={{ paddingBottom: "4em" }}
            >
              <SwiperSlide>
                <ProductCard>
                  <ProductCardHeading>
                    <div style={{ fontSize: 70 + "%" }}>COMPOSITE DECKING</div>
                    <span>Decking Products <br></br>(CleverDeck<sup>&reg;</sup>)</span>
                  </ProductCardHeading>

                  <StaticImage src="../images/decking_01-600X403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                  <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                    <br></br>
                    <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="decking">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>
                  </ProductCardDescription>

                </ProductCard>
              </SwiperSlide>

              <SwiperSlide>
                <ProductCard>
                  <ProductCardHeading>
                    <div style={{ fontSize: 70 + "%" }}>ENVIROSLAT<sup>&reg;</sup></div>
                    <span> Decorative Cladding & <br></br>Screen Fencing</span>
                  </ProductCardHeading>

                  <StaticImage src="../images/cladding_01-600X403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                  <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                    <br></br>
                    <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="screening">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>
                  </ProductCardDescription>
                </ProductCard>
              </SwiperSlide>

              <SwiperSlide>
                <ProductCard>
                  <ProductCardHeading>
                    <div style={{ fontSize: 70 + "%" }}>ENVIROSLAT<sup>&reg;</sup></div>
                    <span> Weatherproof <br></br>Cladding</span>
                  </ProductCardHeading>

                  <StaticImage src="../images/Weatherproof_600X403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                  <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                    <br></br>
                    <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="cladding">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>
                  </ProductCardDescription>


                </ProductCard>
              </SwiperSlide>

              <SwiperSlide>
                <ProductCard>
                  <ProductCardHeading>
                    <div style={{ fontSize: 70 + "%" }}>FUTUREWOOD<sup>&reg;</sup></div>
                    <span>Custom Product <br></br>Range</span>
                  </ProductCardHeading>

                  <StaticImage src="../images/img-products-custom-made-products-600x403.jpeg" alt="mould resistant wood decking and a variety of colour (aka stains) available"></StaticImage>

                  <ProductCardDescription>CleverDeck is great value, easy to install, environmentally sustainable, and virtually maintenance-free. <br></br><br></br>BAL 29 Rated.
                    <br></br>
                    <SecondaryBtnGreen onClick={(event) => { expandProductSlider(); click_ref.current(event) }} value="custom">VIEW PRODUCTS <KeyboardArrowDown /></SecondaryBtnGreen>

                  </ProductCardDescription>
                </ProductCard>
              </SwiperSlide>
            </Swiper>
          }
          <CenterAlignSection>
            <SectionContentContainer>
              {typeof window !== 'undefined' &&
                window.innerWidth <= 767
                ? <MobileMegaMenu mobilemegaMenuOpen={isProductSliderOpen} prodcategory={prodCategory}></MobileMegaMenu>
                : <MegaMenu megaMenuOpen={isProductSliderOpen} prodcategory={prodCategory}></MegaMenu>
              }

            </SectionContentContainer>
          </CenterAlignSection>
        </div>
        <title>Home Page</title>

        {/* Xtreme Banner */}
        <CenterAlignSection>
          <SectionContentContainer>
            <XtremeBanner>
              <XtremeBannerCol>
                <StaticImage src="../images/xtreme-banner-title.png" alt="xtreme" />
                <ul>
                  <li>138mm and 185mm wide solid capped decking boards</li>
                  <li>Easy to clean and stain-resistant hard outer shell wood decking</li>
                  <li>Scratch and fade resistant</li>
                  <li>BAL -29 rated</li>
                  <li>Comes in 7 vibrant blended colours</li>
                </ul>
                <XtremeBannerBtnCont>
                  <CtaButton to="#" style={{ marginRight: 1 + "rem" }}><Phone /> 1300 484 308</CtaButton>
                  {/* <CtaButton to="#">Enquire Now</CtaButton> */}
                  <Button variant="contained" color="primary" onClick={() => setDeckingComparisonModalOpen(true)}>Enquire Now</Button>

                </XtremeBannerBtnCont>
              </XtremeBannerCol>
              <XtremeBannerImgCol style={{ flexGrow: 1 }}>
                <StaticImage style={{ gridArea: "1/1" }} src="../images/xtreme-banner-img-BAL.jpeg" alt="BAL 29" />
              </XtremeBannerImgCol>
            </XtremeBanner>
          </SectionContentContainer>
        </CenterAlignSection>

        {/* Decking Comparison Modal */}
        <div style={{ flex: 1 }}>
          <DeckingComparisonModal
            setDeckingComparisonModalOpen={setDeckingComparisonModalOpen}
            deckingComparisonModalOpen={deckingComparisonModalOpen}
          />
        </div>

        {/* About Futurewood */}
        <CenterAlignSection>
          <SectionContentContainer>
            <SectionHeading>About Futurewood <sup>&reg;</sup></SectionHeading>
            <SectionSubHeading>At Futurewood we are dedicated to providing you with quality, value-added alternatives to traditional wood. We think that looks great in a forest and ideally, it should stay there.</SectionSubHeading>
            <BodyText>Our aim is to develop and market sustainable alternatives to rainforest wood currently used within the building industry. Our eco cladding, wood deck, wood fencing, and screening products provide improved performance in specific building applications and help to reduce our dependence on precious species. They look like wood, resistant to termites and offer a range of additional features making them great value for money.</BodyText>
            <SecondaryLinkBtn to="/about">DISCOVER MORE</SecondaryLinkBtn>
          </SectionContentContainer>
        </CenterAlignSection>

        {/* What are Futurewood Products */}
        <CenterAlignSection style={{ backgroundColor: "#f6f6f6" }}>
          <SectionContentContainer>
            <SectionPreHeading>WHAT ARE FUTUREWOOD<sup>&reg;</sup> PRODUCTS?</SectionPreHeading>

            <SectionHeading>Recycled Composite Timber</SectionHeading>

            <Swiper slidesPerView={3} autoplay={{ delay: 2000 }}>
              <SwiperSlide>
                <StaticImage style={{ verticalAlign: "middle" }} src="../images/no-oiling-icon.png" alt="no-oiling" /> No Oiling

              </SwiperSlide>
              <SwiperSlide>
                <StaticImage style={{ verticalAlign: "middle" }} src="../images/no-rot-icon.png" alt="no-rot" /> No Rot
              </SwiperSlide>
              <SwiperSlide>
                <StaticImage style={{ verticalAlign: "middle" }} src="../images/no-worries-icon.png" alt="no-worries" /> No Worries
              </SwiperSlide>
              <SwiperSlide>
                <StaticImage style={{ verticalAlign: "middle" }} src="../images/cost-eff-icon.png" alt="Cost Effective" /> <span data-tip="" data-for="costEffective">Cost Effective <sup><Info style={{ color: "#00a651" }} /></sup></span>
              </SwiperSlide>
              <SwiperSlide>
                <StaticImage style={{ verticalAlign: "middle" }} src="../images/durable-icon.png" alt="Durable" /> Durable
              </SwiperSlide>
              <SwiperSlide>
                <StaticImage style={{ verticalAlign: "middle" }} src="../images/env-friendly-icon.png" alt="Environmental Friendly" /> Environmental Friendly
              </SwiperSlide>
            </Swiper>



            <SectionSubHeading>Futurewood CleverDeck and EnviroSlat products look like wood but are made from recycled polyolefin materials (plastic from post-industrial waste), rice husks and recycled hardwood wood so they are much more ecologically sustainable than timber.</SectionSubHeading>
          </SectionContentContainer>
        </CenterAlignSection>

        {/* Decking Big Product Cards */}
        {size.width > 768 ?
          <CenterAlignSection style={{ backgroundColor: "#f6f6f6" }}>
            <SectionContentContainer>
              <SectionHeading>Decking</SectionHeading>
              <BigProductCardWrapper>
                <BigProductCardCont>
                  <div>
                    <h5>CLEVERDECK<sup>®</sup></h5>
                    <SectionSubHeading><strong> NEW Xtreme CO-EX</strong></SectionSubHeading>
                  </div>
                  <StaticImage src="../images/xtreme-decking-575x230-1.jpeg" style={{ width: 100 + "%" }} alt="Xtreme" />
                  <div className="card-body">
                    <FlexDiv>
                      <BigProductCardSubCol>
                        <h3>Available Colours (Xtreme)</h3>
                        <FlexDiv style={{ flexWrap: "wrap" }}>
                          <SwatchColor className="nex_desert" data-tip="" data-for="desert-oak"></SwatchColor>
                          <SwatchColor className="nex_autumn" data-tip="" data-for="rustic-merbau"></SwatchColor>
                          <SwatchColor className="nex_graphite" data-tip="" data-for="graphite"></SwatchColor>
                          <SwatchColor className="nex_basalt" data-tip="" data-for="basalt"></SwatchColor>
                          <SwatchColor className="nex_limestone" data-tip="" data-for="Limestone Grey"></SwatchColor>
                          <SwatchColor className="nex_ash" data-tip="" data-for="ash-grey"></SwatchColor>
                          <SwatchColor className="nex_riverstone" data-tip="" data-for="Riverstone Grey"></SwatchColor>
                        </FlexDiv>
                        <h3>Size</h3>
                        <p>138mm wide x 23mm thick x 5400mm long</p>
                        <p>185mm wide x 23mm thick x 5400mm long</p>
                      </BigProductCardSubCol>
                      <BigProductCardSubCol>
                        <p>Fully wrapped in a co-extruded super tough protective shell making it effectively maintenance-free.</p>
                        <p>Fade-resistant, scratch, and abrasion-resistant and virtually waterproof, easy to clean surface composite wood.</p>
                        <div style={{ textAlign: "right" }}><StaticImage src="../images/bal-logo-70p.png" alt="BAL 29" /></div>
                      </BigProductCardSubCol>
                    </FlexDiv>
                  </div>
                </BigProductCardCont>
                <BigProductCardCont>
                  <div className="card shadow">
                    <div className="card-header">
                      <h5>CLEVERDECK<sup>®</sup></h5>
                      <SectionSubHeading><strong> ORIGINAL COMPOSITE DECKING</strong></SectionSubHeading>
                    </div>
                    <StaticImage src="../images/SLATE-GREY_Decking-10-575_230.jpeg" alt="Original" style={{ width: 100 + "%" }} />
                    <div className="card-body">
                      <FlexDiv>
                        <BigProductCardSubCol>
                          <h3>Available Colours</h3>
                          <FlexDiv style={{ flexWrap: "wrap" }}>
                            <SwatchColor className="nex_walnut" data-tip="" data-for="walnut"></SwatchColor>
                            <SwatchColor className="nex_chocolate" data-tip="" data-for="chocolate"></SwatchColor>
                            <SwatchColor className="nex_mahogany" data-tip="" data-for="mahogany"></SwatchColor>
                            <SwatchColor className="nex_wtstone" data-tip="" data-for="weathered-stone"></SwatchColor>
                            <SwatchColor className="nex_slate" data-tip="" data-for="slate-grey"></SwatchColor>
                          </FlexDiv>
                          <h3>Size</h3>
                          <p>138mm wide x 23mm thick x 5400mm long</p>
                        </BigProductCardSubCol>
                        <BigProductCardSubCol>
                          <p>Single extrusion solid composite decking board with a realistic wood look, pre-finished and low maintenance.</p>
                          <p>Coarse sanded surface with exposed cellulose fibres and a high level of slip resistance.</p>
                        </BigProductCardSubCol>
                      </FlexDiv>
                    </div>
                  </div>
                </BigProductCardCont>
              </BigProductCardWrapper>

              <SecondaryBtnGreen onClick={toggleDetailedView}>VIEW DETAILED COMPARISON <KeyboardArrowDown /></SecondaryBtnGreen>
            </SectionContentContainer>
          </CenterAlignSection>
          :
          <CenterAlignSection style={{ backgroundColor: "#f6f6f6" }}>
            <SectionContentContainer>

              {/* Cards Navigation for Mobile */}
              <FlexDiv>
                <MobileProductCardsNav onClick={setActiveDeckingProductCard} data-name="xtreme" dataSelected={selectedDeckingProductSlider === "xtreme" ? "active" : "inactive"}>CLEVERDECK<sup>®</sup> New Xtreme CO-EX</MobileProductCardsNav>
                <MobileProductCardsNav onClick={setActiveDeckingProductCard} data-name="original" dataSelected={selectedDeckingProductSlider === "original" ? "active" : "inactive"}>CLEVERDECK<sup>®</sup> Original Composite</MobileProductCardsNav>
              </FlexDiv>

              <SectionHeading>Decking</SectionHeading>
              <Swiper onSwiper={setBigDeckingProductSwiper}>
                <SwiperSlide>
                  <BigProductCardCont>
                    <div>
                      <h5>CLEVERDECK<sup>®</sup></h5>
                      <SectionSubHeading><strong> NEW Xtreme CO-EX</strong></SectionSubHeading>
                    </div>
                    <StaticImage src="../images/xtreme-decking-575x230-1.jpeg" style={{ width: 100 + "%" }} alt="Xtreme" />
                    <div className="card-body">
                      <FlexDiv>
                        <BigProductCardSubCol>
                          <h3>Available Colours (Xtreme)</h3>
                          <FlexDiv style={{ flexWrap: "wrap" }}>
                            <SwatchColor className="nex_desert" data-tip="" data-for="desert-oak"></SwatchColor>
                            <SwatchColor className="nex_autumn" data-tip="" data-for="rustic-merbau"></SwatchColor>
                            <SwatchColor className="nex_graphite" data-tip="" data-for="graphite"></SwatchColor>
                            <SwatchColor className="nex_basalt" data-tip="" data-for="basalt"></SwatchColor>
                            <SwatchColor className="nex_limestone" data-tip="" data-for="Limestone Grey"></SwatchColor>
                            <SwatchColor className="nex_ash" data-tip="" data-for="ash-grey"></SwatchColor>
                            <SwatchColor className="nex_riverstone" data-tip="" data-for="Riverstone Grey"></SwatchColor>
                          </FlexDiv>
                          <h3>Size</h3>
                          <p>138mm wide x 23mm thick x 5400mm long</p>
                          <p>185mm wide x 23mm thick x 5400mm long</p>
                        </BigProductCardSubCol>
                        <BigProductCardSubCol>
                          <p>Fully wrapped in a co-extruded super tough protective shell making it effectively maintenance-free.</p>
                          <p>Fade-resistant, scratch, and abrasion-resistant and virtually waterproof, easy to clean surface composite wood.</p>
                          <div style={{ textAlign: "right" }}><StaticImage src="../images/bal-logo-70p.png" alt="" /></div>
                        </BigProductCardSubCol>
                      </FlexDiv>
                    </div>
                  </BigProductCardCont>
                </SwiperSlide>
                <SwiperSlide>
                  <BigProductCardCont>
                    <div className="card shadow">
                      <div className="card-header">
                        <h5>CLEVERDECK<sup>®</sup></h5>
                        <SectionSubHeading><strong> ORIGINAL COMPOSITE DECKING</strong></SectionSubHeading>
                      </div>
                      <StaticImage src="../images/SLATE-GREY_Decking-10-575_230.jpeg" alt="Original" style={{ width: 100 + "%" }} />
                      <div className="card-body">
                        <FlexDiv>
                          <BigProductCardSubCol>
                            <h3>Available Colours</h3>
                            <FlexDiv style={{ flexWrap: "wrap" }}>
                              <SwatchColor className="nex_walnut" data-tip="" data-for="walnut"></SwatchColor>
                              <SwatchColor className="nex_chocolate" data-tip="" data-for="chocolate"></SwatchColor>
                              <SwatchColor className="nex_mahogany" data-tip="" data-for="mahogany"></SwatchColor>
                              <SwatchColor className="nex_wtstone" data-tip="" data-for="weathered-stone"></SwatchColor>
                              <SwatchColor className="nex_slate" data-tip="" data-for="slate-grey"></SwatchColor>
                            </FlexDiv>
                            <h3>Size</h3>
                            <p>138mm wide x 23mm thick x 5400mm long</p>
                          </BigProductCardSubCol>
                          <BigProductCardSubCol>
                            <p>Single extrusion solid composite decking board with a realistic wood look, pre-finished and low maintenance.</p>
                            <p>Coarse sanded surface with exposed cellulose fibres and a high level of slip resistance.</p>
                          </BigProductCardSubCol>
                        </FlexDiv>
                      </div>
                    </div>
                  </BigProductCardCont>
                </SwiperSlide>
              </Swiper>
              <SecondaryBtnGreen onClick={toggleDetailedView}>VIEW DETAILED COMPARISON <KeyboardArrowDown /></SecondaryBtnGreen>


            </SectionContentContainer>
          </CenterAlignSection>
        }

        {/* Product comparison cards section */}
        <AnimatePresence>
          {isDetailedViewOpen &&
            <CenterAlignSection
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <SectionContentContainer>
                <GridDiv>
                  <StaticImage
                    style={{
                      gridArea: "1/1",
                      maxHeight: 250,
                    }}
                    layout="fullWidth"
                    // You can optionally force an aspect ratio for the generated image
                    aspectRatio={3 / 1}
                    // This is a presentational image, so the alt should be an empty string
                    alt="Futurewood Low Maintenance Decking"
                    src={"../images/cleverdeck-table-header.jpeg"}
                    formats={["auto", "avif", "webp"]}
                  />
                  <div style={{
                    gridArea: "1/1", zIndex: 1, alignSelf: "center"
                  }}>
                    <SectionPreHeading style={{ color: "#00a651" }}>CLEVERDECK<sup>®</sup></SectionPreHeading>
                    <SectionSubHeading style={{ color: "#fff" }}>Composite Timber Decking</SectionSubHeading>
                  </div>
                </GridDiv>

                <DeckingComparisonTable>
                  {size.width > 768 &&
                    <ComparisonTableHeader></ComparisonTableHeader>
                  }

                  <ComparisonTableHeader style={{ backgroundColor: "#00a651" }}>
                    <p>NEW <span>Xtreme</span> CO-EX</p>
                  </ComparisonTableHeader>

                  <ComparisonTableHeader style={{ color: "#000" }}>
                    <p>ORIGINAL COMPOSITE DECKING</p>
                  </ComparisonTableHeader>

                  {size.width > 768 &&
                    <ComparisonTableLabelCont>
                      <div><StaticImage src="../images/colours-icon.png" alt="Available Colours" loading="lazy" /> Colours</div>
                    </ComparisonTableLabelCont>
                  }

                  <ComparisonTableXtremeCont>
                    <p>7 Colours Available</p>

                    <FlexDiv style={{ flexWrap: "wrap", justifyContent: "center" }}>
                      <SwatchColor className="nex_desert" data-tip="" data-for="desert-oak"></SwatchColor>
                      <SwatchColor className="nex_autumn" data-tip="" data-for="rustic-merbau"></SwatchColor>
                      <SwatchColor className="nex_graphite" data-tip="" data-for="graphite"></SwatchColor>
                      <SwatchColor className="nex_basalt" data-tip="" data-for="basalt"></SwatchColor>
                      <SwatchColor className="nex_limestone" data-tip="" data-for="Limestone Grey"></SwatchColor>
                      <SwatchColor className="nex_ash" data-tip="" data-for="ash-grey"></SwatchColor>
                      <SwatchColor className="nex_riverstone" data-tip="" data-for="Riverstone Grey"></SwatchColor>
                    </FlexDiv>
                  </ComparisonTableXtremeCont>

                  <ComparisonTableOrigCont>
                    <p>5 Colours Available</p>

                    <FlexDiv style={{ flexWrap: "wrap", justifyContent: "center" }}>
                      <SwatchColor className="nex_walnut" data-tip="" data-for="walnut"></SwatchColor>
                      <SwatchColor className="nex_chocolate" data-tip="" data-for="chocolate"></SwatchColor>
                      <SwatchColor className="nex_mahogany" data-tip="" data-for="mahogany"></SwatchColor>
                      <SwatchColor className="nex_wtstone" data-tip="" data-for="weathered-stone"></SwatchColor>
                      <SwatchColor className="nex_slate" data-tip="" data-for="slate-grey"></SwatchColor>
                    </FlexDiv>
                  </ComparisonTableOrigCont>


                  {size.width > 768 &&
                    <ComparisonTableLabelCont>
                      <div><StaticImage src="../images/size-icon.png" alt="Available Sizes" loading="lazy" /> Size</div>
                    </ComparisonTableLabelCont>
                  }

                  <ComparisonTableXtremeCont>
                    <UnordListNone>
                      <li><span>Size: </span>138mm x 23mm x 5400mm</li>

                      <li><span>Size: </span>185mm x 23mm x 5400mm</li>
                    </UnordListNone>
                  </ComparisonTableXtremeCont>

                  <ComparisonTableOrigCont>
                    <p><span>Size:</span>138mm x 23mm x 5400mm</p>
                  </ComparisonTableOrigCont>


                  {size.width > 768 &&
                    <ComparisonTableLabelCont>
                      <div><StaticImage src="../images/warranty-black-icon.png" alt="Warranty" loading="lazy" /> Warranty</div>
                    </ComparisonTableLabelCont>
                  }

                  <ComparisonTableXtremeCont>
                    <p>No fuss-unmatched warranty</p>
                  </ComparisonTableXtremeCont>

                  <ComparisonTableOrigCont>
                    <p>No fuss-unmatched warranty</p>
                  </ComparisonTableOrigCont>


                  {size.width > 768 &&
                    <ComparisonTableLabelCont>
                      <div><StaticImage src="../images/more-features-icon.png" alt="More Features" loading="lazy" /> More Features</div>
                    </ComparisonTableLabelCont>
                  }

                  <ComparisonTableXtremeCont>
                    <p>More Features</p>

                    <UnordListNone style={{ textAlign: "left" }}>
                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Dynamic blended colour hues with continuous variation</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> BAL29 rated</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Easy Clean</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Full clipping system for complete concealed fixing</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Suitable for a 450mm joist span</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Not affected by white ants or termites</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Fully finished and ready to install</li>
                    </UnordListNone>
                  </ComparisonTableXtremeCont>

                  <ComparisonTableOrigCont>
                    <p>More Features</p>

                    <UnordListNone style={{ textAlign: "left" }}>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Solid colour runs right through the board</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Double sided board</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> P5 slip rating</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Full clipping system for complete concealed fixing</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Suitable for a 450mm joist span</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Not affected by white ants or termites</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Fully finished and ready to install</li>
                    </UnordListNone>
                  </ComparisonTableOrigCont>


                  {size.width > 768 &&
                    <ComparisonTableLabelCont>
                      <div><StaticImage src="../images/best-fit-for-icon.png" alt="Best Fit For" loading="lazy" /> Best Fit For</div>
                    </ComparisonTableLabelCont>
                  }

                  <ComparisonTableXtremeCont>
                    <p>Best Fit For</p>
                    <UnordListNone style={{ textAlign: "left" }}>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> High traffic areas</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Areas subject to heavy soiling such as restaurants/pubs</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Close to ground sites</li>
                    </UnordListNone>
                  </ComparisonTableXtremeCont>

                  <ComparisonTableOrigCont>
                    <p>Best Fit For</p>

                    <UnordListNone style={{ textAlign: "left" }}>
                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> More traditional timber look and feel</li>

                      <li><StaticImage src="../images/tick-icon.png" alt="Tick" loading="lazy" /> Lower cost projects</li>
                    </UnordListNone>
                  </ComparisonTableOrigCont>


                  {size.width > 768 &&
                    <ComparisonTableLabelCont></ComparisonTableLabelCont>
                  }

                  <ComparisonTableXtremeCont>
                    <CtaButton to="/decking/xtreme">View Product</CtaButton>
                  </ComparisonTableXtremeCont>

                  <ComparisonTableOrigCont>
                    <CtaButton to="/decking/original">View Product</CtaButton>
                  </ComparisonTableOrigCont>

                </DeckingComparisonTable>
              </SectionContentContainer>
            </CenterAlignSection>
          }
        </AnimatePresence>

        {/* Screening & Cladding Big Product Cards */}
        {size.width > 768 ?
          <CenterAlignSection style={{ backgroundColor: "#f6f6f6" }}>
            <SectionContentContainer>
              <SectionHeading>SCREENING - FENCING - CLADDING</SectionHeading>
              <BigProductCardWrapper>
                <BigProductCardCont>
                  <div>
                    <h5>ENVIROSLAT<sup>®</sup></h5>
                    <SectionSubHeading><strong>Screen Fencing</strong></SectionSubHeading>
                  </div>
                  <StaticImage src="../images/xtreme-decking-575x230-1.jpeg" style={{ width: 100 + "%" }} alt="Xtreme" />
                  <div className="card-body">
                    <FlexDiv>
                      <BigProductCardSubCol>
                        <h3>Available Colours (Xtreme)</h3>
                        <FlexDiv style={{ flexWrap: "wrap" }}>
                          <SwatchColor className="nex_desert" data-tip="" data-for="desert-oak"></SwatchColor>
                          <SwatchColor className="nex_autumn" data-tip="" data-for="rustic-merbau"></SwatchColor>
                          <SwatchColor className="nex_graphite" data-tip="" data-for="graphite"></SwatchColor>
                          <SwatchColor className="nex_basalt" data-tip="" data-for="basalt"></SwatchColor>
                          <SwatchColor className="nex_limestone" data-tip="" data-for="Limestone Grey"></SwatchColor>
                          <SwatchColor className="nex_ash" data-tip="" data-for="ash-grey"></SwatchColor>
                          <SwatchColor className="nex_riverstone" data-tip="" data-for="Riverstone Grey"></SwatchColor>
                        </FlexDiv>
                        <h3>Size</h3>
                        <p>138mm wide x 23mm thick x 5400mm long</p>
                        <p>185mm wide x 23mm thick x 5400mm long</p>
                      </BigProductCardSubCol>
                      <BigProductCardSubCol>
                        <p>Fully wrapped in a co-extruded super tough protective shell making it effectively maintenance-free.</p>
                        <p>Fade-resistant, scratch, and abrasion-resistant and virtually waterproof, easy to clean surface composite wood.</p>
                        <div style={{ textAlign: "right" }}><StaticImage src="../images/bal-logo-70p.png" alt="BAL 29" /></div>
                      </BigProductCardSubCol>
                    </FlexDiv>
                  </div>
                </BigProductCardCont>
                <BigProductCardCont>
                  <div className="card shadow">
                    <div className="card-header">
                      <h5>ENVIROSLAT<sup>®</sup></h5>
                      <SectionSubHeading><strong>WEATHERPROOF CLADDING</strong></SectionSubHeading>
                    </div>
                    <StaticImage src="../images/SLATE-GREY_Decking-10-575_230.jpeg" alt="Original" style={{ width: 100 + "%" }} />
                    <div className="card-body">
                      <FlexDiv>
                        <BigProductCardSubCol>
                          <h3>Available Colours</h3>
                          <FlexDiv style={{ flexWrap: "wrap" }}>
                            <SwatchColor className="nex_walnut" data-tip="" data-for="walnut"></SwatchColor>
                            <SwatchColor className="nex_chocolate" data-tip="" data-for="chocolate"></SwatchColor>
                            <SwatchColor className="nex_mahogany" data-tip="" data-for="mahogany"></SwatchColor>
                            <SwatchColor className="nex_wtstone" data-tip="" data-for="weathered-stone"></SwatchColor>
                            <SwatchColor className="nex_slate" data-tip="" data-for="slate-grey"></SwatchColor>
                          </FlexDiv>
                          <h3>Size</h3>
                          <p>138mm wide x 23mm thick x 5400mm long</p>
                        </BigProductCardSubCol>
                        <BigProductCardSubCol>
                          <p>Single extrusion solid composite decking board with a realistic wood look, pre-finished and low maintenance.</p>
                          <p>Coarse sanded surface with exposed cellulose fibres and a high level of slip resistance.</p>
                        </BigProductCardSubCol>
                      </FlexDiv>
                    </div>
                  </div>
                </BigProductCardCont>
              </BigProductCardWrapper>
            </SectionContentContainer>
          </CenterAlignSection>
          :
          <CenterAlignSection style={{ backgroundColor: "#f6f6f6" }}>
            <SectionContentContainer>

              {/* Cards Navigation for Mobile */}
              <FlexDiv>
                <MobileProductCardsNav onClick={setActiveCladdingProductCard} data-name="screening" dataSelected={selectedCladdingProductSlider === "screening" ? "active" : "inactive"}>ENVIROSLAT<sup>®</sup> Decorative Cladding</MobileProductCardsNav>
                <MobileProductCardsNav onClick={setActiveCladdingProductCard} data-name="cladding" dataSelected={selectedCladdingProductSlider === "cladding" ? "active" : "inactive"}>ENVIROSLAT<sup>®</sup> Weatherproof Cladding</MobileProductCardsNav>
              </FlexDiv>

              <SectionHeading>SCREENING - FENCING - CLADDING</SectionHeading>
              <Swiper onSwiper={setBigCladdingProductSwiper}>
                <SwiperSlide>
                  <BigProductCardCont>
                    <div>
                      <h5>ENVIROSLAT<sup>®</sup></h5>
                      <SectionSubHeading><strong> Decorative Cladding & Screen Fencing</strong></SectionSubHeading>
                    </div>
                    <StaticImage src="../images/xtreme-decking-575x230-1.jpeg" style={{ width: 100 + "%" }} alt="Xtreme" />
                    <div className="card-body">
                      <FlexDiv>
                        <BigProductCardSubCol>
                          <h3>Available Colours (Xtreme)</h3>
                          <FlexDiv style={{ flexWrap: "wrap" }}>
                            <SwatchColor className="nex_desert" data-tip="" data-for="desert-oak"></SwatchColor>
                            <SwatchColor className="nex_autumn" data-tip="" data-for="rustic-merbau"></SwatchColor>
                            <SwatchColor className="nex_graphite" data-tip="" data-for="graphite"></SwatchColor>
                            <SwatchColor className="nex_basalt" data-tip="" data-for="basalt"></SwatchColor>
                            <SwatchColor className="nex_limestone" data-tip="" data-for="Limestone Grey"></SwatchColor>
                            <SwatchColor className="nex_ash" data-tip="" data-for="ash-grey"></SwatchColor>
                            <SwatchColor className="nex_riverstone" data-tip="" data-for="Riverstone Grey"></SwatchColor>
                          </FlexDiv>
                          <h3>Size</h3>
                          <p>138mm wide x 23mm thick x 5400mm long</p>
                          <p>185mm wide x 23mm thick x 5400mm long</p>
                        </BigProductCardSubCol>
                        <BigProductCardSubCol>
                          <p>Fully wrapped in a co-extruded super tough protective shell making it effectively maintenance-free.</p>
                          <p>Fade-resistant, scratch, and abrasion-resistant and virtually waterproof, easy to clean surface composite wood.</p>
                          <div style={{ textAlign: "right" }}><StaticImage src="../images/bal-logo-70p.png" alt="BAL 29" /></div>
                        </BigProductCardSubCol>
                      </FlexDiv>
                    </div>
                  </BigProductCardCont>
                </SwiperSlide>
                <SwiperSlide>
                  <BigProductCardCont>
                    <div className="card shadow">
                      <div className="card-header">
                        <h5>ENVIROSLAT<sup>®</sup></h5>
                        <SectionSubHeading><strong> Weatherproof Cladding</strong></SectionSubHeading>
                      </div>
                      <StaticImage src="../images/SLATE-GREY_Decking-10-575_230.jpeg" alt="Original" style={{ width: 100 + "%" }} />
                      <div className="card-body">
                        <FlexDiv>
                          <BigProductCardSubCol>
                            <h3>Available Colours</h3>
                            <FlexDiv style={{ flexWrap: "wrap" }}>
                              <SwatchColor className="nex_walnut" data-tip="" data-for="walnut"></SwatchColor>
                              <SwatchColor className="nex_chocolate" data-tip="" data-for="chocolate"></SwatchColor>
                              <SwatchColor className="nex_mahogany" data-tip="" data-for="mahogany"></SwatchColor>
                              <SwatchColor className="nex_wtstone" data-tip="" data-for="weathered-stone"></SwatchColor>
                              <SwatchColor className="nex_slate" data-tip="" data-for="slate-grey"></SwatchColor>
                            </FlexDiv>
                            <h3>Size</h3>
                            <p>138mm wide x 23mm thick x 5400mm long</p>
                          </BigProductCardSubCol>
                          <BigProductCardSubCol>
                            <p>Single extrusion solid composite decking board with a realistic wood look, pre-finished and low maintenance.</p>
                            <p>Coarse sanded surface with exposed cellulose fibres and a high level of slip resistance.</p>
                          </BigProductCardSubCol>
                        </FlexDiv>
                      </div>
                    </div>
                  </BigProductCardCont>
                </SwiperSlide>
              </Swiper>

            </SectionContentContainer>
          </CenterAlignSection>
        }

        {/* WWF Section */}
        <CenterAlignSection>
          <SectionContentContainer>
            <WWFSupport>
              <StaticImage
                src="../images/img-icon-wwf.jpeg" alt="WWF"
                objectFit="contain"
              />

              <WWFTextCont style={{ marginLeft: 2 + "rem" }}>
                Futurewood proudly supports the World Wildlife Fund (WWF) to protect the future of the orang-utan and to tackle some of the biggest conservation challenges facing our world today.
              </WWFTextCont>
            </WWFSupport>
          </SectionContentContainer>
        </CenterAlignSection>

        {/* Tools & Resouces Section */}
        <CenterAlignSection style={{ backgroundColor: "#f6f6f6" }}>
          <SectionContentContainer>
            <ToolsResourcesCont>
              <ToolsResourcesCol1>
                <StaticImage src="../images/Tools-Page-Gateway-Card-Icon.png" alt="Tools & Resources" />
                <SectionHeading>Tools &amp; Resources</SectionHeading>
                <SectionSubHeading>Here's everything you need to get started with your next project.</SectionSubHeading>
              </ToolsResourcesCol1>
              <ToolsResourcesCol2>
                <ToolsButton to="/tools-resources?product=decking">
                  <ToolsButtonLabel>DECKING</ToolsButtonLabel>
                  <StaticImage style={{ gridArea: "1/1" }} src="../images/Decking-Tile.jpeg" alt="Decking" />
                </ToolsButton>
                <ToolsButton to="/tools-resources?product=screening">
                  <ToolsButtonLabel>DECORATIVE CLADDING &amp; SCREENING</ToolsButtonLabel>
                  <StaticImage style={{ gridArea: "1/1" }} src="../images/Deco-Tile.jpeg" alt="Screening & Fencing" />
                </ToolsButton>
                <ToolsButton to="/tools-resources?product=cladding">
                  <ToolsButtonLabel>WEATHERPROOF CLADDING</ToolsButtonLabel>
                  <StaticImage style={{ gridArea: "1/1" }} src="../images/Wt-Tile.jpeg" alt="Cladding" />
                </ToolsButton>
              </ToolsResourcesCol2>
            </ToolsResourcesCont>
          </SectionContentContainer>
        </CenterAlignSection>

        {/* Blog section */}
        <CenterAlignSection>
          <SectionContentContainer>
            <SectionHeading>Latest News</SectionHeading>
            <FlexDiv style={{ flexWrap: "wrap" }}>
              {Object.entries(blogPosts).map(([key, value]) => (
                <BlogExcerpt to="/blog" key={key}>
                  <StaticImage src='../images/composite-timber-decking-5-768x512.jpeg' alt={value.heading} />
                  <BlogHeading>{value.heading}</BlogHeading>
                  <BlogCategories>{value.categories.toString()}</BlogCategories>
                  <div>{value.excerpt}</div>
                  <small>{value.date}</small>
                </BlogExcerpt>

              ))}

            </FlexDiv>
            <SecondaryLinkBtn to="/blogs">VIEW ALL</SecondaryLinkBtn>
          </SectionContentContainer>
        </CenterAlignSection>

        {/* React Tooltip markups */}
        <ReactTooltip id="costEffective" place="top" effect="solid" arrowColor="#fff">
          When compared to the total of upfront and ongoing costs of traditional timber
        </ReactTooltip>

        <ReactTooltip id="walnut" place="top" effect="solid" arrowColor="#fff">
          Walnut
        </ReactTooltip>

        <ReactTooltip id="mahogany" place="top" effect="solid" arrowColor="#fff">
          Mahogany
        </ReactTooltip>

        <ReactTooltip id="chocolate" place="top" effect="solid" arrowColor="#fff">
          Chocolate
        </ReactTooltip>

        <ReactTooltip id="weathered-stone" place="top" effect="solid" arrowColor="#fff">
          Wheathered Stone
        </ReactTooltip>

        <ReactTooltip id="slate-grey" place="top" effect="solid" arrowColor="#fff">
          Slate Grey
        </ReactTooltip>

        <ReactTooltip id="desert-oak" place="top" effect="solid" arrowColor="#fff">
          Desert Oak
        </ReactTooltip>

        <ReactTooltip id="rustic-merbau" place="top" effect="solid" arrowColor="#fff">
          Rustic Merbau
        </ReactTooltip>

        <ReactTooltip id="graphite" place="top" effect="solid" arrowColor="#fff">
          Graphite
        </ReactTooltip>

        <ReactTooltip id="basalt" place="top" effect="solid" arrowColor="#fff">
          Basalt
        </ReactTooltip>

        <ReactTooltip id="limestone-grey" place="top" effect="solid" arrowColor="#fff">
          Limestone Grey
        </ReactTooltip>

        <ReactTooltip id="ash-grey" place="top" effect="solid" arrowColor="#fff">
          Ash Grey
        </ReactTooltip>

        <ReactTooltip id="riverstone-grey" place="top" effect="solid" arrowColor="#fff">
          Riverstone Grey
        </ReactTooltip>

      </MainContent>

      <div>
        {size.width}px / {size.height}px
      </div>

      <Footer />


    </React.Fragment>
  )
}

export default IndexPage;
