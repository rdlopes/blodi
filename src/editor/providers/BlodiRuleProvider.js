import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import {isFrameElement} from 'diagram-js/lib/util/Elements';

export default class BlodiRuleProvider extends RuleProvider {
  static $inject = ['eventBus'];

  constructor(eventBus) {
    super(eventBus);
  }

  init() {
    this.addRule('shape.create', function (context) {
      let target = context.target,
        shape = context.shape;

      return target.parent === shape.target;
    });

    this.addRule('connection.create', function (context) {
      let source = context.source,
        target = context.target;

      return source.parent === target.parent;
    });

    this.addRule('shape.resize', function (context) {
      let shape = context.shape;

      return isFrameElement(shape);
    });
  }
}


