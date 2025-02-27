require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    const { to, product, price } = req.body;

    const text = `
¡Gracias por tu compra! 🎉

En RominaFitness, valoramos tu confianza y estamos felices de acompañarte en tu camino hacia una vida más saludable.

🔹 **Detalles de tu compra:**
- **Producto/Rutina adquirida:** ${product}
- **Valor:** $${price}

Si tienes alguna duda o necesitas asistencia, no dudes en contactarnos. ¡Estamos aquí para ayudarte! 💪🏼✨

Gracias por ser parte de nuestra comunidad.  
**Equipo RominaFitness ❤️**
    `;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev", // Usa un email verificado en Resend
      to: "matteodaniele222@gmail.com",
      subject: "¡Gracias por tu compra en RominaFitness!",
      text,
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));