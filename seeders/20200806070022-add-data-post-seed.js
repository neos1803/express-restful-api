'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [{
      title: "Judul",
      content: "Ini konten",
      tags: "tags, tags",
      status: "ini status",
      author_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Judul?",
      content: "Ini konten?",
      tags: "tag, tag",
      status: "ini status?",
      author_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: "Judul!!",
      content: "Ini konten!!!",
      tags: "tag, tag",
      status: "ini status!!!",
      author_id: 2,
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
    return queryInterface.bulkDelete("Posts", null, {})
  }
};
