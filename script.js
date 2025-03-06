// Configuración de Firebase (con tus credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyA3g2OsEGuJQsuuISq161ZScmuIOI-h5NE",
    authDomain: "esign-aedc8.firebaseapp.com",
    projectId: "esign-aedc8",
    storageBucket: "esign-aedc8.appspot.com",
    messagingSenderId: "409228845934",
    appId: "1:409228845934:web:2df23f94b48ea603a9577f",
    measurementId: "G-6Z0CXRV6K1"
    // Nota: No usamos databaseURL porque eso es para Realtime Database, no Firestore
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Manejar el formulario
  document.getElementById('evaluationForm').addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Obtener respuestas
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const q1 = document.querySelector('input[name="q1"]:checked')?.value;
      const q2 = document.querySelector('input[name="q2"]:checked')?.value;
      const q3 = document.getElementById('q3').value;
  
      // Calcular puntuación
      let score = 0;
      if (q1 === 'a') score += 2; // Respuesta correcta: "Mejorar la seguridad"
      if (q2 === 'yes') score += 1; // "Sí" da 1 punto
      // q3 requiere revisión manual, se guarda como texto
  
      // Mostrar resultado al usuario
      document.getElementById('result').innerText = `Tu puntuación: ${score} de 3 (Pregunta 3 pendiente de revisión)`;
  
      // Guardar en Firebase Firestore
      db.collection('evaluations').add({
          name: name,
          email: email,
          q1: q1,
          q2: q2,
          q3: q3,
          score: score,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => console.log('Datos guardados en Firestore'))
      .catch((error) => console.error('Error:', error));
  });