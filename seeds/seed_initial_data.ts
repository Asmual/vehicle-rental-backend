import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex('rentals').del();
  await knex('vehicles').del();
  await knex('staff').del();

  // 2. Staff Seed (Password: password123)
  const hashedPassword = await bcrypt.hash('password123', 10);
  const [staff] = await knex('staff')
    .insert([
      {
        name: 'Admin Staff',
        email: 'staff@example.com',
        password_hash: hashedPassword,
      },
    ])
    .returning('*');

  // 3. Vehicles Seed
  const vehicles = await knex('vehicles')
    .insert([
      {
        name: 'Toyota Axio',
        plate_number: 'DHAKA-METRO-GA-11-1001',
        category: 'Sedan',
        daily_rate: 50.0,
      },
      {
        name: 'Toyota Prado',
        plate_number: 'DHAKA-METRO-HA-22-2002',
        category: 'SUV',
        daily_rate: 150.0,
      },
    ])
    .returning('*');

  await knex('rentals').insert([
    {
      vehicle_id: vehicles[0].id,
      customer_name: 'Karim Rahman',
      customer_phone: '+8801700000000',
      // July 29, 2026 to August 3, 2026 (Month boundary spanning rental)
      start_date: '2026-07-29',
      end_date: '2026-08-03',
      total_amount: 300.0, // 6 days * 50
      status: 'completed',
    },
    {
      vehicle_id: vehicles[1].id,
      customer_name: 'Sultana Begum',
      customer_phone: '+8801800000000',
      start_date: '2026-08-10',
      end_date: '2026-08-12',
      total_amount: 450.0, // 3 days * 150
      status: 'booked',
    },
  ]);
}