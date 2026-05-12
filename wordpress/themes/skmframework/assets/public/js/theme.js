jQuery(document).ready(function() {
    $ = jQuery;

    jQuery('.parallax').each(function() {
        jQuery(this).paroller({
            factor: '0.2',
            type: 'foreground'
        });
    });

    // back to top
    $('#back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        console.log('clicked');
        return false;
    })

    jQuery(".slides-mobile-pages .button").on('click', function() {
        jQuery(".slides-mobile-pages .button.current").removeClass('current');
        jQuery(this).addClass("current");
        jQuery(".template-part.mobile-pages .slides .slide:eq(" + jQuery(this).index() + ")").click();
    });

    jQuery(".mobile-menu-button, .stub-block").on('click', function() {
        jQuery(".top-header").toggleClass("open");
    });

    jQuery(".menu-tax-work").on('click', function() {
        jQuery(this).closest(".taxonomy-list").toggleClass("open");
        jQuery("a.menu-tax-work").toggleClass("open");
        jQuery(".blog-menu-categories").toggleClass("open");
    });

    jQuery('.slide, .slider .phone').each(function() {
        jQuery(this).swipe({
            swipeRight: function(event, direction) {

                var template_part = jQuery(this).closest(".template-part");
                var buttons = template_part.find(".slides-button");
                var index = template_part.find(".slides-button .button.current").index() + 1;
                var length = template_part.find(".slides-button .button").length;

                if (jQuery(this).hasClass("slide")) {
                    var _index = template_part.find(".slides-button .button.current").index();
                    remove_class_slider(template_part);
                    set_class_slider(template_part, _index);
                }

                if (index > 1 && index <= length) {
                    template_part.find(".slides-button .button.current").prev().click();
                }


                console.log("Вы перелистнули " + direction + " сторону");
            },

            swipeLeft: function(event, direction) {
                var template_part = jQuery(this).closest(".template-part");
                var buttons = template_part.find(".slides-button");
                var index = template_part.find(".slides-button .button.current").index() + 1;
                var length = template_part.find(".slides-button .button").length;

                if (jQuery(this).hasClass("slide")) {
                    var _index = template_part.find(".slides-button .button.current").index();
                    remove_class_slider(template_part);
                    set_class_slider(template_part, _index);
                }

                if (index >= 1 && index < length) {
                    template_part.find(".slides-button .button.current").next().click();
                }


                console.log("Вы перелистнули " + direction + " сторону");
            }
        });
    });

    function remove_class_slider(template_part) {
        template_part.find(".slide.showing").removeClass("showing");
        template_part.find(".slides-button .button.current").removeClass("current");
    }

    function set_class_slider(template_part, index) {
        template_part.find(".slide:eq(" + index + ")").addClass("showing");
        template_part.find(".slides-button .button:eq(" + index + ")").addClass("current");
    }

    jQuery(".slides-button .button").on('click', function(e) {
        var template_part = jQuery(this).closest(".template-part");
        remove_class_slider(template_part);
        set_class_slider(template_part, jQuery(this).index());
    });

    AOS.init({
        duration: 500,
        delay: 500
    });




    jQuery(".close_biography").on('click', function(e) {
        var biography = jQuery(this).closest(".biography").attr("id");
        console.log(biography);
        var width_window = jQuery(document).width();

        if (width_window >= 1200) {
            var row = ".row-3";
        } else {
            var row = ".row-2";
        }

        jQuery(row + " #" + biography).slideUp(400, function() {
            jQuery(row + " #" + biography).removeClass("open");
            jQuery(".person.open").removeClass("open");
        });
    });

    jQuery("a.red_biography, .person .title").on('click', function(e) {

        var width_window = jQuery(document).width();

        var person = jQuery(this).closest(".person");
        var id_biography = "#biography_" + jQuery(this).attr('data-biography-id');

        if (width_window >= 1200) {
            var row = ".row-3";
        } else {
            var row = ".row-2";
        }

        jQuery(row + " .biography.open").slideUp(400, function() {
            jQuery(row + " .biography.open").removeClass("open");
        });

        jQuery(".person.open").removeClass("open");
        jQuery(person).addClass("open");


        if (jQuery(row + " " + id_biography).hasClass("open")) {
            jQuery(row + " " + id_biography).slideUp(400, function() {
                jQuery(row + " " + id_biography).removeClass("open");
                jQuery(person).removeClass("open");
            });
        } else {
            jQuery(row + " " + id_biography).slideDown(400, function() {
                jQuery(row + " " + id_biography).addClass("open");
            });
        }

    });


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

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match(/ium$/);
        }
    };

    // bind filter button click
    $('#filters').on('click', '.button_filter', function() {
        jQuery("#filters li.current").removeClass("current");
        jQuery(this).closest("li").addClass("current");

        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({ filter: filterValue });
    });

    // bind sort button click
    $('#sorts').on('click', '.button_filter', function() {
        var sortByValue = $(this).attr('data-sort-by');
        $grid.isotope({ sortBy: sortByValue });
    });

    // change is-checked class on buttons
    $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', '.button_filter', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    //    setTimeout(change_size_full_image, 1000);
});

function change_size_full_image() {
    $('.template-part.desctop-pages').each(function(i, elem) {
        if (jQuery(this).hasClass("disable-auto-width")) {

            width = jQuery(this).find("img.desktop_full_image").width() + "px";

            if (width != "0px" && width != "nullpx") {
                jQuery(this).find("img.top_panel_full_image").css("width", width);
            }

            var first = jQuery(this).find(".first-block img:nth-of-type(2)").height();
            var second = jQuery(this).find(".second-block img:nth-of-type(2)").height();

            var height = Math.max(first, second);

            console.log(height + " - height");

            jQuery(this).find(".first-block").animate({
                height: height
            });

            jQuery(this).find(".second-block").animate({
                height: height
            });

        }
    });
}

window.onload = function() {
    setTimeout(change_size_full_image, 1000);

    $(window).resize(function() {
        change_size_full_image();

    });
}