import React from "react";
import toolkit from "jsen-sym-toolkit-for-interfaces";
const t = toolkit;
const Component = function (
	...args
) {
	React.Component.call(this, ...args);
	t.cmp.catchallContext(this);
	
	// @signature
	this.onClickAddNode = async (event) => {
		if (!event.altKey && !event.shiftKey
		&& !(event.metaKey || event.ctrlKey)) {
			
			// @action
			this.ma_go(event, this.navigator.context.lists['db.posts'].actions['POST'], true);
			
		}
	};
	
	// @signature
	this.onClickEditNode = async (event) => {
		if (event.altKey && !event.shiftKey
		&& !(event.metaKey || event.ctrlKey)) {
			
			// @action
			this.ma_go(event, this.navigator.context.actions['DELETE'], true);
			
		} else if (!event.altKey && !event.shiftKey
		&& !(event.metaKey || event.ctrlKey)) {
			
			// @action
			this.ma_go(event, this.navigator.context.actions['PATCH'], true);
			
		}
	};
	
	// @signature
	this.render = function () {
		return (<main>
			
			{/*<!-- Show this button on the home page, but not if this is the live version of the site (only the local version should be editable). -->*/}
			{this.navigator.state.options.deployment !== 'live' && this.navigator.context.name === '$dom:root' ? (<>
				<button
				 type="button"
				 onClick={this.onClickAddNode}
				 >Add new post</button>
			</>) : (<></>)}
			
			{/*<!-- Show this button on the post page, but not if this is the live version of the site (only the local version should be editable). -->*/}
			{this.navigator.context.name === '$dom:item/db.posts' ? (<>
				<button
				 type="button"
				 onClick={((e) => { this.ma_go(e, this.navigator.dom.root, true) })}
				 >Home</button>
			</>) : (<></>)}
			
			{/*<!-- Show this button on the post page, but not if this is the live version of the site (only the local version should be editable). -->*/}
			{this.navigator.state.options.deployment !== 'live' && this.navigator.context.name === '$dom:item/db.posts' ? (<>
				<button
				 type="button"
				 onClick={this.onClickEditNode}
				 >Edit post</button>
			</>) : (<></>)}
			
		</main>);
	};
	
	return;
	
};
Component.prototype = Object.create(React.Component.prototype);
Component.prototype.constructor = Component;
export default Component;
