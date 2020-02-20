<?php

namespace Elementor;

class Widget_Elementor_Currency_Concerter extends Widget_Base {
	public function get_name() {
		return 'elementor_minimal_currency_converter';
	}

	public function get_title() {
		return __( 'Currency Converter', 'your-string-here' );
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
			<div id="powerd"><a href="https://www.transfermate.com/" target="_blank" id="tm_add146" class="tm_add146">Powered by TransferMate</a></div>
			<div id="demo-rate-convert"></div>
			<script>
        var apiTargetHtmlObj = document.getElementById("demo-rate-convert");
        var tmScript = document.createElement("script");
        tmScript.src = "https://www.transfermate.com/en/exchange_rates_api.asp?csel=AUD,USD&cshort=";
        document.getElementsByTagName("head")[0].appendChild(tmScript);
			</script>
			<noscript><br/><span style="color: red;">Please enable your JavaScript.</span></noscript>
		</div>
		<?php
	}
}

Plugin::instance()->widgets_manager->register_widget_type( new Widget_Elementor_Currency_Concerter() );

