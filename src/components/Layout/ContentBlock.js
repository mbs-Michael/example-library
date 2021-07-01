import React from "react";

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
export const ContentBlock = (props) => {
    const { style, orientation, padding, className, hideOverflow, bottomMargin, ...other } = props;
    const children = React.Children.toArray(props.children).filter((f) => f.type !== "div");
    const isHorizontal = orientation === "horizontal";
    const header = children
        .filter((f) => f.type.displayName && f.type.displayName.includes("Header"))
        .map((m) => {
            const newPadding = m.props.padding < 0 ? padding : m.props.padding;
            return React.cloneElement(
                m,
                { isHorizontal: isHorizontal, padding: newPadding },
                m.props.children
            );
        });
    const body = children
        .filter((f) => f.type.displayName && f.type.displayName.includes("Body"))
        .map((m) => {
            const newPadding = m.props.padding < 0 ? padding : m.props.padding;
            return React.cloneElement(
                m,
                { padding: newPadding, isHorizontal: isHorizontal },
                m.props.children
            );
        });
    const footer = children
        .filter((f) => f.type.displayName && f.type.displayName.includes("Footer"))
        .map((m) => {
            const newPadding = m.props.padding < 0 ? padding : m.props.padding;
            return React.cloneElement(m, { padding: newPadding }, m.props.children);
        });
    const overlay = children
        .filter((f) => f.type.displayName && f.type.displayName.includes("BackgroundImage"))
        .map((m) => {
            return React.cloneElement(m, m.props, [...header, ...body, ...footer]);
        });
    const otherChildren = children
        .filter(
            (f) =>
                f.type.displayName &&
                !f.type.displayName.includes("ContentBlock") &&
                !f.type.displayName.includes("BackgroundImage")
        )
        .map((m) => {
            return React.cloneElement(m, m.props);
        });
    const textClass = overlay.length > 0 ? "has-text-white-const" : "";
    const overFlowClass = hideOverflow ? "is-clipped" : "";
    return (
        <div
            className={`content-block content-block_container ${style} ${orientation} ${className} 
            columns ${
                isHorizontal ? "is-wrapped" : "is-direction-stack"
            } ${textClass} ${overFlowClass} has-margin-bottom-size-${bottomMargin} is-mobile`}
            {...other}
        >
            {otherChildren}
            {overlay.length > 0 ? [...overlay] : [...header, ...body, ...footer]}
        </div>
    );
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
export const ContentBlockHeader = (props) => {
    const { children, padding, size, isHorizontal, className } = props;
    const sizeClass = isHorizontal ? `is-${size}` : "is-12";
    return (
        <div className={`content-block_header column ${sizeClass} has-padding-size-${padding} ${className}`}>
            {children}
        </div>
    );
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
export const ContentBlockBody = (props) => {
    const { children, padding, size, isHorizontal, className } = props;
    const sizeClass = isHorizontal ? `is-${size}` : "";
    return (
        <div
            className={`content-block_body column ${sizeClass} ${
                padding >= 0 && `has-padding-size-${padding}`
            } ${className}`}
        >
            {children}
        </div>
    );
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
export const ContentBlockFooter = (props) => {
    const { children, padding, className } = props;
    return (
        <div
            className={`content-block_footer column is-12 ${
                padding >= 0 && `has-padding-size-${padding}`
            } ${className}`}
        >
            {children}
        </div>
    );
};

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
