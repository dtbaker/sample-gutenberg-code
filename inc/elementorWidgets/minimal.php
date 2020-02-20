<?php

namespace Elementor;

class Widget_Elementor_Minimal_Demo extends Widget_Base {
	public function get_name() {
		return 'elementor_minimal_widget_demo';
	}

	public function get_title() {
		return __( 'Minimal Demo', 'your-string-here' );
	}

	protected function _register_controls() {
		$this->start_controls_section(
			'section_minimal_widget_demo', [ 'label' => __( 'Demo', 'embed-gutenberg' ), ]
		);
		$this->add_control(
			'your_settings_value',
			[
				'label' => __( 'Example Text Input', 'embed-gutenberg' ),
				'type'  => Controls_Manager::TEXT,
			]
		);
		$this->end_controls_section();
	}

	protected function render() {
		$settings = $this->get_settings();
		?>
			<div class="your-frontend-class">
				You entered: <?php echo wp_kses_post( $settings['your_settings_value'] ); ?>
			</div>
		<?php
	}
}

Plugin::instance()->widgets_manager->register_widget_type( new Widget_Elementor_Minimal_Demo() );

