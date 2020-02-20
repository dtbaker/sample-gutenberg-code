/* global wp */
const {__} = wp.i18n;

const {registerBlockType} = wp.blocks;

  registerBlockType(`embed-gutenberg/demo-block2`, {
    title: 'Minimal Demo Block 2',
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
      demoAttribute: {
        type: 'string',
        default: 'Test Default Value',
      },
    },
    supports: {
      className: true,
    },
    edit(props) {
      const {attributes: {demoAttribute}} = props;
      return <div>Demo Block, here's my attribute value: {demoAttribute}</div>;
    },
    save(props) {
      const {className, attributes: {demoAttribute}} = props;
      return <div className={className}>Demo Block (save mode) value is: {demoAttribute}</div>;
    },
  });
