import React from "react";
import PropTypes from "prop-types";

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
const ButtonPrimary = ({
    text,
    icon,
    buttonProps,
    action = "primary",
    size = "",
    condition = "",
    onClick,
    classNames
}) => {
    const iconEl = icon !== "" ? <i className={`fa fa-${icon}`} /> : "";
    const sizeClass = size !== "" ? "is-" + size : "";
    const buttonClass = "has-background-" + action + " has-text-white-const";
    const conditionClass = condition !== "" ? `is-${condition}` : "";
    return (
        <button
            onClick={onClick}
            className={`button button-primary is-clickable ${buttonClass} ${sizeClass} ${conditionClass} ${
                classNames || ""
            }`}
            {...buttonProps}
        >
            {iconEl} {text}
        </button>
    );
};

ButtonPrimary.propTypes = {
    action: PropTypes.oneOf(["primary", "success", "danger"]),
    buttonProps: PropTypes.shape({
        onClick: PropTypes.func.isRequired
    }),
    condition: PropTypes.oneOf(["", "loading", "disabled"]),
    icon: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string
};

ButtonPrimary.defaultProps = {
    action: "primary",
    icon: "",
    size: "",
    text: ""
};

export default ButtonPrimary;
