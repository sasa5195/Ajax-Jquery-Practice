$(function(){
    //GET/READ
    $('#get-button').on('click', function(){
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                var tblBody = $('tbody');
                tblBody.html('');
                var innerHtml = '';
                response.products.forEach(function(product){
                    innerHtml += '<tr>\
                        <td class="id">'+ product.id+'</td>\
                        <td><input type="text" class="name" value="'+ product.name +'"></td>\
                        <td>\
                            <button id="update-button">UPDATE PRODUCT</button>\
                            <button id="delete-button">DELETE PRODUCT</button>\
                        </td>\
                    </tr>';
                })
                tblBody.html(innerHtml);
            }
        });
    });

    //CREATE/POST
    $('#create-product').on('submit', function(event){
        event.preventDefault();
        var newProductName = $('#new-product').val();
        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: newProductName}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    //PUT/UPDATE
    $('table').on('click', '#update-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            data: JSON.stringify({newName : newName}),
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    //DELETE/REMOVE
    $('table').on('click', '#delete-button', function(){
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });


});