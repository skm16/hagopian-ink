<div  class="template-part text-block <?php if( get_sub_field( 'background_color' ) == "linear-gradient-dribbble" ) { echo get_sub_field( 'background_color' ); } ?> ">
    <div class="container">
        <?php
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
            
            if( !empty( get_sub_field( 'description' ) ) ) {
                echo "<div class='description' style='width: ".get_sub_field( 'width' )."%;'>".get_sub_field( 'description' )."</div>";
            }
            
            
            if( !empty( get_sub_field( 'link' ) ) ) {
                $link = get_sub_field( 'link' );
                echo "<div class='text-center'><a href='".$link['url']."' ".( ( !empty( $link['target'] ) ) ? ' target="_blank" ' : '' )." class='link'>".$link['title']."</a></div>";
            }
            
        ?>
    </div>
</div>