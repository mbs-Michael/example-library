"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _BaseGenericInput = _interopRequireDefault(require("./BaseGenericInput"));

var _Popover = require("../Components/Popover");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const BaseInput = _ref => {
  let {
    outerDivClass,
    innerDivClass,
    label,
    helpLabel,
    popoverRef,
    popoverProps,
    inputProps,
    icon,
    helpInput
  } = _ref;
  return /*#__PURE__*/React.createElement(_BaseGenericInput.default, {
    className: outerDivClass,
    label: label,
    helpLabel: helpLabel
  }, /*#__PURE__*/React.createElement("div", {
    className: innerDivClass
  }, /*#__PURE__*/React.createElement(_Popover.Popover, _extends({
    ref: popoverRef
  }, popoverProps), /*#__PURE__*/React.createElement("input", {
    className: "is-hidden"
  }), /*#__PURE__*/React.createElement("input", inputProps), icon)), helpInput && /*#__PURE__*/React.createElement("div", {
    className: "help"
  }, helpInput));
};

var _default = BaseInput;
exports.default = _default;