import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

const Emoji = () => {
    
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };

    return (
        <>
            {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
                    <span>No emoji Chosen</span>
                )}
            <Picker onEmojiClick={onEmojiClick} />
        </>
    )

}


export default Emoji;
