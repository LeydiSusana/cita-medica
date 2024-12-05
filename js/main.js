console.log('Appointment Manager Loaded');

// Crear o abrir la base de datos IndexedDB
let db;

const openRequest = indexedDB.open('AppointmentsDB', 1);  // Nombre de la base de datos y la versión

openRequest.onupgradeneeded = function (e) {
    const db = e.target.result;

    if (!db.objectStoreNames.contains('appointments')) {
        const objectStore = db.createObjectStore('appointments', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('doctorName', 'doctorName', { unique: false });
        objectStore.createIndex('appointmentTime', 'appointmentTime', { unique: false });
    }
};

openRequest.onsuccess = function (e) {
    db = e.target.result;
    console.log("Base de datos abierta exitosamente");
};

openRequest.onerror = function (e) {
    console.error("Error al abrir la base de datos", e.target.error);
};

// Manejo del formulario para guardar la cita
document.getElementById('appointment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const doctorId = document.getElementById('doctor_id').value;
    const appointmentTime = document.getElementById('appointment_time').value;

    const doctors = {
        "1": "Dr. Juan Pérez - Cardiología",
        "2": "Dra. María López - Pediatría",
        "3": "Dr. Carlos Gómez - Neurología",
        "4": "Dra. Ana Sánchez - Dermatología"
    };

    const doctorName = doctors[doctorId];

    const appointment = {
        doctorName: doctorName,
        appointmentTime: appointmentTime
    };

    // Guardar la cita en IndexedDB
    const transaction = db.transaction(['appointments'], 'readwrite');
    const store = transaction.objectStore('appointments');
    store.add(appointment);

    transaction.oncomplete = function () {
        console.log('Cita médica guardada en IndexedDB');
        // Redirigir a la página de confirmación
        window.location.href = 'confirm_cita.html';
    };

    transaction.onerror = function (e) {
        console.error('Error al guardar la cita', e.target.error);
    };
});
