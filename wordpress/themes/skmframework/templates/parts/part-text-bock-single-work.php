<div  class="template-part text-block-single-work  text-block <?php if( get_sub_field( 'background_color' ) == "linear-gradient-dribbble" ) { echo get_sub_field( 'background_color' ); } ?> ">
    <div class="container">
        <?php
            if( !empty( get_sub_field( 'name' ) ) ) {
                echo "<div class='part-name text-center'>".get_sub_field( 'name' )."</div>";
            }
            
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
            
            if( !empty( get_sub_field( 'description' ) ) ) {
                echo "<div class='description text-center' style='width: ".get_sub_field( 'width' )."%;'>".get_sub_field( 'description' )."</div>";
            }
        ?>
    </div>
</div>