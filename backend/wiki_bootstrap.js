var app = require('./app');
var models = require('./models');

models.sequelize.Promise.all([
    models.Country.findAll({
        attributes: ['alpha2Code', 'name']
    }),

    models.University.findAll({
        attributes: ['id', 'name']
    })
]).spread(function(countries, universities){
    models.sequelize.Promise.all([
        countries.map((country) => (
            models.Wiki.create({
                title: country.name,
                CountryAlpha2Code: country.alpha2Code,
            })
        )),

        universities.map((university) => (
            models.Wiki.create({
                title: university.name,
                UniversityId: university.id,
            })
        ))
    ])
})
