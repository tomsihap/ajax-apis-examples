$(function() {

    const search = $('#search'); // Bouton de recherche
    const potterApiKey = 'VOTRE_API_KEY';

    // OnClick sur le bouton de recherche :
    search.on('click', function() {

        // On prépare la liste des paramètres à envoyer à l'API :
        let sortingHatData = {
            'key' : potterApiKey,
        };

        // On lance la première requête (maison aléatoire du choixpeau)
        $.ajax({
            url: 'https://www.potterapi.com/v1/sortingHat',
            type : 'GET',
            data: sortingHatData,

            // En cas de succès de la requête :
            success : function(house) {

                /**
                 * On affiche le nom de la maison trouvée
                 */
                $('#results').html('');
                let htmlContent = '<h2>Maison choisie : '+ house +'</h2>';
                $('#results').append(htmlContent);

                /**
                 * On prépare la requête pour trouver tous les personnages de la maison trouvée
                 */
                let charactersData = {
                    'key': potterApiKey,
                    'house': house
                };

                /**
                 * On lance la 2ème requête (liste des characters en fonction de la maison choisie)
                 */
                $.ajax({
                    url: 'https://www.potterapi.com/v1/characters',
                    type: 'GET',
                    data: charactersData,

                    success: function(characters) {

                        // Foreach sur les personnages trouvés :
                        characters.forEach(function (character) {

                            /**
                             * Modèle : bootstrap card
                             *  div.card
                             *      div.card-header => nom du personnage
                             *      div.card-body => liste des caractéristiques
                             */

                            // On crée le card-header
                            let cardHeader = '<div class="card-header">' + character.name + '</div>';

                            // On prépare la liste qui ira dans le card-body
                            let list = '<ul>' +
                                '<li>bloodStatus: ' + character.bloodStatus + '</li>' +
                                '<li>deathEater: ' + character.deathEater + '</li>' +
                                '<li>dumbledoresArmy: ' + character.dumbledoresArmy + '</li>' +
                                '<li>ministryOfMagic: ' + character.ministryOfMagic + '</li>' +
                                '<li>name: ' + character.name + '</li>' +
                                '<li>orderOfThePhoenix: ' + character.orderOfThePhoenix + '</li>' +
                                '<li>species: ' + character.species + '</li>' +
                                '</ul>';

                            // On créée le card-body
                            let cardBody = '<div class="card-body">' + list + '</div>';

                            // On créée le div.card contenant card-header et card-body
                            let htmlContent = '<div class="card mb-2">' + cardHeader + cardBody + '</div>';

                            // On ajoute aux résultats le div.card créé
                            $('#results').append(htmlContent);
                        });
                    }
                });
            }
        });
    });
});