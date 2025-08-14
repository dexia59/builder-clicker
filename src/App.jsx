import React, { useState, useEffect } from 'react';

// Main App component for the clicker game
const App = () => {
    // Game state
    const [points, setPoints] = useState(0);
    const [pointsPerClick, setPointsPerClick] = useState(1);
    const [upgrades, setUpgrades] = useState([]);
    const [themesUnlocked, setThemesUnlocked] = useState(false);
    const [themes, setThemes] = useState([]);
    const [appliedTheme, setAppliedTheme] = useState('');
    const [upgradesHidden, setUpgradesHidden] = useState(false);
    const [pointsPerSecond, setPointsPerSecond] = useState(0);

    // Initial upgrade and theme data
    const initialUpgrades = [
        {
            id: 'clickPower1',
            name: 'Mechanical Gear',
            description: 'Increases points per click by 1.',
            cost: 20,
            effect: () => setPointsPerClick(prev => prev + 1),
            purchased: false,
        },
        {
            id: 'autoClicker1',
            name: 'Automatic Gear',
            description: 'Generates 1 point per second.',
            cost: 75,
            effect: () => setPointsPerSecond(prev => prev + 1),
            purchased: false,
        },
        {
            id: 'themeUnlock',
            name: 'Theme Market Access',
            description: 'Unlocks the market to buy new visual themes.',
            cost: 50,
            effect: () => setThemesUnlocked(true),
            purchased: false,
        },
        {
            id: 'clickPower2',
            name: 'Steampunk Piston',
            description: 'Increases points per click by 5.',
            cost: 100,
            effect: () => setPointsPerClick(prev => prev + 5),
            purchased: false,
        },
        {
            id: 'autoClicker2',
            name: 'Automated Conveyor',
            description: 'Generates 5 points per second.',
            cost: 250,
            effect: () => setPointsPerSecond(prev => prev + 5),
            purchased: false,
        },
        {
            id: 'clickPower3',
            name: 'Hydraulic Press',
            description: 'Increases points per click by 10.',
            cost: 500,
            effect: () => setPointsPerClick(prev => prev + 10),
            purchased: false,
        },
        {
            id: 'hidePurchased',
            name: 'Mechanical Tidy-Up',
            description: 'Hides all purchased upgrades to clean up the UI.',
            cost: 500,
            effect: () => setUpgradesHidden(true),
            purchased: false,
        },
        {
            id: 'clickPower4',
            name: 'Industrial Hammer',
            description: 'Increases points per click by 25.',
            cost: 1200,
            effect: () => setPointsPerClick(prev => prev + 25),
            purchased: false,
        },
        {
            id: 'autoClicker3',
            name: 'Factory Drone',
            description: 'Generates 25 points per second.',
            cost: 1500,
            effect: () => setPointsPerSecond(prev => prev + 25),
            purchased: false,
        },
        {
            id: 'autoClicker4',
            name: 'Automated Factory',
            description: 'Generates 50 points per second.',
            cost: 2500,
            effect: () => setPointsPerSecond(prev => prev + 50),
            purchased: false,
        },
        {
            id: 'clickPower5',
            name: 'Quantum Manipulator',
            description: 'Increases points per click by 75.',
            cost: 5000,
            effect: () => setPointsPerClick(prev => prev + 75),
            purchased: false,
        },
        {
            id: 'autoClicker5',
            name: 'Nanobot Swarm',
            description: 'Generates 100 points per second.',
            cost: 10000,
            effect: () => setPointsPerSecond(prev => prev + 100),
            purchased: false,
        },
        {
            id: 'superBoost1',
            name: 'Singularity Generator',
            description: 'Massive one-time point boost and permanent click/auto-click upgrades.',
            cost: 50000,
            effect: () => {
                setPoints(prev => prev + 100000);
                setPointsPerClick(prev => prev + 200);
                setPointsPerSecond(prev => prev + 200);
            },
            purchased: false,
        },
    ];

    const initialThemes = [
        {
            id: 'steampunkBase',
            name: 'Steampunk Workshop',
            description: 'A classic mechanical, brass-and-wood theme.',
            cost: 10,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap');
                body {
                    font-family: 'Cormorant Garamond', serif;
                    background-color: #1a1a1a;
                    color: #d4a066;
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #3b302c;
                    border: 2px solid #d4a066;
                    color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(212, 160, 102, 0.5);
                    text-shadow: 1px 1px 2px #000;
                }
                .main-button:hover {
                    background-color: #4f423d;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 10px rgba(212, 160, 102, 0.7);
                }
                .upgrade-card, .theme-card {
                    background-color: #2e2825;
                    border: 2px solid #d4a066;
                    box-shadow: 4px 4px 8px rgba(0,0,0,0.5);
                    border-radius: 8px;
                }
                .buy-button {
                    background-color: #d4a066;
                    color: #1a1a1a;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #c08e5c;
                }
                .buy-button:disabled {
                    background-color: #4a3d35;
                    border-color: #332b26;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'cyberpunkNeon',
            name: 'Cyberpunk Neon',
            description: 'A dark, futuristic theme with vibrant neon accents.',
            cost: 150,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;0,700&display=swap');
                body {
                    font-family: 'Orbitron', sans-serif;
                    background-color: #0d0a1b;
                    color: #00ff7f;
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #4a235a;
                    border: 2px solid #a238ff;
                    color: #fff;
                    box-shadow: 0 0 15px #a238ff, inset 0 0 5px #a238ff;
                    border-radius: 12px;
                    transition: all 0.3s ease-in-out;
                }
                .main-button:hover {
                    background-color: #6a28cc;
                    box-shadow: 0 0 20px #a238ff;
                }
                .upgrade-card, .theme-card {
                    background-color: #1a152e;
                    border: 2px solid #4a235a;
                    box-shadow: 0 0 10px #a238ff;
                    border-radius: 12px;
                }
                .buy-button {
                    background-color: #00ff7f;
                    color: #0d0a1b;
                    border-radius: 12px;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #00b359;
                }
                .buy-button:disabled {
                    background-color: #0a0a0a;
                    border-color: #2c2c2c;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'retro8bit',
            name: 'Retro 8-bit',
            description: 'A pixelated theme that takes you back to the 80s.',
            cost: 250,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
                body {
                    font-family: 'Press Start 2P', monospace;
                    background-color: #2b1f41;
                    color: #e5d8a8;
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #8c7340;
                    border: 2px solid #4a3e2e;
                    color: #2b1f41;
                    box-shadow: 4px 4px 0 #4a3e2e;
                    font-size: 1.5em;
                    border-radius: 0;
                    transition: all 0.1s ease-in-out;
                }
                .main-button:active {
                    transform: translate(4px, 4px);
                    box-shadow: 0 0 0 #4a3e2e;
                }
                .upgrade-card, .theme-card {
                    background-color: #5d4a3e;
                    border: 2px solid #4a3e2e;
                    box-shadow: 4px 4px 0 #4a3e2e;
                    border-radius: 0;
                }
                .buy-button {
                    background-color: #e5d8a8;
                    color: #2b1f41;
                    border-radius: 0;
                    font-weight: bold;
                    transition: all 0.1s;
                    box-shadow: 2px 2px 0 #4a3e2e;
                }
                .buy-button:active {
                    transform: translate(2px, 2px);
                    box-shadow: 0 0 0 #4a3e2e;
                }
                .buy-button:disabled {
                    background-color: #4a3e2e;
                    border-color: #2b1f41;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'fantasyForest',
            name: 'Fantasy Forest',
            description: 'A whimsical, nature-inspired theme.',
            cost: 300,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
                body {
                    font-family: 'Dancing Script', cursive;
                    background-color: #1c271c;
                    color: #92b492;
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #3e5e3e;
                    border: 2px solid #92b492;
                    color: #fff;
                    border-radius: 12px;
                    box-shadow: 0 0 20px #92b492;
                    transition: all 0.3s ease-in-out;
                }
                .main-button:hover {
                    background-color: #4d7a4d;
                    box-shadow: 0 0 30px #92b492;
                }
                .upgrade-card, .theme-card {
                    background-color: #2b3b2b;
                    border: 2px solid #92b492;
                    box-shadow: 0 0 15px #92b492;
                    border-radius: 16px;
                }
                .buy-button {
                    background-color: #92b492;
                    color: #2b3b2b;
                    border-radius: 16px;
                    font-weight: bold;
                    transition: all 0.2s;
                    box-shadow: 0 0 8px #92b492;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #a4c9a4;
                }
                .buy-button:disabled {
                    background-color: #4a5c4a;
                    border-color: #2b3b2b;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'cosmicVoyage',
            name: 'Cosmic Voyage',
            description: 'A dark, space-themed design with glowing stars and nebulae.',
            cost: 500,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
                body {
                    font-family: 'Syncopate', sans-serif;
                    background-color: #0d011f;
                    color: #b245ff;
                    background-image: radial-gradient(circle, #2d0a4c 0%, #0d011f 100%);
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #4a008c;
                    border: 2px solid #b245ff;
                    color: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 25px #b245ff, inset 0 0 5px #b245ff;
                    transition: all 0.3s ease-in-out;
                }
                .main-button:hover {
                    background-color: #6a00cc;
                    box-shadow: 0 0 35px #b245ff;
                }
                .upgrade-card, .theme-card {
                    background-color: #1e023e;
                    border: 2px solid #b245ff;
                    box-shadow: 0 0 15px #b245ff;
                    border-radius: 16px;
                }
                .buy-button {
                    background-color: #b245ff;
                    color: #0d011f;
                    border-radius: 16px;
                    font-weight: bold;
                    transition: all 0.2s;
                    box-shadow: 0 0 8px #b245ff;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #c982ff;
                }
                .buy-button:disabled {
                    background-color: #4a2a7a;
                    border-color: #1e023e;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'minimalistMatrix',
            name: 'Minimalist Matrix',
            description: 'A clean, high-tech theme with a black and green color scheme.',
            cost: 750,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Fragment+Mono:wght@400&display=swap');
                body {
                    font-family: 'Fragment Mono', monospace;
                    background-color: #000;
                    color: #00ff00;
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #080808;
                    border: 2px solid #00ff00;
                    color: #00ff00;
                    border-radius: 4px;
                    box-shadow: 0 0 12px #00ff00;
                    transition: all 0.3s ease-in-out;
                }
                .main-button:hover {
                    background-color: #101010;
                    box-shadow: 0 0 18px #00ff00;
                }
                .upgrade-card, .theme-card {
                    background-color: #121212;
                    border: 2px solid #00ff00;
                    box-shadow: 0 0 10px #00ff00;
                    border-radius: 4px;
                }
                .buy-button {
                    background-color: #00ff00;
                    color: #000;
                    border-radius: 4px;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #00cc00;
                }
                .buy-button:disabled {
                    background-color: #333;
                    border-color: #222;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'magicalWinter',
            name: 'Magical Winter',
            description: 'An icy, magical theme with glowing blue colors and a frosty feel.',
            cost: 1000,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
                body {
                    font-family: 'Playfair Display', serif;
                    background-color: #0c152a;
                    color: #e0f2f7;
                    background-image: linear-gradient(135deg, #2a3a5f 0%, #0c152a 100%);
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #1f375f;
                    border: 2px solid #c8e0f5;
                    color: #fff;
                    border-radius: 16px;
                    box-shadow: 0 0 25px #c8e0f5;
                    transition: all 0.3s ease-in-out;
                }
                .main-button:hover {
                    background-color: #3a5c92;
                    box-shadow: 0 0 35px #c8e0f5;
                }
                .upgrade-card, .theme-card {
                    background-color: #1b2847;
                    border: 2px solid #c8e0f5;
                    box-shadow: 0 0 15px #c8e0f5;
                    border-radius: 20px;
                }
                .buy-button {
                    background-color: #c8e0f5;
                    color: #0c152a;
                    border-radius: 20px;
                    font-weight: bold;
                    transition: all 0.2s;
                    box-shadow: 0 0 8px #c8e0f5;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #e2f2fb;
                }
                .buy-button:disabled {
                    background-color: #4d5c7f;
                    border-color: #1b2847;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
        {
            id: 'volcanicInferno',
            name: 'Volcanic Inferno',
            description: 'A fiery, intense theme with reds, oranges, and deep blacks.',
            cost: 1500,
            css: `
                @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');
                body {
                    font-family: 'Oswald', sans-serif;
                    background-color: #140d0d;
                    color: #ff5500;
                    background-image: radial-gradient(circle, #5e1c1c 0%, #140d0d 100%);
                    transition: all 0.5s ease-in-out;
                }
                .main-button {
                    background-color: #9c2a2a;
                    border: 2px solid #ff5500;
                    color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 25px #ff5500, inset 0 0 5px #ff5500;
                    transition: all 0.3s ease-in-out;
                }
                .main-button:hover {
                    background-color: #b33939;
                    box-shadow: 0 0 35px #ff5500;
                }
                .upgrade-card, .theme-card {
                    background-color: #2b1c1c;
                    border: 2px solid #ff5500;
                    box-shadow: 0 0 15px #ff5500;
                    border-radius: 12px;
                }
                .buy-button {
                    background-color: #ff5500;
                    color: #140d0d;
                    border-radius: 12px;
                    font-weight: bold;
                    transition: all 0.2s;
                    box-shadow: 0 0 8px #ff5500;
                }
                .buy-button:hover:not(:disabled) {
                    background-color: #e64c00;
                }
                .buy-button:disabled {
                    background-color: #4a2d2d;
                    border-color: #2b1c1c;
                    cursor: not-allowed;
                }
            `,
            purchased: false,
        },
    ];

    // Initialize game state on component mount
    useEffect(() => {
        setUpgrades(initialUpgrades);
        setThemes(initialThemes);
    }, []);

    // Effect for handling the auto-clicker
    useEffect(() => {
        if (pointsPerSecond > 0) {
            const interval = setInterval(() => {
                setPoints(prevPoints => prevPoints + pointsPerSecond);
            }, 1000); // Add points every second
            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [pointsPerSecond]);

    // Function to handle main button click
    const handleMainClick = () => {
        setPoints(prevPoints => prevPoints + pointsPerClick);
    };

    // Function to handle the cheat button click
    const handleCheatClick = () => {
        setPoints(prevPoints => prevPoints + 1000);
    };

    // Function to buy a regular upgrade
    const handleBuyUpgrade = (upgradeId) => {
        const upgradeToBuy = upgrades.find(up => up.id === upgradeId);
        if (upgradeToBuy && points >= upgradeToBuy.cost && !upgradeToBuy.purchased) {
            setPoints(prevPoints => prevPoints - upgradeToBuy.cost);
            upgradeToBuy.effect();
            setUpgrades(upgrades.map(u => u.id === upgradeId ? { ...u, purchased: true } : u));
        }
    };

    // Function to buy or apply a theme
    const handleBuyTheme = (themeId) => {
        const themeToBuy = themes.find(t => t.id === themeId);
        if (!themeToBuy) return;
        
        if (themeToBuy.purchased) {
            setAppliedTheme(themeToBuy.css);
        } else if (points >= themeToBuy.cost) {
            setPoints(prevPoints => prevPoints - themeToBuy.cost);
            setAppliedTheme(themeToBuy.css);
            setThemes(themes.map(t => t.id === themeId ? { ...t, purchased: true } : t));
        }
    };
    
    // Renders a single upgrade card component
    const UpgradeCard = ({ upgrade }) => {
        const isAffordable = points >= upgrade.cost;
        const isDisabled = upgrade.purchased || !isAffordable;

        // If upgrades are hidden and this upgrade is purchased, don't render it.
        if (upgradesHidden && upgrade.purchased) {
            return null;
        }

        return (
            <div className="flex justify-between items-center p-3 border-b border-gray-600 upgrade-card">
                <div>
                    <h4 className="text-xl font-bold">{upgrade.name}</h4>
                    <p className="text-sm text-gray-400">{upgrade.description}</p>
                </div>
                <button
                    onClick={() => handleBuyUpgrade(upgrade.id)}
                    disabled={isDisabled}
                    className="p-2 ml-4 rounded-full bg-blue-500 text-white font-semibold disabled:bg-gray-700 disabled:cursor-not-allowed transition duration-200 buy-button"
                >
                    {upgrade.purchased ? 'Purchased' : `Buy for ${upgrade.cost}`}
                </button>
            </div>
        );
    };

    // Renders a single theme card component
    const ThemeCard = ({ theme }) => {
        const isAffordable = points >= theme.cost;
        const isDisabled = !isAffordable && !theme.purchased;

        return (
            <div className="flex justify-between items-center p-3 border-b border-gray-600 theme-card">
                <div>
                    <h4 className="text-xl font-bold">{theme.name}</h4>
                    <p className="text-sm text-gray-400">{theme.description}</p>
                </div>
                <button
                    onClick={() => handleBuyTheme(theme.id)}
                    disabled={isDisabled}
                    className="p-2 ml-4 rounded-full bg-green-500 text-white font-semibold disabled:bg-gray-700 disabled:cursor-not-allowed transition duration-200 buy-button"
                >
                    {theme.purchased ? 'Apply' : `Buy for ${theme.cost}`}
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 transition-colors duration-500">
            {/* Inject dynamic CSS for themes */}
            <style dangerouslySetInnerHTML={{ __html: appliedTheme }} />
            
            {/* Main game container */}
            <div className="flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-extrabold my-8 text-yellow-300 drop-shadow-lg">
                    {Math.floor(points)} Points {pointsPerSecond > 0 && `(+${pointsPerSecond}/s)`}
                </h1>
                <div className="flex space-x-4">
                    <button
                        onClick={handleMainClick}
                        className="main-button p-4 md:p-8 text-2xl md:text-4xl font-bold rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Add {pointsPerClick} Point{pointsPerClick > 1 ? 's' : ''}
                    </button>
                    <button
                        onClick={handleCheatClick}
                        className="p-4 md:p-8 text-2xl md:text-4xl font-bold rounded-full bg-red-600 text-white shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        Add 1000 Points
                    </button>
                </div>
            </div>

            <div className="w-full max-w-2xl mt-12">
                {/* Regular upgrades section */}
                <h3 className="text-3xl font-bold mb-4 text-center">Upgrades</h3>
                <div className="bg-gray-800 rounded-lg shadow-xl p-4 space-y-2">
                    {upgrades.map(upgrade => (
                        <UpgradeCard key={upgrade.id} upgrade={upgrade} />
                    ))}
                </div>

                {/* Theme market section */}
                {themesUnlocked && (
                    <div className="mt-12">
                        <h3 className="text-3xl font-bold mb-4 text-center">Theme Market</h3>
                        <div className="bg-gray-800 rounded-lg shadow-xl p-4 space-y-2">
                            {themes.map(theme => (
                                <ThemeCard key={theme.id} theme={theme} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
