import asyncio

from faker import Faker
from prisma import Prisma
from prisma.enums import Role


# load env
from dotenv import load_dotenv

_ = load_dotenv()

faker = Faker(locale="en_US")


async def generate_users(db: Prisma):
    _ = await db.user.delete_many(where={"role": Role.USER})

    for _ in range(10):
        _ = await db.user.create(
            {
                "name": faker.user_name(),
                "email": faker.ascii_email(),
                "image": 'https://dummyimage.com/400x400',
            }
        )

    print("Users created successfully!")


async def generate_categories(db: Prisma):
    _ = await db.category.delete_many()

    _ = await db.category.create_many(
        data=[
            {"name": c,"image": 'https://dummyimage.com/400x400'}
            for c in [
                "Electronics",
                "Clothing",
                "Books",
                "Home",
                "Health",
                "Beauty",
                "Sports",
                "Toys",
                "Automotive",
                "Furniture",
            ]
        ]
    )

    print("Categories created successfully!")


async def generate_products(db: Prisma):
    user = await db.user.find_first(where={"role": Role.ADMIN})
    assert user is not None

    categories = [c.id for c in await db.category.find_many()]

    _ = await db.product.delete_many()
    for _ in range(20):
        _ = await db.product.create(
            {
                "name": faker.sentence(nb_words=2),
                "description": faker.sentence(),
                "image": 'https://dummyimage.com/400x400',
                "price": faker.random_number(2),
                "stock": faker.random_number(2),
                "categoryId": faker.random_element(categories),
                "userId": user.id,
            }
        )

    print("Products created successfully!")


async def main() -> None:
    db = Prisma(auto_register=True)
    await db.connect()

    await generate_users(db)
    await generate_categories(db)
    await generate_products(db)

    await db.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
