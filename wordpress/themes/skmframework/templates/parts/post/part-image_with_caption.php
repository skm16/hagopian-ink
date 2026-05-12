<div class="post-part part-image-with-caption" style="<?php echo return_post_builder_padding(); ?>">
	<div class="container">
		<div class="row">
			<div class="col-sm-12">
				
				<figure class="wp-caption aligncenter">

					<?php echo skm_get_acf_image_with_atts(get_sub_field('image'), 'full', 'img-responsive', ''); ?>
					<figcaption class="wp-caption-text"><?php the_sub_field('caption'); ?></figcaption>

				</figure>

			</div>
		</div>
	</div>
</div>