# <span style="color:red">ANTEPROYECTO DE LEY ORGÁNICA DE CIBERSEGURIDAD PROCESAL E INTEGRIDAD DEL SISTEMA DE JUSTICIA Y DE LA ADMINISTRACIÓN PÚBLICA.</span>

República Bolivariana de Venezuela

Documento técnico-jurídico de tipo investigativo, <span style="color:red">V- 1.1</span>

Elaborado con base en:

- Reglamento (UE, Euratom) 2023/2841 (arquitectura de CERT-EU y de la Junta Interinstitucional de Ciberseguridad).

- Boletín Cybersecurity Basics for Courts, Joint Technology Committee COSCA/NACM/NCSC (2025).

- Constitución de la República Bolivariana de Venezuela <span style="color:red">(en especial arts. 26, 28, 49, 110, 141, 203, 253 y 257).</span>

<span style="color:red">- Ley Orgánica de Procedimientos Administrativos (LOPA) y principios del procedimiento administrativo digital.</span>

- ISO/IEC 27037, 27041, 27042, 27043 (informática forense); RFC 3227; NIST SP 800-86; ISO/IEC 27001, 27035; ISO 37301, 37001; ISO/IEC 42001, 23894.

- Manual Único de Cadena de Custodia de Evidencias (Venezuela, versión final 29-09-2017).





EXPOSICIÓN DE MOTIVOS





La República Bolivariana de Venezuela reconoce en el artículo 110 constitucional el interés público de la ciencia, la tecnología y la innovación, y en el artículo 141 consagra que la Administración Pública se fundamenta en los principios de honestidad, transparencia, eficacia, eficiencia y rendición de cuentas, principios que alcanzan, con particular exigencia, a la función jurisdiccional <span style="color:red">y a la totalidad de los procedimientos y actuaciones administrativas del Estado con trascendencia jurídica para los ciudadanos</span>. El marco jurídico vigente en materia de ciberseguridad, representado principalmente por la Ley Especial contra los Delitos Informáticos (2001) y la Ley de Infogobierno, resulta insuficiente frente a la sofisticación de las amenazas contemporáneas y carece de mecanismos técnicos que reduzcan la discrecionalidad humana no controlada en los procesos internos del sistema de justicia <span style="color:red">y de la actividad administrativa pública generadora de actos con efectos jurídicos</span>.



Estos principios no son una innovación normativa reciente, sino la actualización tecnológica de una exigencia tan antigua como el derecho mismo. Ya Ulpiano sintetizó en los tres preceptos del derecho —*honeste vivere* (vivir honestamente), *alterum non laedere* (no dañar a otro) y *suum cuique tribuere* (dar a cada uno lo suyo)— el núcleo ético que toda función pública, y con mayor razón toda función jurisdiccional <span style="color:red">y administrativa</span>, está llamada a realizar. La honestidad exigida por el artículo 141 constitucional no es sino la forma contemporánea del *honeste vivere*; la prohibición de dañar mediante la manipulación de un expediente, la pérdida deliberada de evidencia, <span style="color:red">la alteración de actos administrativos</span> o el retardo procesal inducido no es sino el *alterum non laedere* aplicado al proceso digital; y la garantía de que cada causa <span style="color:red">o procedimiento administrativo</span> sea asignada, tramitada y resuelta conforme a derecho, sin que la discrecionalidad humana no controlada favorezca a unos en detrimento de otros, no es sino el *suum cuique tribuere* traducido en arquitectura tecnológica. Esta Ley no pretende sustituir esos preceptos milenarios: pretende dotarlos, por primera vez, de un soporte técnico capaz de hacerlos exigibles de manera continua, trazable y verificable.



En materia de ciberseguridad del sistema de justicia <span style="color:red">y de la administración pública procesal</span> deben distinguirse dos frentes de riesgo, de naturaleza distinta pero de igual gravedad. El primero lo constituyen los agentes externos: actores maliciosos que buscan comprometer la confidencialidad, integridad o disponibilidad de los sistemas mediante ransomware, intrusión o sabotaje, frente a los cuales se requiere una arquitectura defensiva robusta. El segundo, con frecuencia menos visible pero de consecuencias igualmente graves, lo constituyen los agentes internos: operadores del propio sistema que, por inoperancia o por mala fe deliberada, han contribuido a erosionar la credibilidad de la justicia <span style="color:red">y la legalidad administrativa venezolana</span> mediante la manipulación de expedientes, la pérdida o alteración de evidencia, la asignación irregular de causas o el retardo procesal inducido. Una ley de ciberseguridad procesal que solo mire hacia afuera deja intacta la fuente de deterioro institucional más persistente. Por ello, esta propuesta diseña una arquitectura de integridad procesal que une tecnología de punta con la ciencia forense informática, de modo que el mismo aparato técnico que protege al sistema de justicia del atacante externo sirva también para hacer visible, trazable e inalterable la actuación de quien opera desde dentro.



Esta propuesta toma como referencia comparada el Reglamento (UE, Euratom) 2023/2841 (CERT-EU, Junta Interinstitucional de Ciberseguridad, gestión de crisis y revisión periódica, arts. 24-26) y el boletín Cybersecurity Basics for Courts del Joint Technology Committee (COSCA-NACM-NCSC, 2025), que documenta ataques de ransomware contra tribunales de Los Ángeles, Cleveland y la Administrative Office of the U.S. Courts, y recomienda gobernanza de ciberseguridad, equipos de respuesta a incidentes (CIRT), segmentación de red, mínimo privilegio, autenticación multifactor y continuidad operativa (COOP).



