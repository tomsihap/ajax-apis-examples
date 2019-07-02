$(function() {

    const search = $('#search'); // Input de recherche
    const potterApiKey = 'VOTRE_API_KEY';


    /**
     * On rend cliquable les noms dans les badges, pour remplir l'input automatiquement
     */

    // 1. OnClick sur n'importe quel badge ".badge-secondary"
    $('.badge-secondary').on('click', function () {

        // On prend le contenu du HTML du badge (le nom du personnage)
        let badgeHtmlContent = $(this).html();

        // On change la value de l'input search par le HTML du badge (le nom du personnage)
        search.val( badgeHtmlContent );

        // Enfin, on focus sur l'input une fois sa value remplie
        search.focus();
    });

    /**
     * Recherche :
     * On écoute l'input ou bien le focus sur le champ input pour lancer la recherche
     */
    search.on('input focus', function() {
        
        // On prépare la liste des paramètres à envoyer à l'API :
        let formData = {
            'key'   : potterApiKey,
            'name'  : $(this).val()
        };

        // On lance la requête à /characters
        $.ajax({
            url: 'https://www.potterapi.com/v1/characters',
            type : 'GET',
            data : formData,

            // En cas de succès de la requête :
            success : function(result) {

                console.log(result);

                // Soit on n'a pas de résultats et on l'affiche dans le html :
                if (result.length === 0) {
                    
                    let htmlContent = '<h2>Aucun résultat trouvé.</h2>';

                    $('#results').html(htmlContent);
                }

                // Soit il y a des résultats :
                else {

                    // On vide la div contenant les résulats
                    $('#results').html('');


                    // Pour chaque résultat trouvé, on l'affiche :
                    result.forEach(function(character) {

                        /**
                         * Modèle : bootstrap card
                         *  div.card
                         *      div.card-header => nom du personnage
                         *      div.card-body => liste des caractéristiques
                         */

                        // On crée le card-header
                        let cardHeader = '<div class="card-header">'+character.name+'</div>';

                        // On prépare la liste qui ira dans le card-body
                        let list = '<ul>'+
                        '<li>bloodStatus: '+character.bloodStatus+'</li>'+
                        '<li>deathEater: '+character.deathEater+'</li>'+
                        '<li>dumbledoresArmy: '+character.dumbledoresArmy+'</li>'+
                        '<li>ministryOfMagic: '+character.ministryOfMagic+'</li>'+
                        '<li>name: '+character.name+'</li>'+
                        '<li>orderOfThePhoenix: '+character.orderOfThePhoenix+'</li>'+
                        '<li>species: '+character.species+'</li>'+
                        '</ul>';

                        // On créée le card-body
                        let cardBody = '<div class="card-body">'+list+'</div>';

                        // On créée le div.card contenant card-header et card-body
                        let htmlContent = '<div class="card mb-2">'+cardHeader+cardBody+'</div>';

                        // On ajoute aux résultats le div.card créé
                        $('#results').append(htmlContent);
                    });
                }

            }
        });
    });
});