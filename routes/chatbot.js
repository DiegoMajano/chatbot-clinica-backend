const { GoogleGenAI } = require('@google/genai');
const { configDotenv } = require('dotenv');
const express = require('express');

const router = express.Router();

const ai = new GoogleGenAI({});


router.post('/', async (req, res) => {

    try {
        const { preguntaUsuario, baseDeDatos } = req.body;
        const prompt = `
            Eres un chatbot médico que responde preguntas frecuentes. Usa esta base de conocimiento:

            ${JSON.stringify(baseDeDatos)}

            Pregunta del usuario: "${preguntaUsuario}"

            Devuélveme la mejor respuesta relacionada, o indica si no se encontró nada relevante. Incluso puedes redactar algo mas siempre relacionado a la pregunta
        `;

        const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
            {
            role: "user",
            parts: [{ text: prompt }]
            }
        ]
        });

        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "No se encontró una respuesta.";

        res.json({ respuesta: responseText });
    } catch (error) {
        console.error('Error en la ruta /api/chatbot:', error);
        res.status(500).json({ error: 'Error al generar la respuesta del chatbot' });
    }
});

module.exports = router;
