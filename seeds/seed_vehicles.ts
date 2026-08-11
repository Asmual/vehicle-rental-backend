import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('vehicles').del();

  await knex('vehicles').insert([
    {
      name: 'Toyota Axio',
      plate_number: 'DHAKA-METRO-GA-11-1010',
      category: 'Sedan',
      daily_rate: 50.00,
      photo_path: 'uploads/car1.jpg',
    },
    {
      name: 'Toyota Prado',
      plate_number: 'DHAKA-METRO-HA-22-2020',
      category: 'SUV',
      daily_rate: 150.00,
      photo_path: 'uploads/car2.jpg',
    },
  ]);
}