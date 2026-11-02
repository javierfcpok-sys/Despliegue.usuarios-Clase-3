# Validación del demo

Fecha: 2026-11-01. Datos usados: ficticios. Revisión técnica del agente principal y agente implementador; sin validación de negocio por la doctora.

## Evidencia
- Pruebas Node: 8 casos iniciales aprobados, incluyendo límites exactos 48/24/0 h, consentimiento, idempotencia, reintento, respuestas incompatibles, cancelación, revisión y filtros/métricas.
- Navegador Chromium: solicitud de cambio de Luis conserva horario y crea tarea. Recarga conserva respuesta. Reprogramar a un horario futuro limpia tarea, deja pendiente y marca mensaje anterior obsoleto; genera aviso de nueva revisión.
- Avance de 24 h con fallo: muestra dos fallos; reintentar uno reduce contador de fallos de 2 a 1 y muestra entrega simulada.
- Buscar Luis deja una sola cita; restablecer devuelve cuatro citas de ejemplo.
- Marco de navegador de 390 px: área de contenido 375 px por scrollbar, scrollWidth 375 px; sin desbordamiento horizontal. Vista visual revisada. No equivale a una prueba en dispositivo iOS real.
- Contraste calculado: texto/fondo 11.35:1, secundario/blanco 6.28:1, botón principal 7.07:1, éxito 6.97:1, aviso 6.17:1, error 5.99:1.

## Incidencias y orden de corrección
1. Acciones ocultas a anchos intermedios: aclaración spec v1.2, después CSS corregido.
2. Preview con flags incompatibles: aclaración spec v1.3, después se eliminó scripts.dev para servir dist desde manifiesto.
3. Reintento de aviso fuera de ventana: aclaración spec v1.3, después guardia y prueba añadidas.
4. Alta en HTTP falló por crypto.randomUUID no disponible: reportado en navegador; primero aclarar spec, después corregir y repetir alta/recarga antes de cerrar aceptación.

## Límites
Solo simulación local monousuario, sin pruebas de integración contra Calendar o Meta. No se validó con usuarios reales ni con lectores de pantalla. Producción requiere lo descrito en README y ARQUITECTURA.

## Cierre de aceptación
Spec v1.4 aclaró compatibilidad HTTP/HTTPS antes de cambiar el generador de IDs. Alta repetida en navegador: «Paciente Prueba» guardada, contador 4→5, recarga conserva cinco citas y su recordatorio. Filtro Confirmadas muestra únicamente Marta. Restablecer devuelve cuatro citas. Diálogo probado con Tab (foco en nombre) y Escape (cierra y devuelve foco al botón de alta).

Resultado final: npm test, 9/9 aprobadas. CA1–CA4 verificados por dominio y recorridos indicados; CA5 verificado en navegador, marco móvil y revisión de estilos. No se declara auditoría exhaustiva de accesibilidad ni operación productiva.


## Ampliación 1.1: tratamientos y sesiones

Fecha: 2026-11-01 (hora local del usuario). Se modificó el mismo proyecto conservando el primer demo y su skill de marca. Spec 002 redactada y revisada antes de implementación; aclaración v2.1 precisa nombre de tratamiento y colocación responsive, sin añadir expedientes ni facturación.

- TS1: registro de Paciente Prueba con 4 sesiones y 1 realizada mostró 3 pendientes. Introducir 5 realizadas rechazó el guardado con error legible. Cambiar a 4 finalizó el tratamiento y mostró cero pendientes.
- TS2: desde la tarjeta se programó una cita para el 3 de noviembre a las 11:00; apareció en agenda y tarjeta. Reprogramar a las 12:00 actualizó la tarjeta; cancelar dejó «Sin próxima sesión programada». Se vinculó la cita existente de Marta desde el selector y apareció la misma fecha.
- TS3: durante reprogramación/cancelación se conservó el conteo 1 realizada / 3 pendientes. Edición del conteo fue manual, independiente de mensajes y citas.
- TS4: recarga conservó tratamiento creado. Pruebas de dominio comparan snapshot de arrays/reloj antes y después de migración v1, evitan duplicación y conservan conteos editados; las nueve pruebas originales permanecen.
- TS5: interfaz mantiene paleta, sidebar, agenda y mensajes; nueva sección entre agenda y bandeja, con acceso móvil. Marco de 390 px: clientWidth=375 y scrollWidth=375 por scrollbar, sin desbordamiento; tarjetas revisadas visualmente. Diálogo de tratamiento: Tab enfoca paciente; Escape cierra. No prueba en dispositivo físico ni auditoría completa de lector de pantalla.

Resultado: 19/19 pruebas Node aprobadas (9 de regresión y 10 de tratamientos), verificación de sintaxis y recorridos de navegador descritos. No hay conexión real con Calendar/WhatsApp ni procesamiento con navegador cerrado.


## Preparación de lanzamiento en Vercel · 2026-11-02

Se preservaron los cuatro archivos de dist sin cambios respecto al commit de la ampliación de sesiones (git diff --exit-code HEAD -- dist). No se requirió otro recorrido visual por tratarse de los mismos bytes de interfaz y dominio previamente revisados.

Se añadieron vercel.json (Other, salida dist, instalación omitida, build npm run build), scripts/check-deploy.mjs y documentación de ICP, SPEC propuesta y despliegue manual. npm run build terminó correctamente: 19/19 pruebas existentes y comprobación de cuatro archivos estáticos con sus referencias locales y sintaxis JavaScript. No se añadieron dependencias ni variables de entorno.

Las configuraciones se contrastaron con las páginas oficiales de Vercel enlazadas en DESPLEGAR-EN-VERCEL.md. Los encabezados de respuesta solo se aplicarán en Vercel; no se verificaron en una URL de Vercel porque el usuario indicó que realizará el despliegue manualmente. No se ejecutó la CLI ni se inició sesión ni se publicó en Vercel. No se generó una URL nueva.

La SPEC 003 se revisó por consistencia de elegibilidad, transiciones, independencia de sesiones, no envío real, métricas/cohortes y exclusiones. Sus cinco criterios y métricas siguen pendientes de implementación y piloto; las 19 pruebas aprobadas corresponden únicamente a los dos features ya implementados.
