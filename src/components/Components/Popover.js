import React from "react";
import { ContentBlock, ContentBlockHeader, ContentBlockBody } from "../Layout/ContentBlock";
import { ButtonPrimary } from "../Buttons/Buttons";
import HeaderText from "../Components/HeaderText";

export const PopoverContext = React.createContext();
/**
 * @class Popover
 * @classdesc Popover takes in position, trigger, children (the surrounding div), and popover component
 * @param {string} position position of the popover when it opens.
 * @param {string} trigger when the popover should display (ex: click, focus, etc)
 * @param {string} isFullWidth Whether or not the popover div should expand to the full width. If false,
 * sets he display: inline-block;  **Default true**
 * @param {string} size size of the popover (Ex: *small, medium, large*) **Default medium**
 * @param {Node} children the component that will contain the popover.
 * @param {Node} popoverComponent the popover component itself.
 */
export class Popover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
        this.outerDiv = React.createRef();
        this.popover = React.createRef();
        this.popoverWrapper = React.createRef();
    }

    /**
     * @function
     * @description scroll on mobile when the popover goes full width
     * @param {object} e - Event Object
     */
    preventScroll = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    openPopover = () => {
        this.setState({ isActive: true }, this.setPosition);
    };

    /**
     * @function
     * @description sets active state to false, closing the popover
     */
    closePopover = () => {
        this.setState({ isActive: false });
        document.body.removeEventListener("touchmove", this.preventScroll);
        document.removeEventListener("click", this.checkClose);
    };

    /**
     * @function
     * @description sets active state to false, closing the popover
     * @param {element} - element
     * @returns {bool} - returns true or false depending on if a passed in element is inside this popover element
     */
    isElementInsidePopover = (element) => {
        const body = document.getElementsByTagName("body")[0];
        if (element === this.popoverWrapper.current) {
            return true;
        } else if (element === body || element === document.documentElement) {
            return false;
        } else if (element) {
            return this.isElementInsidePopover(element.parentNode);
        }
    };

    /**
     * @function
     * @description make a check whether or not we need to close popover
     * @param {object} e - Event object
     */
    checkClose = (e) => {
        if (!this.isElementInsidePopover(e.target)) {
            this.setState({ isActive: false });
            document.body.classList.remove("has-overlay");
            document.body.removeEventListener("touchmove", this.preventScroll);
            document.removeEventListener("click", this.checkClose);
            document.removeEventListener("focusin", this.checkClose);
        }
    };

    /**
     * @function
     * @description sets position of the popover
     * @param {object} e - Event Object
     */
    setPosition = (e) => {
        const { position, trigger } = this.props;
        const popoverHeight = this.popover.current.clientHeight;
        const popoverWidth = this.popover.current.clientWidth;
        const outerCompHeight = this.outerDiv.current.clientHeight;
        const outerCompWidth = this.outerDiv.current.clientWidth;
        //assigns position if not in mobile view.
        if (window.innerWidth > 768) {
            if (position === "left") {
                this.popover.current.style.top = outerCompHeight / 2 - popoverHeight / 2 + "px";
                this.popover.current.style.left = -popoverWidth + "px";
            } else if (position === "top") {
                this.popover.current.style.top = -popoverHeight + "px";
                this.popover.current.style.left = outerCompWidth / 2 - popoverWidth / 2 + "px";
            } else if (position === "right") {
                this.popover.current.style.top = outerCompHeight / 2 - popoverHeight / 2 + "px";
                this.popover.current.style.left = outerCompWidth + "px";
            } else {
                this.popover.current.style.top = outerCompHeight + "px";
                this.popover.current.style.left = outerCompWidth / 2 - popoverWidth / 2 + "px";
            }
        } else {
            // document.body.classList.add("has-overlay");
            //document.body.addEventListener("touchmove", this.preventScroll);
        }

        if (this.state.isActive && trigger === "click") {
            document.addEventListener("click", this.checkClose);
        }
        if (this.state.isActive && trigger === "focus") {
            document.addEventListener("click", this.checkClose);
            document.addEventListener("focusin", this.checkClose);
        }
    };

    /**
     * @function
     * @description - If props.follow is true and trigger is hover, this function will allow the popover to follow the position of the mouse
     * @param {object} e - Event Object
     */
    followMouse = (e) => {
        const { position } = this.props;
        if (!this.props.follow) {
            return false;
        }
        const pos = this.outerDiv.current.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftDiff = mouseX - pos.x;
        const topDiff = mouseY - pos.y;
        const clientHeight = this.popover.current.clientHeight;
        const clientWidth = this.popover.current.clientWidth;
        if (this.state.isActive) {
            if (position === "top") {
                this.popover.current.style.top = topDiff - clientHeight - 25 + "px";
                this.popover.current.style.left = leftDiff - clientWidth / 2 + "px";
            } else {
                this.popover.current.style.top = topDiff + 25 + "px";
                this.popover.current.style.left = leftDiff - clientWidth / 2 + "px";
            }
        }
    };

    /**
     * @function
     * @description adds popover to component by wrapping
     * @returns {component} - returns static component wrapper around div that has events
     */
    outerComponent() {
        const { trigger } = this.props;
        let component;
        switch (trigger) {
            case "hover":
                component = (
                    <div
                        ref={this.outerDiv}
                        onMouseEnter={this.openPopover}
                        onMouseLeave={this.closePopover}
                        onMouseMove={this.followMouse}
                    >
                        {this.props.children}
                    </div>
                );
                break;
            case "focus":
                component = (
                    <div ref={this.outerDiv} onFocus={this.openPopover}>
                        {" "}
                        {this.props.children}{" "}
                    </div>
                );
                break;
            case "click":
                component = (
                    <div className="is-clickable" onClick={this.openPopover} ref={this.outerDiv}>
                        {this.props.children}
                    </div>
                );
                break;
            case "none":
                component = (
                    <div className="popover-label" ref={this.outerDiv}>
                        {this.props.children}
                    </div>
                );
        }
        return component;
    }

    render() {
        const { popoverComponent, position, isFullWidth, size } = this.props;
        const screenSize = window.innerWidth;

        let classNames = "is-relative";
        if (isFullWidth) {
            classNames += " is-fullWidth";
        } else {
            classNames += " is-inline-block";
        }
        return (
            <>
                <PopoverContext.Provider
                    value={{
                        closePopover: this.closePopover,
                        isActive: this.state.isActive,
                        openPopover: this.openPopover
                    }}
                >
                    <div className={classNames} ref={this.popoverWrapper}>
                        <div
                            ref={this.popover}
                            className={`popover-block is-mobile is-mobile-fullPage ${position} ${
                                this.state.isActive ? "" : "is-hidden"
                            } is-${size}`}
                        >
                            {screenSize < 768 && (
                                <>
                                    <ButtonPrimary
                                        icon={"times"}
                                        buttonProps={{
                                            onClick: () => {
                                                this.setState({ isActive: false });
                                            }
                                        }}
                                    />
                                </>
                            )}
                            <ContentBlock
                                style={"popover"}
                                bottomMargin={position === "right" || position === "left" ? "0" : "7"}
                                className={"is-fullHeight"}
                            >
                                {this.props.title && (
                                    <ContentBlockHeader>
                                        <HeaderText main={this.props.title} />
                                    </ContentBlockHeader>
                                )}
                                <ContentBlockBody>{popoverComponent}</ContentBlockBody>
                            </ContentBlock>
                            {screenSize > 768 && <div className={`arrow ${position}`} />}
                        </div>
                        {this.outerComponent()}
                    </div>
                </PopoverContext.Provider>
            </>
        );
    }
}

Popover.defaultProps = {
    follow: false,
    position: "top",
    trigger: "focus",
    isFullWidth: true,
    size: "medium"
};
