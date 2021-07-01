"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @function
 * @description Creates Primary Button
 * @category Button
 * @component
 * @param {Object} props
 * @param {string=} props.text Button text
 * @param {string=} props.icon Icon inside button, if any
 * @param {string} props.action Action type of button
 * - primary (for non calc functions)
 * - success (confirm, save, continue on calc functions)
 * - danger (for delete actions)
 * @param {string=} props.size Size of button
 * - small
 * - large
 * @param {string=} props.condition Condition of the button
 * - loading
 * - disabled
 * @param {function} props.onClick Click event of button
 * @param {string=} props.classNames Additional classNames you want to include
 * @param {Object=} props.buttonProps Props to be placed directly on the button
 * {
 *   name, "",
 *   onHover: () => {},
 * }
 * @example <caption>Success Button <br/><strong>Rules:</strong> Used on Save, Continue, Confirm actions. </caption>
 * return (
 *   //NEW COMMENT
 *   <ButtonPrimary text={"Success"} action={"success"} />
 * );
 * @component
 * @example <caption>Primary Button <br/><strong>Rules:</strong> Send Email, Sign Up, other primary actions that aren't calculator based or saving action. </caption>
 * return (
 *   <ButtonPrimary text={"Primary"} action={"primary"} />
 * );
 * @component
 * @example <caption>Delete Button <br/><strong>Rules:</strong> Used as destructive action (ex: Delete, Remove). </caption>
 * return (
 *   <ButtonPrimary text={"Delete"} action={"danger"} />
 * );
 * @return {node} - primary button
 */
const ButtonPrimary = _ref => {
  let {
    text,
    icon,
    buttonProps,
    action = "primary",
    size = "",
    condition = "",
    onClick,
    classNames
  } = _ref;
  const iconEl = icon !== "" ? /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-".concat(icon)
  }) : "";
  const sizeClass = size !== "" ? "is-" + size : "";
  const buttonClass = "has-background-" + action + " has-text-white-const";
  const conditionClass = condition !== "" ? "is-".concat(condition) : "";
  return /*#__PURE__*/_react.default.createElement("button", _extends({
    onClick: onClick,
    className: "button button-primary is-clickable ".concat(buttonClass, " ").concat(sizeClass, " ").concat(conditionClass, " ").concat(classNames || "")
  }, buttonProps), iconEl, " ", text);
};

ButtonPrimary.propTypes = {
  action: _propTypes.default.oneOf(["primary", "success", "danger"]),
  buttonProps: _propTypes.default.shape({
    onClick: _propTypes.default.func.isRequired
  }),
  condition: _propTypes.default.oneOf(["", "loading", "disabled"]),
  icon: _propTypes.default.string,
  size: _propTypes.default.string,
  text: _propTypes.default.string
};
ButtonPrimary.defaultProps = {
  action: "primary",
  icon: "",
  size: "",
  text: ""
};
var _default = ButtonPrimary;
exports.default = _default;