El instrumento se articula con el bloque constitucional venezolano —protección de datos y autodeterminación informativa (art. 28), inviolabilidad de las comunicaciones (art. 48), debido proceso <span style="color:red">judicial y administrativo</span> (art. 49), principios de la función pública (art. 141) y control fiscal y moral del Poder Ciudadano y la Contraloría (arts. 273-291)— y adopta como marco metodológico defendible los estándares ISO/IEC 27001, 27032, 27035, 27037 y 27041-27043 (informática forense), 42001 y 23894 (gestión de riesgos de inteligencia artificial), 31000, 37001 y 37301, así como ISO/IEC/IEEE 29148 e ISO/IEC 25010.



<span style="color:red">Por imperativo de técnica legislativa y rigor constitucional, este instrumento reviste naturaleza de **Ley Orgánica**, de conformidad con el artículo 203 de la Constitución de la República Bolivariana de Venezuela, al estar destinada a desarrollar y garantizar de manera directa derechos constitucionales fundamentales (debido proceso, tutela judicial y administrativa efectiva, derecho a la defensa y autodeterminación informativa), a organizar el funcionamiento de los poderes públicos en el ecosistema digital y a servir de marco normativo transversal a las demás leyes en materia de ciberseguridad e integridad probatoria. En consecuencia, en la jerarquía del ordenamiento jurídico venezolano, sobre esta Ley Orgánica solo rige de forma suprema la Constitución de la República Bolivariana de Venezuela, subordinando a sus mandatos a las leyes ordinarias, decretos y reglamentos sectoriales.</span>



El componente central y diferenciador de esta propuesta es el régimen especial de integridad procesal (Título VII), que emplea la ciberseguridad, la inteligencia artificial, la informática forense y los sistemas de gestión de cumplimiento no solo como defensa frente al agente externo, sino como mecanismo activo frente al agente interno: la sustitución o minimización de la discrecionalidad humana no controlada en los procesos del sistema de justicia <span style="color:red">y de la administración pública</span> estructuralmente vulnerables, dotándolo de procesos continuos, trazables, auditables y automatizados, siempre bajo supervisión humana significativa y con pleno respeto del debido proceso.





# <span style="color:red">LEY ORGÁNICA DE CIBERSEGURIDAD PROCESAL E INTEGRIDAD DEL SISTEMA DE JUSTICIA Y DE LA ADMINISTRACIÓN PÚBLICA.</span>



## TÍTULO I. 

### DISPOSICIONES GENERALES





**Artículo 1°. Objeto <span style="color:red">y carácter orgánico</span>.**

Esta Ley, <span style="color:red">dictada con carácter orgánico al amparo del artículo 203 constitucional,</span> tiene por objeto regular la ciberseguridad de los sistemas de información que soportan la función jurisdiccional, de investigación penal <span style="color:red">y los procedimientos administrativos que produzcan efectos jurídicos</span>; establecer el régimen de integridad, trazabilidad y valor probatorio de la evidencia y los actos digitales del sistema de justicia <span style="color:red">y de los órganos del Poder Público</span>; y crear un régimen especial de integridad procesal que reduzca, mediante automatización y auditoría continua, la discrecionalidad humana no controlada en los procesos internos <span style="color:red">judiciales y administrativos</span> estructuralmente vulnerables a la corrupción o a la influencia indebida.





**Artículo 2°. Ámbito de aplicación.**

<span style="color:red">Esta Ley Orgánica se aplica a:</span>
<span style="color:red">1) El Poder Judicial, incluyendo al Tribunal Supremo de Justicia y todos los circuitos, cortes y tribunales de la República;</span>
<span style="color:red">2) El Ministerio Público;</span>
<span style="color:red">3) La Defensa Pública;</span>
<span style="color:red">4) Los órganos auxiliares de justicia con funciones periciales, policiales, de custodia de evidencia o de registro procesal (peritos informáticos forenses, depósitos judiciales, oficinas de alguacilazgo y cuerpos de investigaciones científicas);</span>
<span style="color:red">5) Los órganos y entes que ejercen el Poder Público Nacional, Estadal y Municipal, en lo relativo a sus procedimientos administrativos sustanciados por medios electrónicos, expedientes digitales, actos administrativos sancionatorios o declarativos de derechos, y cualquier actuación administrativa generadora de efectos jurídicos vinculantes para los ciudadanos;</span>
<span style="color:red">6) Las personas naturales o jurídicas de derecho privado que provean bienes, servicios, plataformas o infraestructura tecnológica a los sujetos y procesos anteriores.</span>

<span style="color:red">Quedan expresamente exceptuados del ámbito de esta Ley únicamente los procesos meramente internos de gestión administrativa o de soporte operativo interno que carezcan por completo de trascendencia jurídica o efectos directos sobre los administrados, así como las infraestructuras críticas estatales no vinculadas a funciones procesales, probatorias o de sustanciación administrativa de actos jurídicos.</span>





**Artículo 3°. <span style="color:red">Articulación e integración normativa</span>.**

<span style="color:red">Las disposiciones de esta Ley Orgánica se articulan e integran con el bloque de constitucionalidad, la Ley Orgánica de Procedimientos Administrativos, la Ley de Infogobierno, la Ley Especial contra los Delitos Informáticos y la Ley Orgánica de Amparo sobre Derechos y Garantías Constitucionales. Su supremacía y rango preferente respecto de las demás leyes ordinarias y especiales se rigen conforme a lo dispuesto en la Disposición Final Primera de este instrumento.</span>





**Artículo 4°. Principios rectores.**

