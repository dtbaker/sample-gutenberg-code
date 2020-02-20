<?php

defined( 'ABSPATH' ) or die( '-1' );


	register_block_type( 'embed-gutenberg/demo-block4',
		array(
			'render_callback' => 'demo_block_4_server_side_render',
		)
	);

	function demo_block_4_server_side_render( $attributes ) {
		ob_start();
		?>
		<div>
			Server side render. You entered: <?php echo wp_kses_post( $attributes['demoAttribute'] ); ?>
			<pre><?php print_r( $attributes ); ?></pre>
		</div>
		<?php
		return ob_get_clean();
	}

add_action( 'enqueue_block_editor_assets', function () {
	wp_enqueue_script( 'embed-gutenberg-in-elementor', plugin_dir_url( dirname( __FILE__ ) ) . 'build/blocks.js',
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

} );

