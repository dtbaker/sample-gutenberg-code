
    /* global wp */
    const {__} = wp.i18n;

    const {registerBlockType} = wp.blocks;

    registerBlockType(`embed-gutenberg/demo-block1`, {
      title: 'Minimal Demo Block 1',
      icon: 'universal-access-alt',
      category: 'layout',
      edit() {
        return (
          <div>
            <div>Hi! I'm Demo Block 1 (edit mode)</div>
          </div>
        );
      },
      save() {
        return <div>Hey! I'm Demo Block 1 (saved content)</div>
      },
    });

