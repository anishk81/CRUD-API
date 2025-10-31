import swaggerJsdoc from "swagger-jsdoc";

const baseUrl =
  process.env.API_BASE_URL ||
  `http://localhost:${process.env.PORT ? Number(process.env.PORT) : 8000}`;

const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Order Service API",
    version: "1.0.0",
    description:
      "REST endpoints for creating and managing orders in the Order Service.",
  },
  servers: [
    {
      url: baseUrl,
      description: "Local development server",
    },
  ],
  components: {
    schemas: {
      Order: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Sample order",
          },
          description: {
            type: "string",
            example: "An example order generated through the API.",
          },
          category: {
            type: "string",
            example: "electronics",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      OrderInput: {
        type: "object",
        required: ["name", "description", "category"],
        properties: {
          name: {
            type: "string",
            example: "Wireless Mouse",
          },
          description: {
            type: "string",
            example: "Logitech MX Master 3S",
          },
          category: {
            type: "string",
            example: "electronics",
          },
        },
      },
    },
  },
  paths: {
    "/api/v1/orders": {
      get: {
        tags: ["Orders"],
        summary: "Fetch all orders",
        responses: {
          "200": {
            description: "List of orders returned successfully.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    orders: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Order" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Orders"],
        summary: "Create a new order",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderInput",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Order created successfully.",
          },
          "400": {
            description: "Missing or invalid fields.",
          },
        },
      },
    },
    "/api/v1/orders/{orderID}": {
      put: {
        tags: ["Orders"],
        summary: "Update an existing order",
        parameters: [
          {
            name: "orderID",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  OrderID: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order updated successfully.",
          },
          "404": {
            description: "Order not found.",
          },
        },
      },
      delete: {
        tags: ["Orders"],
        summary: "Delete an order",
        parameters: [
          {
            name: "orderID",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  OrderID: {
                    type: "integer",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Order deleted successfully.",
          },
          "404": {
            description: "Order not found.",
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
