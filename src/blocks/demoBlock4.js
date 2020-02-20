/* global wp */
const {__} = wp.i18n;

const {registerBlockType} = wp.blocks;
const {Panel, PanelBody, PanelRow, TextControl} = wp.components;
const {InspectorControls, BlockControls} = wp.blockEditor;


registerBlockType(`embed-gutenberg/demo-block4`, {
  title: 'Minimal Demo Block 4',
  icon: 'universal-access-alt',
  category: 'layout',
  attributes: {
    demoAttribute: {
      type: 'string',
      default: '',
    },
  },
  supports: {
    className: true,
  },
  edit(props) {
    const {setAttributes, attributes: {demoAttribute}} = props;

    return (
      <div>
        <BlockControls>
          <div>Buttons Can Go Here</div>
        </BlockControls>
        <InspectorControls>
          <Panel header="My Panel">
            <PanelBody title="My Block Settings" initialOpen={ true }>
              <PanelRow>
                <TextControl
                  label="Demo Attribute"
                  value={ demoAttribute }
                  onChange={ ( demoAttribute ) => setAttributes( { demoAttribute } ) }
                />
              </PanelRow>
            </PanelBody>
          </Panel>
        </InspectorControls>
        <div>Demo Block: {demoAttribute}</div>
      </div>
    );
  },
  save(props) {
    // server side render with PHP
    return null
  },
});
