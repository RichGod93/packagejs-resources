import React from "react";
const Component = function (
	...args
) {
	React.Component.call(this, ...args);
  this.render = function () {
		
		// @assign
		let componentHTML = this.props.bodyHTML;
		
		// @action
		//  Replace any navigator template variables used in post bodies (this can be done more easily / automatically with an external library) -- just done manually here as an example.
		componentHTML = componentHTML.replace(/\{navigator\.context\.name\}/g, this.props.navigator.context.name);
		
		// @return
    return (<div dangerouslySetInnerHTML={{__html: componentHTML }} />);
		
	};
  return;
};
Component.prototype = Object.create(React.Component.prototype);
Component.prototype.constructor = Component;
export default Component;
