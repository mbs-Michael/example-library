"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentBlockFooter = exports.ContentBlockBody = exports.ContentBlockHeader = exports.ContentBlock = void 0;

require("core-js/modules/es.string.includes.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

const _excluded = ["style", "orientation", "padding", "className", "hideOverflow", "bottomMargin"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * @function ContentBlock
 * @description Content Block decorator component to organize children components.
 * @category Content
 * @component
 * @example
 * return(
 *   <ContentBlock style={"card"}>Children here</ContentBlock>
 * );
 * @param {object} props
 * @param {string} props.style Style of content block, will expand on options. For now, only card.
 * - "card"
 * @param {string} props.orientation - if you want the block to be horizontal. Default is vertical
 * @param {number} props.padding - number of the padding size you want on the content block.
 * @param {string} props.className - any additional classes you want on the ContentBlock container
 * @return {node} - returns content block with children you pass in.
 */
const ContentBlock = props => {
  const {
    style,
    orientation,
    padding,
    className,
    hideOverflow,
    bottomMargin
  } = props,
        other = _objectWithoutProperties(props, _excluded);

  const children = _react.default.Children.toArray(props.children).filter(f => f.type !== "div");

  const isHorizontal = orientation === "horizontal";
  const header = children.filter(f => f.type.displayName && f.type.displayName.includes("Header")).map(m => {
    const newPadding = m.props.padding < 0 ? padding : m.props.padding;
    return /*#__PURE__*/_react.default.cloneElement(m, {
      isHorizontal: isHorizontal,
      padding: newPadding
    }, m.props.children);
  });
  const body = children.filter(f => f.type.displayName && f.type.displayName.includes("Body")).map(m => {
    const newPadding = m.props.padding < 0 ? padding : m.props.padding;
    return /*#__PURE__*/_react.default.cloneElement(m, {
      padding: newPadding,
      isHorizontal: isHorizontal
    }, m.props.children);
  });
  const footer = children.filter(f => f.type.displayName && f.type.displayName.includes("Footer")).map(m => {
    const newPadding = m.props.padding < 0 ? padding : m.props.padding;
    return /*#__PURE__*/_react.default.cloneElement(m, {
      padding: newPadding
    }, m.props.children);
  });
  const overlay = children.filter(f => f.type.displayName && f.type.displayName.includes("BackgroundImage")).map(m => {
    return /*#__PURE__*/_react.default.cloneElement(m, m.props, [...header, ...body, ...footer]);
  });
  const otherChildren = children.filter(f => f.type.displayName && !f.type.displayName.includes("ContentBlock") && !f.type.displayName.includes("BackgroundImage")).map(m => {
    return /*#__PURE__*/_react.default.cloneElement(m, m.props);
  });
  const textClass = overlay.length > 0 ? "has-text-white-const" : "";
  const overFlowClass = hideOverflow ? "is-clipped" : "";
  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "content-block content-block_container ".concat(style, " ").concat(orientation, " ").concat(className, " \n            columns ").concat(isHorizontal ? "is-wrapped" : "is-direction-stack", " ").concat(textClass, " ").concat(overFlowClass, " has-margin-bottom-size-").concat(bottomMargin, " is-mobile")
  }, other), otherChildren, overlay.length > 0 ? [...overlay] : [...header, ...body, ...footer]);
};
/**
 * @function ContentBlockHeader
 * @description Header block inside the ContentBlock parent. Usually stores <HeaderText /> or Images.
 * @category Content
 * @component
 * @example
 * return(
 *   <ContentBlockHeader>Children here</ContentBlockHeader>
 * );
 * @prop {number} size - needs size of header div if your content block is horizontal orientation.
 * Defaults to is-4
 * @return {node} - returns content block header with children you pass in.
 */


exports.ContentBlock = ContentBlock;

const ContentBlockHeader = props => {
  const {
    children,
    padding,
    size,
    isHorizontal,
    className
  } = props;
  const sizeClass = isHorizontal ? "is-".concat(size) : "is-12";
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "content-block_header column ".concat(sizeClass, " has-padding-size-").concat(padding, " ").concat(className)
  }, children);
};
/**
 * @function ContentBlockBody
 * @description Body block inside the ContentBlock parent. Usually stores main content like chart, text, etc.
 * @category Content
 * @component
 * @example
 * return(
 *   <ContentBlockBody>Children here</ContentBlockBody>
 * );
 * @return {node} - returns content block body with children you pass in.
 */


exports.ContentBlockHeader = ContentBlockHeader;

const ContentBlockBody = props => {
  const {
    children,
    padding,
    size,
    isHorizontal,
    className
  } = props;
  const sizeClass = isHorizontal ? "is-".concat(size) : "";
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "content-block_body column ".concat(sizeClass, " ").concat(padding >= 0 && "has-padding-size-".concat(padding), " ").concat(className)
  }, children);
};
/**
 * @function ContentBlockFooter
 * @description Body block inside the ContentBlock parent. Usually stores buttons, links and similar actions.
 * @category Content
 * @component
 * @example
 * return(
 *   <ContentBlockFooter>Children here</ContentBlockFooter>
 * );
 * @return {node} - returns content block footer with children you pass in.
 */


exports.ContentBlockBody = ContentBlockBody;

const ContentBlockFooter = props => {
  const {
    children,
    padding,
    className
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "content-block_footer column is-12 ".concat(padding >= 0 && "has-padding-size-".concat(padding), " ").concat(className)
  }, children);
};

exports.ContentBlockFooter = ContentBlockFooter;
const defaultVals = {
  className: "",
  bottomMargin: 7
};
ContentBlock.defaultProps = Object.assign(defaultVals, {
  hideOverflow: false,
  orientation: "vertical",
  padding: 7,
  style: ""
});
ContentBlockHeader.defaultProps = {
  className: "",
  padding: -1,
  size: 4
};
ContentBlockBody.defaultProps = {
  className: "",
  padding: -1,
  size: 8
};
ContentBlockFooter.defaultProps = Object.assign(defaultVals, {
  padding: -1
});
ContentBlock.displayName = "ContentBlock";
ContentBlockHeader.displayName = "ContentBlockHeader";
ContentBlockBody.displayName = "ContentBlockBody";
ContentBlockFooter.displayName = "ContentBlockFooter";