# Feature 001: recordatorio y confirmación de citas

Estado: revisada para implementación del demo, v1.1. Responsable de aceptación: agente principal. La aprobación de negocio por la doctora queda pendiente.

## Problema
La asistente envía mensajes manuales cada mañana y no tiene una lista confiable de respuestas. Aproximadamente 30 % de pacientes faltan. Necesita recordar citas y distinguir confirmaciones, cambios y cancelaciones sin perder horarios por falta de respuesta.

## Diseño
Demo funcional local, con agenda simulada de Google Calendar y bandeja simulada de WhatsApp; no conecta cuentas ni envía mensajes. Datos ficticios reiniciables. Horas almacenadas como ISO y mostradas en America/Monterrey. Reloj de simulación avanzable 24 horas y botón para ejecutar automatización. Al abrir, ejecuta revisión; al cerrar el navegador no hay actividad.

Cita: id, patient, start, consent, revision y status (pending, confirmed, change_requested, cancelled). Mensaje: idempotency key id/revision/window, appointmentId, revision, window (48 o 24), text y status (delivered, failed, obsolete). Se conserva historial. No almacenar procedimientos.

Ventanas: 24 < horas restantes <= 48 produce el primer recordatorio. 0 < horas restantes <= 24 produce el segundo solo si sigue pending; si se omitió la primera ventana, enviar solo el aviso de 24 h, sin recuperación masiva. A 0 h o después no enviar. Sin consentimiento no enviar. Citas confirmed, change_requested y cancelled no generan más avisos. Una solicitud de cambio conserva el horario y crea una tarea humana. No hay cancelación por silencio.

Las respuestas se vinculan a mensaje y revisión actuales. Solo un mensaje delivered admite respuesta; respuestas repetidas idénticas son inocuas y respuestas contradictorias se rechazan. Reprogramar exige fecha futura, incrementa revisión, deja pending, marca mensajes anteriores obsolete y elimina tareas de la revisión anterior. El fallo simulado no cuenta como entrega; reintentar conserva la misma clave. El demo es monousuario y local, sin garantías de concurrencia entre pestañas.

## Criterios de aceptación verificables
1. CA1: una cita ficticia futura con consentimiento se registra una sola vez por id, aparece ordenada y conserva sus datos tras recarga; nombre vacío o fecha pasada se rechazan.
2. CA2: en límites 48/24/0 h se cumplen las ventanas anteriores; ejecutar dos veces no duplica entregas; sin consentimiento no hay mensajes; un fallo queda visible y puede reintentarse sin duplicar.
3. CA3: desde un recordatorio entregado se puede confirmar, solicitar cambio o cancelar. Se refleja en lista y métricas; cambiar crea tarea sin mover horario; silencio conserva pending. Respuestas antiguas, contradictorias o de mensajes fallidos no modifican la cita.
4. CA4: reprogramar invalida mensajes anteriores y sus respuestas, elimina tareas viejas y permite un único recordatorio por nueva revisión/ventana. Cancelar bloquea avisos posteriores.
5. CA5: panel filtra por estado/búsqueda, muestra agenda, pendientes, fallos e historial; permite restablecer demo. UI operable con teclado, etiquetas visibles, estado textual, sin desplazamiento horizontal a 390 px. Banner permanente identifica simulación y datos ficticios.

## Revisión previa a implementación
Del borrador se aclararon límites exactos, salto de ventana, silencio, fecha futura, respuestas obsoletas, reintento e idempotencia. Se separó el éxito del demo de la integración real. No se implementan seguimiento de tratamientos ni KPIs clínicos en este feature.

## Verificación
Pruebas Node del dominio para CA1–CA4 y filtros/métricas; recorrido de navegador para CA5 y persistencia. Registrar fallos y aclaraciones aquí antes de corregir código; conservar resultados en docs/VALIDACION.md.

## Aclaración v1.2 durante implementación
Revisión de CA5: la lista de acciones debe permanecer visible también en anchos intermedios (761–1150 px), debajo de la agenda. Se detectó que una regla responsive la ocultaba; se aclara este comportamiento antes de corregir CSS. Los campos ocultos del formulario de reprogramación no deben ocupar espacio ni recibir foco. No cambia el alcance ni se relaja el criterio.

## Aclaración v1.3 de reintento y preview
Un reintento solo puede entregar un aviso dentro de su ventana original: aviso 48 h cuando 24 < horas <= 48; aviso 24 h cuando 0 < horas <= 24. Si el reloj avanza, el fallo antiguo se conserva como historial y no se entrega tarde; la automatización puede crear el aviso correspondiente a la ventana actual. Para preview estático de Sites se sirve dist desde el manifiesto, sin scripts.dev (el comando del daemon añade argumentos incompatibles con python http.server).

## Aclaración v1.4 de compatibilidad del identificador
CA1 debe funcionar en preview HTTP y despliegue HTTPS. El identificador de cita local no es un token de autenticación. Usar crypto.randomUUID cuando esté disponible y, en HTTP sin esa API, un generador local que compruebe colisiones contra citas existentes antes de insertar. La unicidad por id y su rechazo de duplicados se mantienen; verificar el fallback con prueba automatizada.

## Ampliación posterior
El seguimiento administrativo por sesiones se define exclusivamente en specs/002-sesiones.md. Las exclusiones de tratamientos en el alcance inicial describen esta primera entrega, no impiden la ampliación solicitada. Se conservan los cinco criterios de citas y todos sus comportamientos; una etiqueta administrativa de tratamiento no se añade a los mensajes ni se convierte en expediente clínico.
