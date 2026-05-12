jQuery(document).ready(function($) {

    // dynamic rect
    var dynamicRect = function() {
        $('.dynamic-rectangle').each(function() {
            $(this).height($(this).width() * .66);
        })
    }
    dynamicRect();


    $('iframe').each(function() {
        $(this).wrap('<div class="responsive-iframe"></div>');
    });


    // on done resizing
    var resizeTimer;
    $(window).on('resize', function(e) {

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {

            dynamicRect();

        }, 50);

    });

    $(window).load(function() {
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function(itemElem) {
                    var weight = $(itemElem).find('.weight').text();
                    return parseFloat(weight.replace(/[\(\)]/g, ''));
                }
            }
        });
    })

});