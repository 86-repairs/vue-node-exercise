const { ApolloServer, gql } = require('apollo-server');
const Equipment = require("../equipmentData");

const typeDefs = gql`
  type Photo {
    full_size_url: String!
    thumbnail_url: String!
  }

  type Equipment {
    active: Boolean!
    description: String
    manufacturer: String
    model_number: String!
    serial_number: String!
    equipment_type: String
    equipment_photos: [Photo]
  }

  input EquipmentSearch {
    manufacturer: String
  }

  input EquipmentInput {
    search: EquipmentSearch
  }

  type Query {
    status: String!
    equipment(input: EquipmentInput): [Equipment!]!
  }
`;

const resolvers = {
  Query: {
    status: () => 'All good!',
    equipment: (_parent, { input }) => {
      const { search } = input || {};
      const  { manufacturer } = search || {};
      if (!manufacturer) {
        return Equipment;
      }
      return Equipment.filter(equip => equip.manufacturer === manufacturer);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
