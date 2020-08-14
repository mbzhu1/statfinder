import React, { useState } from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SectionHeader from "./SectionHeader";
import Newsletter from "./Newsletter";
import Image from "react-bootstrap/Image";
import "./FormSection.scss";

function FormSection(props) {
  const [subscribed, setSubscribed] = useState(false);
  const image = props.image;

  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={7} className="text-center text-lg-left">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={2}
              spaced={false}
            />
            <Newsletter
              parentColor={props.color}
              buttonText={props.buttonText}
              inputPlaceholder={props.inputPlaceholder}
              subscribedMessage={props.subscribedMessage}
              onSubscribed={() => setSubscribed(true)}
              size="lg"
            />
          </Col>
          <Col className="offset-lg-1 mt-5 mt-lg-0">
            <figure className="FormSection__image-container mx-auto">
              <Image src={image} fluid={true} />
            </figure>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default FormSection;
