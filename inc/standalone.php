<?php

defined( 'ABSPATH' ) or die('-1');

add_action( 'admin_menu', function () {

	// Setup a new menu in the backend for displaying our static Gutenberg demo:
	$page = add_menu_page( 'Standalone Embed Yo', ' - Standalone', 'edit_posts', 'embed-gutenberg', function () {
		?>
			<h2>Standalone Gutenberg Demo</h2>
				<pre>standalone.php + standalone.js + styles.css</pre>
				<div id="embed-gutenberg-holder"></div>
		<?php
	}
	);

	add_action( 'admin_print_scripts-' . $page, function () {
		// Run a function when the above backend page loads, we enqueue some scripts and styles:

		wp_enqueue_script( 'embed-gutenberg-test', plugin_dir_url( dirname(__FILE__) ) . 'build/standalone.js',
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
			), 1, true );

		wp_enqueue_style( 'embed-gutenberg-test', plugin_dir_url( dirname(__FILE__) ) . 'build/styles.css',
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

	} );
} );
