<?php

defined( 'ABSPATH' ) or die('-1');

add_action('elementor/editor/after_enqueue_scripts', function(){

	wp_enqueue_script( 'embed-gutenberg-in-elementor', plugin_dir_url( dirname(__FILE__) ) . 'build/elementor.js',
		array(
			// Script requirements for loading Gutenberg in the backend:
			'wp-blocks',
			'wp-element',
			'wp-components',
			'wp-block-serialization-default-parser',
			'wp-blocks',
			'wp-block-editor',
			'wp-block-library',
			'wp-format-library',
			'elementor-editor',
		), 1, true );

	wp_enqueue_style( 'embed-gutenberg-in-elementor', plugin_dir_url( dirname(__FILE__) ) . 'build/styles.css',
		array(
			// Style requirements for loading Gutenberg in the backend:
			'editor-buttons',
			'wp-components',
			'wp-edit-post',
			'wp-block-editor',
			'wp-editor',
			'wp-edit-blocks',
			'wp-block-library',
			'wp-nux',
			'wp-format-library'
		), 1 );
});


add_action( 'elementor/widgets/widgets_registered', function () {

	require_once __DIR__ . '/elementorWidgets/gutenberg.php';
	require_once __DIR__ . '/elementorWidgets/minimal.php';

} );
