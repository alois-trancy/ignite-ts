import { PlatformInterface } from "../../app/interfaces";
import apple from "../../img/apple.svg";
import gamepad from "../../img/gamepad.svg";
import nintendo from "../../img/nintendo.svg";
import playstation from "../../img/playstation.svg";
import steam from "../../img/steam.svg";
import xbox from "../../img/xbox.svg";

type PlatformsProps = {
  platforms: Array<PlatformInterface>,
};

const Platforms = ({ platforms }: PlatformsProps) => {
  const availablePlatforms: {
    playstation: {
      logo: string,
      names: Array<string>,
    },
    xbox: {
      logo: string,
      names: Array<string>,
    },
    steam: {
      logo: string,
      names: Array<string>,
    },
    nintendo: {
      logo: string,
      names: Array<string>,
    },
    apple: {
      logo: string,
      names: Array<string>,
    },
    gamepad: {
      logo: string,
      names: Array<string>,
    },
  } = {
    playstation: {
      logo: playstation,
      names: [],
    },
    xbox: {
      logo: xbox,
      names: [],
    },
    steam: {
      logo: steam,
      names: [],
    },
    nintendo: {
      logo: nintendo,
      names: [],
    },
    apple: {
      logo: apple,
      names: [],
    },
    gamepad: {
      logo: gamepad,
      names: [],
    },
  };

  let platformsToDisplay: Array<JSX.Element> = [];
  platforms.forEach((platform) => {
    switch (platform.name.toLowerCase()) {
      case "xbox series s/x":
      case "xbox one":
      case "xbox 360":
      case "xbox": availablePlatforms.xbox.names.push(platform.name); break;
      case "playstation 5":
      case "playstation 4":
      case "playstation 3":
      case "playstation 2":
      case "playstation 1":
      case "playstation": availablePlatforms.playstation.names.push(platform.name); break;
      case "nintendo switch":
      case "wii u":
      case "wii":
      case "nintendo": availablePlatforms.nintendo.names.push(platform.name); break;
      case "web":
      case "pc": availablePlatforms.steam.names.push(platform.name); break;
      case "macos": availablePlatforms.apple.names.push(platform.name); break;
      default: availablePlatforms.gamepad.names.push(platform.name); break;
    }
  });

  for (const [key, value] of Object.entries(availablePlatforms)) {
    if (value.names.length > 0) {
      platformsToDisplay.push(
        <div className="flex items-center my-2" key={key}>
          <img className="object-cover h-8 mr-4" src={value.logo} alt={key} key={key} />
          <div className="font-light">{value.names.join(", ")}</div>
        </div>
      )
    }
  }

  return <>{platformsToDisplay}</>;
};

export default Platforms;