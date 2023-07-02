import React from "react";
import "./index.css";
const Component = function (...args) {
    React.Component.call(this, ...args);
    this.render = function () {
        return (<></>);
    };
    return;
};
Component.prototype = Object.create(React.Component.prototype);
Component.prototype.constructor = Component;
export default Component;