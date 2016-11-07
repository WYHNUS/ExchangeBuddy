var app = require('../app');
var models = require('../models');

models.sequelize.Promise.all([
    models.Country.findAll({
        attributes: ['alpha2Code', 'name']
    }),

    models.University.findAll({
        attributes: ['id', 'name', 'logoUrl']
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
                image: university.logoUrl,
            })
        ))
    ]).spread(function(countryWikis, universityWikis){
        var uniCats = {
            'General Tips'
            : "1. Includes senior reviews\n2. How to buy cheap flights etc\n3. Important phone numbers at host university\n4. How to get help\n 5. Telecommunication",
            'Visa' : "Details of visa",
            'Safety Tips': "Emergency Contact",
            "Pre-departure Checklist": "Essential documents\n packing list",
            'Expenses': '1. School fees\n 2. On-campus accommodation\n 3. Transport\n 4. Living Cost\n 5. Rough Budget\n 6. Common goods price (beers, milk, McDonald\'s etc)',
            'Getting Around': "1. Trains\n 2. Buses\n 3. Taxis\n 4. Flight",
            'Academic': '1. Language of Instructions\n 2. Academic study term\n 3. Academic Rigor (Modules)\n 4. Scholarships',
            'Campus Life': '1. Orientation Activities\n 2. Clubs and Societies\n 3. University Evenets\n 4. Healthcare (Hospitals, Pharmacies)\n 5. Sports Facilities\n 6. Buying Daily Necessities\n 7. Banking Facilities\n 8. Post Offices\n 9. Internet(WiFi, Ethernet)',
            'Night Life': 'Contribute, get credited and help other students!',
            'Student Perks': 'Contribute, get credited and help other students!',
            'Activities Outside School': "1. Places of Interest\n 2. Shopping Malls\n 3. Food",
            'Work Part-time': 'Contribute, get credited and help other students!',
            'Others': 'Contribute, get credited and help other students!',
        };

        var countryCats = {
            'Culture': 'Contribute, get credited and help other students!',
            'Holidays': 'Contribute, get credited and help other students!',
            'Language': 'Contribute, get credited and help other students!',
            'Attractions': 'Contribute, get credited and help other students!',
            'Local Food': 'Contribute, get credited and help other students!',
            'Travel': 'Contribute, get credited and help other students!',
            'Visa': 'Contribute, get credited and help other students!',
            'Telecom': 'Contribute, get credited and help other students!',
            "Others": 'Contribute, get credited and help other students!',
        }

        universityWikis.map((wiki) => {
            var uniKeys = Object.keys(uniCats);
            for(var i = 0; i < uniKeys.length; i++){
                models.WikiSectionVersion.create({
                    title: uniKeys[i],
                    content: uniCats[uniKeys[i]],
                    versionNumber: 1,
                    WikiSection: {
                        sectionIndex: i+1,
                        displayVersionNumber: 1,
                        totalVersionCount: 1,
                        sectionType: "OpenToEdit"
                    }
                },{
                    include: [models.WikiSection]
                }).then(function(wikiSectionVersion){
                    wiki.then(function(w){
                        w.addWikiSection(wikiSectionVersion.WikiSection);
                    })
                })
            }
        })

        countryWikis.map((wiki) => {
            var countryKeys = Object.keys(countryCats);
            for(var i = 0; i < countryKeys.length; i++){
                models.WikiSectionVersion.create({
                    title: countryKeys[i],
                    content: countryCats[countryKeys[i]],
                    versionNumber: 1,
                    WikiSection: {
                        sectionIndex: i+1,
                        displayVersionNumber: 1,
                        totalVersionCount: 1,
                        sectionType: "OpenToEdit"
                    }
                },{
                    include: [models.WikiSection]
                }).then(function(wikiSectionVersion){
                    wiki.then(function(w){
                        w.addWikiSection(wikiSectionVersion.WikiSection);
                    })
                })
            }
        })
    })
})
