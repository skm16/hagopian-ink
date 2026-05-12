<?php
/* ----------------------------------------
  -- ADD YOUR CUSTOM TAXONOMIES HERE
----------------------------------------- */

add_action('init', 'create_custom_taxonomy');
function create_custom_taxonomy(){
	register_taxonomy('work', array('works'), array(
		'label'                 => 'Work Type',
		'labels'                => array(
			'name'              => 'Work Type',
			'singular_name'     => 'Work Type',
			'search_items'      => 'Search Work Type',
			'all_items'         => 'All Work Type',
			'view_item '        => 'View Work Type',
			'parent_item'       => 'Parent Work Type',
			'parent_item_colon' => 'Parent Work Type:',
			'edit_item'         => 'Edit Work Type',
			'update_item'       => 'Update Work Type',
			'add_new_item'      => 'Add Work Type',
			'new_item_name'     => 'New Work Type',
			'menu_name'         => 'Work Type',
		),
		'description'           => '',
		'public'                => true,
                'hierarchical'          => true
	) );
        
	register_taxonomy('tag', array('works'), array(
		'label'                 => 'Tag',
		'labels'                => array(
			'name'              => 'Tag',
			'singular_name'     => 'Tag',
			'search_items'      => 'Search Tag',
			'all_items'         => 'All Tags',
			'view_item '        => 'View Tag',
			'parent_item'       => 'Parent Tag',
			'parent_item_colon' => 'Parent Tag:',
			'edit_item'         => 'Edit Tag',
			'update_item'       => 'Update Tag',
			'add_new_item'      => 'Add Tag',
			'new_item_name'     => 'New Tag',
			'menu_name'         => 'Tag',
		),
		'description'           => '',
		'public'                => false,
        'hierarchical'          => true,
        'show_in_menu'          => true,
        'show_ui'               => true,
	) );
        
}