function getCategories(topic) {

    if (topic == "sports") {
        return ["Basketball",
            "Biciklizam",
            "Bilijar",
            "Boks",
            "Borilački sportovi",
            "Boxing",
            "Cycling",
            "Džudo",
            "Fudbal",
            "Golf",
            "Hand-ball",
            "Hokej na ledu",
            "Hrvanje",
            "Ice-hockey",
            "Jahanje",
            "Judo",
            "Karate",
            "Kick-boxing",
            "Košarka",
            "Marathon",
            "Maraton",
            "Martial arts",
            "Motorne utrke",
            "Odbojka",
            "Rugby",
            "Rukomet",
            "Sailing",
            "Soccer",
            "Sport",
            "Sports climbing",
            "Swimming",
            "Tenis",
            "Vaterpolo",
            "Volley-ball",
            "Water-ball",
            "Wrestling"
        ]
    } else if (topic == "series") {
        return [
            "Série",
            "Series",
            "TV-serije",
            "Tv-serijali",
            "Tv-serije"
        ]
    } else if (topic == "movies") {
        return [
            "Film",
            "Kino-film",
            "Movie",
            "Televizijski film",
        ]
    }

    return []
}

module.exports = {
    getCategories
}