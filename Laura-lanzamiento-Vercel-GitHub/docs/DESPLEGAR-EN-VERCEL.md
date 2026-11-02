# Paso 3 · Publicar Laura en Vercel

Fecha de preparación: 2 de noviembre de 2026. Proyecto basado en Laura-proyecto-sesiones-GitHub; interfaz y funciones de la clase 2 conservadas. No se ha accedido a tu cuenta ni creado un despliegue en Vercel.

## Qué está listo

El sitio es HTML/CSS/JavaScript estático. No necesita convertirlo a React, Next.js ni instalar paquetes para funcionar. Se añadieron vercel.json, un comando de comprobación previo al despliegue y esta guía. Solo dist se publica como sitio; las especificaciones y documentos permanecen en el repositorio.

La SPEC 003 es la propuesta del siguiente feature, no código implementado. En línea funcionarán la agenda, los recordatorios simulados y los tratamientos/sesiones ya construidos. No habrá nueva bandeja de seguimiento hasta implementar esa SPEC.

## Ruta recomendada: GitHub → Vercel

1. Descargar el ZIP y descomprimirlo en tu computadora. No subir el ZIP como único archivo del repositorio.
2. Crear un repositorio en GitHub o actualizar el que ya contiene Laura. Subir los archivos extraídos conservando carpetas. En la raíz deben verse README.md, package.json, vercel.json y la carpeta dist; evitar una carpeta envolvente adicional.
3. Entrar a Vercel con tu cuenta. Crear/importar un proyecto desde ese repositorio. La autorización del repositorio la haces tú.
4. Elegir la rama a desplegar y comprobar estos valores:

| Ajuste | Valor |
|---|---|
| Framework Preset | Other |
| Root Directory | La raíz del repositorio; dejar valor predeterminado si allí están package.json y vercel.json |
| Build Command | npm run build |
| Output Directory | dist |
| Install Command | Vacío; vercel.json omite instalación porque no hay dependencias |
| Environment Variables | Ninguna para este demo |

5. Desplegar. El build ejecuta las pruebas existentes y comprueba que index.html, CSS y módulos JS están presentes y tienen sintaxis válida. No cambia la aplicación.
6. Esperar a que el despliegue termine correctamente y abrir la URL real que devuelva Vercel. Copiar esa URL; no inventar una con el nombre del proyecto.
7. Revisar el acceso de visitantes. La restricción privada de ChatGPT Sites no se copia a Vercel. Para una entrega a un evaluador, verificar que pueda abrir el enlace con los permisos que hayas elegido. No introducir datos reales aunque el enlace sea privado.

## Alternativa desde terminal, sin GitHub

Si ya tienes Node.js y prefieres publicar la carpeta local, abrir una terminal en la raíz extraída y ejecutar `npx vercel --prod`. Vercel solicitará tu acceso y la vinculación del proyecto. Este paso lo realizas tú; no está ejecutado por el agente. La ruta GitHub es preferible si quieres conservar historial y actualizar con facilidad.

## Comprobación local opcional

En la raíz: `npm run build`. Deben pasar 19 pruebas y la comprobación estática. Para abrir localmente: `python3 -m http.server 8080 --directory dist`, y visitar http://localhost:8080. No abrir index.html con file://: la app utiliza módulos ES.

## Prueba obligatoria después del despliegue

- Abrir la URL HTTPS y comprobar título, estilos, cuatro citas de ejemplo y banner de simulación.
- Registrar una cita ficticia y verificar que se conserva al recargar.
- Abrir «Tratamientos y sesiones»: revisar total, realizadas, pendientes y próxima fecha.
- Registrar un tratamiento ficticio y programar su siguiente sesión; comprobar vínculo con agenda.
- Reprogramar y cancelar; verificar que realizadas no aumenta automáticamente.
- Abrir el enlace en celular y comprobar formularios y lectura sin desplazamiento horizontal.
- Comprobar la página desde la cuenta/dispositivo que usará el evaluador, de acuerdo con tu configuración de acceso.
- Registrar URL y fecha en docs/ENTREGA-LANZAMIENTO.md. Solo entonces se cumple el requisito de URL de Vercel funcionando.

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| 404 en inicio | Que dist/index.html esté en GitHub, raíz correcta y Output Directory=dist. |
| Página sin estilos o vacía | Que dist/style.css, dist/app.js y dist/domain.js estén incluidos con esos nombres. |
| Build ejecuta otro comando | Revisar configuración del proyecto y el vercel.json de la misma rama. Debe usar Other y npm run build. |
| No ves cambios nuevos | Confirmar que desplegaste el último commit; recargar. |
| No aparecen los datos del demo anterior | Son otro dominio y otro localStorage; Vercel empieza con ejemplos nuevos. No se transfieren datos automáticamente. |
| Evaluador no puede entrar | Revisar acceso/protección elegida en Vercel y compartir el enlace correcto, sin asumir que es público. |

## Alcance de este lanzamiento

Publicar el demo en el entorno de producción de Vercel proporciona una URL de la aplicación; no lo convierte en un sistema listo para pacientes reales. No tiene autenticación propia, base de datos compartida, backups de negocio, programación con navegador cerrado ni integración real de Calendar/WhatsApp. Los encabezados añadidos no sustituyen esos controles. Cada navegador tiene su estado local y quien use ese navegador puede acceder a él.

## Fuentes oficiales consultadas

- [Configuración de builds](https://vercel.com/docs/builds/configure-a-build)
- [Configuración con vercel.json](https://vercel.com/docs/project-configuration/vercel-json)
- [Despliegue desde Git](https://vercel.com/docs/git)
- [Vercel CLI](https://vercel.com/docs/cli/deploy)

Los nombres de las pantallas pueden cambiar. El contrato de esta entrega es vercel.json en la raíz y salida estática dist.
