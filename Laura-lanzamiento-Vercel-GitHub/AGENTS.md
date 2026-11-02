# Laura — instrucciones persistentes

## Propósito y usuarios
Ayudar a la Dra. Laura y su asistente a reducir una inasistencia inicial estimada de 30 %. Google Calendar es la autoridad de horarios; WhatsApp es el canal de contacto. Priorizar tareas administrativas simples en español de México.

## Alcance
Mantener recordatorios y confirmaciones y ampliar con seguimiento administrativo de tratamientos de varias sesiones: total, realizadas, pendientes y próxima cita vinculada. No agregar facturación, contabilidad, expedientes, diagnósticos ni decisiones clínicas. El demo usa exclusivamente datos ficticios y adaptadores simulados; nunca presentar un envío simulado como real.

## Forma de trabajar
Leer specs/001-confirmacion.md y specs/002-sesiones.md antes de cambiar comportamiento y skills/disenar-marca-laura/SKILL.md antes de diseñar UI. specs/003-seguimiento-sin-cita.md es una propuesta todavía no implementada: leerla al trabajar ese incremento y no describirla como disponible. Consultar docs/ICP-Y-PERSONAS.md para priorizar necesidades, distinguiendo supuestos de hechos. Si un criterio falla, primero registrar el caso y aclarar la especificación, conservando su intención; después corregir código y prueba. No debilitar criterios para aprobar. Registrar evidencia en docs/VALIDACION.md.

## Reglas técnicas
Usar JavaScript ES modules sin dependencias para este demo. Separar dominio de DOM. Guardar solamente datos ficticios en localStorage. Identificar envíos por cita, revisión y ventana para evitar duplicados. Cambiar fecha invalida recordatorios y respuestas anteriores. No cancelar por silencio. Mostrar errores y permitir reintento. No insertar texto de usuario con innerHTML.

Preservar el estado guardado de la primera versión mediante migración no destructiva en la misma clave. Calcular pendientes como total menos realizadas. Realizadas solo cambia mediante registro humano; confirmar cita no equivale a sesión realizada. Próxima sesión deriva de la cita vinculada vigente, no de una segunda copia de su fecha. Nombre de tratamiento es etiqueta administrativa, sin notas clínicas ni datos de facturación. Conservar identidad visual y skill de marca existente sin recrearla.

## Validación y producción
Ejecutar npm test y verificar UI de escritorio y móvil. No guardar secretos. Producción exige backend persistente, autenticación, permisos, OAuth Calendar, webhooks verificados, plantillas aprobadas, consentimiento, cola e idempotencia transaccional. Un temporizador del navegador no es un scheduler de producción.

Para la entrega manual en Vercel, conservar dist y vercel.json; ejecutar npm run build. No regenerar la interfaz para cambiar de hosting. No publicar ni iniciar sesión en Vercel sin una nueva instrucción: el usuario hará ese paso. No inventar URL de Vercel ni asumir que se transfieren acceso privado o localStorage desde ChatGPT Sites. Los datos del demo siempre son ficticios.
