;(function($){

  // To dynamic load css in panel view
	elementor.hooks.addFilter( 'editor/style/styleText', function( css, context ) {

		if (!context) { return; }

		var model = context.model,
			generatedCss = model.get('settings').get('htmega_custom_css');
		var selector = '.elementor-element.elementor-element-' + model.get('id');
		
		if ( 'document' === model.get('elType') ) {
			selector = elementor.config.document.settings.cssWrapperSelector;
		}

		if ( generatedCss ) {
			css += generatedCss.replace(/selector/g, selector);
		}

		return css;
	});

})(jQuery);