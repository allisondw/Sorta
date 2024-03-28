import React from "react";
import "./SettingsPanel.scss";

interface SettingsPanelProps {
    handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChannelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDirectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    threshold: number;
    handleUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ threshold, handleColorChannelChange, handleDirectionChange, handleSliderChange, handleUpload, handleSave }) => {
    
    return (
        <div className="settings-panel">
            <div className="setting upload">
                <input type='file' onChange={handleUpload} className="btn__upload"/>
            </div>
            <div className="setting">
                <label htmlFor="threshold" className="label__threshold">Threshold</label><br />
                <input type="range" id="threshold" min="0" max="255" value={255 - threshold} onChange={handleSliderChange} className="btn__threshold"/>
                {/* <span id="thresholdValue">{255 - threshold}</span> */}
            </div>
            <div className="setting">
                <label htmlFor="colorChannel" className="label__color-channel">Color channel</label><br />
                <select id="colorChannel" onChange={handleColorChannelChange} className="btn__color-channel">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                </select>
            </div>
            <div className="setting">
                <label htmlFor="direction-horizontal" className="label__horizontal"><input id="direction-horizontal" type="radio" name="direction" value="horizontal" defaultChecked onChange={handleDirectionChange} className="btn__direction--horizontal"/> Horizontal</label>
                <label htmlFor="direction-vertical" className="label__vertical"><input id="direction-vertical" type="radio" name="direction" value="vertical" onChange={handleDirectionChange} className="btn__direction--vertical"/> Vertical</label>
            </div>
           
            <div className="setting save">
                <button onClick={handleSave} className="btn__save">Save Image as ...</button>
                <select id='imageFormatSelector' className="btn__format-selector">
                    <option value='image/jpeg'>JPEG</option>
                    <option value='image/png'>PNG</option>
                </select>
            </div>
        </div>
    )
};

export default SettingsPanel;
