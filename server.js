import express from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from './src/supabaseClient.js';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const JWT_SECRET = 'your_jwt_secret';

// Configuração do Nodemailer com SendGrid
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false,
  auth: {
    user: 'apikey', // O usuário deve ser 'apikey'
    pass: 'your_sendgrid_api_key' // Sua chave API do SendGrid
  }
});

// Gerar código 2FA
const generateTwoFactorCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Enviar código 2FA por e-mail
const sendTwoFactorCode = async (email, code) => {
  const mailOptions = {
    from: 'no-reply@zellify.online',
    to: email,
    subject: 'Seu Código de Verificação',
    text: `Seu código de verificação é: ${code}`
  };

  await transporter.sendMail(mailOptions);
};

// Rota para solicitar código 2FA
app.post('/request-2fa', async (req, res) => {
  const { email } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const code = generateTwoFactorCode();
  await supabase
    .from('users')
    .update({ two_factor_code: code })
    .eq('id', user.id);

  await sendTwoFactorCode(email, code);
  res.json({ message: '2FA code sent' });
});

// Rota para verificar código 2FA
app.post('/verify-2fa', async (req, res) => {
  const { email, code } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('two_factor_code', code)
    .single();

  if (error || !user) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  // Limpar código após verificação
  await supabase
    .from('users')
    .update({ two_factor_code: null })
    .eq('id', user.id);

  const token = jwt