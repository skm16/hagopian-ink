<div class="template-part our-publications">
    <div class="container">
        <div class="row">
            <?php
            $publications = array();
            
            array_push($publications, get_sub_field("awards") );
            array_push($publications, get_sub_field("publications") );
            array_push($publications, get_sub_field("articles_&_features") );
            
                if( $publications ) {
                    foreach ( $publications as $key => $publication ) {
                        ?>
                            <div class='col-sm-4'>
                                    <div class="publications">
                                        <?php
                                        if( $publication['title'] ) { 
                                        ?>
                                        <div class='name'><?php echo $publication['title']; ?></div>
                                        <?php } ?>

                                        <?php if( $publication['content'] ) { ?>
                                        <div class='description'><?php echo $publication['content']; ?></div>
                                        <?php } ?>
                                    </div>
                            </div>
                        <?php
                    }
                }
            ?>
        </div>
    </div>
</div>