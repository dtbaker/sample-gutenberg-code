<?php
/**
 * Inner Content Elementor Widget
 *
 * @package embed-gutenberg
 */

namespace Elementor;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Creates our custom Elementor widget
 *
 * Class Widget_embed-gutenberg_Inner_Content
 *
 * @package Elementor
 */
class Widget_Elementor_Gutenberg_Embed extends Widget_Base {

	/**
	 * Get Widgets name
	 *
	 * @return string
	 */
	public function get_name() {
		return 'elementor_gutenberg_embed';
	}

	/**
	 * Get widgets title
	 *
	 * @return string
	 */
	public function get_title() {
		return __( 'Gutenberg', 'embed-gutenberg' );
	}

	/**
	 * This registers our controls for the widget. Currently there are none but we may add options down the track.
	 */
	protected function _register_controls() {

		$this->start_controls_section(
			'section_embed-gutenberg_inner_content',
			[
				'label' => __( 'Gutenberg', 'embed-gutenberg' ),
			]
		);

		$this->add_control(
			'description',
			[
				'label' => __( 'An embedded Gutenberg editor', 'embed-gutenberg' ),
				'type'  => Controls_Manager::RAW_HTML,
				'content_classes' => 'embed-gutenberg-in-sidebar',
			]
		);

		$this->add_control(
			'html',
			[
				'label' => __( 'HTML', 'embed-gutenberg' ),
				'type' => Controls_Manager::HIDDEN,
				'render_type' => 'none',
			]
		);

		$this->end_controls_section();

	}

	public function get_script_depends() {
		return [ 'embed-gutenberg-in-elementor' ];
	}

	public function get_style_depends() {
		return ['embed-gutenberg-in-elementor'];
	}

	/**
	 * Render our widget. This is called while public browsing the site and also while editing the site.
	 * So we have to do some trickerly depending on what page we're editing and the current edit mode.
	 */
	protected function render() {
		$settings = $this->get_settings();

		if(empty($settings['html'])){
			$settings['html'] = 'Gutenberg';
		}

		?>
		<div class="embed-gutenberg-wrapper">
			<div class="embed-gutenberg-holder"></div>
			<?php echo wp_kses_post($settings['html']);?>
		</div>
		<?php

	}
}


Plugin::instance()->widgets_manager->register_widget_type( new Widget_Elementor_Gutenberg_Embed() );