Rigen esta Ley los principios de legalidad, proporcionalidad, debido proceso <span style="color:red">judicial y administrativo</span>, contradicción, seguridad jurídica, trazabilidad, preservación forense continua, mínima intervención humana en lo reglado, <span style="color:red">celeridad y transparencia administrativa, presunción de autenticidad de actos digitales certificados, no discriminación algorítmica</span> y supervisión humana significativa sobre todo sistema automatizado o de inteligencia artificial que produzca efectos sobre un proceso judicial, <span style="color:red">administrativo</span> o disciplinario.





**Artículo 5°. Definiciones.**

A los efectos de esta Ley se entiende por:

1. Ciberseguridad procesal: conjunto de controles técnicos y organizativos orientados a proteger la confidencialidad, integridad, disponibilidad y trazabilidad de los sistemas de información que soportan actos procesales <span style="color:red">y procedimientos administrativos con relevancia jurídica</span>.

2. Acto procesal digital: toda actuación judicial, fiscal, de defensa pública <span style="color:red">o administrativa</span> generada, tramitada o registrada por medios electrónicos (auto, sentencia, notificación, diligencia, <span style="color:red">acto administrativo, providencia, resolución,</span> dictamen pericial).

<span style="color:red">3. Actuación o procedimiento administrativo con efecto jurídico: conjunto coordinado de actos y diligencias electrónicas sustanciadas ante o por la Administración Pública, que crean, modifican o extinguen situaciones jurídicas subjetivas, aplican sanciones o determinan derechos y obligaciones de los particulares.</span>

4. Sistema de gestión de causas <span style="color:red">y expedientes</span>: plataforma que registra, distribuye y da seguimiento a los expedientes judiciales, fiscales <span style="color:red">o administrativos</span>.

5. Cadena de custodia digital: procedimiento documentado que garantiza integridad, autenticidad y trazabilidad de la evidencia digital desde su recolección hasta su valoración judicial <span style="color:red">o administrativa</span>.

6. Registro inmutable procesal: bitácora electrónica protegida criptográficamente que documenta cada acto procesal <span style="color:red">o administrativo</span> digital, inalterable incluso por el administrador técnico del sistema.

7. Preparación forense continua (*forensic readiness*): diseño de los sistemas judiciales <span style="color:red">y administrativos</span> para preservar automáticamente evidencia digital idónea desde su origen.

8. CSIRT-Ulpiano: equipo técnico especializado de respuesta a incidentes de ciberseguridad del sistema de justicia <span style="color:red">y de los procesos administrativos críticos</span>.





## TÍTULO II. 

### INSTITUCIONALIDAD SECTORIAL





#### Capítulo I. 

##### Dirección Nacional de Ciberseguridad Procesal (DINCIP)





**Artículo 6°. Creación y naturaleza.**

Se crea la Dirección Nacional de Ciberseguridad Procesal (DINCIP), adscrita al Tribunal Supremo de Justicia, con autonomía técnica y funcional, y con relación de coordinación, no de subordinación, con el Ministerio Público, la Defensa Pública <span style="color:red">y los órganos de la Administración Pública</span>, a fin de garantizar su competencia sobre la totalidad del sistema de justicia <span style="color:red">y la actividad procesal administrativa</span> sin depender de un solo Poder.





**Artículo 7°. Atribuciones.**

Corresponde a la DINCIP: 1) dictar los estándares técnicos de ciberseguridad exigibles a los sistemas de gestión de causas, <span style="color:red">expedientes administrativos digitales,</span> custodia de evidencia y videoconferencia judicial <span style="color:red">y administrativa</span>; 2) coordinar al CSIRT-Ulpiano; 3) llevar el Registro Nacional de Peritos Informáticos Forenses; 4) ejercer la Oficina de Cumplimiento Digital del Sistema de Justicia <span style="color:red">y de la Administración Pública</span> prevista en el Título VII; 5) certificar los sistemas de distribución aleatoria de causas <span style="color:red">y de asignación de expedientes administrativos</span>; y 6) rendir informe anual público a la Asamblea Nacional y a la Contraloría General de la República.





#### Capítulo II. 

##### CSIRT-Ulpiano





**Artículo 8°. Creación y funciones.**

Se crea el CSIRT-Ulpiano como equipo técnico responsable de la detección, contención, erradicación y recuperación frente a incidentes cibernéticos que afecten al sistema de gestión de causas, <span style="color:red">expedientes administrativos,</span> la custodia de evidencia digital, trazabilidad y los servicios de videoconferencia judicial <span style="color:red">y administrativa</span>, en atención a la exposición documentada de los tribunales <span style="color:red">y entes públicos</span> frente al ransomware (Los Ángeles, julio 2024; Cleveland, febrero-marzo 2025; Administrative Office of the U.S. Courts, 2025).

*Fuente/base normativa: JTC, Cybersecurity Basics for Courts (2025), secciones "State of Cybersecurity in Courts" y "Assembling a Cybersecurity Incident Response Team (CIRT)"*





**Artículo 9°. Ejercicios y capacidades.**

El CSIRT-Ulpiano realizará ejercicios de simulación al menos dos veces al año y mantendrá un inventario actualizado de capacidades técnicas disponibles en cada circuito judicial, sede fiscal <span style="color:red">y órgano administrativo competente</span>.





#### Capítulo III. 

##### Junta de Integridad Procesal





**Artículo 10°. Composición y funciones.**

Se crea la Junta de Integridad Procesal, integrada por un representante del Tribunal Supremo de Justicia, uno del Ministerio Público, uno de la Defensa Pública, uno de la Contraloría General de la República, <span style="color:red">un representante del órgano rector de la Administración Pública Nacional</span> y el Director de la DINCIP, quien la coordina. Aprueba la taxonomía de severidad de incidentes del sistema de justicia <span style="color:red">y de la administración pública procesal</span>, el plan de gestión de crisis cibernéticas sectorial y los protocolos operativos estándar de respuesta.

