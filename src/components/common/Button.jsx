function Button({ text }) {
  return (
    <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
      {text}
    </button>
  );
}

export default Button;