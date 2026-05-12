<div  class="template-part columns-single-work">
    <div class='container'>
        
        <?php
            switch ( count( get_sub_field( 'column' ) ) ) {
                  case 1:
                      $count_col = "12";
                      break;
                  case 2:
                      $count_col = "6";
                      break;
                  case 3:
                      $count_col = "4";
                      break;

                  default:
                      $count_col = "12";
                      break;
            }
        ?>
        
        <div class='row width-<?php echo ( $count_col == "12" ) ? "60 text-center" : "80" ?>'>
            <?php
                foreach ( get_sub_field( 'column' ) as $key => $column ) {
            ?>
                <div class='col-sm-<?php echo $count_col; ?>'>
                    <?php
                        if( !empty( $column['name'] ) ) {
                            echo "<div class='part-name'>".$column['name']."</div>";
                        }
                        if( !empty( $column['title'] ) ) {
                            echo "<div class='part-title'>".$column['title']."</div>";
                        }
                        if( !empty( $column['description'] ) ) {
                            echo "<div class='description'>".$column['description']."</div>";
                        }
                    ?>
                </div>
            <?php
                }
            ?>
        </div>
    </div>
</div>