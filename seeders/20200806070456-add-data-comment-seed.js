'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [{
      content: "Ini komentar",
      status: "ini status komentar",
      author_id: 1,
      email: "mail@com",
      url: "mmm.co.id",
      post_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: "Ini komentar?",
      status: "ini status komentar?",
      author_id: 1,
      email: "ya@com",
      url: "aaa.co.id",
      post_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      content: "Ini komentar!!",
      status: "ini status komentar!!",
      author_id: 2,
      email: "xx@com",
      url: "sss.co.id",
      post_id: 3,
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
    return queryInterface.bulkDelete("Comments", null, {})
  }
};
