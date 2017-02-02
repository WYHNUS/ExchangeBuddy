var app = require('../app');
var models = require('../models');

exports.bootstrap = function() {
    models.sequelize.Promise.all([
        models.Country.findAll({
            attributes: ['alpha2Code', 'name']
        }),

        models.University.findAll({
            attributes: ['id', 'name', 'logoImageUrl']
        })
    ]).spread(function (countries, universities) {
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
                    image: university.logoImageUrl,
                })
            ))
        ]).spread(function (countryWikis, universityWikis) {
            var uniCats = {
                'About': "<div>\
                <h3 style='color:red'>Contribute, get credited and help other students!</h3> <br>\
                <p>Some Tips to write this wiki: </p><br>\
                <ul> \
                    <li> Includes senior reviews</li>\
                    <li>How to buy cheap flights etc</li>\
                    <li> Important phone numbers at host university</li>\
                    <li> How to get help</li>\
                    <li> Telecommunication</li>\
                </ul>\
            </div>",
                'Academics': "<div>\
                <h3 style='color:red'>Contribute, get credited and help other students!</h3> <br>\
                <p>Some Tips to write this wiki: </p><br>\
                <ul> \
                    <li>Language of Instructions</li>\
                    <li>Academic study term</li>\
                    <li>Academic Rigor (Modules)</li>\
                    <li>Scholarships</li>\
                </ul>\
            </div>",
                'Campus Life': "<div>\
                <h3 style='color:red'>Contribute, get credited and help other students!</h3> <br>\
                <p>Some Tips to write this wiki: </p><br>\
                <ul> \
                    <li>Orientation Activities</li>\
                    <li>Clubs and Societies</li>\
                    <li>University Evenets</li>\
                    <li>Sports Facilities</li>\
                    <li>Buying Daily Necessities</li>\
                    <li>Banking Facilities</li>\
                    <li>Healthcare (Hospitals, Pharmacies)</li>\
                    <li>Post Offices</li>\
                    <li>Internet(WiFi, Ethernet)</li>\
                </ul>\
            </div>",
                'Activities Near School': "<div>\
                <h3 style='color:red'>Contribute, get credited and help other students!</h3> <br>\
                <p>Some Tips to write this wiki: </p><br>\
                <ul> \
                    <li>Places of Interest</li>\
                    <li>Shopping Malls</li>\
                    <li>Food</li>\
                </ul>\
            </div>",
                'Student Perks': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
                'Getting There': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
            };

            var countryCats = {
                'Culture': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
                'Holidays': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
                'Attractions': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
                'Local Food': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
                'Travel': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
                'Telecom': '<h3 style="color:red">Contribute, get credited and help other students!</h3>',
            };

            universityWikis.map((wiki) => {
                var uniKeys = Object.keys(uniCats);
                for (var i = 0; i < uniKeys.length; i++) {
                    models.WikiSectionVersion.create({
                        title: uniKeys[i],
                        content: uniCats[uniKeys[i]],
                        versionNumber: 1,
                        WikiSection: {
                            sectionIndex: i + 1,
                            displayVersionNumber: 1,
                            totalVersionCount: 1,
                            sectionType: "OpenToEdit"
                        }
                    }, {
                        include: [models.WikiSection]
                    }).then(function (wikiSectionVersion) {
                        wiki.then(function (w) {
                            w.addWikiSection(wikiSectionVersion.WikiSection);
                        })
                    })
                }
            });

            countryWikis.map((wiki) => {
                var countryKeys = Object.keys(countryCats);
                for (var i = 0; i < countryKeys.length; i++) {
                    models.WikiSectionVersion.create({
                        title: countryKeys[i],
                        content: countryCats[countryKeys[i]],
                        versionNumber: 1,
                        WikiSection: {
                            sectionIndex: i + 1,
                            displayVersionNumber: 1,
                            totalVersionCount: 1,
                            sectionType: "OpenToEdit"
                        }
                    }, {
                        include: [models.WikiSection]
                    }).then(function (wikiSectionVersion) {
                        wiki.then(function (w) {
                            w.addWikiSection(wikiSectionVersion.WikiSection);
                        })
                    })
                }
            })
        })
    });
};
