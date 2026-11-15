/* Casos clínicos y flashcards por tema. Se enlazan desde catalogo.js (campos "casos" y "flashcards"). */
window.CONTENIDO = {
  casos: {
    "perfil-lipidico": [
      { tema: "Ayuno", titulo: "Triglicéridos después del almuerzo",
        texto: "Un estudiante de 20 años se toma la muestra a las 5:30 p. m., tres horas después de almorzar. Su TG es 330 mg/dL y su colesterol total, 158 mg/dL. Está asintomático.",
        pregunta: "¿Cuál es la conducta más adecuada?",
        opciones: ["Diagnosticar hipertrigliceridemia e iniciar fibratos", "Repetir el perfil lipídico con 9–12 h de ayuno", "Indicar ecografía de páncreas", "Considerar el valor normal porque el colesterol es normal"],
        correcta: 1,
        explicacion: "Los TG suben después de comer y alcanzan su pico a las 3–6 h. Un valor elevado sin ayuno controlado debe confirmarse en ayunas antes de diagnosticar. El colesterol total casi no cambia con la comida, por eso no 'normaliza' a los TG." },
      { tema: "Pancreatitis", titulo: "Dolor epigástrico y suero lechoso",
        texto: "Varón de 45 años, con diabetes tipo 2 mal controlada y consumo de alcohol, presenta dolor epigástrico intenso irradiado a la espalda. El suero se ve lechoso; TG = 1250 mg/dL.",
        pregunta: "¿Qué complicación explica mejor el cuadro?",
        opciones: ["Infarto agudo de miocardio", "Pancreatitis aguda por hipertrigliceridemia", "Colecistitis por cálculos de colesterol", "Hepatitis alcohólica"],
        correcta: 1,
        explicacion: "Con TG ≥ 1000 mg/dL el riesgo de pancreatitis aguda es alto. La hidrólisis de los TG en el páncreas libera ácidos grasos que dañan el tejido. El suero lechoso refleja exceso de quilomicrones y VLDL." },
      { tema: "Genética", titulo: "Xantomas a los 30 años",
        texto: "Mujer de 30 años con LDL de 235 mg/dL, xantomas en el tendón de Aquiles y un padre que tuvo un infarto a los 45 años.",
        pregunta: "¿Cuál es el diagnóstico más probable?",
        opciones: ["Hipercolesterolemia familiar", "Hipertrigliceridemia familiar", "Abetalipoproteinemia", "Dislipidemia secundaria a dieta"],
        correcta: 0,
        explicacion: "LDL ≥ 190 mg/dL, xantomas tendinosos y antecedente de enfermedad coronaria precoz sugieren hipercolesterolemia familiar, por mutaciones en LDLR, APOB o PCSK9: la LDL no se capta bien y se acumula." },
      { tema: "Causas secundarias", titulo: "Colesterol alto y cansancio",
        texto: "Mujer de 52 años con cansancio, aumento de peso e intolerancia al frío. CT = 285 mg/dL; TSH elevada.",
        pregunta: "¿Qué conviene hacer primero?",
        opciones: ["Iniciar estatina a dosis alta", "Tratar el hipotiroidismo y repetir el perfil", "Indicar dieta sin grasas por un año", "Solicitar estudio genético"],
        correcta: 1,
        explicacion: "El hipotiroidismo reduce la expresión del receptor de LDL y eleva el colesterol: es una dislipidemia secundaria. Al corregir la causa, el perfil suele mejorar; luego se decide si hace falta un hipolipemiante." },
      { tema: "Cálculo", titulo: "Estimar la LDL",
        texto: "Perfil en ayunas: CT = 220 mg/dL, HDL = 45 mg/dL, TG = 150 mg/dL.",
        pregunta: "Con la fórmula de Friedewald, ¿cuál es la LDL?",
        opciones: ["115 mg/dL", "145 mg/dL", "175 mg/dL", "205 mg/dL"],
        correcta: 1,
        explicacion: "LDL = CT − HDL − TG/5 = 220 − 45 − 30 = 145 mg/dL. La fórmula no es válida con TG ≥ 400 mg/dL ni sin ayuno." },
      { tema: "Laboratorio", titulo: "Una absorbancia negativa",
        texto: "En la práctica, un tubo de colesterol dio A = −0,025 después de poner el equipo en cero con el blanco.",
        pregunta: "¿Qué indica ese resultado?",
        opciones: ["Hipocolesterolemia grave", "Que el tubo tuvo menos color que el blanco: error técnico", "Hemólisis de la muestra", "Que el estándar estaba vencido"],
        correcta: 1,
        explicacion: "Una lectura negativa significa menos color que el propio reactivo: por ejemplo, más reactivo o suero no cargado. Con 10 µL, cualquier error de pipeteo cambia mucho el resultado; se descarta y se repite." }
    ]
  },
  flashcards: {
    "perfil-lipidico": [
      ["Métodos", "¿Qué significa GPO-PAP?", "Glicerol-3-fosfato oxidasa – peroxidasa, con reacción cromogénica (fenol/4-clorofenol + 4-aminoantipirina)."],
      ["Métodos", "¿Qué significa CHOD-PAP?", "Colesterol oxidasa – peroxidasa, con reacción cromogénica."],
      ["Métodos", "¿Qué compuesto da el color rosado?", "La quinonimina, formada por la peroxidasa a partir del H₂O₂ (reacción de Trinder)."],
      ["Métodos", "¿A qué longitud de onda se leen TG y CT?", "TG a 505 nm y CT a 546 nm según la guía (en la práctica el equipo leyó ambos a 505 nm)."],
      ["Cálculo", "Fórmula de la concentración", "C (mg/dL) = (A muestra / A estándar) × 200."],
      ["Cálculo", "¿Cómo se estima la VLDL?", "VLDL-colesterol ≈ TG/5 (en ayunas y con TG < 400 mg/dL)."],
      ["Cálculo", "Fórmula de Friedewald", "LDL = CT − HDL − TG/5."],
      ["Valores", "Clasificación de los triglicéridos", "< 150 óptimo · 150–199 límite · 200–499 alto · ≥ 500 muy alto (riesgo de pancreatitis)."],
      ["Valores", "Clasificación del colesterol total", "< 200 óptimo · 200–240 límite · > 240 muy alto."],
      ["Síntesis", "Paso limitante de la síntesis de colesterol", "HMG-CoA reductasa (HMG-CoA → mevalonato, 2 NADPH); la inhiben las estatinas."],
      ["Síntesis", "Enzima limitante de la síntesis de ácidos grasos", "Acetil-CoA carboxilasa (biotina, ATP): acetil-CoA → malonil-CoA."],
      ["Transporte", "¿Qué activa a la lipoproteína lipasa?", "La apo C-II. La LPL hidroliza los TG de quilomicrones y VLDL en los capilares."],
      ["Transporte", "Apolipoproteína principal de LDL y de quilomicrones", "LDL: apo B-100 · quilomicrones: apo B-48."],
      ["Transporte", "Transporte reverso del colesterol", "ABCA1 cede colesterol a la HDL, la LCAT lo esterifica y el hígado lo capta por SR-BI."],
      ["Muestra", "¿Cómo se obtuvo el suero?", "Tubo sin anticoagulante, reposo 8 min para coagular y centrifugación a 4500 rpm por 5 min."],
      ["Muestra", "¿Por qué evitar la hemólisis?", "La hemoglobina y el contenido de los eritrocitos interfieren con la lectura colorimétrica y alteran el resultado."]
    ]
  }
};
