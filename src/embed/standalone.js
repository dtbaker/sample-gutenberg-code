import * as React from 'react';
import {rawHandler, serialize} from '@wordpress/blocks';
import {useState} from '@wordpress/element';
import {
  BlockEditorKeyboardShortcuts,
  BlockEditorProvider,
  BlockList,
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

const blockHTML = `<!-- wp:paragraph -->
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

const EmbedGutenberg = ({onChange}) => {
  const [blocks] = useState(getDefaultBlocks());

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

if (document.getElementById('embed-gutenberg-holder')) {
  let debugHTML, debugBlock = null
  wp.element.render(
    <div>
    <EmbedGutenberg onChange={blocks => {
      let fullHtml = ''
      blocks.forEach(block => {
        const blockHtml = serialize(block);
        fullHtml = fullHtml + "\n" + blockHtml;
      })
      if(debugHTML) debugHTML.value = fullHtml
      if(debugBlock) debugBlock.value = JSON.stringify(blocks, '', 2)
    }}/>
      <div style={{display: 'flex',margin: '0 40px 20px'}}>
        <textarea ref={ref => {debugHTML = ref}} placeholder="HTML Output" style={{flex: '0 0 50%', height: '300px', fontFamily: 'monospace'}} />
        <textarea ref={ref => {debugBlock = ref}} placeholder="Blocks Ouput" style={{flex: '0 0 50%', height: '300px', fontFamily: 'monospace'}} />
      </div>
    </div>
    ,
    document.getElementById('embed-gutenberg-holder')
  );
}
