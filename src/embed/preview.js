import * as React from 'react';
import {BlockPreview,} from '@wordpress/block-editor';
import '@wordpress/format-library';


const blockArray = [{
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


const EmbedGutenberg = ()  => (
  <div className="embed-gutenberg embed-gutenberg--preview">
    <BlockPreview
      blocks={ blockArray }
      viewportWidth={ 800 }
    />
  </div>
)

if (document.getElementById('embed-gutenberg-preview')) {
  wp.element.render(
    <EmbedGutenberg />,
    document.getElementById('embed-gutenberg-preview')
  );
}
