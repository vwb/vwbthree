import { Heading as ReactEmailHeading } from "@react-email/components";

export const Heading = props => {
    return <ReactEmailHeading style={h1}>{props.children}</ReactEmailHeading>;
};

const h1 = {
    color: "#333",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0"
};
