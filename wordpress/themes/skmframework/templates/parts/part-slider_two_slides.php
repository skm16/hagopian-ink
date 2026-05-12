<div class="template-part slider-two-slides">
    <?php
    echo "<div class='owl-carousel owl-theme'>";
        foreach ( get_sub_field( 'images' ) as $key => $value ) {
            echo "<img src='".$value['url']."' class='item'>";
        }
    echo "</div>";
    ?>
</div>

<script>
    jQuery('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        autoplay: true,
        autoplayTimeout: 3000,
        
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            }
        }
    })
</script>