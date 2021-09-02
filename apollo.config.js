// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'Api Gateway',
      localSchemaFile: './src/graphql/schema.graphql',
      // URL to the GraphQL API
      url: 'https://apigateway-dw5.herokuapp.com/',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}