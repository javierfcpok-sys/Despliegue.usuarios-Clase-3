# Paso 2 · SPEC 003: seguimiento de tratamientos sin próxima sesión

Versión: 1.0. Estado: especificación propuesta, revisada técnicamente; **todavía no implementada**. Se apoya en el demo de sesiones de la clase 2 y conserva sus dos features. Esta entrega prepara el despliegue de ese demo y define el siguiente incremento, sin presentarlo como funcionalidad terminada.

## Problema

El demo ya muestra sesiones pendientes y próxima cita, pero la asistente no tiene una lista de seguimiento con fecha y resultado de contacto. Un tratamiento puede quedarse sin próxima sesión aunque el paciente tenga sesiones pendientes. Falta convertir esa información en una tarea concreta y evitar que el mismo caso se contacte repetidamente sin control.

## Usuario y resultado esperado

Usuario principal: Sofía, la asistente del ICP definido en docs/ICP-Y-PERSONAS.md. Doctora responsable de indicar el seguimiento. Resultado: identificar casos sin próxima sesión, acordar cuándo contactar y registrar una acción administrativa hasta programar otra cita o cerrar ese seguimiento por decisión explícita.

Historia: «Como asistente, quiero una bandeja de tratamientos con sesiones pendientes y sin próxima cita, para organizar el seguimiento y facilitar que el paciente vuelva».

## Diseño de la solución

### Bandeja y reglas

Ampliar «Necesitan tu atención» con una lista de seguimiento. Un tratamiento es candidato si total-realizadas > 0 y nextSession devuelve null usando la regla de SPEC 002. No inferir abandono clínico ni necesidad médica por días transcurridos.

Cada tratamiento tendrá como máximo un registro administrativo de seguimiento, identificado por treatmentId. Estados: `por_contactar`, `pospuesto`, `contactado`, `cerrado`. Campos: treatmentId, estado, fechaDeContacto opcional, ultimoIntentoAt opcional, resultado estructurado opcional y updatedAt. Resultados: sin respuesta, solicita horarios o no desea continuar. No añadir notas clínicas libres.

Un candidato sin registro aparece como «Sin fecha de contacto». La asistente elige una fecha en horario de Monterrey, conforme a indicación de la doctora. No inventar automáticamente un intervalo clínico. Orden: fechas vencidas, fechas de hoy, sin fecha y fechas futuras. Empates: fecha y después nombre. Las fechas futuras quedan en «Programados», fuera de las acciones para hoy.

### Acciones

1. Asignar o cambiar fecha de contacto. Rechazar fechas inválidas; reabrir un seguimiento cerrado exige una acción explícita.
2. Preparar un mensaje neutral: «Hola, {nombre}. Te contactamos del consultorio de la Dra. Laura para ayudarte a programar tu próxima visita. ¿Quieres que te compartamos horarios?». No incluir tratamiento, diagnóstico ni cantidades de sesiones.
3. Copiar el borrador, con alternativa de seleccionar el texto si el portapapeles falla. Copiar no significa enviar, entregar ni registrar un contacto.
4. Registrar manualmente «contactado» y resultado. Para otro intento se debe acordar otra fecha. No hay reenvío automático.
5. Programar o vincular una cita con las funciones de SPEC 002. Al existir una próxima cita válida, el caso sale de la bandeja; el registro se conserva. Si luego vuelve a quedar sin cita, reaparece conforme a su estado y fecha; si estaba contactado, mostrar «Revisar siguiente paso», no fingir un nuevo envío.
6. Cerrar seguimiento cuando el paciente no desee continuar. Cierra la tarea administrativa, no el tratamiento, no sus sesiones y no otras citas. Reabrir exige acción humana.

El demo no tiene teléfono ni consentimiento real: solo preparará borradores ficticios; no abrirá WhatsApp ni contactará pacientes. La futura integración real deberá comprobar canal/autorización y bajas antes de enviar.

### Persistencia y compatibilidad

Agregar una colección followups a la misma clave local, sin reemplazar citas, mensajes, tareas, tratamientos ni reloj. Un estado antiguo migra con followups vacío. Derivar elegibilidad desde la agenda en cada render; no guardar una segunda copia de la próxima fecha. Registrar timestamps con el reloj de demo en simulación y reloj de servidor en la futura versión real. Mantener la skill de marca, estados textuales, foco y controles móviles.

## Criterios de aceptación verificables

