<div  class="template-part gallery">
    <?php
        if( get_sub_field( 'images' ) ) {
            foreach ( get_sub_field( 'images' ) as $key => $img ) {
                echo "<div class='img' style=' background-image: url(".$img['url']."); '></div>";
            }
        }
    ?>
</div>