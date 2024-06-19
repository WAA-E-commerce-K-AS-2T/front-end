const Filter = () => {
  const filters = [
    { name: "Category", values: [] },
    { name: "Color", values: [] },
    { name: "Size", values: [] },
    { name: "Material", values: [] },
    { name: "Category", values: [] },
    { name: "Brand", values: [] },
  ];

  return (
    <div className=" top-0 left-0 z-40 w-64 h-screen border-black border-solid border-r-[1px] transition-transform -translate-x-full sm:translate-x-0">
      {filters.map((i) => {
        <div>{i.name}</div>;
      })}
    </div>
  );
};
export default Filter;
