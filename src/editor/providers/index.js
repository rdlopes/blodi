import BlodiContextPadProvider from './BlodiContextPadProvider.js';
import BlodiPaletteProvider from './BlodiPaletteProvider.js';
import BlodiRuleProvider from './BlodiRuleProvider.js';

export default {
  __init__: [
    'blodiContextPadProvider',
    'blodiPaletteProvider',
    'blodiRuleProvider'
  ],
  blodiContextPadProvider: [ 'type', BlodiContextPadProvider ],
  blodiPaletteProvider: [ 'type', BlodiPaletteProvider ],
  blodiRuleProvider: [ 'type', BlodiRuleProvider ]
};
