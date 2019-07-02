$(function () {

    const search = $('#search'); // Input de recherche
    const omdbApiKey = 'VOTRE_API_KEY';

    // On lance la recherche lorsque l'input change
    search.on('input', function () {
        console.log($(this).val());

        // Si la recherche fait au moins 3 caractères, on lance la requête Ajax :
        if (search.val().length >= 3) {

            $.ajax({
                url: 'http://www.omdbapi.com/', // URL de la requête
                type: 'GET', // Méthode HTTP
                data: { // Données à transmettre (en GET, POST... En fonction du type ci-dessus)
                    'apikey': omdbApiKey,
                    's': $(this).val() // La valeur de l'input de recherche
                },

                // En cas de succès de la requête
                success: function (result) {

                    // On vide la div contenant les résultats
                    $('#results').html('');

                    // Si on a des résultats
                    if (result.Search && result.Search.length > 0) {

                        // Pour chaque résultat trouvé :
                        // l'équivalent en PHP serait : foreach ($result['Search'] as $movie) {}
                        result.Search.forEach(function (movie) {

                            console.log(movie);

                            // On créée la div.card contenant le résultat
                            let movieHtml = '<div class="card mt-2">' +
                                '<div class="card-header">' + movie.Title + '</div>' +
                                '<div class="card-body"><img src="' + movie.Poster + '" height="100"></div>' +
                                '</div>';

                            // On ajoute le html créé à la div des résultats
                            $('#results').append(movieHtml);
                        });
                    }

                    // Si on n'a pas de résultats
                    else {

                        // On créée la div.card contenant le résultat
                        let noResultsHtml = '<h2>Aucun résultat trouvé.</h2>';

                        // On ajoute le html créé à la div des résultats
                        $('#results').append(noResultsHtml);

                    }
                }
            });
        }

    });
});