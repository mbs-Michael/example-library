"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _moduleModule = _interopRequireDefault(require("../styles/module.module.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TestDiv = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _moduleModule.default.testDiv
  }, children);
};

var _default = TestDiv;
exports.default = _default;