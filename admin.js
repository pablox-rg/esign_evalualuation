// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA3g2OsEGuJQsuuISq161ZScmuIOI-h5NE",
    authDomain: "esign-aedc8.firebaseapp.com",
    projectId: "esign-aedc8",
    storageBucket: "esign-aedc8.appspot.com",
    messagingSenderId: "409228845934",
    appId: "1:409228845934:web:2df23f94b48ea603a9577f",
    measurementId: "G-6Z0CXRV6K1"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Guardar nueva pregunta
  document.getElementById('questionForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const questionText = document.getElementById('questionText').value;
      const questionType = document.getElementById('questionType').value;
      const correctAnswer = document.getElementById('correctAnswer').value;
      const points = parseInt(document.getElementById('points').value);
  
      db.collection('questions').add({
          text: questionText,
          type: questionType,
          correctAnswer: correctAnswer || null,
          points: points,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
          console.log('Pregunta guardada');
          document.getElementById('questionForm').reset();
      })
      .catch((error) => console.error('Error:', error));
  });
  
  // Mostrar preguntas actuales
  db.collection('questions').onSnapshot((snapshot) => {
      const questionList = document.getElementById('questionList');
      questionList.innerHTML = '';
      snapshot.forEach((doc) => {
          const data = doc.data();
          const li = document.createElement('li');
          li.textContent = `${data.text} (${data.type}, ${data.points} puntos, Correcta: ${data.correctAnswer || 'N/A'})`;
          questionList.appendChild(li);
      });
  });
  
  // Mostrar resultados de evaluaciones
  db.collection('evaluations').onSnapshot((snapshot) => {
      const evaluationList = document.getElementById('evaluationList');
      evaluationList.innerHTML = '';
      snapshot.forEach((doc) => {
          const data = doc.data();
          const li = document.createElement('li');
          li.textContent = `${data.name} (${data.email}): ${data.scoreAuto} puntos automáticos, q3: "${data.q3}"`;
          evaluationList.appendChild(li);
      });
  });