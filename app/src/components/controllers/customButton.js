const CustomButton = ({ text, handleClick }) => {
  return (
    <button className="bg-black rounded-md text-white font-medium px-4 py-2 hover:bg-teal-600" onClick={handleClick}>
      {text}
    </button>
  );
};

export default CustomButton;
