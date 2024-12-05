document.addEventListener('DOMContentLoaded', function () {
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

        // Obtener la cita más reciente desde IndexedDB
        const transaction = db.transaction(['appointments'], 'readonly');
        const store = transaction.objectStore('appointments');
        const request = store.getAll();  // Obtener todas las citas

        request.onsuccess = function (e) {
            const appointments = e.target.result;
            if (appointments.length > 0) {
                const latestAppointment = appointments[appointments.length - 1];  // Obtener la última cita
                document.getElementById('doctor-name').textContent = latestAppointment.doctorName;
                document.getElementById('appointment-time').textContent = latestAppointment.appointmentTime;
            } else {
                document.getElementById('doctor-name').textContent = "No se encontró información de la cita.";
                document.getElementById('appointment-time').textContent = "";
            }
        };

        request.onerror = function (e) {
            console.error('Error al recuperar las citas', e.target.error);
            document.getElementById('doctor-name').textContent = "Error al recuperar la cita.";
            document.getElementById('appointment-time').textContent = "";
        };
    };

    openRequest.onerror = function (e) {
        console.error("Error al abrir la base de datos", e.target.error);
    };
});
