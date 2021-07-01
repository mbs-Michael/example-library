import React from "react";
import { Popover } from "../Components/Popover";
import BaseGenericInput from "./BaseGenericInput";

const BaseInput = ({
    outerDivClass,
    innerDivClass,
    label,
    helpLabel,
    popoverRef,
    popoverProps,
    inputProps,
    icon,
    helpInput,
}) => (
    <BaseGenericInput
        className={outerDivClass}
        label={label}
        helpLabel={helpLabel}
    >
        <div className={innerDivClass}>
            <Popover ref={popoverRef} {...popoverProps}>
                <input className="is-hidden" />
                <input {...inputProps} />
                {icon}
            </Popover>
        </div>
        {helpInput && <div className="help">{helpInput}</div>}
    </BaseGenericInput>
);

export default BaseInput;
