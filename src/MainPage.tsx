import React from 'react';

const MainPage: React.FC = () => {
    const handleUpload = () => {
        console.log('upload');
    };
    const handleGlitch = () => {
        console.log('glitch');
    };
    const handleSave = () => {
        console.log('save');
    };
    
    return(
        <div>
            <h1>Sorta</h1>
            <canvas id='imageCanvas'></canvas>
            <input type='file' onChange={handleUpload} />
            <button onClick={handleGlitch}>Glitch</button>
            <button onClick={handleSave}>Save Image</button>
        </div>
    );
};

export default MainPage;