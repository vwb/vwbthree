export const Badge = props => {
    return (
        <div
            style={{
                height: "14px",
                width: "14px",
                borderRadius: "50%",
                backgroundColor: "red",
                position: "absolute",
                top: "-2px",
                right: "-2px"
            }}
        >
            {props.children}
        </div>
    );
};
