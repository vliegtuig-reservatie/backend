import { plainToClass } from 'class-transformer'
import { Connection, getRepository } from 'typeorm'
import { Airport } from '../entities/AirportEntity'
import { Flight } from '../entities/FlightEntity'
import { Plane } from '../entities/PlaneEntity'
import { User } from '../entities/UserEntity'
import { Review } from '../entities/ReviewEntity'
import { Seat } from '../entities/SeatEntity'
import { Config } from '../entities/Config'
import flights from './flights.json'
import airports from './airports.json'
import planes from './planes.json'
import users from './users.json'
import reviews from './reviews.json'
import seats from './seats.json'

const seedDatabase = async (connection: Connection) => {
  const dbIsSeeded = await getRepository(Config).findOne('seeded')

  if (dbIsSeeded === undefined) {
    const usersORM = plainToClass(User, users)
    const flightsORM = plainToClass(Flight, flights)
    const airportsORM = plainToClass(Airport, airports)
    const planesORM = plainToClass(Plane, planes)
    const reviewsORM = plainToClass(Review, reviews)
    const seatsORM = plainToClass(Seat, seats)

    await connection.manager.save(usersORM)
    await connection.manager.save(planesORM)
    await connection.manager.save(airportsORM)
    await connection.manager.save(flightsORM)
    await connection.manager.save(reviewsORM)
    await connection.manager.save(seatsORM)

    const seeded = new Config()
    seeded.key = 'seeded'
    seeded.value = 'true'

    await connection.manager.save(seeded)
    console.log('Database has been seeded')
  } else {
    console.log('Database is already seeded')
  }
}

export default seedDatabase
