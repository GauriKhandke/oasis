import React from 'react';
import { lightSpeedIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';


const styles = {

    lightSpeedIn: {
        animation: 'x 10s',
        animationName: Radium.keyframes(lightSpeedIn, 'lightSpeedIn')
    }
}
export default class Animation extends React.Component {
    render() {
        return (
            <StyleRoot>
                <div className="animation-center" style={styles.lightSpeedIn}>

                <h1>Allow your words to escape you.</h1>
                </div>
            </StyleRoot>
        )
    }
}