| ID | Escenario y resultado esperado |
|---|---|
| SF1 · Elegibilidad | Con A=4 totales/1 realizada/sin cita, B=4/4/sin cita, C=4/1/con cita futura y D=4/1/con cita cancelada o pasada: solo A y D son candidatos abiertos. Nunca mostrarlos como «abandono confirmado». |
| SF2 · Fecha y prioridad | Fijar casos con fecha ayer, hoy, futura y sin fecha: el orden y las secciones siguen las reglas. Cambiar fecha y recargar conserva la elección. Valores inválidos no producen escrituras parciales ni registros duplicados por tratamiento. |
| SF3 · Contacto y borrador | Preparar/copiar un borrador no modifica estado de contacto ni métricas de intentos. El texto no contiene tratamiento ni sesiones. Fallo de portapapeles ofrece texto seleccionable. Solo «Registrar contacto» guarda intento, timestamp y resultado, una vez por acción; un nuevo intento requiere nueva fecha y confirmación explícita. |
| SF4 · Ciclo y no interferencia | Programar cita futura retira el caso de la bandeja; reprogramarla mantiene el vínculo. Cancelarla permite reevaluar el caso. Cerrar/reabrir seguimiento cambia únicamente su registro; nunca aumenta realizadas, cancela citas o finaliza tratamiento. Confirmar cita no completa tratamiento. |
| SF5 · Regresión y acceso | Migrar un estado v1/v2 conserva todos los registros existentes; recarga mantiene followups. Pasan las 19 pruebas previas. En 390 px no hay desbordamiento; acciones operables con teclado, errores textuales y banner de simulación. Sin campos clínicos, facturas ni envío real. |

## Métricas de éxito

**Las metas siguientes son hipótesis, no resultados medidos ni garantías.** El demo actual no captura esta instrumentación. La evaluación de negocio requiere el feature implementado y un piloto autorizado. En el demo se validarán reglas con datos ficticios, no tasas de pacientes reales.

| Métrica | Definición y denominador | Línea base / meta propuesta | Ventana |
|---|---|---|---|
| Principal: recuperación de próxima cita | Tratamientos elegibles que obtienen una cita futura válida dentro de 7 días de entrar en la cohorte / tratamientos elegibles de esa cohorte con 7 días completos de observación ×100. Una entrada por tratamiento en el piloto. Agendar no equivale a asistir. | Base desconocida; medir primero. Meta piloto >=40 %. | Cohortes semanales; 4 semanas de piloto más 7 días de cierre. |
| Cobertura de seguimiento | Casos abiertos que llegan a fecha de contacto y registran un intento en el siguiente día hábil / casos abiertos cuya fecha de contacto venció con un día hábil completo de observación ×100. Fin de semana definido por horario del consultorio. | Base por medir; meta >=90 %. | Semanal. |
| Tiempo para resolver la lista | Mediana de minutos de revisión activa al día; excluir tiempos de espera. Registrar inicio/fin de bloque administrativo mediante bitácora voluntaria. | Medir 2 semanas previas; meta <=15 min/día y al menos 30 % menos frente a base. | Comparación base vs piloto. |
| Protección: contactos duplicados | Intentos repetidos para el mismo tratamiento sin nueva fecha/intención humana / intentos registrados ×100. Usar eventos con ID único, no clics de copiar. | Meta 0 %. | Diario y semanal. |
| Resultado del sistema: inasistencia | Citas marcadas como falta / citas que debían realizarse, excluyendo canceladas/reprogramadas ×100. La app actual no registra asistencia real. | Contexto estimado ~30 %; confirmar línea base. Meta exploratoria <=20 % a 8 semanas. | Piloto completo; no atribuir el cambio a este feature aislado. |

Si un denominador es cero, mostrar «Sin datos», no 0 % ni 100 %. Reportar siempre numerador/denominador. Con menos de 20 casos elegibles, reportar conteos y ampliar observación; no declarar éxito estadístico. No confundir personas con tratamientos: un paciente puede tener más de uno.

## Instrumentación propuesta

Para la futura implementación: eventos con eventId, treatmentId opaco, timestamp y tipo: elegible_por_primera_vez, fecha_asignada, contacto_registrado, cita_vinculada, seguimiento_cerrado y reabierto. Emitir en transición real, no al renderizar/recargar. Mantener contadores agregados; no enviar nombres, textos ni tratamientos a un servicio analítico externo. Para medir inasistencia se necesitará una fuente de asistencia verificada o una bitácora autorizada, fuera de este feature.

## Plan de validación y decisión

1. Probar SF1–SF5 con reloj fijo, cancelación, finalización, recarga y migración. No marcar aceptación como aprobada hasta implementar y ejecutar estas pruebas.
2. Ensayo de usabilidad con 3 asistentes: encontrar un caso, fijar fecha y registrar un contacto simulado sin ayuda.
3. Medir 2 semanas de base; ejecutar piloto de 4 semanas y completar la observación de 7 días del último grupo. Evaluar inasistencia a 8 semanas si hay datos.
4. Continuar si mejora recuperación, baja tiempo y no hay duplicados. Si no, entrevistar usuarios y ajustar reglas/SPEC antes de cambiar instrucciones al agente.

## Revisión realizada

Se separó falta de cita de abandono clínico; copiar de contactar; agendar de asistir; cierre de seguimiento de finalización del tratamiento; y metas de resultados observados. Se definieron denominadores, cohortes, cero datos, muestra pequeña, consentimiento, persistencia y casos reabiertos antes de implementar. La seguridad aquí es requisito de diseño, no una afirmación de autenticación existente.

## Fuera de alcance

Expedientes, diagnósticos, indicaciones clínicas, facturación, contabilidad, IA clínica, envío automático nuevo por WhatsApp, cambios a las reglas de sesiones o construcción de infraestructura clínica real.
