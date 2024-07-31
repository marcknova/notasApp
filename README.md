# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app, si tienen android estudio instalado una vez el proyecto se haya ejecutado pueden iniciar un emulador oprimiendo unicamente la tecla 'a'

   ```bash
    npx expo start
   ```

3. Start the app via tunnel
   si tienen problemas con el comando normal de npx expo start, utilizen el siguiente comando este les permitira crear un tunel directo entre su dispositivo y la aplicacion en caso que gusten probar la aplicacion en su dispositivo.
   ```bash
    npx expo start --tunnel
   ```

Se implementaron las siguientes caracteristicas de acuerdo a : 
Inicio de sesión de usuarios:
   
   1. Inicio de sesión de usuarios existentes con usuario y contraseña.
usuario y contraseña siguen siendo los mismos.
usuarios:
correo: usuario2@prueba.com
contraseña: usuario2

correo: usuario1@prueba.com
contraseña: usuario1

   - Pantalla principal con listado de notas:
   3. Mostrar las notas del usuario actual en una lista.
    - Funcionalidad para crear, editar y eliminar notas:
        1. Crear nuevas notas con título y contenido.

Los ajuestes que se le hicieron fueron creados en base a tener una adaptabilidad en react native todo se acomodo de forma que fuera una experiencia agradable al usuario
se agregaron algunos detalles como que cada card tuviera un background diferente cada que el usuario agregaba una nueva nota para hacerla mas agradable a la vista.


In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



