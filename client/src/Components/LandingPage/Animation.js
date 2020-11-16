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
                <div className="text-center" style={styles.lightSpeedIn}>
                <h1>Discover Oasis</h1>
                <h2>Keep a Diary, One day it will keep you</h2>
                </div>
            </StyleRoot>
        )
    }
}
