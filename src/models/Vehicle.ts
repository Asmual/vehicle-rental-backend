import db from '../config/db';
import { IVehicle } from '../types/vehicle.types';

export class VehicleModel {
  private static tableName = 'vehicles';

  static query() {
    return db<IVehicle>(this.tableName);
  }
}