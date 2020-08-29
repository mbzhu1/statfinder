import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import FormField from "./FormField";
import Button from "react-bootstrap/Button";
import newsletter from "./../util/newsletter.js";
import { useForm } from "react-hook-form";

function Newsletter(props) {
  const [subscribed, setSubscribed] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [submitMessage, setSubmitMessage] = useState(<p>Please wait while we process your request, this may take a few moments on the first run because the server may need to wake up.</p>)
  const onSubmit = ({ email }) => {
    setSubscribed(true);
    // Parent component can optionally
    // find out when subscribed.
    props.onSubscribed && props.onSubscribed();
    // Subscribe them
    console.log("calling newsletter.subscribe")
    newsletter.subscribe({ url: email })
    .then(data => {
      console.log("calling setSubmitMessage");
      console.log(data)
      const newMessage = (
        <div>
          {data.map(sentence => {
            return <p>{sentence}</p>
          })}
        </div>
      )
      setSubmitMessage(newMessage);
    });
    //setTimeout(() => setSubmitMessage("yay"), 2000);
  };

  return (
    <>
      {subscribed === false && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Col>
              <FormField
                size={props.size}
                name="email"
                placeholder="Enter a URL"
                error={errors.email}
                inputRef={register({
                  required: "Please enter an URL",
                })}
              />
            </Col>
            <Col xs="auto">
              <Button
                variant={props.buttonColor}
                size={props.size}
                type="submit"
              >
                {props.buttonText}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      )}

      {subscribed === true && <div>{submitMessage}</div>}
      {subscribed === true && (
        <Button
          variant={props.buttonColor}
          size={props.size}
          onClick={() => setSubscribed(false)}
        >
          Reset
        </Button>
      )}
    </>
  );
}

export default Newsletter;
