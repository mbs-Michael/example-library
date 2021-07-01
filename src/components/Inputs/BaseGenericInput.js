import React from "react";

/**
 * @param {*} props
 * @param {string} props.className class for outermost div
 * @param {JSX.Element} props.label input label
 * @param {JSX.Element|string} props.helpLabel input help label
 * @param {*} props.children
 */
const BaseGenericInput = ({ className, label, helpLabel, children }) => (
    <div className={className}>
        {label && (
            <div className="field-label is-normal">
                {label}
                {helpLabel && <div className="help">{helpLabel}</div>}
            </div>
        )}
        <div className="field-body">{children}</div>
    </div>
);

export default BaseGenericInput;
