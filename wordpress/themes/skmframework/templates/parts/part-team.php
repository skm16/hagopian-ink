<div class="template-part team">
    <div class="container">
        <?php
            if( !empty( get_sub_field( 'title' ) ) ) {
                echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
            }
        ?>
        <div class="row">
            <?php
                if( get_sub_field("persons") ) {
                    $array_biography = array();
                    $array_biography_2 = array();
                    $persons = get_sub_field( "persons" );
                    foreach ( $persons as $key => $persons ) {
                        $_key = $key;
                        ?>
                            <div class='col-xs-6 col-md-6 col-lg-4 person'>
                                
                                <div class="header">
                                    <div>
                                        <?php
                                        if( get_field( 'position', $persons->ID ) ) { 
                                        ?>
                                        <div class='name text-center'><?php echo get_field( 'position', $persons->ID ); ?></div>
                                        <?php } ?>

                                        <?php if( $persons->post_title ) { ?>
                                        <div class='title' <?php echo "data-biography-id='".$persons->ID."'"; ?>><?php echo $persons->post_title; ?></div>
                                        <?php } ?>

                                        <?php if( $persons->post_excerpt ) { ?>
                                        <div class='description'><?php echo $persons->post_excerpt; ?></div>
                                        <?php } ?>
                                    </div>
                                    
                                    <div>
                                        <div class='link'>
                                            <?php
                                                echo "<a href='javascript:void(0)' class='link red_biography' data-biography-id='".$persons->ID."'>Read Bio</a>";
                                            ?>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div class='footer'>
                                    <?php if( get_the_post_thumbnail_url( $persons->ID ) ) { ?>
                                    <div class='img'>
                                        <a href="javascript:void(0)" class="red_biography" data-biography-id="<?php echo $persons->ID; ?>"><img src='<?php echo get_the_post_thumbnail_url( $persons->ID, 'thumbnail-team' ); ?>'></a>
                                    </div>
                                    <?php } ?>
                                </div>
                                
                                <?php
                                    $array_biography[$persons->ID] = "<div class='name text-center'>".get_field( 'position', $persons->ID )."</div>"
                                            . "<div class='title' data-biography-id='".$persons->ID."'>$persons->post_title</div>"
                                            . "<div>".$persons->post_content."</div>";
                                    
                                    $array_biography_2[$persons->ID] = "<div class='name text-center'>".get_field( 'position', $persons->ID )."</div>"
                                            . "<div class='title' data-biography-id='".$persons->ID."'>$persons->post_title</div>"
                                            . "<div>".$persons->post_content."</div>";
                                ?>
                            </div>
                        <?php
                        if( $key+1 != 0 &&  ( ($key+1) % 3 ) == 0  ) {

                            echo "<div class='all_biography col-sm-12 row-3 ".( ( $_key == ( count(  get_sub_field( "persons" ) ) - 1 ) ) ? " row-2 " : " " )." '>";
                                foreach ( $array_biography as $key => $biography ) {
                                    echo "<div id='biography_".$key."' class='biography' ".(  ( $key == 542 ) ?  "style='max-width: 100%;'"  : ""  )." >"
                                            . "<span class='close_biography'></span>";
                                        echo $biography;
                                    echo "</div>";
                                }
                            echo "</div>";
                            
                            if( ( ($_key+1) % 3 ) == 0 ) {
                                $array_biography = array();
                            } 
                        }
                        
                        
                        if( $_key+1 != 0 && ( ($_key+1) % 2 ) == 0  ) {
                            
                            if( ( ($_key+1) % 2 ) == 0 ) {
                                echo "<div class='all_biography col-sm-12 row-2'>";
                                    foreach ( $array_biography_2 as $key => $biography ) {
                                        echo "<div id='biography_".$key."' class='biography'>"
                                                . "<span class='close_biography'></span>";
                                            echo $biography;
                                        echo "</div>";
                                    }
                                echo "</div>";
                            }
                            
                            if( ( ($_key+1) % 2 ) == 0 ) {
                                $array_biography_2 = array();
                            }
                        }
                        
                    }
                    
                    if( $array_biography ) {
                        echo "<div class='all_biography col-sm-12 row-3 '>";
                            foreach ( $array_biography as $key => $biography ) {
                                echo "<div id='biography_".$key."' class='biography' ".(  ( $key == 542 ) ?  "style='max-width: 100%;'"  : ""  )." >"
                                        . "<span class='close_biography'></span>";
                                    echo $biography;
                                echo "</div>";
                            }
                        echo "</div>";
                    }
//                    
//                    if( $array_biography_2 && !$false ) {
//                        echo "<div class='all_biography col-sm-12 row-2'>";
//                            foreach ( $array_biography_2 as $key => $biography ) {
//                                echo "<div id='biography_".$key."' class='biography'>"
//                                        . "<span class='close_biography'></span>";
//                                    echo $biography;
//                                echo "</div>";
//                            }
//                        echo "</div>";
//                    }
                    
                }
            ?>
        </div>
    </div>
</div> 