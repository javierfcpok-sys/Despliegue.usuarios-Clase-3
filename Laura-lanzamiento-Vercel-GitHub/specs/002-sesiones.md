# Feature 002: tratamientos de varias sesiones

Estado: v2.0, revisada técnicamente antes de implementación. Extensión del proyecto existente, sin rehacer el primer feature. Aprobación clínica/comercial no solicitada ni presumida.

## Problema
La asistente no puede ver cuántas sesiones tiene un tratamiento, cuántas se han realizado, cuántas faltan o si está programada la siguiente. Necesita coordinar continuidad sin un expediente clínico y sin duplicar la agenda.

## Diseño de solución
Agregar una sección «Tratamientos y sesiones», con la misma paleta, tipografía, tarjetas y diseño responsive. Mantener agenda, mensajes y controles actuales. Acciones: registrar tratamiento, editar conteos y vincular próxima cita existente o programar una nueva desde el tratamiento usando el formulario de citas actual.

Tratamiento: id único, paciente ficticio (nombre), etiqueta administrativa corta del tratamiento, total entero >= 2, realizadas entero entre 0 y total, nextAppointmentId opcional. Pendientes = total - realizadas, nunca editable directamente. Estado calculado: pendiente si realizadas=0, en proceso si 0<realizadas<total y finalizado si realizadas=total. No registrar diagnósticos, notas de evolución, imágenes, pagos ni facturas. Mostrar que no es expediente clínico.

La asistente puede corregir total/realizadas en un formulario validado. No inferir realizadas por confirmar una cita ni por avanzar reloj. Un tratamiento finalizado no admite próxima cita y debe borrar su vínculo de próxima sesión al guardarse; sus citas permanecen en la agenda sin cambios. No se modifican tratamientos automáticamente por una respuesta del paciente.

Próxima sesión: referencia a una cita de la agenda del mismo paciente (comparación de nombre sin espacios externos ni diferencias de mayúsculas). Mostrar fecha y hora en America/Monterrey solo si la cita existe, no está cancelada y está en el futuro respecto al reloj del demo, y quedan sesiones pendientes. Si solicita cambio, mostrar fecha conservada y etiqueta de solicitud. Reprogramar cita actualiza la fecha mostrada por derivación. Si se cancela o pasa la hora, mostrar «Sin próxima sesión programada» y permitir vincular/programar otra. Una cita no se vincula simultáneamente como próxima sesión de dos tratamientos activos. No crear recordatorios adicionales de tratamiento en esta ampliación: usar el flujo de citas existente.

Datos y compatibilidad: conservar la clave de localStorage de v1 y las citas, mensajes, tareas, reloj e identificadores existentes. Migrar agregando treatments sin alterar esas colecciones. Solo en el conjunto ficticio inicial reconocido por IDs y nombres de ejemplo se permiten muestras iniciales de tratamientos (Ana/Luis/Marta), una sola vez; no sobrescribir conteos editados ni insertar muestras al recargar si treatments ya existe. Otros datos antiguos migran con treatments vacío. Semilla nueva/reinicio incluye tratamientos ficticios y al menos un caso sin próxima cita. Fallos de validación no mutan el estado.

## Criterios de aceptación verificables
1. TS1 Registro y edición: registrar un tratamiento con paciente, etiqueta y total >=2; editar total/realizadas. Rechazar vacíos, totales fraccionarios o <2, realizadas negativas, fraccionarias o mayores al total y IDs duplicados, sin mutación parcial. Mostrar total, realizadas, pendientes y estado coherentes; la igualdad realizadas=total finaliza y quita próximo vínculo.
2. TS2 Próxima sesión: vincular una cita futura del mismo paciente o programarla desde el tratamiento; aparece en agenda y tarjeta con la misma fecha. Reprogramar actualiza tarjeta; cancelar o pasar la fecha elimina próxima sesión visible. Rechazar otro paciente, cita cancelada/pasada/inexistente y asociación duplicada entre tratamientos activos. Solicitar cambio conserva fecha y etiqueta.
3. TS3 Conteos: pendientes siempre total-realizadas. Confirmar, cancelar, reprogramar o avanzar reloj no incrementa realizadas. Editar realizados actualiza tarjeta/métricas sin alterar citas ni generar mensajes por sí solo.
4. TS4 Persistencia y regresión: recarga conserva tratamientos y vínculos. Migrar estado v1 sin perder citas/mensajes/tareas/reloj, ni duplicar tratamientos al recargar. Reinicio recupera muestras. Las nueve pruebas del feature 001 continúan pasando y sus cinco criterios siguen vigentes.
5. TS5 Interfaz: mantener diseño del primer demo, banner de simulación y nueva sección enlazada en navegación. Registrar/editar/programar operables con teclado, etiquetas visibles, errores legibles y sin desbordamiento horizontal en marco de 390 px. No incluir campos clínicos ni facturación. Entregar archivos actualizados, evidencia de pruebas y demo privado en la misma URL.

## Revisión y validación
Antes de implementar se precisaron tipos enteros, correcciones manuales, autoridad de la agenda, cita cancelada/pasada, tratamiento finalizado, asociaciones inválidas, migración v1, datos de muestra y exclusiones. Verificar dominio con node:test y recorridos en navegador. Si falla un criterio, registrar escenario y aclaración aquí antes de corregir código; no relajar la intención para aprobar.

## Aclaración v2.1 de presentación
El campo label representa el nombre del tratamiento a efectos administrativos; mostrar «Nombre del tratamiento» en el formulario para que la asistente lo reconozca. Los ejemplos pueden nombrar tratamientos (endodoncia, ortodoncia o rehabilitación), siempre ficticios y sin notas clínicas; sus cantidades son demostrativas, no recomendaciones. Conservar los mismos controles y validaciones. La sección se coloca después de la agenda y antes de mensajes, con acceso también en móvil.
