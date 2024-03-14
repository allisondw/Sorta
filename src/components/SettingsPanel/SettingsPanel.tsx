import "./SettingsPanel.scss";

interface SettingsPanelProps {
    handleThresholdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleColorChannelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleDirectionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ handleThresholdChange, handleColorChannelChange, handleDirectionChange }) => {
    return (
        <div className="settings-panel">
            <div className="setting">
                <fieldset>
                        <legend>Threshold: </legend>
                    <label htmlFor="threshold">Threshold:</label>
                    <input type="range" id="threshold" min="0" max="100" defaultValue="0" onChange={handleThresholdChange} />
                    <span id="thresholdValue">0</span>
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