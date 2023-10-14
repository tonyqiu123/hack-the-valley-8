import React, { useState } from 'react';
import '../css/Popover.css'
import OutsideClick from './OutsideClick';



const Popover = ({ isOpen: isOpenProp, setIsOpen: setIsOpenProp, children, position = 'down-center', ...props }) => {
    const [isOpenState, setIsOpenState] = useState(false);

    const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;
    const setIsOpen = setIsOpenProp !== undefined ? setIsOpenProp : setIsOpenState;

    const trigger = React.cloneElement(children[0], {
        onClick: () => setIsOpen(isOpen => !isOpen),
    });

    const content = children[1]
        ? React.cloneElement(children[1], {
            className: `popoverContent ${position} ${isOpen ? 'showPopoverContent' : ''} ${children[1].props.className}`
        })
        : null;

    return (
        <OutsideClick onClickOutside={() => setIsOpen(false)}>
            <div {...props} className={`${props.className ? props.className : ''} popover`}>
                {trigger}
                {content}
            </div>
        </OutsideClick>
    );
};

export default Popover;
