# React + TypeScript + Vite
<img src="https://raw.githubusercontent.com/AgusNazer/gestionStockFrontend/main/public/home.png" alt="home" />
Este proyecto es una aplicación creada con React JS y Tailwind CSS, diseñada para ofrecer una experiencia interactiva y dinámica. Para comenzar con el desarrollo o despliegue del proyecto, sigue las instrucciones a continuación.

Requisitos
Antes de empezar, asegúrate de tener instalados los siguientes programas en tu máquina:

Node.js (LTS recomendado) - Instalar Node.js
npm - Viene preinstalado con Node.js
Instrucciones para comenzar
1. Clonar el repositorio
Primero, clona este repositorio en tu máquina local usando el siguiente comando:

bash
Copiar
Editar
git clone https://github.com/tu_usuario/tu_repositorio.git
2. Instalar dependencias
Dentro de la carpeta del proyecto, instala las dependencias necesarias utilizando npm:

bash
Copiar
Editar
cd tu_repositorio
npm install

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
