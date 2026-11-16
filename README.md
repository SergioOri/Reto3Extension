# Reto3 - Extensión: Reloj Ábaco
Extensión de un reloj ábaco para Firefox. Se puede cambiar el tema de la extensión entre modo claro y oscuro, además de ocultar y mostrar el texto.

<img width="377" height="188" alt="Modo Oscuro" src="https://github.com/user-attachments/assets/48ad42ef-be6a-4e90-91ef-53781471b08b" />

<img width="375" height="188" alt="Modo Claro" src="https://github.com/user-attachments/assets/30920ce5-d0e7-4007-b3fd-5d81cebb560d" />

## Funcionalidades
- La hora, los minutos y los segundos se muestran sobre tres líneas horizontales.
- La hora actual también se visualiza en forma de texto.
- En los últimos segundos de cada ciclo, las cuentas parpadean antes del reinicio.
- Botón **Modo**: Alterna entre la paleta oscura (synthwave) y la paleta clara (vaporwave).
- Botón **Ocultar/Mostrar hora**: Oculta o muestra el texto de la hora, dejando solo el ábaco.
- Los ajustes se mantienen guardados entre sesiones gracias a `storeItem()` y `getItem()` de p5.js.

## Instalación en Firefox
1. Descargue el repositorio.
2. En la barra de direcciones de Firefox escriba `about:debugging` y seleccione la opción **Este Firefox**.
3. Pulse el botón **Cargar complemento temporal** y seleccione el archivo `manifest.json`.
4. Haga clic en el icono de la extensión en la barra de herramientas.

La instalación es **temporal**: Al cerrar Firefox, se eliminará.

## Tecnologías
- Manifest V3: Para crear la extensión de Firefox
- p5.js: Para crear la interfaz gráfica y funcionamiento del reloj

## Créditos y licencia
- **p5.js**: https://p5js.org/
- Fuente **Press Start 2P**: https://fonts.google.com/specimen/Press+Start+2P

Licencia MIT. Consulte el archivo `LICENSE`.
## Author
Sergio Orihuela Alba - UOC
