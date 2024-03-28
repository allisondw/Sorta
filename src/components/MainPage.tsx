import React, { useState } from 'react';
import "./MainPage.scss";
import { sortPixels } from "../utils/pixelSorter"
import { ColorChannel, Direction } from '../actions/imageActions';
import SettingsPanel from './SettingsPanel/SettingsPanel';


const MainPage: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);
    const [threshold, setThreshold] = useState(255);
    const [colorChannel, setColorChannel] = useState<ColorChannel | undefined>(ColorChannel.None)
    const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    if (!canvas) return;
                    const ctx = canvas?.getContext('2d');
                    
                    canvas.width = img.width;
                    canvas.height = img.height;
    
                    ctx?.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = ctx?.getImageData(0, 0, img.width, img.height);
                    if (imageData) {
                        setOriginalImageData(imageData);
                    }
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const applySort = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas?.getContext('2d', { willReadFrequently: true });
        if (ctx && originalImageData) {
            const imageDataCopy = new Uint8ClampedArray(originalImageData.data);
            const copiedImageData = new ImageData(imageDataCopy, originalImageData.width, originalImageData.height)
            if(copiedImageData) {
                sortPixels(copiedImageData, canvas.width, threshold, colorChannel, direction);
                ctx.putImageData(copiedImageData, 0, 0);
            }
        }
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = 255 - Number(event.target.value);
        setThreshold(newValue);
        applySort();
    };
    
    const handleColorChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newColorChannel = event.target.value as ColorChannel;
        setColorChannel(newColorChannel);
        applySort();
    }
    const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDirection = event.target.value as Direction;
        setDirection(newDirection);
        applySort();
    }

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
            <section className='canvas-area'>
                <canvas ref={canvasRef} id='imageCanvas'></canvas>
                <SettingsPanel 
                    threshold = {threshold}
                    handleSliderChange={handleSliderChange}
                    handleColorChannelChange={handleColorChannelChange}
                    handleDirectionChange={handleDirectionChange}
                    handleUpload={handleUpload}
                    handleSave={handleSave}
                />
            </section>
            
        </div>
    );
};

export default MainPage;