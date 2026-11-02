# Proceso y trazabilidad

## Contexto
Se partió del consultorio de una doctora y una asistente, agenda en Google Calendar, recordatorios manuales por WhatsApp e inasistencia aproximada del 30 %. Se seleccionó un único feature: recordatorio y confirmación de citas.

## Especificación revisada
El agente principal redactó AGENTS.md y una primera spec, y la revisó antes de implementación (v1.1): límites 48/24/0 h, no cancelar por silencio, consentimiento, reintento, revisiones de cita, respuestas obsoletas y separación de demo/producción. Se establecieron cinco criterios verificables. La revisión es técnica; no sustituye validación de negocio con la doctora.

## Skill
Se creó Marca Laura mediante el flujo de creación de skills, con instrucciones y referencia de tokens/voz. La copia del proyecto permite al agente aplicar la misma identidad a componentes nuevos.

## Implementación con agente
El agente principal encargó al agente `implementar_feature` leer AGENTS.md, la spec y la skill, implementar dist/ y las pruebas, y ejecutar los criterios. El encargo no sustituyó la especificación. El agente principal revisa resultados, ejecución de pruebas e interfaz antes de publicar.

## Regla de corrección
Si se detecta incumplimiento, registrar primero en la spec el escenario omitido o la precisión necesaria, sin relajar el resultado esperado; corregir luego código/pruebas. Las limitaciones de integraciones reales se declaran expresamente desde la spec y no se contabilizan como funciones productivas.

## Ampliación solicitada: sesiones
Se mantienen la base del proyecto y la skill de marca. El agente principal actualizó AGENTS.md y redactó/revisó specs/002-sesiones.md antes de encargar al mismo agente de implementación la ampliación de dominio, interfaz y pruebas. La nueva spec tiene problema, diseño, cinco criterios y reglas de migración no destructiva. Se conservan pruebas y spec de la primera entrega. El agente principal verifica regresión, recorridos y layout antes de actualizar el mismo Site privado. La skill de marca existente se aplica sin recrearla ni cambiar su identidad.

## Entrega de lanzamiento manual en Vercel
Se preservó el código de interfaz y dominio de la clase 2. Se añadieron ICP/personas con supuestos explícitos, SPEC 003 del siguiente feature y preparación de hosting. La SPEC 003 tiene estado propuesto y no se ha implementado; sus métricas son metas a validar, no resultados. El usuario indicó que hará el despliegue: no hubo conexión ni publicación en Vercel, y el requisito de URL queda pendiente de ese paso manual. La configuración se contrastó con documentación oficial de Vercel; la validación local se registra aparte.
