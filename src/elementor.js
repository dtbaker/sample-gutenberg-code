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

import './blocks/index'


const EmbedGutenberg = ({html, onChange}) => {
  registerCoreBlocks();

  const [blocks] = useState(rawHandler({
    HTML: html,
  }));

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


elementor.hooks.addAction( 'panel/open_editor/widget', function( panel, model, view ) {
  if(model && model.attributes && model.attributes.widgetType === 'elementor_gutenberg_embed') {
    // console.log(panel);
    // console.log(model);
    // console.log(view);
    const $frontendPreview = view.$el;
    const $backendEditor = panel.$el.find('.embed-gutenberg-in-sidebar');

    const currentHtml = model.getSetting('html')

    if ($backendEditor.length) {
      wp.element.render(
        <div>
          <EmbedGutenberg html={currentHtml} onChange={blocks => {
            let fullHtml = ''
            blocks.forEach(block => {
              const blockHtml = serialize(block);
              fullHtml = fullHtml + "\n" + blockHtml;
            })
            $frontendPreview.html(fullHtml)
            model.setSetting('html', fullHtml)
          }}/>
        </div>
        ,
        $backendEditor.get(0)
      );

    }
  }
} );
