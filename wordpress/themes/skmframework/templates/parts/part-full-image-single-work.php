<div  class="template-part full-image-single-work">
    <?php
        if( get_sub_field( 'image' ) ) {
            echo "<img src='".get_sub_field( 'image' )."'>";
        }
    ?>
</div>