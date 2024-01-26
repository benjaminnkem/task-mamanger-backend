export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Task Manager API with Swagger",
            version: "0.1.0",
            // description: "This is a simple CRUD API application made with Express and documented with Swagger",
            // license: {
            //   name: "MIT",
            //   url: "https://spdx.org/licenses/MIT.html",
            // },
            // contact: {
            //   name: "Benjamin Nken",
            //   url: "https://benjaminnkem.vercel.app",
            //   email: "benjaminnkemfrancis@gmail.com",
            // },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};
