import React from "react";
import Section from "./Section";
import Container from "react-bootstrap/Container";
import SectionHeader from "./SectionHeader";
import Clients from "./Clients";
import react_logo from "./../images/react-logo.png";
import flask_logo from "./../images/flask-logo.png";
import heroku_logo from "./../images/heroku-logo.png";
import python_logo from "./../images/python-logo.png";


function BuiltWithSection(props) {
  return (
    <Section
      bg={props.bg}
      textColor={props.textColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container className="text-center">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={2}
          spaced={true}
        />
        <Clients
          items={[
            {
              name: "Python",
              image: python_logo,
              width: "190px",
            },
            {
              name: "React",
              image: react_logo,
              width: "170px",
            },
            {
              name: "Flask",
              image: flask_logo,
              width: "140px",
            },
            {
              name: "Heroku",
              image: heroku_logo,
              width: "150px",
            },
          ]}
        />
      </Container>
    </Section>
  );
}

export default BuiltWithSection;
