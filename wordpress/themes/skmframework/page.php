<?php 
get_header();
    if( have_rows('template_part') ):
            while ( have_rows('template_part') ) : the_row();
                    get_template_part( 'templates/parts/part', get_row_layout() );
            endwhile;
    endif;
get_footer();
