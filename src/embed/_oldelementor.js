import * as React from 'react';
import {rawHandler, serialize} from '@wordpress/blocks';
import {useEffect, useState} from '@wordpress/element';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
  BlockPreview,
  BlockInspector,
  WritingFlow,
  ObserveTyping,
} from '@wordpress/block-editor';
import {
  Popover,
  SlotFillProvider,
  DropZoneProvider,
} from '@wordpress/components';
import {registerCoreBlocks} from '@wordpress/block-library';
import '@wordpress/format-library';

let blockHTML = `<!-- wp:paragraph -->
<p>This is the first Paragraph block</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2>This is a header block</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Following this are 3 columns:</p>
<!-- /wp:paragraph -->
<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Col 1</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Col 2</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:paragraph -->
<p>Col3</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->
<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->`

let blockArray = [{
  "clientId": "812f33be-af57-475e-9987-af1936fee811",
  "name": "core/paragraph",
  "isValid": true,
  "attributes": {"content": "This is the first Paragraph block", "dropCap": false},
  "innerBlocks": []
}, {
  "clientId": "1e4e538e-5b75-4c93-894f-9bad6aaea746",
  "name": "core/heading",
  "isValid": true,
  "attributes": {"content": "This is a header block", "level": 2},
  "innerBlocks": []
}, {
  "clientId": "16be368a-6d1f-49ad-8a6a-cb73c5b626f0",
  "name": "core/paragraph",
  "isValid": true,
  "attributes": {"content": "Following this are 3 columns:", "dropCap": false},
  "innerBlocks": []
}, {
  "clientId": "61d91d01-97a3-4faa-a3b3-da9118dab63c",
  "name": "core/columns",
  "isValid": true,
  "attributes": {},
  "innerBlocks": [{
    "clientId": "2843dacd-8675-416f-b8f3-8b01894630b7",
    "name": "core/column",
    "isValid": true,
    "attributes": {},
    "innerBlocks": [{
      "clientId": "993743e3-c6a7-413b-98c1-9ebdcf9314b8",
      "name": "core/paragraph",
      "isValid": true,
      "attributes": {"content": "Col 1", "dropCap": false},
      "innerBlocks": []
    }]
  }, {
    "clientId": "626ce394-6a16-4e95-bf9d-765c7f155a50",
    "name": "core/column",
    "isValid": true,
    "attributes": {},
    "innerBlocks": [{
      "clientId": "3e972be9-f635-4d5e-9a87-ab6ddcb3d051",
      "name": "core/paragraph",
      "isValid": true,
      "attributes": {"content": "Col 2", "dropCap": false},
      "innerBlocks": []
    }]
  }, {
    "clientId": "0eb724b8-cb73-420c-9299-81062741a01d",
    "name": "core/column",
    "isValid": true,
    "attributes": {},
    "innerBlocks": [{
      "clientId": "c1af90fe-5df2-408c-9a41-f47562d6fa32",
      "name": "core/paragraph",
      "isValid": true,
      "attributes": {"content": "Col3", "dropCap": false},
      "innerBlocks": []
    }]
  }]
}, {
  "clientId": "06f03c08-2d96-41b1-867a-0888de1dae23",
  "name": "core/paragraph",
  "isValid": true,
  "attributes": {"content": "", "dropCap": false},
  "innerBlocks": []
}]


const getDefaultBlocks = () => {
  // There are two ways to get the list of blocks to initially render.
  // Option 1 is to just use the block object array (defined above)
  // return blockArray;

  // Option 2 is to parse some block html markup like this:
  registerCoreBlocks();
  return rawHandler({
    HTML: blockHTML,
  });
}

function EmbedGutenberg({onChange}) {
  const [blocks] = useState(getDefaultBlocks());

  useEffect(() => {
  }, []);

  /*
  <BlockPreview
    blocks={ blocks }
    viewportWidth={ 800 }
  />
   */

  return (
    <div className="embed-gutenberg edit-post-visual-editor">
      <SlotFillProvider>
        <DropZoneProvider>
          <BlockEditorProvider
            value={blocks}
            onInput={onChange}
            onChange={onChange}
            className="embed-gutenberg__wrapper"
          >
            <div className="embed-gutenberg__editor">
              <BlockEditorKeyboardShortcuts/>
              <WritingFlow>
                <ObserveTyping>
                  <BlockList/>
                </ObserveTyping>
              </WritingFlow>
            </div>
            <div className="embed-gutenberg__sidebar">
              <BlockInspector/>
            </div>
            <Popover.Slot/>
          </BlockEditorProvider>
        </DropZoneProvider>
      </SlotFillProvider>
    </div>
  );
}


setTimeout( function () {
  elementor.hooks.addAction( 'panel/open_editor/widget/elementor_gutenberg_embed', function( panel, model, view ) {
    var $element = view.$el.find( '.embed-gutenberg-holder' );
    if ( $element.length ) {
      wp.element.render(
        <EmbedGutenberg onChange={blocks => {
          let fullHtml = ''
          blocks.forEach(block => {
            const blockHtml = serialize(block);
            fullHtml = fullHtml + "\n" + blockHtml;
          })
          document.getElementById('embed-gutenberg-output-html').value = fullHtml
          document.getElementById('embed-gutenberg-output-blocks').value = JSON.stringify(blocks, '', 2)
        }}/>,
        $element.get(0)
      );
    }
  } );
}, 4000);

