# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

james = User.first

app1 = Application.create(user: james)
app2 = Application.create(user: james)

company1 = Company.create(source: "Indeed", name: "evil corporation", address: "123 Sesame Street", application: app1)
company2 = Company.create(source: "Referral", name: "good corporation", address: "11 Broadway", application: app2)

contact1 = Contact.create(name: "jeff mcjeffry", email:"mcjeffry@evilcorp.com", phone_num: "800-555-1234", company: company1, active: true)
contact2 = Contact.create(name: "bill mcbillfry", email:"mcbillfry@goodcorp.com", phone_num: "800-555-4567", company: company2, active: true)

stage1 = Stage.create(application: app1, active: true, name: "submitted", start: DateTime.now)
stage2 = Stage.create(application: app2, active: false, name: "submitted", start: DateTime.now, end: DateTime.now)
stage3 = Stage.create(application: app2, active: true, name: "interviewing", start: DateTime.now)

Note.create(content: "i hope i get an interview!", stage: stage1)
Note.create(content: "this company smells", stage: stage2)
Note.create(content: "i got an interview! this company doesn't smell", stage: stage3)
Note.create(content: "he's ok i guess", contact: contact1)
Note.create(content: "he gave me a cookie so i like him", contact: contact2)
