# Arquitectura del feature

## Demo
La interfaz del navegador llama al dominio JavaScript. El adaptador de agenda es una colección local de citas ficticias y el adaptador de mensajería registra entregas simuladas. localStorage conserva el estado del demo en ese navegador. Las pruebas pueden ejecutar las reglas sin DOM ni red.

## Flujo
Agenda ficticia → cita con revisión → evaluación de ventana temporal → mensaje identificado por cita/revisión/ventana → respuesta simulada → estado de cita o tarea de asistente.

Reprogramar incrementa la revisión e invalida mensajes anteriores; por tanto una respuesta al horario viejo no afecta al nuevo. Una petición de cambio no confirma otra hora. Una cita sin consentimiento no produce recordatorios. El silencio no cancela.

## Límites
No hay procesos en segundo plano con la página cerrada. No se calculan resultados de negocio a partir de los datos del demo. El 30 % es contexto inicial, no métrica medida. Los tratamientos tienen solo etiqueta administrativa, conteos de sesiones y referencia de cita; no hay información clínica ni facturación.

## Extensión de sesiones
La colección treatments amplía el estado existente en la misma clave de localStorage sin reemplazar citas, mensajes ni tareas. El dominio calcula pendientes como total-realizadas y deriva la próxima sesión consultando nextAppointmentId en la agenda. Así, reprogramar/cancelar se refleja sin sincronizar una segunda fecha. Las realizadas se editan manualmente y no dependen del estado de confirmación. Si treatments no existe, la migración lo agrega; únicamente la semilla ficticia reconocida obtiene ejemplos iniciales una vez. Los tratamientos futuros de producción necesitan un identificador estable de paciente, no asociación por nombre; en este demo solo se usan nombres ficticios.

## Sustitución de adaptadores en producción
El servidor recibirá cambios Calendar mediante suscripción renovable y sincronización incremental/reconciliación. La cola persistente ejecutará trabajos con reloj del servidor y restricción única de idempotencia. El proveedor oficial WhatsApp devolverá IDs de mensaje, y los webhooks firmados actualizarán estado de entrega y respuesta. El estado de la cita y el registro de envío deberán actualizarse transaccionalmente para resistir múltiples trabajadores. Se requieren pruebas de contrato con ambos proveedores antes de declarar integraciones listas.

## Acceso y datos
Dos cuentas individuales con roles de doctora y asistente; minimizar campos, secretos solo en servidor, cifrado y respaldos, auditoría y retención definida. El demo privado de Sites protege la visita pero no proporciona estos controles de aplicación.
