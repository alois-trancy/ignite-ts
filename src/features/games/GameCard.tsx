import { DateTime } from "luxon"
import { useNavigate } from "react-router-dom";
import { GameInterface } from "../../app/interfaces";
import { motion, Variants } from "framer-motion"

type GameProps = {
  game: GameInterface,
};

const GameCard = ({ game }: GameProps) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="border-2 rounded-2xl shadow min-h-[30vh] text-center cursor-pointer overflow-hidden bg-white"
      onClick={() => navigate(`/game/${game.slug}`)}
      variants={variants}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="my-2 font-semibold">{game.name}</h3>
      <p className="my-2">
        {
          game.releasedDate !== null && game.releasedDate !== "" ? DateTime.fromFormat(game.releasedDate, "yyyy-MM-dd").toLocaleString(DateTime.DATE_FULL) : game.releasedDate
        }
      </p>
      <motion.img src={game.backgroundImage} className="object-cover h-[40vh] w-full" alt={game.name} loading="lazy" />
    </motion.div>
  );
};

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    }
  },
};

export default GameCard;