*Fuente/base normativa: Reglamento (UE, Euratom) 2023/2841, art. 23 (adaptado a escala sectorial).*





## TÍTULO III.

### ESTÁNDARES TÉCNICOS APLICABLES A LOS SISTEMAS DEL SISTEMA DE JUSTICIA <span style="color:red">Y DE LA ADMINISTRACIÓN PÚBLICA</span>.





**Artículo 11°. Adopción de estándares.**

Los sistemas de gestión de causas, <span style="color:red">expedientes administrativos,</span> custodia de evidencia, videoconferencia judicial <span style="color:red">o administrativa</span> y notificación electrónica implementarán un Sistema de Gestión de Seguridad de la Información conforme a ISO/IEC 27001, con referencia complementaria en ISO/IEC 27035 (gestión de incidentes) e ISO 22301 (continuidad).





**Artículo 12. Controles mínimos.**

Dichos sistemas implementarán, como mínimo: autenticación multifactor para jueces, fiscales, defensores, <span style="color:red">autoridades administrativas</span> y personal con acceso a expedientes; principio de mínimo privilegio; segmentación de red respecto de otros sistemas administrativos no judiciales <span style="color:red">o no vinculados al procedimiento</span>; y cifrado en tránsito y en reposo de los expedientes electrónicos.

*Fuente/base normativa: JTC (2025), secciones "Least Privilege Access" y "Zero Trust Principles"*





**Artículo 13°. Continuidad operativa <span style="color:red">procesal y administrativa</span>.**

Cada circuito judicial, sede fiscal <span style="color:red">y ente administrativo con funciones de sustanciación</span> contará con un Plan de Continuidad de Operaciones que garantice, ante un incidente cibernético, la disponibilidad de mecanismos alternos de tramitación de causas <span style="color:red">y procedimientos</span> urgentes (medidas cautelares, habeas corpus, flagrancia, <span style="color:red">medidas preventivas administrativas urgentes</span>), sin dependencia exclusiva de plataformas digitales comprometidas.

*Fuente/base normativa: JTC (2025), sección "Cybersecurity as Part of a COOP".*





## TÍTULO IV.

### DEBIDO PROCESO Y GARANTÍAS EN EL ENTORNO DIGITAL





**Artículo 14. Debido proceso y prueba electrónica.**

En toda actuación <span style="color:red">judicial o administrativa</span> en que se emplee evidencia digital deberá garantizarse el derecho a la defensa, el acceso a las pruebas, conforme al artículo 49 constitucional. La evidencia digital solo será admisible cuando conste su cadena de custodia conforme al Título VI.





**Artículo 15. Supervisión humana significativa.**

Ninguna decisión jurisdiccional, fiscal, <span style="color:red">administrativa</span> o disciplinaria podrá fundarse exclusivamente en la salida de un sistema automatizado o de inteligencia artificial, sin intervención, revisión y motivación de un juez, fiscal, <span style="color:red">funcionario o autoridad administrativa competente debidamente identificada</span>, quien asume la responsabilidad del acto.





**Artículo 16. Protección de datos de las partes <span style="color:red">y administrados</span>.**

El tratamiento de datos personales de las partes, víctimas, investigados <span style="color:red">y administrados</span> en los sistemas judiciales <span style="color:red">y administrativos</span> observará los principios de licitud, finalidad, minimización y limitación del plazo de conservación, conforme al artículo 28 constitucional.





## TÍTULO V.

### GESTIÓN DE INCIDENTES DEL SISTEMA DE JUSTICIA <span style="color:red">Y ADMINISTRATIVO</span>





**Artículo 17°. Obligación de notificación.**

Todo circuito judicial, fiscalía, dependencia de la Defensa Pública <span style="color:red">u órgano o ente de la Administración Pública que tramite procedimientos con efectos jurídicos</span> notificará al CSIRT-Ulpiano cualquier incidente significativo dentro de las veinticuatro (24) horas siguientes a su detección, y presentará informe final dentro de los treinta (30) días continuos siguientes.





**Artículo 18. Taxonomía de severidad.**

La Junta de Integridad Procesal aprobará una taxonomía común de severidad de incidentes aplicable uniformemente a todo el sistema de justicia <span style="color:red">y a los órganos administrativos cubiertos por esta Ley</span>.





## TÍTULO VI. 

### RÉGIMEN PROBATORIO Y PERITAJE INFORMÁTICO FORENSE





**Artículo 19. Cadena de custodia digital.**

La recolección, preservación, embalaje, transporte, análisis y presentación de evidencia digital se realizará conforme a ISO/IEC 27037 (identificación, recolección, adquisición y preservación), ISO/IEC 27041 (idoneidad de métodos), ISO/IEC 27042 (análisis e interpretación) e ISO/IEC 27043 (principios de investigación), en concordancia con el Manual Único de Cadena de Custodia de Evidencias vigente.





**Artículo 20°. Orden de volatilidad.**

La recolección observará el orden de volatilidad de las fuentes de mayor a menor: memoria y conexiones activas, procesos en ejecución, almacenamiento temporal, medios persistentes, respaldos remotos u offline, conforme a RFC 3227 y NIST SP 800-86.





**Artículo 21. Registro Nacional de Peritos Informáticos Forenses.**

La DINCIP llevará el Registro Nacional de Peritos Informáticos Forenses, certificando su idoneidad técnica como auxiliares de justicia <span style="color:red">y de la administración pública</span>, sin perjuicio de las facultades del Ministerio Público, del Poder Judicial <span style="color:red">y de los órganos del Poder Ciudadano</span>.





