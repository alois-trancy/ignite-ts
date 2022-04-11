import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGameDetails, selectErrorState, selectLoadingState } from "./detailSlice";
import { DateTime } from "luxon";
import { smallImage } from "../../util";
import { StarIcon } from "@heroicons/react/solid";
import Platforms from "./Platforms";
import Loading from "../../components/Loading";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Carousel from "../../components/Carousel";

const GameDetail = () => {
  const { gameSlug } = useParams<"gameSlug">();
  const dispatch = useAppDispatch();
  const game = useAppSelector(state => state.detail.game);
  const isLoading = useAppSelector(selectLoadingState);
  const isError = useAppSelector(selectErrorState);

  useEffect(() => {
    dispatch(fetchGameDetails(gameSlug ?? ""));
  }, [dispatch, gameSlug]);

  const getImages = (): Array<string> => {
    let images = game.backgroundImage !== "" ?
      [
        smallImage(game.backgroundImage, 1280),
        ...game.screenshots.map((screenshot) => smallImage(screenshot, 1280))
      ] :
      [
        ...game.screenshots.map((screenshot) => smallImage(screenshot, 1280))
      ];
    images = [...new Set(images)];
    return images;
  }

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon className="w-5 h-5 text-yellow-400" key={`rating-star-${i}`} />);
      } else {
        stars.push(<StarIcon className="w-5 h-5 text-gray-500" key={`rating-star-${i}`} />);
      }
    }
    return stars;
  };

  const images = getImages();

  return (
    <AnimatePresence>
      {
        isLoading ?
          <Loading key="loading" /> :
          isError ?
            <>ERROR</> :
            game && (
              <motion.div
                className="flex-1 w-full p-4 mx-auto bg-white shadow max-w-7xl"
                variants={variants}
                initial="hidden"
                animate="visible"
              >
                {/* <div className={`flex flex-col md:flex-row md:mb-4 ${images.length > 1 ? "md:h-[30rem]" : "md:max-h-[30rem]"}`}> */}
                <div className={`flex flex-col md:flex-row md:mb-4 bg-red-500`}>
                  <div className="flex flex-col bg-green-500 md:w-3/5">
                    {/* <Carousel images={getImages()} /> */}
                    <motion.img
                      className="object-cover"
                      src={images[0]}
                      alt={images[0]} />
                    <motion.div className="hidden overflow-x-auto h-1/4 md:flex">
                      {images.map((image) => {
                        return <motion.img src={image} key={image} alt={image} className="object-cover max-h-full py-2 mx-1" />
                      })}
                    </motion.div>
                  </div>
                  <div className="my-4 bg-blue-500 md:pl-4 md:my-0 md:w-2/5">
                    <div className="grid grid-cols-3 gap-y-4">
                      <h2 className="col-span-3 font-semibold game-detail-title">{game.name}</h2>
                      <div>Released Date</div>
                      <div className="col-span-2 font-light">
                        {
                          game.releasedDate !== "" ? DateTime.fromFormat(game.releasedDate, "yyyy-MM-dd").toLocaleString(DateTime.DATE_FULL) : game.releasedDate
                        }
                      </div>
                      <div>Rating</div>
                      <div className="flex items-center col-span-2 font-light">
                        <span className="mr-4">{game.rating}</span>{getStars()}
                      </div>
                      <div>Publisher</div>
                      <div className="col-span-2 font-light">
                        {game.publishers.join(", ")}
                      </div>
                      <div>ESRB Rating</div>
                      <div className="col-span-2 font-light">
                        {game.esrbRating}
                      </div>
                      <div className="col-span-3">
                        <div className="mb-2">Platforms</div>
                        <div className="flex flex-col md:mb-4">
                          <Platforms platforms={game.platforms} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <p className="text-sm leading-8 text-justify">{game.descriptionRaw}</p>
              </motion.div >
            )
      }
    </AnimatePresence>
  );
};

const variants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};


export default GameDetail;