"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {*} props
 * @param {string} props.className class for outermost div
 * @param {JSX.Element} props.label input label
 * @param {JSX.Element|string} props.helpLabel input help label
 * @param {*} props.children
 */
const BaseGenericInput = _ref => {
  let {
    className,
    label,
    helpLabel,
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, label && /*#__PURE__*/_react.default.createElement("div", {
    className: "field-label is-normal"
  }, label, helpLabel && /*#__PURE__*/_react.default.createElement("div", {
    className: "help"
  }, helpLabel)), /*#__PURE__*/_react.default.createElement("div", {
    className: "field-body"
  }, children));
};

var _default = BaseGenericInput;
exports.default = _default;