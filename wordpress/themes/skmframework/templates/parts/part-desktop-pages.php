<div class="template-part desctop-pages <?php echo ( get_sub_field( 'automatic_alignment' ) == 'no' )? " disable-auto-width" : ""; ?>">
    <div class='container'>
        <div class='row width-90'>
            <?php
                if( !empty( get_sub_field( 'full_width' ) ) ) {
                    echo "<div class='col-xs-12 col-sm-12'>";
                        echo "<img src='".get_stylesheet_directory_uri()."/assets/public/img/".get_sub_field( 'nav_bar' ).".png' class='top_panel_full_image'>";
                        echo "<img src='".get_sub_field( 'full_width' )."' class='desktop_full_image'>";
                    echo "</div>";
                }
                
                if( !empty( get_sub_field( 'first_page' ) ) ) {
                    echo "<div class='col-xs-12 col-sm-6 first-block'>";
                        echo "<img src='".get_stylesheet_directory_uri()."/assets/public/img/".get_sub_field( 'nav_bar' ).".png'>";
                        echo "<img src='".get_sub_field( 'first_page' )."'>";
                    echo "</div>";
                }
                
                if( !empty( get_sub_field( 'second_page' ) ) ) {
                    echo "<div class='col-xs-12 col-sm-6 second-block'>";
                        echo "<img src='".get_stylesheet_directory_uri()."/assets/public/img/".get_sub_field( 'nav_bar' ).".png'>";
                        echo "<img src='".get_sub_field( 'second_page' )."'>";
                    echo "</div>";
                }
            
            ?>
        </div>
    </div>
</div>