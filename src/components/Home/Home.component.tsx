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

interface Props {
    scrollPosition: number;
    appHeight: number;
    appWidth: number;
    cosTamVideo: HTMLVideoElement | null;
}

export const Home = ({ scrollPosition, appHeight, appWidth, cosTamVideo }: Props) => {
    return (
        <div className="home">
            <CosArt scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth}/>
            <CosText scrollPosition={scrollPosition}/>
            <TamArt scrollPosition={scrollPosition} appHeight={appHeight}/>
            <TamText scrollPosition={scrollPosition} appHeight={appHeight}/>
            <CosTamVideo scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth} cosTamVideo={cosTamVideo}/>
            <MissionText scrollPosition={scrollPosition}/>
            <AboutText scrollPosition={scrollPosition}/>
            <Contact scrollPosition={scrollPosition} appHeight={appHeight} appWidth={appWidth}/>
        </div>
    );
};