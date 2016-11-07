module.exports = {
    up: function(queryInterface, Sequelize){
        return [
            queryInterface.addColumn(
                'Users',
                'credibility',
                {
                    type: Sequelize.INTEGER,
                    defaultValue: 0,
                }
            ),

            queryInterface.addColumn(
                'Users',
                'role',
                {
                    type: Sequelize.INTEGER,
                    min: 0,
                    max: 10,
                    defaultValue: 0,
                }
            ),

            queryInterface.addColumn(
                'Stories',
                'coverPhoto',
                {
                    type: Sequelize.STRING(255),
                    defaultValue: null,
                }
            ),
        ]
    },

    down: function(queryInterface, Sequelize){

    }
}
