import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required' });
      return;
    }

    const staff = await db('staff').where({ email }).first();

    if (!staff) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, staff.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(
      { id: staff.id, email: staff.email, name: staff.name },
      secret,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      data: {
        id: staff.id,
        email: staff.email,
        name: staff.name,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
};