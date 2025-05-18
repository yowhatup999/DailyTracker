// src/services/astroApi.js

function weatherCodeToEmoji(code) {
    const map = {
        0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
        51: "🌦️", 53: "🌦️", 55: "🌦️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
        66: "🌨️", 67: "🌨️", 71: "🌨️", 73: "🌨️", 75: "🌨️", 80: "🌧️",
        81: "🌧️", 82: "🌧️", 85: "🌨️", 86: "🌨️", 95: "⛈️", 96: "⛈️", 99: "⛈️"
    };
    return map[code] || "🌈";
}

function weatherCodeToText(code) {
    const map = {
        0: "Sonnig", 1: "Überwiegend klar", 2: "Teilweise bewölkt", 3: "Bewölkt", 45: "Nebel", 48: "Nebel mit Reif",
        51: "Leichter Sprühregen", 53: "Mäßiger Sprühregen", 55: "Starker Sprühregen",
        61: "Leichter Regen", 63: "Mäßiger Regen", 65: "Starker Regen",
        66: "Gefrierender Regen", 67: "Starker gefr. Regen",
        71: "Leichter Schnee", 73: "Mäßiger Schnee", 75: "Starker Schnee",
        80: "Leichte Schauer", 81: "Mäßige Schauer", 82: "Starke Schauer",
        85: "Leichte Schneeschauer", 86: "Starke Schneeschauer",
        95: "Gewitter", 96: "Gewitter mit leichtem Hagel", 99: "Gewitter mit Hagel"
    };
    return map[code] || "Unbekannt";
}

function moonPhaseToTextAndEmoji(phaseValue) {
    const phases = [
        { range: [0.0, 0.03], name: "Neumond", emoji: "🌑" },
        { range: [0.03, 0.22], name: "Zunehmende Sichel", emoji: "🌒" },
        { range: [0.22, 0.28], name: "Erstes Viertel", emoji: "🌓" },
        { range: [0.28, 0.47], name: "Zunehmender Mond", emoji: "🌔" },
        { range: [0.47, 0.53], name: "Vollmond", emoji: "🌕" },
        { range: [0.53, 0.72], name: "Abnehmender Mond", emoji: "🌖" },
        { range: [0.72, 0.78], name: "Letztes Viertel", emoji: "🌗" },
        { range: [0.78, 0.97], name: "Abnehmende Sichel", emoji: "🌘" },
        { range: [0.97, 1.0], name: "Neumond", emoji: "🌑" },
    ];
    return phases.find(p => phaseValue >= p.range[0] && phaseValue <= p.range[1]) || { name: "Unbekannt", emoji: "❓" };
}

export async function fetchWeatherAndMoon() {
    // 🛠 Fester Standort: Darmstadt
    const latitude = 49.8728;
    const longitude = 8.6512;
    const today = new Date().toISOString().split("T")[0];

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=moon_phase&timezone=auto&start_date=${today}&end_date=${today}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        const weather = {
            temperature: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
            emoji: weatherCodeToEmoji(data.current.weather_code),
            condition: weatherCodeToText(data.current.weather_code),
        };

        const moonValue = data.daily.moon_phase[0];
        const moon = moonPhaseToTextAndEmoji(moonValue);

        return { weather, moon };
    } catch (err) {
        console.error("Fehler bei Wetter/Mond API:", err);
        return { weather: null, moon: null };
    }
}