<div class="template-part our-work <?php  echo "bg-".get_sub_field( 'background_color' ); ?> <?php  echo "column-reverse-".get_sub_field( 'column_reverse' ); ?>">
    <div class="container">
        <div class='row'>
            <div class='col-sm-5 parallax parallax-block-text'  data-paroller-factor="0.05" data-paroller-type="foreground" >
                <?php
                    if( get_sub_field( 'name_group' )['name'] ) {
                        echo "<div class='part-name' ".( get_sub_field( 'name_group' )['color'] ? " style='color: ".get_sub_field( 'name_group' )['color'].";' " : "" ).">".get_sub_field( 'name_group' )['name']."</div>";
                    }
                    
                    if( get_sub_field( 'title' ) ) {
                        echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
                    }
                
                    if( get_sub_field( 'description' ) ) {
                        echo "<div class='part-description'>".get_sub_field( 'description' )."</div>";
                    }
                    
                    if( !empty( get_sub_field( 'link' ) ) ) {
                        $link = get_sub_field( 'link' );
                        echo "<div>"
                        . "<a href='".$link['url']."' ".( ( !empty( $link['target'] ) ) ? ' target="_blank" ' : '' )." class='button' >".$link['title']."</a>"
                        . "</div>";
                    }
                ?>
            </div>
            
            <div class='col-sm-7 parallax'  data-paroller-factor="-0.025" data-paroller-type="foreground" >
               <?php
                    if( get_sub_field( 'image' ) && get_sub_field( 'link' ) ) {
                        echo "<div class='image'><a href='".$link['url']."' ".( ( !empty( $link['target'] ) ) ? ' target="_blank" ' : '' )."><img src='".get_sub_field( 'image' )['url']."'></a></div>";
                    } elseif ( get_sub_field( 'image' ) ) {
                        echo "<div class='image'><img src='".get_sub_field( 'image' )['url']."'></div>";
                    }
               ?>
            </div>
        </div>
    </div>
</div>
<script>
    function change_parallax_attr() {
        if ( jQuery(window).width() < 800) {
            jQuery('.parallax-block-text').each(function(i, elem) {
                jQuery(elem).attr( 'data-paroller-factor', '-0.1' );
            });
         } else {
            jQuery('.parallax-block-text').each(function(i, elem) {
                jQuery(elem).attr( 'data-paroller-factor', '0.2' );
            });
         }
    }
    
    jQuery(document).load(function(){
        setTimeout(change_parallax_attr, 1500);
    });
    
    jQuery(window).resize(function(){
        change_parallax_attr();
    });
</script>
    