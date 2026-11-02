# Paso 1 · ICP y user personas

Proyecto: Laura · Agenda que acompaña. Fecha: 2 de noviembre de 2026.

## Qué sabemos y qué estamos suponiendo

**Datos del problema:** consultorio dental pequeño; una doctora y una asistente; Google Calendar funciona como agenda; cerca del 30 % de los pacientes no llega; hay tratamientos de varias sesiones que se interrumpen; la asistente envía recordatorios individuales por WhatsApp; no se necesita facturación ni expediente clínico.

**Supuestos para diseñar esta entrega:** ubicación en México, un solo consultorio, 1–2 sillones, 8–12 citas diarias, 20–40 tratamientos activos, personal con manejo básico de herramientas digitales y uso de computadora y celular. Estas cifras, edades, presupuesto y preferencias son ficticias; no describen una investigación realizada.

## ICP: perfil de cliente ideal

| Característica | Perfil propuesto | Base |
|---|---|---|
| Organización | Consultorio dental independiente pequeño | Problema |
| Equipo | Doctora propietaria y una asistente | Problema |
| Agenda | Ya usa y quiere conservar Google Calendar | Problema |
| Comunicación | WhatsApp es su canal habitual | Problema |
| Dolor principal | Huecos por inasistencia y pacientes sin siguiente sesión | Problema |
| Carga administrativa | Recordatorios y seguimiento manuales | Problema |
| Tamaño operativo | Una sede, 1–2 sillones, 8–12 citas al día | Supuesto |
| Decisión de compra | La doctora decide; la asistente valida utilidad diaria | Supuesto |
| Presupuesto orientativo | 300–700 MXN al mes, sujeto a validar y a cargos de mensajería | Supuesto; no es precio del producto |
| Requisito de adopción | Aprender el flujo básico en menos de 30 minutos | Hipótesis a probar |
| Necesidad de seguridad | Acceso individual, permisos mínimos, respaldo y minimización de datos | Requisito propuesto para versión real |

**Trabajo que busca resolver:** «Cuando un paciente tiene una cita o le quedan sesiones, quiero saber si asistirá y qué contacto sigue, para aprovechar la agenda y facilitar que continúe su tratamiento sin pasar la mañana mandando mensajes».

**Desencadenante de compra:** una semana con varias ausencias y tratamientos sin siguiente cita. **Objeciones probables:** «No quiero cambiar mi agenda», «No quiero otro sistema complicado», «¿Mis datos estarán protegidos?» y «¿Cuánto costará WhatsApp?». Todas son hipótesis de entrevista.

**Fuera del ICP inicial:** cadenas con muchas sedes, centros que necesitan un expediente clínico integrado o negocios que buscan contabilidad/facturación. No se ampliará el producto para cubrirlos en este lanzamiento.

## Persona compradora · Dra. Laura

Perfil ficticio: 39 años, odontóloga y propietaria de un consultorio en Monterrey; trabaja con una asistente, usa Calendar en el celular y tiene conocimientos digitales básicos/intermedios.

- **Objetivo:** reducir ausencias y saber qué tratamientos no tienen próxima sesión.
- **Frustración:** descubre un hueco cuando ya es difícil ocuparlo; el paciente deja de volver al sentirse mejor.
- **Necesidad:** un resumen claro y decisiones administrativas, sin volver a capturar la agenda.
- **Responsabilidad:** definir el total de sesiones y el momento apropiado para regresar; revisar casos que necesitan contacto humano.
- **Criterio de compra:** ahorro medible de tiempo y recuperación de citas a un costo sostenible.
- **Frase representativa inventada:** «Quiero dedicarme a atender; necesito ver quién va a venir y a quién debemos dar seguimiento».

## Persona usuaria principal · Sofía, asistente

Perfil ficticio: 28 años, atiende recepción, agenda y mensajes; utiliza WhatsApp a diario y prefiere botones claros y listas cortas.

- **Objetivo:** comenzar la mañana con una lista de acciones concretas, no revisar paciente por paciente.
- **Tareas:** revisar confirmaciones, gestionar cambios, registrar sesiones realizadas y programar próximas visitas.
- **Dificultad:** alternar entre Calendar y conversaciones; olvidar contactar a alguien que no volvió.
- **Necesidad:** distinguir «sin próxima cita», «contactar en una fecha acordada» y «ya contactado», sin mensajes duplicados.
- **Éxito cotidiano:** terminar la revisión administrativa en 15 minutos o menos, hipótesis pendiente de medir.
- **Frase representativa inventada:** «Dime qué tengo que hacer hoy y déjame registrar lo que ya resolví».

## Persona beneficiaria · Paciente

Perfil ficticio: Daniel, 34 años, recibe atención de varias sesiones y responde por WhatsApp. Puede olvidar la cita o posponerla al dejar de sentir molestias. Necesita mensajes breves, opciones para cambiar horario y una salida clara si no desea más recordatorios. No debe necesitar instalar una aplicación.

## Qué significa seguridad aquí

Para una versión real se proponen cuentas separadas de doctora y asistente, acceso mínimo, registro de cambios, respaldo y consentimiento de contacto. Son requisitos de producto; **no están implementados por publicar este demo en Vercel**. El demo solo guarda datos ficticios en el navegador y no tiene autenticación propia. La protección del Site privado actual no se traslada automáticamente a Vercel.

## Validación del perfil antes de cobrar

Entrevistar a 3–5 consultorios que encajen en el perfil y observar una mañana administrativa con autorización. Medir tiempo actual, ausencias y casos sin próxima sesión. Validar disposición de pago, quién toma la decisión, requisitos de seguridad y utilidad de conservar Calendar. Ajustar el perfil con evidencia; no presentar los supuestos anteriores como hechos.
