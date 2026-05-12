<div  class="template-part two-columns-single-work">
    <div class='container'>
        <div class='row'>
            <div class='col-sm-8 title'>
                <?php
                    if( !empty( get_sub_field( 'title' ) ) ) {
                        echo "<div class='part-title'>".get_sub_field( 'title' )."</div>";
                    }
                ?>
            </div>
            <div class='col-sm-4 description'>
                <?php
                    if( !empty( get_sub_field( 'description' ) ) ) {
                        echo "<div class='part-description'>".get_sub_field( 'description' )."</div>";
                    }
                ?>
            </div>
        </div>
    </div>
</div>