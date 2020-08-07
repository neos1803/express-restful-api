'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Authors", [{
      username: "Anjay",
      password: "a9596aa",
      salt: "salt",
      email: "mail@com",
      profile: "Profile",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "Anji",
      password: "12345",
      salt: "garan",
      email: "yahoo@com",
      profile: "Prof",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "Anja",
      password: "1111",
      salt: "salty",
      email: "google@com",
      profile: "Pro",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Authors", null, {})
  }
};
