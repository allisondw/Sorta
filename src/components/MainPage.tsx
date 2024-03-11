import React from 'react';
import "./MainPage.scss";
import { sortPixelsSimple } from '../utils/pixelSorter';


const MainPage: React.FC = () => {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
                    const ctx = canvas.getContext('2d');
                    
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;

                    const maxWidth = viewportWidth * 0.5;
                    const maxHeight = viewportHeight * 0.5;

                    const scale = Math.min(maxWidth / img.width, maxHeight / img.height);

                    const scaledWidth = img.width * scale;
                    const scaledHeight = img.height * scale;

                    canvas.width = scaledWidth;
                    canvas.height = scaledHeight;
                    ctx?.drawImage(img, 0, 0, scaledWidth, scaledHeight);
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
    const handleGlitch = () => {
        const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            sortPixelsSimple(imageData.data, canvas.width);
        }
    };
    const handleSave = () => {
        const formatSelector = document.getElementById('imageFormatSelector') as HTMLSelectElement;
        const selectedFormat = formatSelector.value;
        const canvas = document.getElementById('imageCanvas') as HTMLCanvasElement;
        const imageDataUrl = canvas.toDataURL(selectedFormat);
        const link = document.createElement('a');
        const fileExtension = selectedFormat.split('/')[1];
        
        link.download = `processed-image.${fileExtension}`;
        link.href = imageDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='main-container'>
            <h1>Sorta</h1>
            <canvas id='imageCanvas'></canvas>
            <input type='file' onChange={handleUpload} />
            <button onClick={handleGlitch}>Glitch</button>
            <button onClick={handleSave}>Save Image as ...</button>
            <select id='imageFormatSelector'>
                <option value='image/jpeg'>JPEG</option>
                <option value='image/png'>PNG</option>
            </select>
        </div>
    );
};

export default MainPage;