import React from "react";
import { Helmet } from "react-helmet";

function Head() {
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <link rel="preconnect" href="http://localhost:5000" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="canonical" href="http://danieleviolo.com/" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <title>Daniele Violo</title>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Helmet>
  );
}

export default Head;