**Artículo 22°. Preparación forense continua.**

Los sistemas de gestión de causas, <span style="color:red">expedientes administrativos</span> y custodia de evidencia se diseñarán bajo el principio de preparación forense continua (ISO/IEC 27043), de modo que la evidencia de cualquier acto procesal <span style="color:red">o administrativo</span> se preserve automáticamente en condiciones aptas para su valoración judicial <span style="color:red">o administrativa</span>.





**Artículo 23. Valor probatorio de registros electrónicos.**

Los registros electrónicos generados por sistemas certificados conforme a esta Ley, protegidos mediante función hash y sello de tiempo, harán fe salvo prueba en contrario, sin menoscabo del derecho de la contraparte <span style="color:red">o del administrado</span> a impugnar su autenticidad conforme al artículo 49 constitucional.





## TÍTULO VII. 

### INTEGRIDAD PROCESAL <span style="color:red">Y ADMINISTRATIVA</span>: AUTOMATIZACIÓN ANTICORRUPCIÓN APLICADA AL SISTEMA DE JUSTICIA <span style="color:red">Y AL PODER PÚBLICO</span>





El Título VII no pretende ya automatizar procesos generales del Estado, sino de forma acotada y coherente con el objeto sectorial de esta Ley, los procesos internos del propio sistema de justicia <span style="color:red">y de la administración sustanciadora de actos con trascendencia jurídica</span> donde la discrecionalidad no controlada ha sido históricamente señalada como fuente de riesgo: la asignación de causas <span style="color:red">y trámites</span>, la custodia de la evidencia y la carrera judicial, fiscal <span style="color:red">y de la función pública administrativa</span>.





**Artículo 24. Procesos de riesgo prioritario del sistema de justicia <span style="color:red">y de la administración pública</span>.**

Se declaran procesos de riesgo prioritario, sujetos a automatización obligatoria: 1) la distribución y asignación aleatoria de causas judiciales, fiscales <span style="color:red">y expedientes administrativos sancionatorios o de adjudicación</span>; 2) la custodia y cadena de evidencia física y digital; 3) los procesos de ascenso, traslado y evaluación de jueces, fiscales, defensores públicos <span style="color:red">y funcionarios de sustanciación administrativa</span>; 4) las notificaciones y actos de comunicación procesal <span style="color:red">y administrativa</span>; 5) la contratación de bienes y servicios tecnológicos propios del sistema de justicia <span style="color:red">y de las plataformas administrativas</span>; y 6) la administración de nómina y beneficios del personal judicial, fiscal <span style="color:red">y administrativo</span>.





**Artículo 25. Oficina de Cumplimiento Digital del Sistema de Justicia <span style="color:red">y de la Administración Pública</span>.**

Se crea, dentro de la DINCIP, la Oficina de Cumplimiento Digital del Sistema de Justicia <span style="color:red">y de la Administración Pública</span>, que opera de forma continua motores de análisis de datos e inteligencia artificial para la detección de anomalías y señales de alerta temprana en los procesos, conforme a ISO 37301 e ISO 37001.





**Artículo 26. Distribución aleatoria de causas <span style="color:red">y expedientes</span> mediante sistema certificado.**

La asignación de causas <span style="color:red">y expedientes administrativos de sustanciación</span> se realizará mediante un sistema de distribución aleatoria certificado por la DINCIP, cuyo algoritmo será público, auditable y generará un registro inmutable de cada asignación, sin intervención manual salvo recusación, inhibición o impedimento debidamente motivados.





**Artículo 27. Segregación de funciones programáticas.**

Ningún funcionario del sistema de justicia <span style="color:red">o de la administración pública</span> podrá, por sí solo, iniciar, aprobar y ejecutar una misma operación crítica dentro de los procesos del artículo 24° (principio de "cuatro ojos digital").





**Artículo 28. Registro inmutable de actos procesales <span style="color:red">y administrativos</span>.**

Todo acto procesal <span style="color:red">o administrativo</span> digital generará automáticamente un registro criptográficamente verificable, que identifique al funcionario interviniente, fecha, hora y acción ejecutada, inalterable incluso por los administradores técnicos del sistema.





**Artículo 29. Interoperabilidad con órganos de control.**

Los sistemas que soporten los procesos del artículo 24° interoperarán en tiempo real, mediante API seguras, con tableros de acceso directo para la Contraloría General de la República, <span style="color:red">la Defensoría del Pueblo</span> y la Inspectoría General de Tribunales, sin necesidad de solicitud previa.





**Artículo 30. Auditoría algorítmica continua.**

Todo sistema de inteligencia artificial empleado conforme a este Título será objeto de auditoría algorítmica continua conforme a ISO/IEC 23894 e ISO/IEC 42001, evaluando sesgos, exactitud, deriva del modelo y posibilidad de manipulación interna.





**Artículo 31. Prohibición de decisión sancionatoria íntegramente automatizada.**

Ninguna sanción disciplinaria <span style="color:red">o administrativa</span> contra un juez, fiscal, defensor, funcionario judicial <span style="color:red">o servidor público administrativo</span> podrá fundarse exclusivamente en una alerta algorítmica; esta constituye un elemento indiciario que debe ser corroborado y motivado por autoridad competente, con pleno respeto del artículo 49 constitucional.





**Artículo 32. Derecho a explicación y recurso humano.**

Todo funcionario <span style="color:red">o administrado</span> afectado por una alerta automatizada tiene derecho a una explicación comprensible de sus fundamentos y a recurrir ante autoridad humana competente, sin que la naturaleza automatizada del proceso obstaculice su ejercicio.





