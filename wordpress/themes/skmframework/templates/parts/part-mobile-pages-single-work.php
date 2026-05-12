<?php
 $rand_id = rand(1, 1000);
?>

<div class="template-part mobile-pages"  id='slides-<?php echo $rand_id; ?>'>
    <?php
        if( !empty( get_sub_field( 'images' ) ) ) {
            $width = (count( get_sub_field( 'images' ) ) * 265 ) + ( count( get_sub_field( 'images' ) ) - 1 ) * 75;
            $transform = (int)( count( get_sub_field( 'images' ) ) / 2 ) * ( 265 + 55 );
            
            echo "<div class='slider'><div class='phone'></div>"
            . "<div class='slides navigation' style='width: ".$width."px; transform: translate3d(-".$transform."px, 0px, 0px);'>";
            foreach ( get_sub_field( 'images' ) as $key => $image ) {
                $imgUrl = wp_get_attachment_image_src( $image['image'], 'full' )[0];
                if( $imgUrl ) {
                    echo "<div class='slide dot'><img src='".$imgUrl."'></div>";
                }
            }
            
            echo "</div>"
            . "</div>";
        }
    ?>
    
    <div class='slides-button slides-mobile-pages'>
        <?php
            for( $i = 1; $i <= count( get_sub_field( 'images' ) ); $i++ ) {
                echo "<span class='button ".( ( $i == (int)( count( get_sub_field( 'images' ) ) / 2 ) + 1 ) ? "current" : "" )."'></span>";
            }
        ?>
    </div>
    
    <script>
        jQuery(document).ready(function() {

            var slides = jQuery(".slider .slides").children(".slide");
            var width = 265 + 55;
            var i = slides.length;
            var offset = i * width;
            var cheki = i-1;

            jQuery(".slider .slides").css('width',offset);

            for (j=0; j < slides.length; j++) {
                    if (j==0) {
                            jQuery(".slider .navigation").append("<div class='dot active'></div>");
                    }
                    else {
                            jQuery(".slider .navigation").append("<div class='dot'></div>");
                    }
            }

            var dots = jQuery(".slider .navigation").children(".dot");
            offset = 0;
            i = 0;

            jQuery('.slider .navigation .dot').click(function(){
                    jQuery(".slider .navigation .active").removeClass("active");								  
                    jQuery(this).addClass("active");
                    i = jQuery(this).index();
                    offset = i * width;
                    jQuery(".slider .slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)");
            });
//
//
//            jQuery("body .slider .next").click(function(){
//                    if (offset < width * cheki) {
//                            offset += width;
//                            jQuery(".slider .slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)");
//                            jQuery(".slider .navigation .active").removeClass("active");	
//                            jQuery(dots[++i]).addClass("active");
//                    }
//            });
//
//
//            jQuery("body .slider .prev").click(function(){
//                    if (offset > 0) {
//                            offset -= width;
//                            jQuery(".slider .slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)");
//                            jQuery(".slider .navigation .active").removeClass("active");	
//                            jQuery(dots[--i]).addClass("active");
//                    }
//            });

    });
    </script>
        
</div>

<script>
    var timerId = setInterval(function() {
        var current_button = jQuery( "#slides-"+<?php echo $rand_id; ?>+" .button.current" );
        
        if( jQuery( current_button ).next('.button').length == 0 ) {
            jQuery( "#slides-"+<?php echo $rand_id; ?>+" .slides-button > .button:first-child" ).click();
        } else {
            jQuery( current_button ).next().click();
        }
      }, 3000);
</script>