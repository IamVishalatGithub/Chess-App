function AnimatedButton({ onclick, display_text}) {
  return <button className="h-5 w-fit bg-black text-white" onClick={onclick}>{display_text}</button>;
}

export default AnimatedButton;
