import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM API",
      version: "1.0.0",
      description: " CRM sistemi için RESTful API dökümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local API Sunucusu",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/docs/*.yaml"],
};

export const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi };
