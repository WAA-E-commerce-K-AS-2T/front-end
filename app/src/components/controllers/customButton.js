const CustomButton = ({ text, handleClick }) => {
  return (
    <button className="bg-teal-400 rounded-full text-white font-bold px-4 py-2" onClick={handleClick}>
      {text}
    </button>
  );
};

export default CustomButton;
