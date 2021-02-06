import React from "react";

export const Expand = props => {
    const [isExpanded, setExpanded] = React.useState(!!props.defaultExpanded);

    return (
        <>
            {props.renderHeader(isExpanded, setExpanded)}
            {isExpanded && props.children}
        </>
    );
};
