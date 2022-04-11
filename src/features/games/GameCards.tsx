import GameCard from "./GameCard";
import { GameInterface } from "../../app/interfaces";
import { motion, Variants } from "framer-motion";

type GameCardsProps = {
  games: Array<GameInterface>,
};

const GameCards = ({ games }: GameCardsProps) => {
  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {games && games.map(game => <GameCard key={game.id} game={game} />)}
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
      ease: "linear",
      duration: 0.5,
      staggerChildren: 0.075,
    },
  },
};

export default GameCards;