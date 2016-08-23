


$(function () {
    var $trips = $('#trips');
    var $name = $('#name');
    var $trip = $('#trip');

    var tripTemplate = $('#trip-template').html();
    function addtrip(trip) {
        $trips.append(Mustache.render(tripTemplate, trip));
    }
    $.ajax({
        type: 'Get',
        url: 'http://127.0.0.1:8000/trips/',
        success: function (trips) {
            $.each(trips, function (i, trip) {
                addtrip(trip);
            });
        },
        error: function () {
            alert('error at loading trips');
        }
    });

    $('#add-trip').on('click', function () {
       var trip = {
            name: $name.val(),
            trip: $trip.val()
       };

       $.ajax({
           type: 'POST',
           url: 'http://127.0.0.1:8000/trips/',
           data: trip,
           success: function (newtrip) {
                addtrip(newtrip);
           },

           error: function () {
               alert('error at adding post');
           }
       })
    });

    $trips.delegate('.remove', 'click', function () {
        // get the parent 'li' element
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'http://127.0.0.1:8000/trips/'+ $(this).attr('data-id'),
            success: function () {
                $li.fadeOut(300, function(){
                    $(this).remove();
                });
            },

            error: function () {
                alert('error at delete');
            }
        })
    });
    
    $trips.delegate('.editTrip', 'click', function () {
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html());
        $li.find('input.trip').val($li.find('span.trip').html());
        $li.addClass('edit');
    });

    $trips.delegate('.cancelEdit', 'click', function () {
        $(this).closest('li').removeClass('edit');
    });

    $trips.delegate('.saveTrip', 'click', function () {
        var $li = $(this).closest('li');
        var trip = {
            name: $li.find('input.name').val(),
            trip: $li.find('input.trip').val()
        };

        $.ajax({
            type: 'PUT',
            url: 'http://127.0.0.1:8000/trips/' + $li.attr('data-id') + '/',
            data: trip,
            success: function () {
                $li.find('span.name').html(trip.name);
                $li.find('span.trip').html(trip.trip);
                $li.removeClass('edit');
            },

            error: function (e) {
                alert('error saving trip');
            }
        })
    })
});
