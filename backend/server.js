const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Product Routes ---

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// --- Chatbot Route (Groq Proxy) ---

app.post('/api/chat', async (req, res) => {
    const { message, siteContext } = req.body;

    if (!message) return res.status(400).json({ error: 'Message is required' });

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: siteContext },
                    { role: "user", content: message }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Failed to process chat' });
    }
});

// --- Checkout Simulation ---

app.post('/api/checkout', async (req, res) => {
    // In a real app, you'd save the order to the database
    // For now, we simulate a 3-second delay as requested by the UI flow
    setTimeout(() => {
        res.json({ message: 'Order confirmed! your order will be delivered in 3days' });
    }, 3000);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
