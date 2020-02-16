const Card = ({ children, onClick }) => {
    return (
        <div className="shadow hover:shadow-md transition-all duration-100">
            {children}
        </div>
    );
};

export default Card;
