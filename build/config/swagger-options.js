export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Task Manager API with Swagger",
            version: "0.1.0",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
