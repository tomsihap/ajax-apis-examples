$(function() {

    const search = $('#search');
    const omdbApiKey = 'cce37f33';

    search.on('input', function() {
        console.log( $(this).val() );
        
        $.ajax({
            url: 'https://www.potterapi.com/v1/characters',
            type : 'GET',
            data : {
                'key': '$2a$10$jMie0nS8.31bNv6YbKZuJ.IK2mzF0K5vG5tJmsULzEHVNgYTRyHYG',
            },

            success : function(result) {

                console.log(result);

            }
        });
    });
});