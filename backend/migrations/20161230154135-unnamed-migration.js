'use strict';

module.exports = {
    up: function(queryInterface, Sequelize){
        return [
            queryInterface.dropTable('StudentExchange'),
            queryInterface.dropTable('UserGroup'),
            queryInterface.renameTable('student_exchange', 'StudentExchange'),
            queryInterface.renameTable('chat_group', 'UserGroup'),
            queryInterface.dropTable('Blogs'),
            queryInterface.dropTable('ChatMessages'),
            queryInterface.dropTable('Comments'),
            queryInterface.dropTable('user_event'),
            queryInterface.dropTable('Events'),
            queryInterface.dropTable('Journals'),
            queryInterface.dropTable('Tokens'),

        ]
    },

    down: function(queryInterface, Sequelize){
        return [

        ]
    }
}
