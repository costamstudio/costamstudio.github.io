import * as React from "react";

import "./Home.component.scss";
import { CosArt } from "./CosArt/CosArt.component";
import { CosText } from "./CosText/CosText.component";
import { TamArt } from "./TamArt/TamArt.component";
import { TamText } from "./TamText/TamText.component";
import { Contact } from "./Contact/Contact.component";
import { CosTamVideo } from "./CosTamVideo/CosTamVideo.component";
import { MissionText } from "./MissionText/MissionText.component";
import { AboutText } from "./AboutText/AboutText.component";
import { CosVideo } from "./CosVideo/CosVideo.component";

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
    cosTamVideo: HTMLVideoElement | null;
    cosVideo: HTMLVideoElement | null;
}

export const Home = ({ scrollPosition, appHeight, appWidth, cosTamVideo, cosVideo }: Props) => {
    return (
        <div className="home">
            <CosVideo scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth} cosVideo={cosVideo}/>
            <CosArt scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth}/>
            <CosText scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth}/>
            <TamArt scrollPosition={scrollPosition}  appHeight={appHeight}/>
            <TamText scrollPosition={scrollPosition}  appHeight={appHeight}/>
            <CosTamVideo scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth} cosTamVideo={cosTamVideo}/>
            <MissionText scrollPosition={scrollPosition}  appHeight={appHeight} appWidth={appWidth}/>
            <AboutText scrollPosition={scrollPosition}  appHeight={appHeight} appWidth={appWidth}/>
            <Contact scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth}/>
        </div>
    );
};