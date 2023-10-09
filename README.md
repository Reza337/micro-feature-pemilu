# DOCUMENTATION

### AUTH

**Starting**

- npm start

**Migrating**

- npm run migration:generate
- npm run migration:run

**Register**

- URL : http://localhost:5000/api/v1/auth/register

- Method: POST

- Required Token: No

- Request Body:

```json
{
	"full_name": "Muhammad Reza Fadilah",
	"email": "rezafadilah337@gmail.com",
	"password": "123456789"
}
```

- Response Body :

```json
{
	"message": "User created successfully",
	"user": {
		"full_name": "Muhammad Reza Fadilah",
		"email": "rezafadilah337@gmail.com",
		"password": "$2b$10$TJHJskXbJRssKuNfqJtGUukPSnEEOi0o5OLZ7OseDWSkeuEHaaTme",
		"id": 1,
		"created_at": "2023-10-08T14:27:58.269Z"
	}
}
```

**Login**

- URL : http://localhost:5000/api/v1/auth/login

- Method: POST

- Required Token: No

- Request Body:

```json
{
	"email": "rezafadilah337@gmail.com",
	"password": "123456789"
}
```

- Response Body :

```json
{
	"user": {
		"id": 1,
		"full_name": "Muhammad Reza Fadilah",
		"email": "rezafadilah337@gmail.com"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmdWxsX25hbWUiOiJNdWhhbW1hZCBSZXphIEZhZGlsYWgiLCJlbWFpbCI6InJlemFmYWRpbGFoMzM3QGdtYWlsLmNvbSJ9LCJpYXQiOjE2OTY3NzUzNTksImV4cCI6MTY5Njc3ODk1OX0.J3AVxrkQJPKQYsFHRHYtKE8f0wICjcglPZjx0dtp_CU"
}
```

**Check JWT Token**

- URL : http://localhost:5000/api/v1/auth/check

- Method: GET

- Required Token: Yes

- Response Body :

```json
{
	"user": {
		"id": 1,
		"full_name": "Muhammad Reza Fadilah",
		"email": "rezafadilah337@gmail.com",
		"created_at": "2023-10-08T14:27:58.269Z"
	},
	"message": "Token is valid"
}
```

---

### PARTAI

**Create Party**

- URL : http://localhost:5000/api/v1/partai

- Method: POST

- Required Token: Yes

- Request Body:

```json
{
	"partainame": "PAN",
	"pemiluID": 2
}
```

- Response Body :

```json
{
	"message": "Success",
	"data": {
		"obj": {
			"partainame": "PAN",
			"selectedpartai": 2
		}
	}
}
```

**Find All Party**

- URL : http://localhost:5000/api/v1/partais

- Method: GET

- Required Token: Yes

- Response Body :

```json
{
	"message": "Success",
	"data": {
		"partai": [
			{
				"id": 3,
				"partainame": "Banteng Merah",
				"selectedpartai": {
					"id": 1,
					"name": "Muhammad Reza Fadilah",
					"visi": "Menuju tak terbatas dan melampauinya",
					"image": "https://res.cloudinary.com/dws0nodlr/image/upload/v1696486770/Pemilu/v9bhhih11dm4x6nlk4an.png"
				}
			}
		]
	}
}
```

---

### PASLON

**Create Paslon**

- URL : http://localhost:5000/api/v1/paslon

- Method: POST

- Required Token: Yes

- Request Body:

  Form Data:

  - name: MAS DANDI DUMBWAYS
  - visi: Menuju tak terbatas dan melampauinya
  - image: File(Tshirt.jpg)

- Response Body :

```json
{
	"name": "MAS DANDI DUMBWAYS",
	"visi": "Menuju tak terbatas dan melampauinya",
	"image": "https://res.cloudinary.com/dws0nodlr/image/upload/v1696777968/Pemilu/bfibkfwfomzbhcpnzcyb.jpg"
}
```

**Find All Paslon**

- URL : http://localhost:5000/api/v1/paslons

- Method: GET

- Required Token: Yes

- Response Body :

```json
{
	"message": "Success",
	"data": {
		"pemilus": [
			{
				"id": 1,
				"name": "Muhammad Reza Fadilah",
				"visi": "Menuju tak terbatas dan melampauinya",
				"image": "https://res.cloudinary.com/dws0nodlr/image/upload/v1696486770/Pemilu/v9bhhih11dm4x6nlk4an.png",
				"vote": [
					{
						"id": 5,
						"name": "Lala"
					},
					{
						"id": 2,
						"name": "Ryan"
					},
					{
						"id": 1,
						"name": "Ryan Hidayat"
					}
				],
				"partai": [
					{
						"id": 3,
						"partainame": "Banteng Merah"
					}
				]
			}
		]
	}
}
```

**Find Paslon By Id**

- URL : http://localhost:5000/api/v1/paslon/:id

- Method: GET

- Required Token: Yes

- Response Body :

```json
{
	"id": 1,
	"name": "Muhammad Reza Fadilah",
	"visi": "Menuju tak terbatas dan melampauinya",
	"image": "https://res.cloudinary.com/dws0nodlr/image/upload/v1696486770/Pemilu/v9bhhih11dm4x6nlk4an.png",
	"vote": [
		{
			"id": 1,
			"name": "Ryan Hidayat"
		},
		{
			"id": 2,
			"name": "Ryan"
		},
		{
			"id": 5,
			"name": "Lala"
		}
	],
	"partai": [
		{
			"id": 3,
			"partainame": "Banteng Merah"
		}
	]
}
```

**Update Paslon By Id**

- URL : http://localhost:5000/api/v1/party/:id

- Method: PATCH

- Required Token: Yes

- Request Body:

  Form Data:

  - name: Muhammad Reza Fadilah

- Response Body :

```json
{
	"id": 2,
	"name": "Muhammad Reza Fadilah",
	"image": "https://res.cloudinary.com/dws0nodlr/image/upload/v1696487594/Pemilu/biik7ratwvmji0ar4b7r.jpg"
}
```

**Delete Paslon By Id**

- URL : http://localhost:5000/api/v1/paslon/:id

- Method: DELETE

- Required Token: Yes

- Response Body :

```json
{
	"raw": [],
	"affected": 1
}
```

---

### VOTE

**Create Vote**

- URL : http://localhost:5000/api/v1/vote

- Method: POST

- Required Token: Yes

- Request Body:

```json
{
	"name": "Lulu",
	"pemiluID": 2
}
```

- Response Body :

```json
{
	"message": "Success",
	"data": {
		"obj": {
			"name": "Lulu",
			"selected": 2
		}
	}
}
```

**Find All Vote**

- URL : http://localhost:5000/api/v1/votes

- Method: GET

- Required Token: yes

- Response Body :

```json
{
	"message": "Success",
	"data": {
		"vote": [
			{
				"id": 1,
				"name": "Ryan Hidayat",
				"selected": {
					"id": 1,
					"name": "Muhammad Reza Fadilah",
					"visi": "Menuju tak terbatas dan melampauinya",
					"image": "https://res.cloudinary.com/dws0nodlr/image/upload/v1696486770/Pemilu/v9bhhih11dm4x6nlk4an.png"
				}
			}
		]
	}
}
```