## TÍTULO VIII. 

### RÉGIMEN SANCIONATORIO <span style="color:red">Y DISCIPLINARIO</span>





<span style="color:red">**Artículo 33°. Catálogo de sanciones principales.**</span>

<span style="color:red">Sin perjuicio de la responsabilidad civil o penal a que hubiere lugar, las infracciones a las disposiciones de esta Ley Orgánica serán sancionadas de forma proporcional y escalonada de acuerdo a su gravedad, con las siguientes sanciones principales:</span>

<span style="color:red">1. **Sanciones para infracciones leves:**</span>
<span style="color:red">a) Amonestación escrita y llamado de atención formal con constancia en el expediente del funcionario o empleado.</span>
<span style="color:red">b) Orden vinculante de subsanación y cumplimiento técnico obligatorio en un plazo no mayor a cinco (5) días hábiles.</span>

<span style="color:red">2. **Sanciones para infracciones graves:**</span>
<span style="color:red">a) Suspensión temporal del ejercicio de funciones sin goce de sueldo, por un período de treinta (30) a ciento ochenta (180) días continuos para funcionarios judiciales, fiscales o servidores públicos.</span>
<span style="color:red">b) Suspensión temporal de la certificación técnica de idoneidad del sistema o de la acreditación en el Registro Nacional de Peritos por un período de tres (3) meses a un (1) año.</span>
<span style="color:red">c) Para proveedores privados de infraestructura o servicios tecnológicos: multa pecuniaria equivalente a entre doscientas (200) y mil (1000) veces el tipo de cambio oficial de la moneda de mayor valor fijada por el Banco Central de Venezuela al momento de la infracción, y/o suspensión temporal del registro de proveedores por un lapso de hasta un (1) año.</span>

<span style="color:red">3. **Sanciones para infracciones muy graves:**</span>
<span style="color:red">a) Destitución del cargo para jueces, fiscales, defensores o funcionarios judiciales o administrativos, con inhabilitación especial para el desempeño de funciones públicas por un período de tres (3) a diez (10) años, tramitada a través del órgano disciplinario o contralor competente.</span>
<span style="color:red">b) Cancelación y revocatoria definitiva de la certificación técnica del sistema informático involucrado, con orden de cese inmediato de operaciones no auditadas.</span>
<span style="color:red">c) Cancelación definitiva del Registro Nacional de Peritos Informáticos Forenses e inhabilitación permanente como auxiliar de justicia o perito en procedimientos administrativos.</span>
<span style="color:red">d) Para personas jurídicas y contratistas tecnológicos: inhabilitación definitiva para contratar con el Poder Judicial, el Ministerio Público y la Administración Pública por un lapso de cinco (5) a quince (15) años, junto con multa pecuniaria de mil una (1001) a cinco mil (5000) veces el tipo de cambio de la moneda de mayor valor fijada por el Banco Central de Venezuela.</span>
<span style="color:red">e) Remisión obligatoria del expediente al Ministerio Público para el inicio inmediato de la investigación penal que corresponda.</span>





<span style="color:red">**Artículo 34°. Tipificación y clasificación de infracciones.**</span>

<span style="color:red">Constituyen infracciones administrativas y disciplinarias a la presente Ley:</span>

<span style="color:red">1. **Infracciones Leves:**</span>
<span style="color:red">a) El retraso injustificado, no superior a cuarenta y ocho (48) horas, en la remisión de información o reportes no críticos solicitados por la DINCIP.</span>
<span style="color:red">b) El incumplimiento formal de los formatos de documentación de incidentes cuando no se haya comprometido la integridad del expediente o la evidencia.</span>

<span style="color:red">2. **Infracciones Graves:**</span>
<span style="color:red">a) El incumplimiento injustificado de la obligación de notificación de incidentes de ciberseguridad al CSIRT-Ulpiano en el plazo de 24 horas previsto en el artículo 17°.</span>
<span style="color:red">b) La omisión o retardo inexcusable en la implementación de los controles mínimos técnicos y de seguridad exigidos en el Título III.</span>
<span style="color:red">c) La negligencia o inobservancia en la preservación de la cadena de custodia digital conforme a los estándares de los artículos 19° y 20°.</span>
<span style="color:red">d) El uso de plataformas de videoconferencia o canales de comunicación no certificados para actos procesales o administrativos de carácter reservado o confidencial.</span>

<span style="color:red">3. **Infracciones Muy Graves:**</span>
<span style="color:red">a) La elusión, sabotaje, bloqueo deliberado, manipulación o desactivación de los mecanismos de trazabilidad, registro inmutable o auditoría continua previstos en el Título VII.</span>
<span style="color:red">b) La alteración, borrado o modificación no autorizada de bitácoras, registros criptográficos o evidencias digitales en sistemas de gestión judicial o administrativa.</span>
<span style="color:red">c) La alteración o manipulación fraudulenta del algoritmo de distribución aleatoria de causas o asignación de trámites.</span>
<span style="color:red">d) La emisión intencional de decisiones procesales o sanciones fundadas exclusivamente en sistemas automatizados en violación flagrante de los artículos 15° y 31°.</span>
<span style="color:red">e) La revelación no autorizada, filtración o comercialización de datos personales protegidos, secretos procesales o información de causas judiciales o administrativas.</span>





**Artículo <span style="color:red">35°</span>. Circunstancias agravantes específicas.**

