import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "QuoteHub API",
      version: "1.0.0",
      description: "API pour gérer et consommer des citations",
    },
    servers: [
      {
        url: "https://testmobileapi.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
