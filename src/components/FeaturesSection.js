import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Features from "./Features";
import "./FeaturesSection.scss";

function FeaturesSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container id="features">
        <Row className="align-items-center">
          <Col lg={6} className="text-center text-lg-left">
            <figure className="FeaturesSection__image-container mx-auto">
              <Image src={props.image} fluid={true} />
            </figure>
          </Col>
          <Col className="offset-lg-1 mt-5 mt-lg-0 ">
            <Features
              items={[
                {
                  title: "Filter out the noise",
                  description:
                    "StatFinder parses webpages on the internet for sentences that contain numbers (aka relevant statistics). ",
                  iconClass: "fas fa-search",
                  iconColor: "primary",
                },
                {
                  title: "Find what's most important",
                  description:
                    "StatFinder then calculates a term frequency inverse document frequency (tfidf) for each statistic in order to rank them by relevance.",
                  iconClass: "fas fa-sort-amount-down",
                  iconColor: "danger",
                },
                {
                  title: "Try it out in the terminal!",
                  description:
                    "Use curl to make a post request to https://statfinder.herokuapp.com/parse with the URL you want to parse through.",
                  iconClass: "fas fa-terminal",
                  iconColor: "dark",
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default FeaturesSection;
