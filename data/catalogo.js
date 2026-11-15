/* =====================================================================
   CATÁLOGO DEL PORTAFOLIO
   Aquí se registra TODO el material. Para agregar algo nuevo:
   1) Copia una entrada parecida y cambia sus datos, o
   2) Usa la página "Registrar" del sitio: genera la entrada lista para pegar.
   Fechas en formato AAAA-MM-DD.
   ===================================================================== */
window.PORTAFOLIO = {
  autor: {
    nombre: "Angel Daniel Cueva Quispe",
    carrera: "Medicina Humana · 4.º ciclo",
    universidad: "Universidad Nacional de Moquegua",
    semestre: "2026-II"
  },

  /* ---------- CURSOS ---------- */
  cursos: [
    { id: "bioquimica", nombre: "Bioquímica Médica", color: "#002060", grupo: "Grupo A",
      docentes: "Dr. Clinton Oliver Ugarte Espinoza · Blga. Judith Melanie Coaquira Quispe",
      descripcion: "Prácticas de laboratorio: métodos enzimáticos, espectrofotometría y su interpretación clínica." },
    { id: "epidemiologia", nombre: "Epidemiología", color: "#2e75b6", grupo: "Grupo C",
      docentes: "Dra. Idania Edith Mamani Pilco",
      descripcion: "Diseños de estudio, medidas de asociación e impacto, lectura crítica." },
    { id: "nutricion", nombre: "Nutrición", color: "#1f7a52", grupo: "Grupo A",
      docentes: "", descripcion: "Prácticas e informes de nutrición." },
    { id: "inmunologia", nombre: "Inmunología e Inmunopatología", color: "#5b34b5", grupo: "",
      docentes: "", descripcion: "Informes grupales e inmunopatología." },
    { id: "anatomia", nombre: "Anatomía Humana II", color: "#b3184a", grupo: "",
      docentes: "", descripcion: "Material de estudio y repaso." },
    { id: "primeros-auxilios", nombre: "Primeros Auxilios y Emergencias", color: "#c55a11", grupo: "Grupo B",
      docentes: "", descripcion: "Protocolos y práctica de emergencias." }
  ],

  /* ---------- PRÁCTICAS ---------- */
  practicas: [
    {
      id: "bq-p08", curso: "bioquimica", numero: 8, fecha: "2026-11-13",
      titulo: "Perfil lipídico I",
      subtitulo: "Determinación cuantitativa de colesterol total y triglicéridos en suero",
      portada: "material/bioquimica/p08/portada.jpg",
      resumen: "Obtuvimos suero por venopunción y centrifugación (4500 rpm, 5 min) y medimos los triglicéridos (GPO-PAP) y el colesterol total (CHOD-PAP) por métodos enzimático-colorimétricos de punto final. En ambos se forma quinonimina, de color rosado, cuya absorbancia es proporcional a la concentración.",
      ideas: [
        ["Muestra", "Venopunción → tubo sin anticoagulante → reposo 8 min → centrifugar 4500 rpm · 5 min → suero"],
        ["Experimento 1", "Triglicéridos · GPO-PAP · lectura a 505 nm · estándar 200 mg/dL"],
        ["Experimento 2", "Colesterol total · CHOD-PAP · lectura a 546 nm (en la práctica, 505 nm) · estándar 200 mg/dL"],
        ["Cálculo", "C = (A muestra / A estándar) × 200 · VLDL = TG / 5"]
      ],
      video: { archivo: "material/bioquimica/p08/video/Video_P08_Perfil_lipidico.mp4", youtube: "" },
      simulador: "perfil-lipidico",
      informe: {
        archivos: [
          ["Informe completo (Word)", "material/bioquimica/p08/informe/Informe_P08_Perfil_lipidico_COMPLETO.docx"],
          ["Versión para escribir a mano (Word)", "material/bioquimica/p08/informe/Informe_P08_Perfil_lipidico_PARA_MANO.docx"]
        ],
        vista: ["material/bioquimica/p08/informe/vista/p-01.jpg", "material/bioquimica/p08/informe/vista/p-02.jpg",
                "material/bioquimica/p08/informe/vista/p-07.jpg", "material/bioquimica/p08/informe/vista/p-13.jpg"]
      },
      esquemas: [
        ["¿Qué hay en el suero?", "Del tubo centrifugado a una lipoproteína por dentro.", "material/bioquimica/p08/esquemas/suero.mp4"],
        ["Del lípido al color rosado", "Reacciones GPO-PAP y CHOD-PAP hasta la quinonimina.", "material/bioquimica/p08/esquemas/reaccion.mp4"],
        ["Centrifugación", "4500 rpm · 5 min: suero, gel y coágulo.", "material/bioquimica/p08/esquemas/centrifuga.mp4"],
        ["¿Cómo lee el espectrofotómetro?", "Blanco, estándar y muestra; ley de Lambert-Beer.", "material/bioquimica/p08/esquemas/espectro.mp4"],
        ["La LPL descarga los triglicéridos", "VLDL → IDL → LDL en el capilar.", "material/bioquimica/p08/esquemas/transporte.mp4"]
      ],
      galeria: [
        ["mesa-materiales.jpg", "Micropipetas, ligaduras y descartador"],
        ["gradilla-tubos.jpg", "Tubos de vidrio rotulados"],
        ["espectrofotometro.jpg", "Espectrofotómetro GENESYS 150"],
        ["bano-maria.jpg", "Baño maría a 37 °C"],
        ["venopuncion.jpg", "Venopunción: bisel hacia arriba, 15–30°"],
        ["retiro-jeringa.jpg", "Retiro de la jeringa con aguja 21G"],
        ["bateria-tg.jpg", "Batería de tubos de triglicéridos"],
        ["incubacion.jpg", "Incubación en baño maría"],
        ["lectura-cubeta.jpg", "Cubeta en el espectrofotómetro"],
        ["pantalla-tg.jpg", "Lecturas ABS(505) de triglicéridos"],
        ["blanco-ct.jpg", "Blanco de colesterol: amarillo pálido"],
        ["estandar-ct.jpg", "Estándar de colesterol: rosado"],
        ["cubetas.jpg", "Cubetas de 1 cm"],
        ["lectura-ct.jpg", "Lectura de colesterol total"]
      ],
      /* Resultados anonimizados: "Yo" es mi muestra; el resto, voluntarios numerados */
      resultados: {
        tg: { estandar: 0.143, datos: [["V1",0.119],["V2",0.235],["V3",0.173],["V4",0.081],["V5",0.070],["Yo",0.048],["V6",0.116],["V7",0.058],["V8",0.096],["V9",0.038],["V10",0.090]] },
        ct: { estandar: 0.362, datos: [["V8",0.366],["V9",0.494],["V1",-0.025],["Yo",0.291],["V4",0.294],["V2",0.273],["V11",0.243],["V3",0.317],["V10",0.304],["V7",0.257],["V5",0.318]] }
      },
      casos: "perfil-lipidico",
      flashcards: "perfil-lipidico"
    }
  ],

  /* ---------- MATERIAL (biblioteca) ----------
     tipo: informe | video | simulador | esquema | casos | flashcards | presentacion | canva | documento | enlace */
  materiales: [
    { titulo: "Informe P08 · Perfil lipídico I (completo)", curso: "bioquimica", practica: "bq-p08", tipo: "informe", fecha: "2026-11-14",
      url: "material/bioquimica/p08/informe/Informe_P08_Perfil_lipidico_COMPLETO.docx", descripcion: "Word editable con ecuaciones, esquemas y gráficos." },
    { titulo: "Informe P08 · versión para escribir a mano", curso: "bioquimica", practica: "bq-p08", tipo: "informe", fecha: "2026-11-14",
      url: "material/bioquimica/p08/informe/Informe_P08_Perfil_lipidico_PARA_MANO.docx", descripcion: "Mismo diseño, con cuadriculado para completar a mano." },
    { titulo: "Video · Perfil lipídico I", curso: "bioquimica", practica: "bq-p08", tipo: "video", fecha: "2026-11-15",
      url: "practica.html?id=bq-p08#video", descripcion: "4 min · narración, esquemas animados y resultados." },
    { titulo: "Simulador de perfil lipídico", curso: "bioquimica", practica: "bq-p08", tipo: "simulador", fecha: "2026-11-15",
      url: "practica.html?id=bq-p08#simulador", descripcion: "Absorbancia → TG, VLDL y colesterol total, con clasificación." },
    { titulo: "Esquemas animados P08", curso: "bioquimica", practica: "bq-p08", tipo: "esquema", fecha: "2026-11-15",
      url: "practica.html?id=bq-p08#esquemas", descripcion: "Suero, reacción de Trinder, centrífuga, espectrofotómetro y LPL." },
    { titulo: "Casos clínicos · dislipidemias", curso: "bioquimica", practica: "bq-p08", tipo: "casos", fecha: "2026-11-15",
      url: "practica.html?id=bq-p08#casos", descripcion: "6 casos con retroalimentación." },
    { titulo: "Flashcards · perfil lipídico", curso: "bioquimica", practica: "bq-p08", tipo: "flashcards", fecha: "2026-11-15",
      url: "practica.html?id=bq-p08#flashcards", descripcion: "16 tarjetas para repasar." }
  ]
};
