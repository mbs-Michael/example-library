"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Popover = exports.PopoverContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _ContentBlock = require("../Layout/ContentBlock");

var _Buttons = require("../Buttons/Buttons");

var _HeaderText = _interopRequireDefault(require("../Components/HeaderText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const PopoverContext = /*#__PURE__*/_react.default.createContext();
/**
 * @class Popover
 * @classdesc Popover takes in position, trigger, children (the surrounding div), and popover component
 * @param {string} position position of the popover when it opens.
 * @param {string} trigger when the popover should display (ex: click, focus, etc)
 * @param {string} isFullWidth Whether or not the popover div should expand to the full width. If false,
 * sets he display: inline-block;  **Default true**
 * @param {string} size size of the popover (Ex: *small, medium, large*) **Default medium**
 * @param {Node} children the component that will contain the popover.
 * @param {Node} popoverComponent the popover component itself.
 */


exports.PopoverContext = PopoverContext;

class Popover extends _react.default.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "preventScroll", e => {
      e.preventDefault();
      e.stopPropagation();
    });

    _defineProperty(this, "openPopover", () => {
      this.setState({
        isActive: true
      }, this.setPosition);
    });

    _defineProperty(this, "closePopover", () => {
      this.setState({
        isActive: false
      });
      document.body.removeEventListener("touchmove", this.preventScroll);
      document.removeEventListener("click", this.checkClose);
    });

    _defineProperty(this, "isElementInsidePopover", element => {
      const body = document.getElementsByTagName("body")[0];

      if (element === this.popoverWrapper.current) {
        return true;
      } else if (element === body || element === document.documentElement) {
        return false;
      } else if (element) {
        return this.isElementInsidePopover(element.parentNode);
      }
    });

    _defineProperty(this, "checkClose", e => {
      if (!this.isElementInsidePopover(e.target)) {
        this.setState({
          isActive: false
        });
        document.body.classList.remove("has-overlay");
        document.body.removeEventListener("touchmove", this.preventScroll);
        document.removeEventListener("click", this.checkClose);
        document.removeEventListener("focusin", this.checkClose);
      }
    });

    _defineProperty(this, "setPosition", e => {
      const {
        position,
        trigger
      } = this.props;
      const popoverHeight = this.popover.current.clientHeight;
      const popoverWidth = this.popover.current.clientWidth;
      const outerCompHeight = this.outerDiv.current.clientHeight;
      const outerCompWidth = this.outerDiv.current.clientWidth; //assigns position if not in mobile view.

      if (window.innerWidth > 768) {
        if (position === "left") {
          this.popover.current.style.top = outerCompHeight / 2 - popoverHeight / 2 + "px";
          this.popover.current.style.left = -popoverWidth + "px";
        } else if (position === "top") {
          this.popover.current.style.top = -popoverHeight + "px";
          this.popover.current.style.left = outerCompWidth / 2 - popoverWidth / 2 + "px";
        } else if (position === "right") {
          this.popover.current.style.top = outerCompHeight / 2 - popoverHeight / 2 + "px";
          this.popover.current.style.left = outerCompWidth + "px";
        } else {
          this.popover.current.style.top = outerCompHeight + "px";
          this.popover.current.style.left = outerCompWidth / 2 - popoverWidth / 2 + "px";
        }
      } else {// document.body.classList.add("has-overlay");
        //document.body.addEventListener("touchmove", this.preventScroll);
      }

      if (this.state.isActive && trigger === "click") {
        document.addEventListener("click", this.checkClose);
      }

      if (this.state.isActive && trigger === "focus") {
        document.addEventListener("click", this.checkClose);
        document.addEventListener("focusin", this.checkClose);
      }
    });

    _defineProperty(this, "followMouse", e => {
      const {
        position
      } = this.props;

      if (!this.props.follow) {
        return false;
      }

      const pos = this.outerDiv.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftDiff = mouseX - pos.x;
      const topDiff = mouseY - pos.y;
      const clientHeight = this.popover.current.clientHeight;
      const clientWidth = this.popover.current.clientWidth;

      if (this.state.isActive) {
        if (position === "top") {
          this.popover.current.style.top = topDiff - clientHeight - 25 + "px";
          this.popover.current.style.left = leftDiff - clientWidth / 2 + "px";
        } else {
          this.popover.current.style.top = topDiff + 25 + "px";
          this.popover.current.style.left = leftDiff - clientWidth / 2 + "px";
        }
      }
    });

    this.state = {
      isActive: false
    };
    this.outerDiv = /*#__PURE__*/_react.default.createRef();
    this.popover = /*#__PURE__*/_react.default.createRef();
    this.popoverWrapper = /*#__PURE__*/_react.default.createRef();
  }
  /**
   * @function
   * @description scroll on mobile when the popover goes full width
   * @param {object} e - Event Object
   */


  /**
   * @function
   * @description adds popover to component by wrapping
   * @returns {component} - returns static component wrapper around div that has events
   */
  outerComponent() {
    const {
      trigger
    } = this.props;
    let component;

    switch (trigger) {
      case "hover":
        component = /*#__PURE__*/_react.default.createElement("div", {
          ref: this.outerDiv,
          onMouseEnter: this.openPopover,
          onMouseLeave: this.closePopover,
          onMouseMove: this.followMouse
        }, this.props.children);
        break;

      case "focus":
        component = /*#__PURE__*/_react.default.createElement("div", {
          ref: this.outerDiv,
          onFocus: this.openPopover
        }, " ", this.props.children, " ");
        break;

      case "click":
        component = /*#__PURE__*/_react.default.createElement("div", {
          className: "is-clickable",
          onClick: this.openPopover,
          ref: this.outerDiv
        }, this.props.children);
        break;

      case "none":
        component = /*#__PURE__*/_react.default.createElement("div", {
          className: "popover-label",
          ref: this.outerDiv
        }, this.props.children);
    }

    return component;
  }

  render() {
    const {
      popoverComponent,
      position,
      isFullWidth,
      size
    } = this.props;
    const screenSize = window.innerWidth;
    let classNames = "is-relative";

    if (isFullWidth) {
      classNames += " is-fullWidth";
    } else {
      classNames += " is-inline-block";
    }

    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(PopoverContext.Provider, {
      value: {
        closePopover: this.closePopover,
        isActive: this.state.isActive,
        openPopover: this.openPopover
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: classNames,
      ref: this.popoverWrapper
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.popover,
      className: "popover-block is-mobile is-mobile-fullPage ".concat(position, " ").concat(this.state.isActive ? "" : "is-hidden", " is-").concat(size)
    }, screenSize < 768 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Buttons.ButtonPrimary, {
      icon: "times",
      buttonProps: {
        onClick: () => {
          this.setState({
            isActive: false
          });
        }
      }
    })), /*#__PURE__*/_react.default.createElement(_ContentBlock.ContentBlock, {
      style: "popover",
      bottomMargin: position === "right" || position === "left" ? "0" : "7",
      className: "is-fullHeight"
    }, this.props.title && /*#__PURE__*/_react.default.createElement(_ContentBlock.ContentBlockHeader, null, /*#__PURE__*/_react.default.createElement(_HeaderText.default, {
      main: this.props.title
    })), /*#__PURE__*/_react.default.createElement(_ContentBlock.ContentBlockBody, null, popoverComponent)), screenSize > 768 && /*#__PURE__*/_react.default.createElement("div", {
      className: "arrow ".concat(position)
    })), this.outerComponent())));
  }

}

exports.Popover = Popover;
Popover.defaultProps = {
  follow: false,
  position: "top",
  trigger: "focus",
  isFullWidth: true,
  size: "medium"
};