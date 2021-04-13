const TypeLogo = ({ type }) => {
    return (
        <div className="d-flex flex-row">
            {type.map((val, id) => {
                return (
                    <div
                        className={`pokemon-type-badge ${val.type.name} mr-md-2 `}
                        key={id}
                    >
                        {val.type.name}
                    </div>
                );
            })}
        </div>
    );
};

export default TypeLogo;
