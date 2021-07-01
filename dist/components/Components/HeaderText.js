"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeaderText;

var _react = _interopRequireDefault(require("react"));

var _Popover = require("./Popover");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function HeaderText
 * @description Create Header Text Container
 * @category Typography
 * @component
 * @example <caption>Header element for all content types.<br/>
 * <strong>Types</strong>
 * <ul>
 *   <li>Hero</li>
 *   <li>Section</li>
 *   <li>Subsection</li>
 *   <li>Card</li>
 *   <li>Small</li>
 *   <li>Default</li>
 * </ul>
 * </caption>
 * return(
 *   <HeaderText type={"card"} main={"Main"} pre={"01/14/20"} sub={"Sub"} />
 * );
 * @param {Object} props - { type, main, pre, sub, sub2, icon, iconClick }
 * @param {string} props.type Type of the header
 * Small to big:
 * - small
 * - default
 * - card
 * - subsection
 * - section
 * - hero
 * @param {string} props.position Defaulted to left.
 * - center
 * - right
 * @param {string} props.main Main text to display.
 * @param {string} props.sub Sub text to display. Shows smaller, beneath the Main text.
 * @param {string} props.sub2 Second sub text to show beneath the sub, but same size.
 * @param {string} props.pre Pre text to show. Smaller, all caps and grey, above Main text.
 * @param {string} props.icon Font awesome icon to show.
 * @param {function} props.iconClick Function to run on click of the icon
 * @param {function} props.iconPopover Popover div to show on hover of the icon. If not supplied there will be no popover.
 * @param {Boolean} props.emptyMain If the main prop is empty.
 * @param {Boolean} props.emptyPre If the pre prop is empty
 * @param {Boolean} props.emptySub If the sub prop is empty
 * @param {Boolean} props.emptySub2 If the sub2 prop is empty
 * @param {number} props.bottomPadding Amount of padding below
 * @param {string} props.className Any addition classes to add.
 * @param {string} props.dontCapitalize Removes the `text-transform: capitalize;` on the main text.  **Default false**
 * @return {node} - Header container with ordered headers
 */
function HeaderText(props) {
  const {
    type = "default",
    main,
    pre,
    sub = "",
    sub2,
    icon,
    iconClick,
    iconPopover,
    emptyMain,
    emptyPre,
    emptySub,
    emptySub2,
    bottomPadding,
    position,
    className,
    dontCapitalize
  } = props; //going to put check in so we can replace certain things with smaller text.
  // const mainCheck = ["Yrs", "Mos"];
  // const newMain = main.includes(...mainCheck) ? main.replace({...mainCheck}, `<small>Test</small>`) : main;

  const padClass = bottomPadding >= 0 ? "has-padding-bottom-size-".concat(bottomPadding) : "";
  const posClass = position === "center" ? "has-text-centered" : position === "right" ? "has-text-right" : "";
  const noCaps = dontCapitalize ? "not-capitalized" : "";
  let mainElement;
  const mainElementClassName = "main ".concat(noCaps, " ").concat(emptyPre ? "emptyPre" : "", " ").concat(emptySub ? "emptySub" : "");

  switch (type) {
    case "small":
      mainElement = /*#__PURE__*/_react.default.createElement("h5", {
        className: mainElementClassName
      }, main);
      break;

    case "card":
      mainElement = /*#__PURE__*/_react.default.createElement("h4", {
        className: mainElementClassName
      }, main);
      break;

    case "subsection":
      mainElement = /*#__PURE__*/_react.default.createElement("h3", {
        className: mainElementClassName
      }, main);
      break;

    case "section":
      mainElement = /*#__PURE__*/_react.default.createElement("h2", {
        className: mainElementClassName
      }, main);
      break;

    case "hero":
      mainElement = /*#__PURE__*/_react.default.createElement("h1", {
        className: mainElementClassName
      }, main);
      break;

    case "default":
      mainElement = /*#__PURE__*/_react.default.createElement("p", {
        className: mainElementClassName
      }, main);
      break;

    default:
      break;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "header header-".concat(type, " ").concat(padClass, " ").concat(posClass, " ").concat(className)
  }, pre !== "" && /*#__PURE__*/_react.default.createElement("div", {
    className: "pre"
  }, pre), main !== "" && mainElement, sub && /*#__PURE__*/_react.default.createElement("div", {
    className: "sub ".concat(emptyMain ? "emptyMain" : "", " ").concat(emptySub2 ? "emptySub2" : "")
  }, sub), sub2 !== "" && /*#__PURE__*/_react.default.createElement("div", {
    className: "sub"
  }, sub2), icon !== "" && iconPopover !== null ? /*#__PURE__*/_react.default.createElement("div", {
    className: "is-fullDiv"
  }, /*#__PURE__*/_react.default.createElement(_Popover.Popover, {
    trigger: "hover",
    position: "right",
    popoverComponent: iconPopover
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-".concat(icon, " icon is-export-hidden"),
    onClick: iconClick
  }))) : icon !== "" ? /*#__PURE__*/_react.default.createElement("i", {
    className: "fa fa-".concat(icon, " icon is-export-hidden"),
    onClick: iconClick
  }) : "");
}

HeaderText.defaultProps = {
  className: "",
  bottomPadding: 7,
  emptyMain: false,
  emptyPre: false,
  emptySub: false,
  emptySub2: false,
  icon: "",
  iconClick: null,
  iconPopover: null,
  main: "",
  pre: "",
  sub: "",
  sub2: "",

  /** "center" || "right". Defaulted to "left" */
  position: "left"
};