Cuando el sujeto activo de una conducta tipificada en la Ley Especial contra los Delitos Informáticos o en la legislación penal ordinaria sea un funcionario del sistema de justicia <span style="color:red">o de la administración pública</span> que manipule, desactive o adultere un sistema de automatización, registro inmutable o mecanismo de cumplimiento previsto en el Título VII, <span style="color:red">o cuando la conducta produzca retardo malicioso, nulidad procesal o afectación irreparable a derechos fundamentales,</span> la pena penal se incrementará en una tercera parte <span style="color:red">y en el orden administrativo se aplicará siempre la sanción en su grado máximo</span>.





<span style="color:red">**Artículo 36°. Circunstancias atenuantes.**</span>

<span style="color:red">Constituyen circunstancias atenuantes en la imposición de las sanciones administrativas y disciplinarias:</span>
<span style="color:red">1) La detección y reporte voluntario e inmediato del incidente o vulnerabilidad a la DINCIP o al CSIRT-Ulpiano antes de que haya producido daños a terceros o haya sido detectado por auditorías externas;</span>
<span style="color:red">2) La adopción pronta y efectiva de medidas de contención, corrección y reparación del daño;</span>
<span style="color:red">3) La colaboración activa y exhaustiva con las autoridades de investigación forense y disciplinarias.</span>





<span style="color:red">**Artículo 37°. Procedimiento y doble instancia.**</span>

<span style="color:red">La imposición de las sanciones previstas en este Título corresponderá a la DINCIP, a la Inspectoría General de Tribunales, a los órganos disciplinarios del Ministerio Público, de la Defensa Pública o a la máxima autoridad del órgano administrativo respectivo, según el ámbito del infractor, sustanciándose mediante procedimiento sumario que garantice el derecho a la defensa, la audiencia previa y el recurso de apelación o reconsideración ante la autoridad jerárquica superior, garantizando plenamente la doble instancia conforme al artículo 49 de la Constitución.</span>





## TÍTULO IX.

### COOPERACIÓN





**Artículo <span style="color:red">38°</span>. Cooperación con la autoridad nacional de ciberseguridad.**

La DINCIP coordinará con la autoridad nacional de ciberseguridad del Estado, si existiere, el intercambio de indicadores de compromiso relativos a incidentes que afecten al sistema de justicia <span style="color:red">y a los procesos administrativos regulados</span>, sin que ello implique subordinación jerárquica.





**Artículo <span style="color:red">39°</span>. Cooperación judicial <span style="color:red">y administrativa</span> internacional.**

El Tribunal Supremo de Justicia, el Ministerio Público <span style="color:red">y los órganos competentes del Poder Público</span> podrán suscribir acuerdos de cooperación técnica con redes internacionales de ciberseguridad judicial <span style="color:red">y administrativa</span>, conforme al artículo 154 constitucional.





## TÍTULO X. 

### FORMACIÓN





**Artículo <span style="color:red">40°</span>. Capacitación obligatoria del personal judicial <span style="color:red">y administrativo</span>.**

Todo juez, fiscal, defensor, <span style="color:red">autoridad administrativa de sustanciación</span> y funcionario con acceso a sistemas de gestión de causas <span style="color:red">y expedientes digitales</span> recibirá capacitación anual obligatoria en ciberseguridad procesal, protección de datos y ética del uso de sistemas automatizados.

*Fuente/base normativa: JTC (2025), sección "Training: A Foundational Element of Cyber Defense"*





## TÍTULO XI.

### DISPOSICIONES TRANSITORIAS, <span style="color:red">DEROGATORIAS Y FINALES</span>





#### <span style="color:red">Capítulo I. Disposiciones Transitorias</span>





**Artículo <span style="color:red">41°</span>. Implementación gradual.**

El sistema de justicia <span style="color:red">y los órganos de la Administración Pública obligados</span> dispondrán de dos (2) años para certificar sus sistemas conforme al Título III y de cuatro (4) años para completar la migración de los procesos del artículo 24° a los mecanismos de automatización, trazabilidad y auditoría continua del Título VII, priorizando los circuitos judiciales <span style="color:red">y sedes administrativas</span> de mayor volumen de causas <span style="color:red">y trámites</span>.





**Artículo <span style="color:red">42°</span>. Revisión periódica.**

La DINCIP presentará a la Asamblea Nacional y al Tribunal Supremo de Justicia, dentro del primer año de vigencia y con periodicidad bienal, un informe de implementación.





#### <span style="color:red">Capítulo II. Disposiciones Derogatorias y Finales</span>





<span style="color:red">**DISPOSICIÓN FINAL PRIMERA. Naturaleza Orgánica y Supremacía Normativa.**</span>

<span style="color:red">Por su carácter de **Ley Orgánica** dictada de conformidad con el artículo 203 de la Constitución de la República Bolivariana de Venezuela, esta Ley tiene rango superior a toda ley ordinaria, y goza de aplicación preferente y prevalente en todo lo relativo a los sujetos, procesos y actuaciones judiciales, fiscales y administrativas reguladas en este instrumento. Sobre esta Ley Orgánica solo rige de forma suprema la Constitución de la República Bolivariana de Venezuela.</span>

<span style="color:red">Las leyes ordinarias, decretos y normas generales de ciberseguridad, administración digital o delitos informáticos que existan o llegaren a dictarse se aplicarán de forma supletoria y subordinada, sin que puedan menoscabar ni contradecir las garantías procesales, probatorias y de integridad consagradas en esta Ley Orgánica.</span>





<span style="color:red">**DISPOSICIÓN FINAL SEGUNDA. Régimen Derogatorio.**</span>

