<?php
get_header( "tax-work" );

get_template_part( 'templates/template', "work-menu" );
    
$current_term = get_query_var('term');
?>

<div class='template-part posts'>
<div class='container'>
    <div class='row'>
        <?php
        
        if( $current_term ) {
            echo '<div class="grid">';
            global $post_tags;
        }
        
        if ( have_posts() ) : while ( have_posts() ) : the_post();
        
        
            if( $post_tags[get_the_ID()] ) { 
                 
                if( $post_tags[get_the_ID()] ) {
                    $_class = '';
                    $data_category = $post_tags[get_the_ID()][0];
                    foreach ( $post_tags[get_the_ID()] as $key => $name ) {
                        $_class .= " ".$name;
                    }
                }
            }
        
                ?>
                    <div class='post col-xs-6 col-sm-4  col-lg-3 element-item  <?php echo ($current_term) ? $_class : ""; ?>' <?php echo ($current_term)? " data-category=".$data_category : ""; ?> >
                        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" >
                            <?php if ( has_post_thumbnail()) { ?>
                                <?php the_post_thumbnail( 'thumbnail-work' ); ?>
                          <?php } ?>
                            <div class='title'>
                            <?php
                                the_title();
                            ?>
                            </div>
                        </a>
                    </div>
                <?php
        endwhile;
        
        
        ?>
    
    
    <div class="pagination text-center">
        <?php 
            echo paginate_links( array(
                'base'         => str_replace( 999999999, '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
                'total'        => $query->max_num_pages,
                'current'      => max( 1, get_query_var( 'paged' ) ),
                'format'       => '?paged=%#%',
                'show_all'     => false,
                'type'         => 'plain',
                'end_size'     => 2,
                'mid_size'     => 1,
                'prev_next'    => true,
                'prev_text'    => sprintf( '<i></i> %1$s', __( 'Prev' ) ),
                'next_text'    => sprintf( '%1$s <i></i>', __( 'Next' ) ),
                'add_args'     => false,
                'add_fragment' => '',
            ) );
        ?>
    </div>
    
    <?php
    
        endif;
        
        if( $current_term ) {
            echo "</div>";
        }
    ?>
        
        </div>
</div>
<?php
wp_reset_postdata();
 
?>
    
</div>


<?php
    if( have_rows('template_part', PAGE_ID_WORK ) ):
            while ( have_rows('template_part', PAGE_ID_WORK ) ) : the_row();
                    get_template_part( 'templates/parts/part', get_row_layout() );
            endwhile;
    endif;
get_footer();