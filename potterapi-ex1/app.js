$(function() {

    const search = $('#search'); // Bouton de recherche
    const potterApiKey = 'VOTRE_API_KEY';

    search.on('click', function() {
        
        // On prépare la liste des paramètres à envoyer à l'API :

        // On vérifie si les checkbox sont cochées, si oui, valeur = true, sinon valeur = false
        let formData = {
            'key'                  : potterApiKey,
            'deathEater'        : $('[name=deathEater]').is(':checked') ? true : false,
            'dumbledoresArmy'   : $('[name=dumbledoresArmy]').is(':checked') ? true : false,
            'orderOfThePhoenix' : $('[name=orderOfThePhoenix]').is(':checked') ? true : false,
            'ministryOfMagic'   : $('[name=ministryOfMagic]').is(':checked') ? true : false,
            'bloodStatus'       : $('[name=bloodStatus]').val(),
            'house'             : $('[name=house]').val()
            };

        // On vérifie si les select bloodStatus et house ont une valeur,
        // si ce n'est pas le cas on les supprime du tableau de data

        if ( formData.bloodStatus === null ) { 
            delete formData.bloodStatus;
        }

        if (formData.house === null) {
            delete formData.house;
        }

        $.ajax({
            url: 'https://www.potterapi.com/v1/characters',
            type : 'GET',
            data : formData,

            success : function(result) {

                console.log(result);

                // Si on n'a pas de résultats
                if (result.length === 0) {
                    
                    let htmlContent = '<h2>Aucun résultat trouvé.</h2>';

                    $('#results').html(htmlContent);
                }

                // Sinon, s'il y a des résultats...
                else {

                    $('#results').html('');

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