import swaggerAutogen from "swagger-autogen";
const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./src/controllers/clientEndpoints.ts",
  "./src/controllers/addressEndpoints.ts",
];

const doc = {
  info: {
    title: "Api Rest",
    description: "Description",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  await import("./server");
});
