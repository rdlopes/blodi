import Diagram from "diagram-js";
import AlignElementsModule from 'diagram-js/lib/features/align-elements';
import AttachSupport from 'diagram-js/lib/features/attach-support';
import AutoScrollModule from 'diagram-js/lib/features/auto-scroll';
import BendpointsModule from 'diagram-js/lib/features/bendpoints';
import ConnectModule from 'diagram-js/lib/features/connect';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import ConnectPreviewModule from 'diagram-js/lib/features/connection-preview';
import CreateModule from 'diagram-js/lib/features/create';
import EditorActionsModule from 'diagram-js/lib/features/editor-actions';
import GridSnappingModule from 'diagram-js/lib/features/grid-snapping';
import KeyboardModule from 'diagram-js/lib/features/keyboard';
import KeyboardMoveModule from 'diagram-js/lib/navigation/keyboard-move';
import KeyboardMoveSelectionModule from 'diagram-js/lib/features/keyboard-move-selection';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import PaletteModule from 'diagram-js/lib/features/palette';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import SelectionModule from 'diagram-js/lib/features/selection';
import SnappingModule from 'diagram-js/lib/features/snapping';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';

// @ts-ignore
import GridModule from 'diagram-js-grid';

import ProvidersModule from './providers';
import Canvas from "diagram-js/lib/core/Canvas";
import ElementFactory from "diagram-js/lib/core/ElementFactory";
import {Root} from "diagram-js/lib/model";

type ModuleDeclaration = import('didi').ModuleDeclaration;

export type EditorOptions = {
  container: Element,
  additionalModules?: Array<ModuleDeclaration>,
  additionalOptions?: Array<Record<string, any>>,
}

const builtinModules: ModuleDeclaration[] = [
  AlignElementsModule,
  AttachSupport,
  AutoScrollModule,
  BendpointsModule,
  ConnectModule,
  ConnectPreviewModule,
  ContextPadModule,
  CreateModule,
  GridModule,
  GridSnappingModule,
  EditorActionsModule,
  KeyboardModule,
  KeyboardMoveModule,
  KeyboardMoveSelectionModule,
  LassoToolModule,
  ModelingModule,
  MoveCanvasModule,
  MoveModule,
  OutlineModule,
  PaletteModule,
  ResizeModule,
  RulesModule,
  SelectionModule,
  SnappingModule,
  ZoomScrollModule,
];

const customModules: ModuleDeclaration[] = [
  ProvidersModule
];

export default class Editor extends Diagram {

  constructor(options: EditorOptions) {
    super({
      ...options.additionalOptions,
      canvas: {
        container: options.container,
      },
      propertiesPanel: { parent: '#properties' },
      modules: [
        ...builtinModules,
        ...customModules,
      ]
    });
  }

  buildExample() {
    const canvas: Canvas = this.get('canvas');
    const elementFactory: ElementFactory = this.get('elementFactory');
    const root: Root = elementFactory.createRoot();
    canvas.setRootElement(root);
    const shape1 = elementFactory.createShape({x: 150, y: 100, width: 100, height: 80});
    canvas.addShape(shape1, root);
    const shape2 = elementFactory.createShape({x: 290, y: 220, width: 100, height: 80});
    canvas.addShape(shape2, root);
    const connection1 = elementFactory.createConnection({
      waypoints: [
        {x: 250, y: 180},
        {x: 290, y: 220}
      ],
      source: shape1,
      target: shape2
    });
    canvas.addConnection(connection1, root);
  }
}


