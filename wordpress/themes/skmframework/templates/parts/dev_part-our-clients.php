<div class="template-part our-clients <?php echo ( get_sub_field( "slider" ) == "yes" ) ? "slider-active" : "slider-not-active"; ?>">
    <div class='container'>
        <?php
            if( get_sub_field( "title" ) ) {
                echo '<div class="part-title">'.get_sub_field( "title" ).'</div>';
            }
        ?>
        <div class='slider bxslider'>
            <?php
                if( get_sub_field( "client" ) ) {
                    foreach ( get_sub_field( "client" ) as $key => $client ) {
                        echo "<div class='slide'>";
                        echo "<img src='".$client['image']."'>";
                        
                        if( $client['link'] && $client['link']['title'] ) { ?>
                            <div class='link'>
                                <?php
                                    echo "<a href='".$client['link']['url']."' ".( ( !empty( $client['link']['target'] ) ) ? ' target="_blank" ' : '' )." class='link'>".$client['link']['title']."</a>";
                                ?>
                            </div>
                        <?php }
                        
                        echo "</div>";
                    }
                }
            ?>
        </div>
    </div>
</div>
 <?php 
    if( get_sub_field( "slider" ) == "yes" ) { 
?>
    <script>
        var slider;
        jQuery(function(){
          slider = jQuery('.bxslider').bxSlider({
                captions: true,
                slideWidth: 215,
                minSlides: 6
            });
        });
        
        window.onresize = function(event) {
            if( window.innerWidth < 800 ) {
                slider.reloadSlider({
                    captions: true,
                    slideWidth: 215,
                    minSlides: 3
                });
            } else {
                slider.reloadSlider({
                    captions: true,
                    slideWidth: 215,
                    minSlides: 6
                });
                
            }
        };
        
    </script>
<?php
    }
?>