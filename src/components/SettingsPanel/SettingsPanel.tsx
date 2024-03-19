import React from "react";
import "./SettingsPanel.scss";

interface SettingsPanelProps {
    handleSliderChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChannelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDirectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    threshold: number;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ threshold, handleColorChannelChange, handleDirectionChange, handleSliderChange }) => {
    
    return (
        <div className="settings-panel">
            <div className="setting">
                <fieldset>
                        <legend>Threshold: </legend>
                    <label htmlFor="threshold">Threshold:</label>
                    <input type="range" id="threshold" min="0" max="255" value={255 - threshold} onChange={handleSliderChange} />
                    <span id="thresholdValue">{255 - threshold}</span>
                </fieldset>
            </div>
            <div className="setting">
                <fieldset>
                        <legend>Color Channel: </legend>
                    <label htmlFor="colorChannel">Color Channel:</label>
                    <select id="colorChannel" onChange={handleColorChannelChange}>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                    </select>
                </fieldset>
            </div>
            <div className="setting">
                <fieldset>
                    <legend>Direction: </legend>
                    <label><input type="radio" name="direction" value="horizontal" defaultChecked onChange={handleDirectionChange}/> Horizontal</label>
                    <label><input type="radio" name="direction" value="vertical" onChange={handleDirectionChange}/> Vertical</label>
                </fieldset>
            </div>
        </div>
    )
};

export default SettingsPanel;
