

export default ({type}) => {

  return (
    <div className="mb-4 mt-4">
      <h3>Type</h3>
      <div className="d-flex flex-row">
          {
              type.map((val,id)=> {
                  return (
                      <div className={`pokemon-type-badge ${val.type.name} mr-md-2 `}>
                          {val.type.name}
                      </div>
                  )
              })
          }
      </div>
    </div>
  );
};
