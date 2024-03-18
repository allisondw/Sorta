import React from 'react';
import "./MainPage.scss";
import { sortPixels } from '../utils/pixelSorter';
import { useDispatch, useSelector } from 'react-redux';
import { setThreshold, setColorChannel, setDirection, setOriginalImageData, Threshold, ColorChannel, Direction } from '../actions/imageActions';
import SettingsPanel from './SettingsPanel/SettingsPanel';
import { RootState } from '../app/store';

const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [originalImageData, setOriginalImageData] = React.useState<ImageData | null>(null);

    const currentThreshold = useSelector((state: RootState) => state.image?.threshold ?? 50);
    const currentColorChannel = useSelector((state: RootState) => state.image?.colorChannel ?? ColorChannel.None);
    const currentDirection: Direction = useSelector((state: RootState) => state.image?.direction ?? 'horizontal') as Direction;

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = canvasRef.current;
                    if(!canvas) return;
                    const ctx = canvas?.getContext('2d');
                    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height) as ImageData;
                    dispatch(setOriginalImageData(imageData));
                    
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
    const applySort = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas?.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            sortPixels(imageData.data, canvas.width, currentThreshold, currentColorChannel, currentDirection);
            ctx.putImageData(imageData, 0, 0);
        }
    };
    

    const handleThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newThreshold = Number(event.target.value);
        dispatch(setThreshold(newThreshold));
        applySort();
    }
    const handleColorChannelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newColorChannel = event.target.value as ColorChannel;
        dispatch(setColorChannel(newColorChannel));
        applySort();
    }
    const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDirection = event.target.value as Direction;
        dispatch(setDirection(newDirection));
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
            <canvas ref={canvasRef} id='imageCanvas'></canvas>
            <SettingsPanel 
                handleThresholdChange={handleThresholdChange}
                handleColorChannelChange={handleColorChannelChange}
                handleDirectionChange={handleDirectionChange}
            />
            <div className='basic-settings'>
                <input type='file' onChange={handleUpload} />
                {/* <button onClick={handleGlitch}>Glitch</button> */}
                <button onClick={handleSave}>Save Image as ...</button>
                <select id='imageFormatSelector'>
                    <option value='image/jpeg'>JPEG</option>
                    <option value='image/png'>PNG</option>
                </select>
            </div>
        </div>
    );
};

export default MainPage;