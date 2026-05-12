<?php if( have_rows('post_builder') ): while ( have_rows('post_builder') ) : the_row();

	$layout = get_row_layout();

	if($layout):

		get_template_part('templates/parts/post/part-'.$layout);

	endif;

endwhile; else:

	the_content();

endif;