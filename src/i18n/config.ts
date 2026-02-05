

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      // Settings Page
      settings: {
        title: "Settings",
        description: "Manage profile and account security",
        system: "System",
        language: "Language",
        english: "English",
        spanish: "Spanish",
        security: "Security Settings",
        fullName: "Full Name",
        email: "Email Address",
        needPassword: "Need to update your password?",
        sendOTP: "Send OTP to Email",
        enterOTP: "Enter 6-Digit OTP",
        newPassword: "New Password",
        confirmPassword: "Confirm Password",
        verifyUpdate: "Verify & Update",
        cancel: "Cancel",
        passwordUpdated: "Password updated successfully",
        passwordMismatch: "Passwords do not match.",
        version: "Version",
        systemOnline: "System Online",
        appStatus: "Application status"
      },

      // Dashboard
      dashboard: {
        loading: "Loading dashboard...",
        totalTrucks: "Total Trucks",
        activeTrips: "Active Trips",
        driversOnDuty: "Drivers On Duty",
        criticalAlerts: "Critical Alerts",
        recentAlerts: "Recent Alerts",
        activeTripsTable: "Active Trips",
        type: "Type",
        message: "Message",
        driver: "Driver",
        truck: "Truck",
        time: "Time",
        noAlerts: "No alerts found",
        truckPlate: "Truck Plate",
        route: "Route",
        status: "Status",
        eta: "ETA",
        noActiveTrips: "No active trips"
      },

      // Drivers Page
      drivers: {
        title: "Fleet Drivers",
        description: "Manage your workforce and safety performance.",
        addDriver: "Add Driver",
        search: "Search name, phone, or truck...",
        name: "NAME",
        contact: "CONTACT",
        truck: "TRUCK",
        status: "STATUS",
        safety: "SAFETY",
        action: "ACTION",
        viewProfile: "View Profile",
        driverProfile: "Driver Profile",
        editProfile: "Edit Profile",
        terminateDriver: "Terminate Driver",
        deleteConfirm: "Delete this driver?",
        unassigned: "Unassigned",
        registerNewDriver: "Register New Driver",
        driverOnboarding: "Driver onboarding & compliance verification",
        personalInfo: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        password: "Password",
        phoneNumber: "Phone Number",
        professionalCredentials: "Professional Credentials",
        licenseNumber: "License Number",
        licenseExpiry: "License Expiry",
        complianceDocuments: "Compliance Documents",
        driverLicense: "Driver License",
        taxCertificate: "Tax Certificate",
        nationalId: "National ID",
        uploadPdf: "Upload PDF",
        pdfUploaded: "PDF uploaded",
        createDriverAccount: "Create Driver Account",
        performanceOverview: "Performance Overview",
        totalTrips: "Total Trips",
        successful: "Successful",
        delayed: "Delayed",
        licenseInfo: "License Information",
        licenseNumberLabel: "License Number",
        expiration: "Expiration",
        documents: "Documents",
        viewLicense: "View License Document",
        viewTax: "View Tax Status Certificate",
        viewId: "View Identity Card"
      },

      // Trucks Page
      trucks: {
        title: "Fleet Inventory",
        description: "Manage and track your active vehicles.",
        addTruck: "Add New Truck",
        search: "Search by license plate...",
        truck: "Truck",
        driver: "Driver",
        status: "Status",
        location: "Location",
        action: "Action",
        viewProfile: "View Profile",
        unassigned: "Unassigned",
        noData: "No data",
        addNewFleet: "Add New Fleet Truck",
        vehicleRegistration: "Vehicle registration & compliance documents",
        vehicleSpecs: "Vehicle Specifications",
        licensePlate: "License Plate",
        modelName: "Model Name",
        modelYear: "Model Year",
        weightCapacity: "Weight Capacity (kg)",
        hardwareTelematics: "Hardware & Telematics",
        samsaraDevice: "Samsara Device ID",
        complianceDocuments: "Compliance Documents",
        vehicleRegistrationDoc: "Vehicle Registration",
        insurancePolicy: "Insurance Policy",
        uploadPdf: "Upload PDF",
        pdfUploaded: "PDF uploaded",
        createTruck: "Create Truck",
        truckProfile: "Truck Profile",
        liveStatus: "Live Status",
        primaryDriver: "Primary Driver",
        model: "Model",
        year: "Model Year",
        weight: "Weight Capacity",
        samsara: "Samsara Device",
        truckDocuments: "Truck Documents",
        viewRegistration: "View Registration Document",
        viewInsurance: "View Insurance Document",
        registrationNotUploaded: "Registration document not uploaded",
        insuranceNotUploaded: "Insurance document not uploaded",
        currentLocation: "Current Location",
        addressNotReported: "Address not reported",
        lastUpdated: "Last updated",
        editDetails: "Edit Details",
        deleteTruck: "Delete Truck",
        removing: "Removing...",
        deleteConfirm: "Are you sure you want to delete this truck? This action is permanent."
      },
      sidebar: {
  dashboard: "Dashboard",
  drivers: "Drivers",
  trucks: "Trucks",
  trips: "Trips",
  alerts: "Alerts",
  reports: "Reports",
  settings: "Settings",
  logout: "Logout"
},
  
      // Trips Page
      trips: {
        title: "Trip Management",
        description: "Monitor active shipments and real-time movement.",
        createTrip: "Create Trip",
        search: "Search by truck or driver...",
        truckLicense: "TRUCK LICENSE",
        driverName: "DRIVER NAME",
        route: "ROUTE",
        viewProofOfDelivery: "View Proof of Delivery",
      deliveryPicture: "Delivery Picture",
      podNotUploaded: "Proof of Delivery not uploaded",
        status: "STATUS",
        action: "ACTION",
        viewProfile: "View Profile",
        tripProfile: "Trip Profile",
        editTrip: "Edit Trip",
        cancel: "Cancel",
        delete: "Delete",
        cancelConfirm: "Cancel this trip?",
        deleteConfirm: "Permanently delete this trip? This cannot be undone.",
        createNewTrip: "Create New Logistics Trip",
        scheduleRoutes: "Schedule routes, assign assets, and upload cargo documentation.",
        routeInfo: "Route Information",
        originAddress: "Origin Address",
        destinationAddress: "Destination Address",
        loadingDock: "Loading dock / Warehouse",
        deliveryPoint: "Delivery point",
        pinOrigin: "Pin Origin on Map",
        pinDestination: "Pin Destination on Map",
        originPinned: "✓ Origin Pinned",
        destinationPinned: "✓ Destination Pinned",
        selectingOrigin: "Selecting origin...",
        selectingDestination: "Selecting destination...",
        closeMap: "Close Map",
        schedule: "Schedule",
        pickupTime: "Pickup Time",
        estimatedDelivery: "Estimated Delivery",
        cargoDetails: "Cargo Details",
        weight: "Weight (kg)",
        estimatedHours: "Est. Hours",
        cargoDescription: "Specify cargo type...",
        assetAssignment: "Asset Assignment",
        assignedTruck: "Assigned Truck",
        assignedDriver: "Assigned Driver",
        searchTrucks: "Search available trucks...",
        searchDrivers: "Search active drivers...",
        documentation: "Documentation",
        primaryInvoice: "Primary Invoice",
        secondaryInvoice: "Secondary Invoice",
        clickToUpload: "Click to upload PDF",
        uploaded: "✓ Uploaded",
        scheduleTrip: "Schedule Trip",
        liveTracking: "Live Tracking",
        locationNotAvailable: "Location data not available",
        locationDetails: "Location Details",
        origin: "Origin",
        destination: "Destination",
        currentLocation: "Current Location",
        notAvailable: "Not available",
        awaitingUpdate: "Awaiting live update",
        drivingMetrics: "Driving Metrics",
        currentSpeed: "CURRENT SPEED",
        remainingDistance: "REMAINING DISTANCE",
        totalDistance: "TOTAL DISTANCE",
        estimatedArrival: "ESTIMATED TIME OF ARRIVAL",
        calculating: "Calculating...",
        arrivalDateTime: "ARRIVAL DATE & TIME",
        movementStatus: "MOVEMENT STATUS",
        vehicleMoving: "Vehicle is Moving",
        vehicleStationary: "Vehicle is Stationary",
        lastUpdatedLabel: "LAST UPDATED",
        noUpdatesYet: "No updates yet",
        shipmentDetails: "Shipment Details",
        cargoType: "Cargo Type",
        weightLabel: "Weight",
        tripDocuments: "Trip Documents",
        viewInvoice1: "View Invoice 1",
        viewInvoice2: "View Invoice 2",
        invoice1NotUploaded: "Invoice 1 not uploaded",
        invoice2NotUploaded: "Invoice 2 not uploaded"
      },

      // Status values
      status: {
        idle: "Idle",
        assigned: "Assigned",
        in_progress: "In Progress",
        stopped: "Stopped",
        complete: "Complete",
        inactive: "Inactive",
        available: "Available",
        in_transit: "In Transit",
        maintenance: "Maintenance",
        out_of_service: "Out of Service",
        scheduled: "Scheduled",
        delivered: "Delivered",
        cancelled: "Cancelled",
        active: "Active",
        delayed: "Delayed",
        completed: "Completed"
      },

      // Alert types
      alertTypes: {
        critical: "Critical",
        warning: "Warning",
        info: "Info"
      },

      // Common UI
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        create: "Create",
        update: "Update",
        search: "Search",
        filter: "Filter",
        loading: "Loading...",
        noResults: "No results found",
        confirm: "Confirm",
        close: "Close"
      },

      // Validation Messages
      validation: {
        required: "This field is required",
        emailInvalid: "Invalid email format",
        passwordMin: "Password must be at least 6 characters",
        phoneInvalid: "Phone number must be exactly 10 digits",
        licenseRequired: "License number is required",
        expiryRequired: "License expiry date is required",
        documentRequired: "Document is required",
        selectLocation: "Select locations on map",
        timesRequired: "Times required"
      },

      // Alerts Page
      alerts: {
        title: "Alerts",
        searchPlaceholder: "Search by truck, driver or message",
        resolve: "Resolve",
        resolving: "Resolving...",
        noAlerts: "No alerts found",
        severity: {
          critical: "Critical",
          high: "High",
          medium: "Medium",
          low: "Low",
          resolved: "Resolved"
        }
      },

      // Update Driver Dialog
      updateDriver: {
        title: "Edit Driver Profile",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phoneNumber: "Phone Number",
        employmentStatus: "Employment Status",
        licenseNumber: "License Number",
        cancel: "Cancel",
        update: "Update Driver",
        saving: "Saving..."
      },

      // Truck Details Sheet
      truckDetails: {
        title: "Truck Profile",
        liveStatus: "Live Status",
        primaryDriver: "Primary Driver",
        unassigned: "Unassigned",
        vehicleSpecs: "Vehicle Specifications",
        model: "Model",
        modelYear: "Model Year",
        weightCapacity: "Weight Capacity",
        samsaraDevice: "Samsara Device",
        truckDocuments: "Truck Documents",
        viewRegistration: "View Registration Document",
        viewInsurance: "View Insurance Document",
        registrationNotUploaded: "Registration document not uploaded",
        insuranceNotUploaded: "Insurance document not uploaded",
        currentLocation: "Current Location",
        addressNotReported: "Address not reported",
        lastUpdated: "Last updated",
        editDetails: "Edit Details",
        deleteTruck: "Delete Truck",
        removing: "Removing...",
        deleteConfirm: "Are you sure you want to delete this truck? This action is permanent."
      },
           driverDashboard: {
  welcomeBack: "Welcome back,",
  statusLabel: "Status",
  checkingActiveTrips: "Checking for active trips...",
  activeTrip: "Active Trip",
  assignedTripsTitle: "You have assigned trips",
  assignedTripsSubtitle: "Check your trips tab to start",
  overview: "Overview",
  totalTrips: "Total Trips",
  assigned: "Assigned",
  completed: "Completed",
  delayed: "Delayed",
  upcomingTrips: "Upcoming Trips"
},
    profile: {
  title: "Profile",
  role: "Driver",
  accountInfo: "Account Information",
  email: "Email",
  contact: "User contact",
  roleLabel: "Role",
  backToDashboard: "Back to Dashboard",
  logout: "Logout",
  logoutSuccessTitle: "Logged out",
  logoutSuccessDesc: "You have been successfully logged out",
  logoutErrorTitle: "Logout failed",
  logoutErrorDesc: "An error occurred while logging out",
  language: "Language",
  english: "English",
  spanish: "Spanish"
},
driverTrips: {
  title: "My Trips",
  assigned: "Assigned",
  completed: "Completed",
  loading: "Loading trips...",
  noAssignedTitle: "No assigned trips",
  noAssignedDesc: "New trips will appear here when assigned",
  noCompletedTitle: "No completed trips",
  noCompletedDesc: "Completed trips will appear here",
  onTime: "On time",
  delayedBy: "Delayed by {{minutes}} min"
},
driverTruck: {
  title: "My Truck",
  loading: "Loading truck details...",
  noTruckTitle: "No Truck Assigned",
  noTruckDesc: "A truck will be assigned when you have a trip",

  status: {
    active: "Active",
    assigned: "Assigned",
    idle: "Idle"
  },

  currentTrip: "Current Trip",
  tripNumber: "Trip Number",
  from: "From",
  to: "To",
  cargo: "Cargo Description",

  vehicleDetails: "Vehicle Details",
  licensePlate: "License Plate",
  model: "Model",
  statusLabel: "Status"
},
driverTripDetails: {
  title: "Trip Details",
  backToTrips: "Back to Trips",

  loading: "Loading trip...",
  startTrip: "Start Trip",
  completeTrip: "Complete Trip",

  tripStarted: "Trip started 🚛",
  tripCompleted: "Trip completed 🎉",
  completionFailed: "Completion failed",

  documentsRequired: "Documents required",
  uploadBothDocs: "Upload both documents first",

  proofUploaded: "Proof uploaded",
  pictureUploaded: "Picture uploaded",

  cargo: "Cargo",
  estimated: "Estimated",
  truck: "Truck",

  proofOfDelivery: "Proof of Delivery",
  deliveryPicture: "Delivery Picture",
  clickToUpload: "Click to upload",

  tripNumber: "Trip Number",
  from: "From",
  to: "To"
}



    },
  
  },
  'es-MX': {
    translation: {
      // Settings Page
      settings: {
        title: "Configuración",
        description: "Administrar perfil y seguridad de cuenta",
        system: "Sistema",
        language: "Idioma",
        english: "Inglés",
        spanish: "Español",
        security: "Ajustes de Seguridad",
        fullName: "Nombre Completo",
        email: "Correo Electrónico",
        needPassword: "¿Necesita actualizar su contraseña?",
        sendOTP: "Enviar OTP al Correo",
        enterOTP: "Ingrese el OTP de 6 Dígitos",
        newPassword: "Nueva Contraseña",
        confirmPassword: "Confirmar Contraseña",
        verifyUpdate: "Verificar y Actualizar",
        cancel: "Cancelar",
        passwordUpdated: "Contraseña actualizada exitosamente",
        passwordMismatch: "Las contraseñas no coinciden.",
        version: "Versión",
        systemOnline: "Sistema En Línea",
        appStatus: "Estado de la aplicación"
      },

      // Dashboard
      dashboard: {
        loading: "Cargando tablero...",
        totalTrucks: "Camiones Totales",
        activeTrips: "Viajes Activos",
        driversOnDuty: "Conductores de Turno",
        criticalAlerts: "Alertas Críticas",
        recentAlerts: "Alertas Recientes",
        activeTripsTable: "Viajes Activos",
        type: "Tipo",
        message: "Mensaje",
        driver: "Conductor",
        truck: "Camión",
        time: "Hora",
        noAlerts: "No se encontraron alertas",
        truckPlate: "Placa del Camión",
        route: "Ruta",
        status: "Estado",
        eta: "ETA",
        noActiveTrips: "No hay viajes activos"
      },

      
      // Drivers Page
      drivers: {
        title: "Conductores de Flota",
        description: "Administre su fuerza laboral y rendimiento de seguridad.",
        addDriver: "Agregar Conductor",
        search: "Buscar nombre, teléfono o camión...",
        name: "NOMBRE",
        contact: "CONTACTO",
        truck: "CAMIÓN",
        status: "ESTADO",
        safety: "SEGURIDAD",
        action: "ACCIÓN",
        viewProfile: "Ver Perfil",
        driverProfile: "Perfil del Conductor",
        editProfile: "Editar Perfil",
        terminateDriver: "Terminar Conductor",
        deleteConfirm: "¿Eliminar este conductor?",
        unassigned: "Sin Asignar",
        registerNewDriver: "Registrar Nuevo Conductor",
        driverOnboarding: "Incorporación y verificación de cumplimiento del conductor",
        personalInfo: "Información Personal",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        password: "Contraseña",
        phoneNumber: "Número de Teléfono",
        professionalCredentials: "Credenciales Profesionales",
        licenseNumber: "Número de Licencia",
        licenseExpiry: "Vencimiento de Licencia",
        complianceDocuments: "Documentos de Cumplimiento",
        driverLicense: "Licencia de Conducir",
        taxCertificate: "Certificado Fiscal",
        nationalId: "Identificación Nacional",
        uploadPdf: "Subir PDF",
        pdfUploaded: "PDF subido",
        createDriverAccount: "Crear Cuenta de Conductor",
        performanceOverview: "Resumen de Rendimiento",
        totalTrips: "Viajes Totales",
        successful: "Exitosos",
        delayed: "Retrasados",
        licenseInfo: "Información de Licencia",
        licenseNumberLabel: "Número de Licencia",
        expiration: "Vencimiento",
        documents: "Documentos",
        viewLicense: "Ver Documento de Licencia",
        viewTax: "Ver Certificado de Estado Fiscal",
        viewId: "Ver Tarjeta de Identidad"
      },

      // Trucks Page
      trucks: {
        title: "Inventario de Flota",
        description: "Administre y rastree sus vehículos activos.",
        addTruck: "Agregar Nuevo Camión",
        search: "Buscar por placa...",
        truck: "Camión",
        driver: "Conductor",
        status: "Estado",
        location: "Ubicación",
        action: "Acción",
        viewProfile: "Ver Perfil",
        unassigned: "Sin Asignar",
        noData: "Sin datos",
        addNewFleet: "Agregar Nuevo Camión de Flota",
        vehicleRegistration: "Registro de vehículo y documentos de cumplimiento",
        vehicleSpecs: "Especificaciones del Vehículo",
        licensePlate: "Placa",
        modelName: "Nombre del Modelo",
        modelYear: "Año del Modelo",
        weightCapacity: "Capacidad de Peso (kg)",
        hardwareTelematics: "Hardware y Telemática",
        samsaraDevice: "ID de Dispositivo Samsara",
        complianceDocuments: "Documentos de Cumplimiento",
        vehicleRegistrationDoc: "Registro del Vehículo",
        insurancePolicy: "Póliza de Seguro",
        uploadPdf: "Subir PDF",
        pdfUploaded: "PDF subido",
        createTruck: "Crear Camión",
        truckProfile: "Perfil del Camión",
        liveStatus: "Estado en Vivo",
        primaryDriver: "Conductor Principal",
        model: "Modelo",
        year: "Año del Modelo",
        weight: "Capacidad de Peso",
        samsara: "Dispositivo Samsara",
        truckDocuments: "Documentos del Camión",
        viewRegistration: "Ver Documento de Registro",
        viewInsurance: "Ver Documento de Seguro",
        registrationNotUploaded: "Documento de registro no subido",
        insuranceNotUploaded: "Documento de seguro no subido",
        currentLocation: "Ubicación Actual",
        addressNotReported: "Dirección no reportada",
        lastUpdated: "Última actualización",
        editDetails: "Editar Detalles",
        deleteTruck: "Eliminar Camión",
        removing: "Eliminando...",
        deleteConfirm: "¿Está seguro de que desea eliminar este camión? Esta acción es permanente."
      },
sidebar: {
  dashboard: "Tablero",
  drivers: "Conductores",
  trucks: "Camiones",
  trips: "Viajes",
  alerts: "Alertas",
  reports: "Reportes",
  settings: "Configuración",
  logout: "Cerrar sesión"
},
      // Trips Page
      trips: {
        title: "Gestión de Viajes",
        description: "Monitorear envíos activos y movimiento en tiempo real.",
        createTrip: "Crear Viaje",
        search: "Buscar por camión o conductor...",
        truckLicense: "PLACA DE CAMIÓN",
        driverName: "NOMBRE DEL CONDUCTOR",
        route: "RUTA",
        status: "ESTADO",
        action: "ACCIÓN",
        viewProofOfDelivery: "Ver Comprobante de Entrega",
        deliveryPicture: "Imagen de Entrega",
        podNotUploaded: "Comprobante de entrega no cargado",
        viewProfile: "Ver Perfil",
        tripProfile: "Perfil del Viaje",
        editTrip: "Editar Viaje",
        cancel: "Cancelar",
        delete: "Eliminar",
        cancelConfirm: "¿Cancelar este viaje?",
        deleteConfirm: "¿Eliminar permanentemente este viaje? Esto no se puede deshacer.",
        createNewTrip: "Crear Nuevo Viaje Logístico",
        scheduleRoutes: "Programar rutas, asignar activos y cargar documentación de carga.",
        routeInfo: "Información de Ruta",
        originAddress: "Dirección de Origen",
        destinationAddress: "Dirección de Destino",
        loadingDock: "Muelle de carga / Almacén",
        deliveryPoint: "Punto de entrega",
        pinOrigin: "Fijar Origen en Mapa",
        pinDestination: "Fijar Destino en Mapa",
        originPinned: "✓ Origen Fijado",
        destinationPinned: "✓ Destino Fijado",
        selectingOrigin: "Seleccionando origen...",
        selectingDestination: "Seleccionando destino...",
        closeMap: "Cerrar Mapa",
        schedule: "Horario",
        pickupTime: "Hora de Recogida",
        estimatedDelivery: "Entrega Estimada",
        cargoDetails: "Detalles de Carga",
        weight: "Peso (kg)",
        estimatedHours: "Horas Est.",
        cargoDescription: "Especificar tipo de carga...",
        assetAssignment: "Asignación de Activos",
        assignedTruck: "Camión Asignado",
        assignedDriver: "Conductor Asignado",
        searchTrucks: "Buscar camiones disponibles...",
        searchDrivers: "Buscar conductores activos...",
        documentation: "Documentación",
        primaryInvoice: "Factura Principal",
        secondaryInvoice: "Factura Secundaria",
        clickToUpload: "Haga clic para cargar PDF",
        uploaded: "✓ Subido",
        scheduleTrip: "Programar Viaje",
        liveTracking: "Seguimiento en Vivo",
        locationNotAvailable: "Datos de ubicación no disponibles",
        locationDetails: "Detalles de Ubicación",
        origin: "Origen",
        destination: "Destino",
        currentLocation: "Ubicación Actual",
        notAvailable: "No disponible",
        awaitingUpdate: "Esperando actualización en vivo",
        drivingMetrics: "Métricas de Conducción",
        currentSpeed: "VELOCIDAD ACTUAL",
        remainingDistance: "DISTANCIA RESTANTE",
        totalDistance: "DISTANCIA TOTAL",
        estimatedArrival: "HORA ESTIMADA DE LLEGADA",
        calculating: "Calculando...",
        arrivalDateTime: "FECHA Y HORA DE LLEGADA",
        movementStatus: "ESTADO DE MOVIMIENTO",
        vehicleMoving: "Vehículo en Movimiento",
        vehicleStationary: "Vehículo Estacionado",
        lastUpdatedLabel: "ÚLTIMA ACTUALIZACIÓN",
        noUpdatesYet: "Aún sin actualizaciones",
        shipmentDetails: "Detalles del Envío",
        cargoType: "Tipo de Carga",
        weightLabel: "Peso",
        tripDocuments: "Documentos del Viaje",
        viewInvoice1: "Ver Factura 1",
        viewInvoice2: "Ver Factura 2",
        invoice1NotUploaded: "Factura 1 no subida",
        invoice2NotUploaded: "Factura 2 no subida"
      },

      // Status values
      status: {
        idle: "Inactivo",
        assigned: "Asignado",
        in_progress: "En Progreso",
        stopped: "Detenido",
        complete: "Completo",
        inactive: "Inactivo",
        available: "Disponible",
        in_transit: "En Tránsito",
        maintenance: "Mantenimiento",
        out_of_service: "Fuera de Servicio",
        scheduled: "Programado",
        delivered: "Entregado",
        cancelled: "Cancelado",
        active: "Activo",
        delayed: "Retrasado",
        completed: "Completado"
      },

      // Alert types
      alertTypes: {
        critical: "Crítico",
        warning: "Advertencia",
        info: "Información"
      },

      // Common UI
      common: {
        save: "Guardar",
        cancel: "Cancelar",
        delete: "Eliminar",
        edit: "Editar",
        create: "Crear",
        update: "Actualizar",
        search: "Buscar",
        filter: "Filtrar",
        loading: "Cargando...",
        noResults: "No se encontraron resultados",
        confirm: "Confirmar",
        close: "Cerrar"
      },

      // Validation Messages
      validation: {
        required: "Este campo es obligatorio",
        emailInvalid: "Formato de correo electrónico no válido",
        passwordMin: "La contraseña debe tener al menos 6 caracteres",
        phoneInvalid: "El número de teléfono debe tener exactamente 10 dígitos",
        licenseRequired: "Se requiere el número de licencia",
        expiryRequired: "Se requiere la fecha de vencimiento de la licencia",
        documentRequired: "Se requiere el documento",
        selectLocation: "Seleccione ubicaciones en el mapa",
        timesRequired: "Se requieren los horarios"
      },

      // Alerts Page
      alerts: {
        title: "Alertas",
        searchPlaceholder: "Buscar por camión, conductor o mensaje",
        resolve: "Resolver",
        resolving: "Resolviendo...",
        noAlerts: "No se encontraron alertas",
        severity: {
          critical: "Crítico",
          high: "Alto",
          medium: "Medio",
          low: "Bajo",
          resolved: "Resuelto"
        }
      },

      // Update Driver Dialog
      updateDriver: {
        title: "Editar Perfil del Conductor",
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Correo Electrónico",
        phoneNumber: "Número de Teléfono",
        employmentStatus: "Estado de Empleo",
        licenseNumber: "Número de Licencia",
        cancel: "Cancelar",
        update: "Actualizar Conductor",
        saving: "Guardando..."
      },

      // Truck Details Sheet
      truckDetails: {
        title: "Perfil del Camión",
        liveStatus: "Estado en Vivo",
        primaryDriver: "Conductor Principal",
        unassigned: "Sin Asignar",
        vehicleSpecs: "Especificaciones del Vehículo",
        model: "Modelo",
        modelYear: "Año del Modelo",
        weightCapacity: "Capacidad de Peso",
        samsaraDevice: "Dispositivo Samsara",
        truckDocuments: "Documentos del Camión",
        viewRegistration: "Ver Documento de Registro",
        viewInsurance: "Ver Documento de Seguro",
        registrationNotUploaded: "Documento de registro no subido",
        insuranceNotUploaded: "Documento de seguro no subido",
        currentLocation: "Ubicación Actual",
        addressNotReported: "Dirección no reportada",
        lastUpdated: "Última actualización",
        editDetails: "Editar Detalles",
        deleteTruck: "Eliminar Camión",
        removing: "Eliminando...",
        deleteConfirm: "¿Está seguro de que desea eliminar este camión? Esta acción es permanente."
      },
 
driverDashboard: {
  welcomeBack: "Bienvenido de nuevo,",
  statusLabel: "Estado",
  checkingActiveTrips: "Verificando viajes activos...",
  activeTrip: "Viaje Activo",
  assignedTripsTitle: "Tienes viajes asignados",
  assignedTripsSubtitle: "Revisa la pestaña de viajes para comenzar",
  overview: "Resumen",
  totalTrips: "Viajes Totales",
  assigned: "Asignados",
  completed: "Completados",
  delayed: "Retrasados",
  upcomingTrips: "Próximos Viajes"
},
profile: {
  title: "Perfil",
  role: "Conductor",
  accountInfo: "Información de la Cuenta",
  email: "Correo Electrónico",
  contact: "Contacto del Usuario",
  roleLabel: "Rol",
  backToDashboard: "Volver al Tablero",
  logout: "Cerrar sesión",
  logoutSuccessTitle: "Sesión cerrada",
  logoutSuccessDesc: "Has cerrado sesión correctamente",
  logoutErrorTitle: "Error al cerrar sesión",
  logoutErrorDesc: "Ocurrió un error al cerrar sesión",
  language: "Idioma",
  english: "Inglés",
  spanish: "Español"
},
driverTrips: {
  title: "Mis Viajes",
  assigned: "Asignados",
  completed: "Completados",
  loading: "Cargando viajes...",
  noAssignedTitle: "No hay viajes asignados",
  noAssignedDesc: "Los nuevos viajes aparecerán aquí cuando sean asignados",
  noCompletedTitle: "No hay viajes completados",
  noCompletedDesc: "Los viajes completados aparecerán aquí",
  onTime: "A tiempo",
  delayedBy: "Retrasado por {{minutes}} min"
},
driverTruck: {
  title: "Mi Camión",
  loading: "Cargando detalles del camión...",
  noTruckTitle: "No hay camión asignado",
  noTruckDesc: "Se asignará un camión cuando tengas un viaje",

  status: {
    active: "Activo",
    assigned: "Asignado",
    idle: "Inactivo"
  },

  currentTrip: "Viaje Actual",
  tripNumber: "Número de Viaje",
  from: "Desde",
  to: "Hasta",
  cargo: "Descripción de la Carga",

  vehicleDetails: "Detalles del Vehículo",
  licensePlate: "Placa",
  model: "Modelo",
  statusLabel: "Estado"
},
driverTripDetails: {
  title: "Detalles del Viaje",
  backToTrips: "Volver a Viajes",

  loading: "Cargando viaje...",
  startTrip: "Iniciar Viaje",
  completeTrip: "Completar Viaje",

  tripStarted: "Viaje iniciado 🚛",
  tripCompleted: "Viaje completado 🎉",
  completionFailed: "Error al completar",

  documentsRequired: "Documentos requeridos",
  uploadBothDocs: "Sube ambos documentos primero",

  proofUploaded: "Comprobante subido",
  pictureUploaded: "Imagen subida",

  cargo: "Carga",
  estimated: "Estimado",
  truck: "Camión",

  proofOfDelivery: "Comprobante de Entrega",
  deliveryPicture: "Imagen de Entrega",
  clickToUpload: "Haz clic para subir",

  tripNumber: "Número de Viaje",
  from: "Desde",
  to: "Hasta"
}


    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    
    // Persistent language detection configuration
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    
    interpolation: {
      escapeValue: false
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;