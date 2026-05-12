<div class="post-part part-image-inline-left-right" style="<?php echo return_post_builder_padding(); ?>">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<div class="inline-flex-wrap">
					<div class="inline-image-wrap">
						<?php echo skm_get_acf_image_with_atts(get_sub_field('image_left'), 'full', 'img-responsive', ''); ?>
					</div>
					<div class="inline-image-wrap">
						<?php echo skm_get_acf_image_with_atts(get_sub_field('image_right'), 'full', 'img-responsive', ''); ?>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-12">
				<div class="inline-image-caption">
					<p><?php the_sub_field('caption'); ?></p>
				</div>
			</div>
		</div>
	</div>
</div>