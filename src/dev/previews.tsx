import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Attachments from "../components/home/Attachments";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Attachments">
                <Attachments/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;