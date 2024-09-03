import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="font-mono">
      <div className="h-screen bg-[url('../chess-11.png')] bg-cover bg-center">
        <div className="flex justify-between px-8 py-2">
          <h1 className="text-black opacity-75 text-center font-bold text-2xl">
            ROOK{' '}&{' '}PAWN
          </h1>
          <button
            className="ml-20 text-white bg-[#050708] hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-transparent me-2 mb-2"
            onClick={() => {
              navigate("/game");
            }}
          >
            Play Online
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
