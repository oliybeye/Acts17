const { printSchema } = require('graphql');

module.exports = {
    plugin: (schema, documents, config) => {
        return {
            prepend: ['import { gql } from "apollo-server";'],
            content:[
            'const TypeDefs = gql`',
            printSchema(schema),
            '`;',
            '',
            'export default TypeDefs;'
        ].join('\n')};
    },
};