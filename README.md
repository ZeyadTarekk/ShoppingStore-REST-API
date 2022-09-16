<div align="center">

[![GitHub contributors](https://img.shields.io/github/contributors/ZeyadTarekk/ShoppingStore-REST-API)](https://github.com/ZeyadTarekk/ShoppingStore-REST-API/contributors)
[![GitHub issues](https://img.shields.io/github/issues/ZeyadTarekk/ShoppingStore-REST-API)](https://github.com/ZeyadTarekk/ShoppingStore-REST-API/issues)
[![GitHub license](https://img.shields.io/github/license/ZeyadTarekk/ShoppingStore-REST-API)](https://github.com/ZeyadTarekk/ShoppingStore-REST-API/blob/master/LICENSE)
[![GitHub forks](https://img.shields.io/github/forks/ZeyadTarekk/ShoppingStore-REST-API)](https://github.com/ZeyadTarekk/ShoppingStore-REST-API/network)
[![GitHub stars](https://img.shields.io/github/stars/ZeyadTarekk/ShoppingStore-REST-API)](https://github.com/ZeyadTarekk/ShoppingStore-REST-API/stargazers)
[![GitHub Language](https://img.shields.io/github/languages/top/ZeyadTarekk/ShoppingStore-REST-API)](https://img.shields.io/github/languages/count/ZeyadTarekk/ShoppingStore-REST-API)

</div>

## 📝 Table of Contents

- [About](#about)
- [API Endpoint](#endpoint)
- [Get started](#get-started)
  - [Installation](#Install)
  - [Running](#running)
  - [Building for production](#Build)
  - [Running Tests](#test)
- [Technology](#tech)
- [Contributors](#Contributors)
- [License](#license)

## 📙 About <a name = "about"></a>

- An API that allows you to place images into your frontend with the size set via URL parameters and resize the image based on the entered size.
- Same the resized image on ```/assets/thumb``` folder
- If the entered image and size are entered before, Cached version is used rather than generating a new version.

## 🔚 API Endpoints <a name = "endpoint"></a>

#### Products
- Index ```GET /products ```
- Show ```GET /products/:product_id ```
- Create [token required] ```POST /products ```

#### Users
- Index [token required] ``` GET /users ```
- Show [token required] ```GET /users/:user_id```
- Create [token returned] ```POST /users```

#### Orders
- Current Order by user [token required] ```GET /orders/:user_id```
- Completed Orders by user [token required] ```GET /completedorders/:user_id```
## 🏁 Getting Started <a name = "get-started"></a>

> This is an list of needed instructions to set up your project locally, to get a local copy up and running follow these
> instructuins.

### Installation <a name = "Install"></a>

1. **_Clone the repository_**

```sh
$ git clone https://github.com/ZeyadTarekk/ShoppingStore-REST-API.git
```

2. **_Navigate to repository directory_**

```sh
$ cd ShoppingStore-REST-API
```

3. **_Install dependencies_**

```sh
npm install
```

### Running <a name = "running"></a>

1. **_Create .env file and add your envirnoment variables_**

- ```POSTGRES_HOST```
- ```POSTGRES_DB```
- ```POSTGRES_TEST_DB```
- ```POSTGRES_USER```
- ```POSTGRES_PASSWORD```
- ```ENV="dev"```
- ```BCRYPT_PASSWORD```
- ```SALT_ROUNDS```
- ```TOKEN_SECRET```


2. **_Running on development mode_**

```sh
npm run start
```

Open http://localhost:3000 with your browser to see the result

### Building for production <a name = "Build"></a>
1. **_Compiling for production mode_**

```sh
npm run build
```
### Running Tests <a name = "test"></a>

```sh
npm run test
```

## 💻 Built Using <a name = "tech"></a>

- **Node.js**
- **Express.js**
- **TypeScript**
- **Jasmine**


## Contributors <a name = "Contributors"></a>

<table>
  <tr>
    <td align="center">
    <a href="https://github.com/ZeyadTarekk" target="_black">
    <img src="https://avatars.githubusercontent.com/u/76125650?v=4" width="150px;" alt="Zeyad Tarek"/>
    <br />
    <sub><b>Zeyad Tarek</b></sub></a>

  </td>
  </tr>
 </table>

## License <a name = "license"></a>

> This software is licensed under MIT License, See [License](https://github.com/ZeyadTarekk/ShoppingStore-REST-API/blob/main/LICENSE) for more information ©ZeyadTarekk.