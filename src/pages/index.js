import React from "react";
import FormSection from "./../components/FormSection";
import BuiltWithSection from "./../components/BuiltWithSection";
import FeaturesSection from "./../components/FeaturesSection"

function IndexPage(props) {
  return (
    <>
      <FormSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="StatFinder"
        subtitle="Parse the internet for relevant statistics!"
        buttonText="Try it out!"
        buttonColor="primary"
        inputPlaceholder="Enter a link with http:// format"
        subscribedMessage="🙌🙌🙌🙌🙌🙌🙌"
        image="https://uploads.divjoy.com/undraw-mind_map_cwng.svg"
        imageSuccess="https://uploads.divjoy.com/undraw-mind_map_cwng.svg"
      />
      <BuiltWithSection
        bg="light"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Built with"
        subtitle=""
      />
      <FeaturesSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        image="https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
      />
    </>
  );
}

export default IndexPage;
