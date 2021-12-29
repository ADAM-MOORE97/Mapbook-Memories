# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Trip.destroy_all
Trip.reset_pk_sequence
Place.destroy_all
Place.reset_pk_sequence
adam= User.find_by(id: 1)

thorpe = Place.create(name: 'Jim Thorpe', longitude:-75.739667, latitude: 40.872292, description: "Mountain Biking trail", user_id:adam.id)
thorp = Place.create(name: 'Jim Thorpe', longitude:-75.739667, latitude: 40.872292, description: "Mountain Biking trail", user_id:adam.id, visited: true)
thor = Place.create(name: 'Jim Thorpe', longitude:-75.739667, latitude: 40.872292, description: "Mountain Biking trail", user_id:adam.id)
tho = Place.create(name: 'Jim Thorpe', longitude:-75.739667, latitude: 40.872292, description: "Mountain Biking trail", user_id:adam.id)

Trip.create(name: 'fall Leaves Jim Thorpe MTB adventure', start_date: '2021-10-1', end_date: '2021-10-1', description: ' 15 mile MTB trail ride with Krunkle and Jason', user_id: adam.id, place_id: thorpe.id)
Trip.create(name: 'fall Leaves Jim Thorpe MTB adventure', start_date: '2021-10-1', end_date: '2021-10-1', description: ' 15 mile MTB trail ride with Krunkle and Jason', user_id: adam.id, place_id: thorp.id, taken: true)
Trip.create(name: 'fall Leaves Jim Thorpe MTB adventure', start_date: '2021-10-1', end_date: '2021-10-1', description: ' 15 mile MTB trail ride with Krunkle and Jason', user_id: adam.id, place_id: thor.id)
Trip.create(name: 'fall Leaves Jim Thorpe MTB adventure', start_date: '2021-10-1', end_date: '2021-10-1', description: ' 15 mile MTB trail ride with Krunkle and Jason', user_id: adam.id, place_id: tho.id)
