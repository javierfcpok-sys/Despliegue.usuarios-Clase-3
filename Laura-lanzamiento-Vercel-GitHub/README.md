# Laura · Agenda que acompaña

Demo funcional de recordatorios, confirmaciones y seguimiento administrativo de tratamientos por sesiones para el consultorio de la Dra. Laura. Ampliación del primer demo, con el mismo diseño y URL privada. Solo datos ficticios; no se conecta con Calendar ni WhatsApp. No usar con pacientes reales.

## Entregables

### Lanzamiento preparado para Vercel
- `docs/ICP-Y-PERSONAS.md`: ICP y personas; supuestos ficticios separados del problema.
- `specs/003-seguimiento-sin-cita.md`: nuevo feature propuesto con criterios y métricas; aún no implementado.
- `docs/DESPLEGAR-EN-VERCEL.md`: pasos manuales, configuración y comprobación de URL.
- `docs/ENTREGA-LANZAMIENTO.md`: estado del entregable y espacio para registrar tu URL real.
- `vercel.json`: publica dist con framework Other, sin dependencias externas.
- `scripts/check-deploy.mjs`: verifica salida estática y sintaxis antes de publicar.

En Vercel importar el repositorio con raíz en esta carpeta, Framework **Other**, Build Command `npm run build` y Output Directory `dist`. No se necesita añadir variables de entorno. El despliegue lo realiza el usuario. No se ha generado una nueva URL de Vercel y la protección privada del demo anterior no se hereda.

### Entregables anteriores conservados
- `AGENTS.md`: contexto persistente y reglas del agente.
- `specs/001-confirmacion.md`: problema, diseño, cinco criterios y revisión.
- `specs/002-sesiones.md`: ampliación de tratamientos, diseño y cinco criterios verificables.
- `skills/disenar-marca-laura/`: skill reutilizable de marca con tokens y voz.
- `dist/`: aplicación web sin dependencias.
- `tests/`: pruebas automatizadas del dominio.
- `docs/VALIDACION.md`: evidencia y limitaciones de validación.
- `docs/PROCESO.md`: implementación con agente y trazabilidad.

## Ejecutar
Requiere Node.js 20 o superior para pruebas: `npm test`. Para verificar todo lo que ejecutará Vercel: `npm run build` (pruebas + comprobación estática; no reconstruye la interfaz).
Para abrir la aplicación, ejecutar `python3 -m http.server 8080 --directory dist` y visitar http://localhost:8080. No abrir como file:// porque utiliza módulos ES.

## Recorrido
Revisar la agenda ficticia, ejecutar automatización y abrir bandeja para simular una respuesta. Avanzar el reloj 24 horas para ver el segundo recordatorio. Reprogramar una cita y comprobar que no acepta respuestas anteriores. Simular fallo y reintentar. El reinicio restaura todos los datos de ejemplo.

En «Tratamientos y sesiones», revisar total, realizadas, pendientes y próxima sesión. Registrar un tratamiento ficticio con al menos dos sesiones; editar el conteo manual y vincular una cita futura del mismo paciente o programarla desde el tratamiento. Reprogramar esa cita en agenda actualiza la tarjeta. Cancelar o pasar su hora deja el tratamiento sin próxima sesión visible. Confirmar una cita nunca suma sesiones realizadas. Los datos de la primera versión se conservan al migrar.

## Alcance y producción
Este es un demo monousuario guardado en el navegador. No tiene autenticación de aplicación, sincronización multiusuario, scheduler en segundo plano ni integraciones reales. El acceso privado al demo publicado no reemplaza el control de acceso de producción.

Los tratamientos solo tienen etiqueta administrativa, paciente ficticio, conteos y referencia de próxima cita. No hay expedientes clínicos, diagnósticos, notas, recetas, facturación ni contabilidad. Las sesiones son cantidades definidas por la doctora y registradas por la asistente, no recomendaciones del sistema.

Para producción: backend y base persistente con permisos y auditoría; OAuth de Calendar y renovación de notificaciones; cola de trabajos con claves idempotentes únicas; API oficial de WhatsApp, plantillas aprobadas, webhooks firmados y mapeo de message IDs; consentimiento y baja, política de retención y respaldo. Calendar conserva la autoridad de horarios y una solicitud de cambio requiere intervención de la asistente. La definición clínica de próximas sesiones queda fuera del feature.
