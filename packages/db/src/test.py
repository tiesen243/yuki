from faker import Faker

faker = Faker(locale="en_US")

print(faker.ascii_email())
print(faker.image_url())
print(faker.ascii_company_email())
