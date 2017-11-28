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
            queryInterface.removeColumn('Universities', 'logoUrl'),
            queryInterface.removeColumn('Universities', 'countryCode'),
            queryInterface.removeColumn('Universities', 'linkUrl'),
            queryInterface.renameColumn('Stories', 'UserId', 'authorId'),
            queryInterface.addColumn('Groups', 'ExchangeId', {
                type: Sequelize.INTEGER(11),
                references: {
                    model: 'Exchange',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            }),
            queryInterface.addColumn('Exchanges', 'month', {
                type: Sequelize.ENUM('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'),

            }),
        ]
    },

    down: function(queryInterface, Sequelize){
        return [

        ]
    }
};