<span style="color:red">Quedan derogadas todas las disposiciones normativas de rango legal o sublegal, reglamentos, resoluciones, circulares o instructivos de carácter general o particular que colidan con lo establecido en la presente Ley Orgánica o que autoricen prácticas de discrecionalidad no auditada en la asignación de causas, custodia de evidencias o sustanciación electrónica de actos jurídicos.</span>





**DISPOSICIÓN FINAL <span style="color:red">TERCERA</span>. Vigencia.**

Esta Ley <span style="color:red">Orgánica</span> entrará en vigencia a partir de su publicación en la Gaceta Oficial de la República Bolivariana de Venezuela.





---





## ANEXO. 

### MATRIZ DE TRAZABILIDAD NORMATIVA (V-1.1 ORGÁNICA)

| Título & Materia Regulada | Artículos | Fuente Internacional & Estándar Técnico | Bloque Constitucional & Norma Nacional Concordante |
| :--- | :--- | :--- | :--- |
| **Título I. Disposiciones Generales**<br>Objeto, ámbito subjetivo amplio y principios rectores | Arts. 1° al 7° | Reglamento (UE, Euratom) 2023/2841; JTC (2025); ISO/IEC 27000 | <span style="color:red">**CRBV, arts. 26, 28, 49, 110, 141 y 203 (Carácter Orgánico)**; LOPA; Ley de Infogobierno.</span> |
| **Título II. Institucionalidad Sectorial**<br>DINCIP, CSIRT-Ulpiano y Junta de Ciberseguridad | Arts. 8° al 11° | Reglamento (UE, Euratom) 2023/2841, arts. 3-6, 23 | <span style="color:red">CRBV, arts. 253, 254 y 284; Ley Orgánica del Poder Judicial.</span> |
| **Título III. Estándares Técnicos**<br>Zero Trust, MFA y Continuidad Operativa | Arts. 12° y 13° | ISO/IEC 27001, 27035, 22301; JTC (2025) "Zero Trust" | <span style="color:red">Normativas SUSCERTE y estándares de interoperabilidad del Estado.</span> |
| **Título IV. Debido Proceso Digital**<br>Garantías procesales frente a tecnologías | Arts. 14° al 16° | Directiva (UE) 2016/680; ISO/IEC 42001 | <span style="color:red">CRBV, arts. 28, 49 y **257 (El proceso como instrumento fundamental para la justicia)**.</span> |
| **Título V. Gestión de Incidentes**<br>Notificación obligatoria y respuesta inmediata | Arts. 17° y 18° | JTC (2025), "COOP" — Reglamento (UE, Euratom) 2023/2841 | CRBV, art. 141; Protocolo Nacional Alertas SUSCERTE. |
| **Título VI. Régimen Probatorio Forense**<br>Cadena de custodia y peritaje informático | Arts. 19° al 23° | ISO/IEC 27037, 27041-27043; RFC 3227; NIST SP 800-86 | Manual Único de Cadena de Custodia de Evidencias (2017); COPP arts. 181-187. |
| **Título VII. Integridad Procesal y Administrativa**<br>Sorteo inmutable y 4 ojos digital (Aporte propio) | Arts. 24° al 32° | **★ Aporte Original: Ulpiano CCO (Jull Ortiz)**; ISO 37001, ISO 37301, ISO/IEC 42001, ISO/IEC 23894 | <span style="color:red">**CRBV, art. 141 (Rendición de cuentas y probidad)**; CRBV art. 203; Ley Contra la Corrupción.</span> |
| **Título VIII. Régimen Sancionatorio**<br>Graduación escalonada y agravante por manipulación | Arts. 33° al 36° | Graduación escalonada (Leves, Graves, Muy Graves) | <span style="color:red">Ley Especial contra los Delitos Informáticos; Estatuto de la Función Pública; Código de Ética del Juez.</span> |
| **Título IX. Cooperación**<br>Asistencia técnica interinstitucional | Art. 37° | Reglamento (UE, Euratom) 2023/2841 | CRBV, art. 154 (Cooperación institucional e internacional). |
| **Título X. Formación**<br>Capacitación continua en ciberseguridad | Art. 38° | JTC (2025) "Cybersecurity Training" | Escuela Nacional de la Magistratura; Escuela de Fiscales. |
| **Título XI. Supremacía y Disposiciones**<br>Supremacía Orgánica y régimen transitorio | Arts. 39° al 42° | Reglamento (UE, Euratom) 2023/2841, arts. 24-26 | <span style="color:red">CRBV, arts. 202-218 y **203 (Supremacía Orgánica)**; Disposiciones Finales.</span> |



---



Documento de trabajo individual investigativo. No constituye instrumento jurídico, sino más bien colaboración al proyecto de Gustavo A. Amoni Reverón, que me da la oportunidad de plantear ideas que posiblemente colaboren en fortalecer el sistema judicial <span style="color:red">y la administración pública</span> venezolana. 



Adicional aclaró que este documento no ha sido verificado minuciosamente, ya que el proyecto donde venía trabajando era sobre la arquitectura de una inteligencia artificial capaz de evitar la corrupción siguiendo estudios de International Business Machines Corporation (IBM) y las principales universidades norteamericanas, en ningún momento pensé en participar o aportar algo para la creación de una normativa, mi enfoque ha sido meramente técnico informático forense. 



Por otra parte, aclaró que podría ser que alguna normativa esté desactualizada o no este una que sea pertinente, pero me he basado en esta primera etapa en mi archivo local, continuaré la revisión artículo por artículo y actualizaré este proyecto, ya que me funciona para tener más claridad en las ideas técnicas correspondiente a inteligencia artificial y automatizacion de procesos.



Repositorio: https://github.com/julljoll/Ulpiano-Chief-Compliance-Officer
