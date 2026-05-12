<?php
 $rand_id = rand(1, 1000);
?>

<div class="template-part blocks" <?php if( get_sub_field("background-color") ) { echo ' style="background-color: '.get_sub_field("background-color").';" '; } ?>  id='slides-<?php echo $rand_id; ?>'>
    <div class="container">
        <div class="row">
            <?php
                if( get_sub_field("block") ) {
                    foreach ( get_sub_field( "block" ) as $key => $block ) {
                        ?>
                            <div class='col-sm-6 col-lg-4 slide <?php echo ( ( $key == 0) ? "showing" : "" ); ?> '>
                                
                                <div class="header">
                                    <div class="top">
                                        <?php if( $block['name-group']['name'] ) { ?>
                                        <div class='name text-center' style='<?php echo "color:".$block['name-group']['color'].";"; ?>'><?php echo $block['name-group']['name']; ?></div>
                                        <?php } ?>

                                        <?php if( $block['title'] ) { ?>
                                        <div class='title'><?php echo $block['title']; ?></div>
                                        <?php } ?>

                                        <?php if( $block['description'] ) { ?>
                                        <div class='description'><?php echo $block['description']; ?></div>
                                        <?php } ?>
                                    </div>
                                    
                                    <div>
                                        <?php if( $block['link'] ) { ?>
                                        <div class='link'>
                                            <?php
                                                echo "<a href='".$block['link']['url']."' ".( ( !empty( $block['link']['target'] ) ) ? ' target="_blank" ' : '' )." class='link'>".$block['link']['title']."</a>";
                                            ?>
                                        </div>
                                        <?php } ?>
                                    </div>
                                </div>
                                
                                
                                <div class='footer'>
                                <?php if( $block['img'] && $block['link'] ) { 
                                        echo "<div class='img'>";
                                        echo "<a href='".$block['link']['url']."' ".( ( !empty( $block['link']['target'] ) ) ? ' target="_blank" ' : '' )."><img src='".$block['img']."'></a>";
                                        echo "</div>";
                                    ?>
                                <?php } ?>
                                    
                                    <?php if( $block['icon'] ) { ?>
                                        <div class='icon parallax'  data-paroller-factor="0.1" data-paroller-type="foreground"  style="<?php echo "background-image: url('".$block['icon']."');"?>" ></div>
                                    <?php } ?>
                                </div>
                                                              
                            </div>
                        <?php
                    }
                }
            ?>
        </div>
            
        <div class='slides-button'>
            <?php
                for( $i = 1; $i <= count( get_sub_field("block") ); $i++ ) {
                    echo "<span class='button ".( ( $i == 1 ) ? "current" : "" )."'></span>";
                }
            ?>
        </div>
    </div>
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